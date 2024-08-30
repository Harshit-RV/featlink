import mongoose, { Document, Schema } from 'mongoose';

export type FeatureType = 'Error' | 'Improvement' | 'Design' | 'Feature';
export type FeatureImplementationStatus =
  | 'Not Reviewed'
  | 'Not Considering'
  | 'Considering'
  | 'In Progress'
  | 'Completed';

export interface UserReviewMetric {
  count: number;
  list: string[];
}

export interface UserQuestionMetric {
  yes: UserReviewMetric;
  no: UserReviewMetric;
  maybe: UserReviewMetric;
}

export interface FeatureDoc extends Document {
  publisher: string;
  title: string;
  description: string;
  type: FeatureType;
  imageUrl?: string;
  implementationStatus: FeatureImplementationStatus;
  upvotes: UserReviewMetric;
  downvotes: UserReviewMetric;
  usefulness: UserQuestionMetric;
  createdAt: Date;
  updatedAt: Date;
}

const userReviewMetric: Schema = new Schema(
  {
    count: { type: Number, required: true, default: 0 },
    list: { type: [String], required: true, default: [] },
  },
  { timestamps: true }
);

const userQuestionMetric: Schema = new Schema(
  {
    yes: userReviewMetric,
    no: userReviewMetric,
    maybe: userReviewMetric,
  },
  { timestamps: true }
);

const featureSchema: Schema = new Schema(
  {
    publisher: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ['Error', 'Improvement', 'Design', 'Feature'],
      required: true,
    },
    imageUrl: { type: String, required: false },
    implementationStatus: {
      type: String,
      enum: [
        'Not Reviewed',
        'Not Considering',
        'Considering',
        'In Progress',
        'Completed',
      ],
      required: true,
      default: 'Not Reviewed',
    },
    upvotes: userReviewMetric,
    downvotes: userReviewMetric,
    usefulness: userQuestionMetric,
  },
  { timestamps: true }
);

const Feature = mongoose.model<FeatureDoc>('Features', featureSchema);

export default Feature;