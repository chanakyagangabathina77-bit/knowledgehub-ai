import { Document, Schema, Types, model } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  content: string;
  userId: Types.ObjectId | string;
  fileName: string;
  fileType: string;
  mimeType: string;
  size: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const documentSchema = new Schema<IDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default model<IDocument>('Document', documentSchema);
