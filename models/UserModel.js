import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  dob: {
    type: Date,
    required: false,
    validate: {
      validator: (date) => !isNaN(date),
      message: 'Date must be a valid date.',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
  },

});

const UserSchema = mongoose.model('UserSchema', userModelSchema);

export default UserSchema;
