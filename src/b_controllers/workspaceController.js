import { StatusCodes } from 'http-status-codes';
import random from 'random-string-generator';

import {
  addMemberToWorkspaceService,
  createWorkspceSpaceService,
  getALLWorkSpaceService,
  getWorkSpaceByIdService,
  getWorkSpaceByJoinCodeService,
  getWorkSpaceByNameService
} from '../c_service/workspaceService.js';
import {
  customErrorResponse,
  successReponse
} from '../utils/common/customObjects.js';
import ClientError from '../utils/errors/clientErrors.js';

export const getALLWorkSpaceController = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const users = await getALLWorkSpaceService(limit, offset);

    return res.status(200).json({
      success: true,
      message: 'Workspace Details Fetched successfully!',
      data: users
    });
  } catch (error) {
    console.log('Error occurred while getting the workspaces', error);
    return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse(error));
  }
};

export const createWorkspceSpaceController = async (req, res, next) => {
  try {
    const joinCode = random(8, 'lower');
    const memberId = req.user._id;
    const role = 'admin';

    const workspace = await createWorkspceSpaceService({
      ...req.body,
      members: [{ memberId, role }],
      joinCode
    });

    return res
      .status(StatusCodes.CREATED)
      .json(successReponse(workspace, 'Workspace Created Successfully!'));
  } catch (error) {
    console.log('Error occured while creating workspace!', error);

    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse(error));
  }
};

export const addMemberToWorkspaceController = async (req, res, next) => {
  try {
    const workspaceId = req.params.id;
    const { memberId, role } = req.body;

    const workspace = await addMemberToWorkspaceService(
      workspaceId,
      memberId,
      role
    );

    return res
      .status(StatusCodes.OK)
      .json(successReponse(workspace, 'Workspaec Updated Successfully!'));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};

export const getWorkSpaceByNameController = async (req, res, next) => {
  try {
    const { name } = req.params;

    const workspace = await getWorkSpaceByNameService(name);

    return res
      .status(StatusCodes.OK)
      .json(successReponse(workspace, 'Workspace fetched successfully!'));
  } catch (error) {
    console.log('Error occurred while getting the workspace by name', error);

    return res
      .status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};

export const getWorkSpaceByJoinCodeController = async (req, res, next) => {
  try {
    const { joinCode } = req.params;

    const workspace = await getWorkSpaceByJoinCodeService(joinCode);

    return res
      .status(StatusCodes.OK)
      .json(successReponse(workspace, 'Workspace fetched successfully!'));
  } catch (error) {
    console.log('Error occurred while getting the workspace by name', error);

    return res
      .status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};

export const getWorkSpaceByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const workspace = await getWorkSpaceByIdService(id);

    return res
      .status(StatusCodes.OK)
      .json(successReponse(workspace, 'Workspace fetched successfully!'));
  } catch (error) {
    console.log('Error occurred while getting the workspace by name', error);

    return res
      .status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};
