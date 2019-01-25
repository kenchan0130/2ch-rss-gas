import { Copyable } from 'ts-copyable';

import { Find2chSearchWord } from '../domain/find2chSearchWord';
import { Find2chSearchSortType } from './find2chSearchSortType';
import { Find2chSearchTargetBbsType } from './find2chSearchTargetBbsType';
import { Find2chSearchTargetContentType } from './find2chSearchTargetContentType';

export class GetThreadListRequest extends Copyable<GetThreadListRequest> {
  constructor(
    readonly searchWord: Find2chSearchWord,
    readonly sortType: Find2chSearchSortType,
    readonly contentType: Find2chSearchTargetContentType,
    readonly bbsType: Find2chSearchTargetBbsType,
  ) {
    super(GetThreadListRequest);
  }
}
