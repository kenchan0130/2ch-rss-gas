import 'reflect-metadata';

import { container } from 'tsyringe';

import { Find2chClient } from './client/find2chClient';
import { Find2chGasService } from './client/find2chGasService';
import { Find2chSearchSortType } from './client/find2chSearchSortType';
import { Find2chSearchTargetBbsType } from './client/find2chSearchTargetBbsType';
import { Find2chSearchTargetContentType } from './client/find2chSearchTargetContentType';
import { GetThreadListRequest } from './client/getThreadListRequest';
import { Find2chSearchThread } from './domain/find2chSearchThread';
import { Find2chSearchThreadBoard } from './domain/find2chSearchThreadBoard';
import { Find2chSearchRequestDto } from './find2chSearchRequestDto';
import { Find2chSearchResponseDto } from './find2chSearchResponseDto';

container.register(
  'Find2chService', {
    useClass: Find2chGasService,
  },
);

const find2chClient = container.resolve(Find2chClient);

export class Find2chSearchUseCase {
  run(requestDto: Find2chSearchRequestDto): Find2chSearchResponseDto {
    const getThreadListRequest = new GetThreadListRequest(
      requestDto.searchWord,
      Find2chSearchSortType.LatestPost,
      Find2chSearchTargetContentType.Body,
      Find2chSearchTargetBbsType.All,
    );
    const threadListResponse = find2chClient.getThreadList(getThreadListRequest);

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
