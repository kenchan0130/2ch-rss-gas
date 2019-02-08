import { Copyable } from 'ts-copyable';

export class Find2chSearchThreadUrl extends Copyable<Find2chSearchThreadUrl> {
  constructor(
    readonly value: string,
  ) {
    super(Find2chSearchThreadUrl);
  }

  anchorLinkUrl(): string {
    const urlMatch = this.value.match(/((.+\/(\w+\/[0-9]+))\/([0-9]+))-$/);
    return (() => {
      if (!urlMatch) {
        return this.value;
      }

      const boradUrl = urlMatch[2];
      const boradId = urlMatch[3];
      const threadId = urlMatch[4];
      return `${boradUrl}#${boradId}/${threadId}`;
    })();
  }
}
