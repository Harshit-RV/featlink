import mongoose from "mongoose";
import Feature, { FeatureDoc, FeatureType, FeatureImplementationStatus, UserReviewMetric, UserQuestionMetric } from "../models/Feature";

/**
 * Create a new feature
 * @param args - Feature properties
 * @returns The created feature document
 */
export const createFeature = async (data: {
  publisher: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  type: FeatureType;
  imageUrl?: string;
  implementationStatus: FeatureImplementationStatus;
  upvotes: UserReviewMetric;
  downvotes: UserReviewMetric;
  usefulness: UserQuestionMetric;
  productId?: mongoose.Schema.Types.ObjectId;
}) => {
  const feature = new Feature({
    publisher: data.publisher,
    title: data.title,
    description: data.description,
    type: data.type,
    imageUrl: data.imageUrl,
    implementationStatus: data.implementationStatus,
    upvotes: data.upvotes,
    downvotes: data.downvotes,
    usefulness: data.usefulness,
    productId: data.productId,
  });

  return feature.save();
};


/**
 * Get all features
 * @returns An array of all feature documents
 */
export const getAllFeatures = async (): Promise<FeatureDoc[]> => {
  return Feature.find({}).sort({ createdAt: -1 });
};

/**
 * Get feature by ID
 * @param id - Feature ID
 * @returns The feature document or null if not found
 */
export const getFeatureById = async (id: string): Promise<FeatureDoc | null> => {
  return Feature.findById(id);
};

/**
 * Get features by publisher
 * @param publisher - Publisher name
 * @returns An array of feature documents for the given publisher
 */
export const getFeaturesByPublisher = async (publisher: string): Promise<FeatureDoc[]> => {
  return Feature.find({ publisher }).sort({ createdAt: -1 });
};

export const getFeaturesByProductId = async (productId: string): Promise<FeatureDoc[]> => {
  return Feature.find({ productId }).sort({ createdAt: -1 });
};

/**
 * Update feature status by ID
 * @param id - Feature ID
 * @param status - New implementation status
 * @returns The updated feature document
 */
export const updateFeatureStatus = async (id: string, status: FeatureImplementationStatus): Promise<FeatureDoc | null> => {
  return Feature.findByIdAndUpdate(id, { implementationStatus: status }, { new: true });
};

/**
 * Add an upvote or downvote to a feature
 * @param id - Feature ID
 * @param isUpvote - Whether to add an upvote (true) or downvote (false)
 * @param userId - The user ID to be added to the upvote/downvote list
 * @returns The updated feature document
 */
export const addVoteToFeature = async (id: string, isUpvote: boolean, userId: string): Promise<FeatureDoc | null> => {
  const feature = await Feature.findById(id);

  if (!feature) {
    throw new Error("Feature not found");
  }

  const reviewMetric = isUpvote ? feature.upvotes : feature.downvotes;

  if (!reviewMetric.list.includes(userId)) {
    reviewMetric.count += 1;
    reviewMetric.list.push(userId);
  }

  return feature.save();
};

/**
 * Update the usefulness metrics of a feature
 * @param id - Feature ID
 * @param feedback - 'yes', 'no', or 'maybe' feedback type
 * @param userId - The user ID to be added to the feedback list
 * @returns The updated feature document
 */
export const updateUsefulnessMetric = async (
  id: string,
  feedback: 'yes' | 'no' | 'maybe',
  userId: string
): Promise<FeatureDoc | null> => {
  const feature = await Feature.findById(id);

  if (!feature) {
    throw new Error("Feature not found");
  }

  const metric = feature.usefulness[feedback];

  if (!metric.list.includes(userId)) {
    metric.count += 1;
    metric.list.push(userId);
  }

  return feature.save();
};

/**
 * Delete a feature by ID
 * @param id - Feature ID
 * @returns The deleted feature document
 */
export const deleteFeature = async (id: string): Promise<FeatureDoc | null> => {
  return Feature.findByIdAndDelete(id);
};