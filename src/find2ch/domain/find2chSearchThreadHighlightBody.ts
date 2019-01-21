import { Copyable } from 'ts-copyable';

export class Find2chSearchThreadhHighlightBody extends Copyable<Find2chSearchThreadhHighlightBody> {
  constructor(
    readonly value: string | null,
  ) {
    super(Find2chSearchThreadhHighlightBody);
  }

  toString(): string {
    return this.value ? this.value : '';
  }
}
