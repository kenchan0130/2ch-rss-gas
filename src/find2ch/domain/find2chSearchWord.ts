import { Copyable } from 'ts-copyable';

export class Find2chSearchWord extends Copyable<Find2chSearchWord> {
  constructor(readonly value: string) {
    super(Find2chSearchWord);
  }
}
