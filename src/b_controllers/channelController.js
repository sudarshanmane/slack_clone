import { StatusCodes } from 'http-status-codes';

import { getChannelByChannelIdService } from '../c_service/channelService.js';
import {
  customErrorResponse,
  successReponse
} from '../utils/common/customObjects.js';

export const getChannelByChannelIdController = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const channelId = req.params.channelId;
    const userId = req.user._id;

    const channel = await getChannelByChannelIdService(
      workspaceId,
      userId,
      channelId
    );

    return res
      .status(StatusCodes.OK)
      .json(successReponse(channel, 'Channel Details Fetched Successfully!'));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};
