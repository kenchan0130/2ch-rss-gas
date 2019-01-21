import { Copyable } from 'ts-copyable';

export class Find2chSearchThreadBoardName extends Copyable<Find2chSearchThreadBoardName> {
  constructor(
    readonly value: string,
  ) {
    super(Find2chSearchThreadBoardName);
  }
}
