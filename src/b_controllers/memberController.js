import { StatusCodes } from 'http-status-codes';

import { isUserPartOfTheWorkspaceService } from '../c_service/memberService.js';
import {
  customErrorResponse,
  successReponse
} from '../utils/common/customObjects.js';

export const isUserPartOfTheWorkspaceController = async (req, res) => {
  try {
    const userId = req.user._id;
    const workspaceId = req.params.workspaceId;

    const workspace = await isUserPartOfTheWorkspaceService(
      workspaceId,
      userId
    );

    return res
      .status(StatusCodes.OK)
      .json(successReponse(workspace, 'Workspace fetched successfully!'));
  } catch (error) {
    console.log('error', error);

    return res
      .status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};
