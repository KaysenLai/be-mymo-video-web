// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const opts = { toJSON: { virtuals: true }, timestamps: true };

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
      default: '',
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    follower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  opts,
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

userSchema.virtual('followingNum').get(function () {
  return this.following.length;
});

userSchema.virtual('followerNum').get(function () {
  return this.follower.length;
});

userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
