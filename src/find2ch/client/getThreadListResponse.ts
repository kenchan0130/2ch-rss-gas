import { Copyable } from 'ts-copyable';

import { Find2chSearchResult } from './Find2chSearchResult';

export class GetThreadListResponse extends Copyable<GetThreadListResponse> {
  constructor(readonly resultList: Find2chSearchResult[]) {
    super(GetThreadListResponse);
  }
}
