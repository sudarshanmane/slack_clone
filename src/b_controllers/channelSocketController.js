import { JOIN_CHANNEL } from '../utils/common/eventConstants.js';

export function messageHandlers(io, socket) {
  socket.on(JOIN_CHANNEL, async function joinChannelHandler(data, cb) {
    const roomId = data.channelId;
    console.log(roomId);
    socket.join(roomId);
    cb({
      success: true,
      message: 'Successfully joined the channel',
      data: roomId
    });
  });
}
