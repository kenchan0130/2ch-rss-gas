import { Copyable } from 'ts-copyable';

export class Find2chSearchThreadPostCount extends Copyable<Find2chSearchThreadPostCount> {
  constructor(
    readonly value: number,
  ) {
    super(Find2chSearchThreadPostCount);
  }
}
