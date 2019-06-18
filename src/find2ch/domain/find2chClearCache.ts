import { Copyable } from 'ts-copyable';

export class Find2chClearCache extends Copyable<Find2chClearCache> {
  constructor(readonly value: boolean) {
    super(Find2chClearCache);
  }
}
