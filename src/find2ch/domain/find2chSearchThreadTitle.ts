import { Copyable } from 'ts-copyable';

export class Find2chSearchThreadTitle extends Copyable<Find2chSearchThreadTitle> {
  constructor(
    readonly value: string,
  ) {
    super(Find2chSearchThreadTitle);
  }
}
