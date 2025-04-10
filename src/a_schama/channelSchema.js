import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Channel name is required!']
    }
  },
  { timestamps: true }
);

const Channel = mongoose.model('Channel', channelSchema);
// Channel Refers to a group

export default Channel;
