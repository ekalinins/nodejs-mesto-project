import mongoose, {
  Schema, Types,
} from 'mongoose';
import { Models } from './models-constants';

export interface ICard {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>({
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
});

export default mongoose.model<ICard>(Models.card, cardSchema);
