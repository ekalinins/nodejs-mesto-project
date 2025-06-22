import mongoose, { Schema, Document, Model } from 'mongoose';
import { Models } from './models-constants';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
  },
}, {
  toObject: {
    versionKey: false,
  },
});

export default mongoose.model<IUserDocument>(Models.user, userSchema) as Model<IUserDocument>;
