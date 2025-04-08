import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required!'],
      unique: [true, 'Username already exists'],
      trim: true,
      match: [
        /[a-zA-Z0-9]+$/,
        'Username must contains onyl letters and numbers'
      ]
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: [true, 'Email already exists'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required!']
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function addAvtar(next) {
  const user = this;

  this.avatar = `https://robohash.org/${user.username}`;

  const SALT = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(this.password, SALT);

  this.password = hashedPassword;

  next();
});

const User = mongoose.model('User', userSchema);
export default User;
