import { Copyable } from 'ts-copyable';

export class Find2chSearchThreadUpdatedAt extends Copyable<Find2chSearchThreadUpdatedAt> {
  constructor(
    readonly value: Date,
  ) {
    super(Find2chSearchThreadUpdatedAt);
  }
}
