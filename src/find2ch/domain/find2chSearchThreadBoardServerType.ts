import { Copyable } from 'ts-copyable';

// TODO: Change to enum
export class Find2chSearchThreadBoardServerType
  extends Copyable<Find2chSearchThreadBoardServerType> {
  constructor(
    readonly value: string,
  ) {
    super(Find2chSearchThreadBoardServerType);
  }
}
