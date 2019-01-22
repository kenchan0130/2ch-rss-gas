import { FeedItem } from './feedItem';

export class Feed {
  private title: string;
  private link: string;
  private description: string;
  private atomlink: string;
  private items: FeedItem[] = [];
  private timezone = 'JST';
  private channel = XmlService.createElement('channel');

  constructor(
    title: string,
    link: string,
    description: string,
    atomlink: string,
  ) {
    this.title = title;
    this.link = link;
    this.description = description;
    this.atomlink = atomlink;
  }

  addItem(item: FeedItem): void {
    this.items.push(item);
  }

  generate(): string {
    this.channel.addContent(
      XmlService.createElement('atomlink')
      .setAttribute('href', this.atomlink)
      .setAttribute('rel', 'self')
      .setAttribute('type', 'application/rss+xml').detach(),
    );

    this.channel.addContent(this.createSimpleContent('title', this.title));
    this.channel.addContent(this.createSimpleContent('link', this.link));
    this.channel.addContent(this.createSimpleContent('description', this.description));

    this.items.forEach((item) => {
      this.channel.addContent(
        XmlService
          .createElement('item')
          .addContent(this.createSimpleContent('title', item.title))
          .addContent(this.createSimpleContent('link', item.link))
          .addContent(this.createSimpleContent('description', item.description))
          .addContent(this.createSimpleContent('pubDate', this.formatDate(item.publishedDate)))
          .addContent(this.createSimpleContent('guid', item.guid))
          .detach(),
      );
    });

    const root = XmlService.createElement('rss')
      .setAttribute('version', '2.0')
      .setAttribute('xmlnsatom', 'http://www.w3.org/2005/Atom')
      .addContent(this.channel.detach());

    const document = XmlService.createDocument(root);
    const xml = XmlService.getPrettyFormat().format(document);

    return xml.replace('xmlnsatom', 'xmlns:atom')
      .replace('<atomlink href=', '<atom:link href=');
  }

  private createSimpleContent(element: string, text: string) {
    return XmlService.createElement(element).setText(text).detach();
  }

  private formatDate(date: Date): string {
    return Utilities.formatDate(date, this.timezone, 'EEE, dd MMM yyyy HH:mm:ss Z');
  }
}
