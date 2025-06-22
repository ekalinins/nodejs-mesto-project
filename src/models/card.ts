import mongoose, {
  Schema, Types, Document, Model,
} from 'mongoose';
import { Models } from './models-constants';

export interface ICard {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
}

export interface IUserDocument extends ICard, Document {}

const cardSchema = new Schema<IUserDocument>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: Models.user,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: Models.user,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toObject: {
    versionKey: false,
  },
});

export default mongoose.model<IUserDocument>(Models.card, cardSchema) as Model<IUserDocument>;
