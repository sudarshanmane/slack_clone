import { StatusCodes } from 'http-status-codes';

import { getAllMessagesOfAchannelAndWorkspaceService } from '../c_service/messageService.js';
import {
  customErrorResponse,
  successReponse
} from '../utils/common/customObjects.js';

export const getAllMessagesOfAchannelAndWorkspaceController = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;
    const channelId = req.params.channelId;

    const { limit = 10, offset = 0 } = req.query;

    const messages = await getAllMessagesOfAchannelAndWorkspaceService(
      limit,
      offset,
      userId,
      channelId
    );

    return res
      .status(StatusCodes.OK)
      .json(successReponse(messages, 'Messages fetched successfully!'));
  } catch (error) {
    return res
      .status(error.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};
