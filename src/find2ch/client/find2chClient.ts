import { Find2chService } from './find2chService';
import { GetThreadListRequest } from './getThreadListRequest';
import { GetThreadListResponse } from './getThreadListResponse';

export class Find2chClient {
  constructor(private _service: Find2chService) {}

  getThreadList(request: GetThreadListRequest): GetThreadListResponse {
    return this._service.getThreadList(request);
  }
}
