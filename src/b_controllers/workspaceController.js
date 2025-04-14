import { StatusCodes } from 'http-status-codes';

import {
  addChannelToWorkspaceService,
  addMemberToWorkspaceService,
  createWorkspceSpaceService,
  deleteWorkspaceService,
  findAllWorkspaceByMembersService,
  getALLWorkSpaceService,
  getUserWorkspacesService,
  getWorkSpaceByIdService,
  getWorkSpaceByJoinCodeService,
  getWorkSpaceByNameService,
  updateWorkspaceService
} from '../c_service/workspaceService.js';
import {
  customErrorResponse,
  successReponse
} from '../utils/common/customObjects.js';

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
    const memberId = req.user._id;
    const role = 'admin';

    const workspace = await createWorkspceSpaceService(
      {
        ...req.body,
        members: [{ memberId, role }]
      },
      memberId
    );

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
    const userId = req.user._id;

    const workspace = await addMemberToWorkspaceService(
      workspaceId,
      memberId,
      role,
      userId
    );

    return res
      .status(StatusCodes.OK)
      .json(
        successReponse(workspace, 'Member add to the Workspace Successfully!')
      );
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};

export const addChannelToWorkspaceController = async (req, res, next) => {
  try {
    const workspaceId = req.params.id;
    const { name } = req.body;

    const workspace = await addChannelToWorkspaceService(
      workspaceId,
      name,
      req.user._id
    );

    return res
      .status(StatusCodes.OK)
      .json(
        successReponse(
          workspace,
          'Channel Added to the workspace Successfully!'
        )
      );
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

export const getALLWorkSpaceByMemberIdController = async (req, res) => {
  try {
    const memberId = req.params.id;

    const workspaces = await findAllWorkspaceByMembersService(memberId);

    return res
      .status(StatusCodes.OK)
      .json(successReponse(workspaces, 'Workspaces successfully fetched!'));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};

export const deleteWorkspaceController = async (req, res) => {
  try {
    const workspaceId = req.params.id;
    const userId = req.user._id;

    const workspace = await deleteWorkspaceService(userId, workspaceId);

    return res
      .status(StatusCodes.OK)
      .json(successReponse(workspace, 'Workspace deleted successfully!'));
  } catch (error) {
    console.log('error', error);
    return res
      .status(error.statusCode || error.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};

export const getUserWorkspaceController = async (req, res) => {
  try {
    const workspaceId = req.params.id;
    const userId = req.user._id;

    const workspaces = await getUserWorkspacesService(workspaceId, userId);

    return res
      .status(StatusCodes.OK)
      .json(successReponse(workspaces, 'Workspaces Fetched Successfully!'));
  } catch (error) {
    console.log('Error while getting the user workspaces!', error);
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};

export const updateWorkspaceController = async (req, res) => {
  try {
    const workspaceId = req.params.id;
    const data = { ...req.body };

    delete data['channels'];
    delete data['members'];
    delete data['joinCode'];

    const workspace = await updateWorkspaceService(workspaceId, data);
  } catch (error) {}
};
