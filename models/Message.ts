import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage extends Document {
  content: string;
  visibility: 'public' | 'private';
  createdAt: Date;
  timezone?: string;
  userAgent?: string;
  ip?: string;
}

const MessageSchema: Schema = new Schema({
  content: {
    type: String,
    required: [true, 'Message content is required'],
    maxlength: [500, 'Message cannot be more than 500 characters'],
    trim: true,
  },
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
  timezone: {
    type: String,
    required: false,
  },
  userAgent: {
    type: String,
    select: false, // Don't return this by default
  },
  ip: {
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model overwrite upon initial compile
const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
