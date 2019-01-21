import { Copyable } from 'ts-copyable';

export class Find2chSearchUrl extends Copyable<Find2chSearchUrl> {
  constructor(readonly value: URL) {
    super(Find2chSearchUrl);
  }

  toString(): string {
    return this.value.toString();
  }
}
