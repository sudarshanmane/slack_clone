import { StatusCodes } from 'http-status-codes';

import { getChannelMessagesByChannelIdService } from '../c_service/channelService.js';
import {
  customErrorResponse,
  successReponse
} from '../utils/common/customObjects.js';

export const getChannelMessagesByChannelIdController = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const channelId = req.params.channelId;
    const userId = req.user._id;

    const channelMessages = await getChannelMessagesByChannelIdService(
      workspaceId,
      userId,
      channelId
    );

    return res
      .status(StatusCodes.OK)
      .json(
        successReponse(channelMessages, 'Channel Details Fetched Successfully!')
      );
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};

// export const getChannelById = async (req, res) => {
//   try {
//     const channelId = req.params.channelId;
//     const user = req.user._id;

//     const response = getChannelByIdService(channelId);
//   } catch (error) {
//     return res
//       .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
//       .json(customErrorResponse(error));
//   }
// };
