import { Copyable } from 'ts-copyable';

export class FeedItem extends Copyable<FeedItem> {
  constructor(
    readonly title: string,
    readonly link: string,
    readonly description: string,
    readonly publishedDate: Date,
    readonly guid: string,
  ) {
    super(FeedItem);
  }
}
