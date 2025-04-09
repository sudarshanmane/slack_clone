import mongoose from 'mongoose';

export const workspaceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Workspace Name is requried!'],
      unique: true
    },
    description: {
      type: String
    },
    members: [
      {
        memberId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        role: {
          type: String,
          enum: ['admin', 'member'],
          default: 'member'
        }
      }
    ],
    joinCode: {
      type: String,
      unique: true,
      required: [true, 'Join code is required!']
    },
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
      }
    ]
  },
  { timestamps: true }
);

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;
