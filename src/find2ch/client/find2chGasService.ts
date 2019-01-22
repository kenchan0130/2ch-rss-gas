import { Find2chGasServiceResponseAdapter } from './find2chGasServiceResponseAdapter';
import { Find2chService } from './find2chService';
import { GetThreadListRequest } from './getThreadListRequest';
import { GetThreadListResponse } from './getThreadListResponse';

export class Find2chGasService implements Find2chService {
  constructor(
    private _responseAdapter: Find2chGasServiceResponseAdapter,
  ) {}

  getThreadList(request: GetThreadListRequest): GetThreadListResponse {
    const httpResponse = UrlFetchApp.fetch(request.url().value);
    const rawResponse = httpResponse.getContentText('EUC-JP');
    return this._responseAdapter.adapt(rawResponse);
  }
}
