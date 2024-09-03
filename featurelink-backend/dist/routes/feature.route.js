"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feature_service_1 = require("../services/feature.service");
const user_service_1 = require("../services/user.service");
const router = express_1.default.Router();
// Route to create a new feature
router.post('/create', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const walletAddress = authHeader.startsWith('Bearer ')
            ? authHeader.substring(7)
            : authHeader;
        if (!walletAddress) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }
        const userId = await (0, user_service_1.getUserIdByAddress)(walletAddress);
        if (!userId) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }
        const { title, description, type, imageUrl, productId } = req.body;
        if (!title || !description || !type) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newFeature = await (0, feature_service_1.createFeature)({
            publisher: userId,
            title,
            description,
            type,
            imageUrl,
            upvotes: { count: 0, list: [] },
            downvotes: { count: 0, list: [] },
            implementationStatus: 'Not Reviewed',
            usefulness: {
                yes: { count: 0, list: [] },
                no: { count: 0, list: [] },
                maybe: { count: 0, list: [] },
            },
            productId: productId,
        });
        return res.status(201).json(newFeature);
    }
    catch (err) {
        console.error('Error creating feature:', err);
        res.status(500).json(err);
    }
});
// Route to get all features
router.get('/all', async (req, res) => {
    try {
        const features = await (0, feature_service_1.getAllFeatures)();
        return res.status(200).json(features);
    }
    catch (err) {
        console.error('Error fetching features:', err);
        res.status(500).json(err);
    }
});
// Route to get a feature by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const feature = await (0, feature_service_1.getFeatureById)(id);
        if (!feature) {
            return res.status(400).json({ message: 'Feature not found' });
        }
        return res.status(200).json(feature);
    }
    catch (err) {
        console.error('Error fetching feature by ID:', err);
        res.status(500).json(err);
    }
});
// Route to get features by publisher
router.get('/publisher/:publisher', async (req, res) => {
    try {
        const { publisher } = req.params;
        const features = await (0, feature_service_1.getFeaturesByPublisher)(publisher);
        return res.status(200).json(features);
    }
    catch (err) {
        console.error('Error fetching features by publisher:', err);
        res.status(500).json(err);
    }
});
router.get('/product/:product', async (req, res) => {
    try {
        const { product } = req.params;
        const features = await (0, feature_service_1.getFeaturesByProductId)(product);
        return res.status(200).json(features);
    }
    catch (err) {
        console.error('Error fetching features by product ID:', err);
        res.status(500).json(err);
    }
});
// Route to update feature status by ID
router.put('/status/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: 'Missing required field: status' });
        }
        const updatedFeature = await (0, feature_service_1.updateFeatureStatus)(id, status);
        if (!updatedFeature) {
            return res.status(400).json({ message: 'Feature not found' });
        }
        return res.status(200).json(updatedFeature);
    }
    catch (err) {
        console.error('Error updating feature status:', err);
        res.status(500).json(err);
    }
});
// Route to add an upvote or downvote to a feature
router.post('/vote/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { isUpvote } = req.body;
        const authHeader = req.headers.authorization;
        const walletAddress = authHeader.startsWith('Bearer ')
            ? authHeader.substring(7)
            : authHeader;
        if (!walletAddress) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }
        const userId = await (0, user_service_1.getUserIdByAddress)(walletAddress);
        if (!userId) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }
        const updatedFeature = await (0, feature_service_1.addVoteToFeature)(id, isUpvote, String(userId));
        if (!updatedFeature) {
            return res.status(400).json({ message: 'Feature not found' });
        }
        return res.status(200).json(updatedFeature);
    }
    catch (err) {
        console.error('Error adding vote to feature:', err);
        res.status(500).json(err);
    }
});
// Route to update the usefulness metric of a feature
router.post('/usefulness/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { feedback, address } = req.body;
        const authHeader = req.headers.authorization;
        const walletAddress = authHeader.startsWith('Bearer ')
            ? authHeader.substring(7)
            : authHeader;
        if (!walletAddress) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }
        const userId = await (0, user_service_1.getUserIdByAddress)(walletAddress);
        if (!userId) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }
        if (!['yes', 'no', 'maybe'].includes(feedback)) {
            return res.status(400).json({ message: 'Invalid feedback type' });
        }
        const updatedFeature = await (0, feature_service_1.updateUsefulnessMetric)(id, feedback, String(userId));
        if (!updatedFeature) {
            return res.status(400).json({ message: 'Feature not found' });
        }
        return res.status(200).json(updatedFeature);
    }
    catch (err) {
        console.error('Error updating usefulness metric:', err);
        res.status(500).json(err);
    }
});
// Route to delete a feature by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const authHeader = req.headers.authorization;
        const walletAddress = authHeader.startsWith('Bearer ')
            ? authHeader.substring(7)
            : authHeader;
        if (!walletAddress) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }
        const userId = await (0, user_service_1.getUserIdByAddress)(walletAddress);
        if (!userId) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }
        const feature = await (0, feature_service_1.getFeatureById)(id);
        if (!feature) {
            return res.status(400).json({ message: 'Feature not found' });
        }
        if (feature.publisher !== userId) {
            return res.status(403).end();
        }
        await (0, feature_service_1.deleteFeature)(id);
        return res.status(200).end();
    }
    catch (err) {
        console.error('Error deleting feature:', err);
        res.status(500).json(err);
    }
});
exports.default = router;
