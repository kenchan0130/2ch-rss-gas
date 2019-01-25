import { Find2chGasServiceRequestAdapter } from './find2chGasServiceRequestAdapter';
import { Find2chGasServiceResponseAdapter } from './find2chGasServiceResponseAdapter';
import { Find2chService } from './find2chService';
import { GetThreadListRequest } from './getThreadListRequest';
import { GetThreadListResponse } from './getThreadListResponse';

export class Find2chGasService implements Find2chService {
  constructor(
    private _requestAdapter: Find2chGasServiceRequestAdapter,
    private _responseAdapter: Find2chGasServiceResponseAdapter,
  ) {}

  getThreadList(request: GetThreadListRequest): GetThreadListResponse {
    const url = this._requestAdapter.adapt(request);
    console.log(`Fetch ${url}`);
    const httpResponse = UrlFetchApp.fetch(url);
    return this._responseAdapter.adapt(httpResponse);
  }
}
