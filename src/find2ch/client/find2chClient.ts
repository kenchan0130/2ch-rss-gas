import { inject, injectable } from 'tsyringe';

import { Find2chService } from './find2chService';
import { GetThreadListRequest } from './getThreadListRequest';
import { GetThreadListResponse } from './getThreadListResponse';

@injectable()
export class Find2chClient {
  constructor(@inject('Find2chService') private _service: Find2chService) {}

  getThreadList(request: GetThreadListRequest): GetThreadListResponse {
    return this._service.getThreadList(request);
  }
}
