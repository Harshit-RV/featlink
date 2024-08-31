import mongoose, {Document} from "mongoose";

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
  publisher: mongoose.Schema.Types.ObjectId;
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
  productId?: mongoose.Schema.Types.ObjectId;
}