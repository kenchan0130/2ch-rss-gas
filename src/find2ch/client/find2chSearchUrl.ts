import { Copyable } from 'ts-copyable';

export class Find2chSearchUrl extends Copyable<Find2chSearchUrl> {
  constructor(readonly value: string) {
    super(Find2chSearchUrl);
  }
}
