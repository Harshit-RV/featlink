"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeature = exports.updateUsefulnessMetric = exports.addVoteToFeature = exports.updateFeatureStatus = exports.getFeaturesByProductId = exports.getFeaturesByPublisher = exports.getFeatureById = exports.getAllFeatures = exports.createFeature = void 0;
const Feature_1 = __importDefault(require("../models/Feature"));
/**
 * Create a new feature
 * @param args - Feature properties
 * @returns The created feature document
 */
const createFeature = async (data) => {
    const feature = new Feature_1.default({
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
exports.createFeature = createFeature;
/**
 * Get all features
 * @returns An array of all feature documents
 */
const getAllFeatures = async () => {
    return Feature_1.default.find({}).sort({ createdAt: -1 });
};
exports.getAllFeatures = getAllFeatures;
/**
 * Get feature by ID
 * @param id - Feature ID
 * @returns The feature document or null if not found
 */
const getFeatureById = async (id) => {
    return Feature_1.default.findById(id);
};
exports.getFeatureById = getFeatureById;
/**
 * Get features by publisher
 * @param publisher - Publisher name
 * @returns An array of feature documents for the given publisher
 */
const getFeaturesByPublisher = async (publisher) => {
    return Feature_1.default.find({ publisher }).sort({ createdAt: -1 });
};
exports.getFeaturesByPublisher = getFeaturesByPublisher;
const getFeaturesByProductId = async (productId) => {
    return Feature_1.default.find({ productId }).sort({ createdAt: -1 });
};
exports.getFeaturesByProductId = getFeaturesByProductId;
/**
 * Update feature status by ID
 * @param id - Feature ID
 * @param status - New implementation status
 * @returns The updated feature document
 */
const updateFeatureStatus = async (id, status) => {
    return Feature_1.default.findByIdAndUpdate(id, { implementationStatus: status }, { new: true });
};
exports.updateFeatureStatus = updateFeatureStatus;
/**
 * Add an upvote or downvote to a feature
 * @param id - Feature ID
 * @param isUpvote - Whether to add an upvote (true) or downvote (false)
 * @param userId - The user ID to be added to the upvote/downvote list
 * @returns The updated feature document
 */
const addVoteToFeature = async (id, isUpvote, userId) => {
    const feature = await Feature_1.default.findById(id);
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
exports.addVoteToFeature = addVoteToFeature;
/**
 * Update the usefulness metrics of a feature
 * @param id - Feature ID
 * @param feedback - 'yes', 'no', or 'maybe' feedback type
 * @param userId - The user ID to be added to the feedback list
 * @returns The updated feature document
 */
const updateUsefulnessMetric = async (id, feedback, userId) => {
    const feature = await Feature_1.default.findById(id);
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
exports.updateUsefulnessMetric = updateUsefulnessMetric;
/**
 * Delete a feature by ID
 * @param id - Feature ID
 * @returns The deleted feature document
 */
const deleteFeature = async (id) => {
    return Feature_1.default.findByIdAndDelete(id);
};
exports.deleteFeature = deleteFeature;
