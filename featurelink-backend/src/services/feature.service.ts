import Feature, { FeatureDoc, FeatureType, FeatureImplementationStatus } from "../models/Feature";

/**
 * Create a new feature
 * @param args - Feature properties
 * @returns The created feature document
 */
export const createNewFeature = async (args: Partial<FeatureDoc>): Promise<FeatureDoc> => {
  const newFeature = new Feature(args);
  return newFeature.save();
};

/**
 * Get all features
 * @returns An array of all feature documents
 */
export const getAllFeatures = async (): Promise<FeatureDoc[]> => {
  return Feature.find({});
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
  return Feature.find({ publisher });
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