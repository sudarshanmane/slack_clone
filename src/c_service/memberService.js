import {
  isUserMemberOfWorkspace,
  isWorkspaceExistsFun
} from '../utils/utils.js';

export const isUserPartOfTheWorkspaceService = async (workspaceId, userId) => {
  try {
    const workspace = await isWorkspaceExistsFun(workspaceId);

    const response = isUserMemberOfWorkspace(workspace, userId);

    return response;
  } catch (error) {
    throw error;
  }
};
