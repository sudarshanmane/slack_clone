import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Channel name is required!'],
      minlength: [3, 'Channel name must be least 3 chars!'],
      unique: true
    }
  },
  { timestamps: true }
);

const Channel = mongoose.model('Channel', channelSchema);
// Channel Refers to a group

export default Channel;
