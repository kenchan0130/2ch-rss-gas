import { Feed } from './feed';
import { FeedItem } from './feedItem';
import { Find2chSearchThread } from './find2ch/domain/find2chSearchThread';
import { Find2chSearchWord } from './find2ch/domain/find2chSearchWord';
import { Find2chSearchResponseDto } from './find2ch/find2chSearchResponseDto';

export class DoGetResponseAdapter {
  adapt(responseDto: Find2chSearchResponseDto): string {
    const scriptUrl = ScriptApp.getService().getUrl();
    const factory = new Find2chFeedFactory(responseDto.searchWord, scriptUrl);

    responseDto.threadList.forEach((searchThread) => {
      factory.addItem(searchThread);
    });

    return factory.generateFeedString();
  }
}

class Find2chFeedFactory {
  private title: string;
  private description: string;
  private link: string;
  private _feed?: Feed;

  constructor(searchWord: Find2chSearchWord, scriptUrl: string) {
    const description = `Find2ch Search Result Feed with ${searchWord.value}`;

    this.title = description;
    this.description = description;
    this.link = scriptUrl;
  }

  addItem(searchThread: Find2chSearchThread): void {
    const itemId = searchThread.url.value;
    const itemTitle = searchThread.title.value;
    const feedItem = new FeedItem(
      itemTitle,
      searchThread.url.adjustedUrl(),
      searchThread.highlightBody.toString(),
      searchThread.updatedAt.value,
      itemId,
    );
    this.feed().addItem(feedItem);
  }

  generateFeedString(): string {
    return this.feed().generate();
  }

  private feed(): Feed {
    if (this._feed) return this._feed;

    const feed = new Feed(
      this.title,
      this.link.toString(),
      this.description,
      this.link.toString(),
    );
    this._feed = feed;
    return feed;
  }
}
