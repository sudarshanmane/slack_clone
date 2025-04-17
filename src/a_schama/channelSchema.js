import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Channel name is required!']
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
      required: [true, 'Workspace ID is required!']
    }
  },
  { timestamps: true }
);

channelSchema.index({ name: 1, workspaceId: 1 }, { unique: true });
channelSchema.index({ updatedAt: -1 });

const Channel = mongoose.model('Channel', channelSchema);
// Channel Refers to a group

export default Channel;
