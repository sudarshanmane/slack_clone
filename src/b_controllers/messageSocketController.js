import { createMessageService } from '../c_service/messageService.js';
import {
  NEW_MESSAGE_EVENT,
  NEW_MESSAGE_RECEIVED_EVENT
} from '../utils/common/eventConstants.js';

export default function messageSocketHandlers(io, socket) {
  socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb) {
    const messageResponse = await createMessageService(data);
    const { channelId } = data;

    io.to(channelId).emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);

    cb({
      success: true,
      message: 'Message Created Successfully!',
      data: messageResponse
    });
  });
}
