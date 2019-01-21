import * as crypto from 'crypto-js';
import { Feed } from 'feed';

import { Find2chSearchThread } from './find2ch/domain/find2chSearchThread';
import { Find2chSearchWord } from './find2ch/domain/find2chSearchWord';
import { Find2chSearchResponseDto } from './find2ch/find2chSearchResponseDto';

export class DoGetResponseAdapter {
  adapt(responseDto: Find2chSearchResponseDto): GoogleAppsScript.Content.TextOutput {
    const scriptUrl = ScriptApp.getService().getUrl();
    const factory = new Find2chFeedFactory(responseDto.searchWord, scriptUrl);

    responseDto.threadList.forEach((searchThread) => {
      factory.addItem(searchThread);
    });

    return ContentService.createTextOutput(
      factory.generateFeedString(),
    ).setMimeType(ContentService.MimeType.RSS);
  }
}

export class Find2chFeedFactory {
  private title: string;
  private description: string;
  private feedId: string;
  private link: string;
  private feedLink: string;
  private copyright = 'All rights reserved 2019, Tadayuki Onishi';
  private _feed?: Feed;

  constructor(searchWord: Find2chSearchWord, scriptUrl: string) {
    const description = `Find2ch Search Result Feed with ${searchWord.value}`;

    this.title = description;
    this.description = description;
    this.feedId = scriptUrl;
    this.link = scriptUrl;
    this.feedLink = scriptUrl;
  }

  addItem(item: Find2chSearchThread): void {
    const itemId = crypto.HmacSHA256(
      `${item.url.value}${item.updatedAt.value.toString()}`,
    ).toString();
    const itemTitle = `${item.title.value}: ${item.postCount}レス`;

    this.feed().addItem({
      title: itemTitle,
      id: itemId,
      link: item.url.value,
      date: item.updatedAt.value,
      description: item.highlightBody.toString(),
      guid: itemId,
      published: item.updatedAt.value,
    });
  }

  generateFeedString(): string {
    return this.feed().atom1();
  }

  private feed(): Feed {
    if (this._feed) return this._feed;

    const feed = new Feed({
      id: this.feedId,
      title: this.title,
      feed: this.feedLink.toString(),
      feedLinks: {
        atom: this.feedLink,
      },
      link: this.link.toString(),
      description: this.description,
      copyright: this.copyright,
    });
    this._feed = feed;
    return feed;
  }
}
