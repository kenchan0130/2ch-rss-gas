import { Copyable } from 'ts-copyable';

export class Find2chSearchThreadUrl extends Copyable<Find2chSearchThreadUrl> {
  constructor(
    readonly value: string,
  ) {
    super(Find2chSearchThreadUrl);
  }
}
