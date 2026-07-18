import { Document, Schema, Types, model } from 'mongoose';

export interface IConversation extends Document {
  userId: Types.ObjectId | string;
  documentId: Types.ObjectId | string;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    documentId: { type: Schema.Types.ObjectId, ref: 'Document', required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IConversation>('Conversation', conversationSchema);
