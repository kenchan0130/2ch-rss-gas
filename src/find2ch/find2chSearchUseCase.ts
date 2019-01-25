import { Find2chClient } from './client/find2chClient';
import { Find2chGasService } from './client/find2chGasService';
import { Find2chGasServiceRequestAdapter } from './client/find2chGasServiceRequestAdapter';
import { Find2chGasServiceResponseAdapter } from './client/find2chGasServiceResponseAdapter';
import { Find2chSearchSortType } from './client/find2chSearchSortType';
import { Find2chSearchTargetBbsType } from './client/find2chSearchTargetBbsType';
import { Find2chSearchTargetContentType } from './client/find2chSearchTargetContentType';
import { GetThreadListRequest } from './client/getThreadListRequest';
import { Find2chSearchThread } from './domain/find2chSearchThread';
import { Find2chSearchThreadBoard } from './domain/find2chSearchThreadBoard';
import { Find2chSearchRequestDto } from './find2chSearchRequestDto';
import { Find2chSearchResponseDto } from './find2chSearchResponseDto';

export class Find2chSearchUseCase {
  private _find2chClient: Find2chClient;

  constructor() {
    const requestAdapter = new Find2chGasServiceRequestAdapter();
    const responseAdapter = new Find2chGasServiceResponseAdapter();
    const find2chService = new Find2chGasService(requestAdapter, responseAdapter);
    this._find2chClient = new Find2chClient(find2chService);
  }

  run(requestDto: Find2chSearchRequestDto): Find2chSearchResponseDto {
    const getThreadListRequest = new GetThreadListRequest(
      requestDto.searchWord,
      Find2chSearchSortType.LatestPost,
      Find2chSearchTargetContentType.Body,
      Find2chSearchTargetBbsType.All,
    );
    const threadListResponse = this._find2chClient.getThreadList(getThreadListRequest);

    const threadList = threadListResponse.resultList.map((searchResult) => {
      const board = new Find2chSearchThreadBoard(
        searchResult.boardName,
        searchResult.boardUrl,
        searchResult.serverType,
      );

      return new Find2chSearchThread(
        searchResult.threadTitle,
        searchResult.threadUrl,
        searchResult.postCount,
        searchResult.updatedAt,
        board,
        searchResult.highlightBody,
      );
    });

    return new Find2chSearchResponseDto(
      threadList,
      requestDto.searchWord,
    );
  }
}
