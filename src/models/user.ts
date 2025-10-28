import mongoose, { Schema, Document, Model } from 'mongoose';
import validator from 'validator';
import { ERROR_MESSAGES } from '../common/error-messages';
import { linkRegExp } from '../common';
import { Models } from './models-constants';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: ERROR_MESSAGES.INVALID_EMAIL,
      },
      required: true,
    },
    password: { type: String, required: true, select: false },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (v) => linkRegExp.test(v),
        message: ERROR_MESSAGES.USER_INVALID_AVATAR_URL,
      },
    },
  },
  {
    toObject: {
      versionKey: false,
    },
  },
);

export default mongoose.model<IUserDocument>(
  Models.user,
  userSchema,
) as Model<IUserDocument>;
