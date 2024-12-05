import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  githubId: {
    type: String,
    required: [true, 'Github ID is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  displayName: {
    type: String,
    required: [true, 'Display name is required'],
  },
  profileUrl: {
    type: String,
    required: [true, 'Profile URL is required'],
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
