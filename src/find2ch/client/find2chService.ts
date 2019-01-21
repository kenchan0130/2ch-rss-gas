import { GetThreadListRequest } from './getThreadListRequest';
import { GetThreadListResponse } from './getThreadListResponse';

export interface Find2chService {
  getThreadList(request: GetThreadListRequest): GetThreadListResponse;
}
