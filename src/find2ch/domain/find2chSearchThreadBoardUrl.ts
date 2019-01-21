import { Copyable } from 'ts-copyable';

export class Find2chSearchThreadBoardUrl extends Copyable<Find2chSearchThreadBoardUrl> {
  constructor(
    readonly value: URL,
  ) {
    super(Find2chSearchThreadBoardUrl);
  }
}
