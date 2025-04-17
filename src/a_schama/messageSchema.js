import mongoose from 'mongoose';

export const messageScheam = mongoose.Schema(
  {
    body: {
      type: String,
      requred: [true, 'Message body is required!']
    },
    image: {
      type: String
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      required: [true, 'Channel is required']
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender ID is required!']
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
      required: [true, 'Workspace ID is required!']
    }
  },
  { timestamps: true }
);

messageScheam.index({ body: 'text' });
messageScheam.index({ createdAt: -1 });

const Message = mongoose.model('Message', messageScheam);
export default Message;
