import express from 'express';
import {
  createNewFeature,
  getAllFeatures,
  getFeatureById,
  getFeaturesByPublisher,
  updateFeatureStatus,
  addVoteToFeature,
  updateUsefulnessMetric,
  deleteFeature,
} from '../services/feature.service';
import { FeatureImplementationStatus } from '../models/Feature';

const router = express.Router();
const userId = '12345'; // Mock user ID

// Route to create a new feature
router.post('/create', async (req, res) => {
  try {
    if (!userId) {
      return res.status(403).end();
    }

    const { title, description, type, imageUrl } = req.body;
    
    if (!title || !description || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newFeature = await createNewFeature({
      publisher: userId,
      title,
      description,
      type,
      imageUrl,
      upvotes: { count: 0, list: [] },
      downvotes: { count: 0, list: [] },
      usefulness: {
        yes: { count: 0, list: [] },
        no: { count: 0, list: [] },
        maybe: { count: 0, list: [] },
      },
    });

    return res.status(201).json(newFeature);
  } catch (err) {
    console.error('Error creating feature:', err);
    res.status(500).json(err);
  }
});

// Route to get all features
router.get('/all', async (req, res) => {
  try {
    const features = await getAllFeatures();
    return res.status(200).json(features);
  } catch (err) {
    console.error('Error fetching features:', err);
    res.status(500).json(err);
  }
});

// Route to get a feature by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const feature = await getFeatureById(id);
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    return res.status(200).json(feature);
  } catch (err) {
    console.error('Error fetching feature by ID:', err);
    res.status(500).json(err);
  }
});

// Route to get features by publisher
router.get('/publisher/:publisher', async (req, res) => {
  try {
    const { publisher } = req.params;
    const features = await getFeaturesByPublisher(publisher);
    return res.status(200).json(features);
  } catch (err) {
    console.error('Error fetching features by publisher:', err);
    res.status(500).json(err);
  }
});

// Route to update feature status by ID
router.put('/status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body as { status: FeatureImplementationStatus };

    if (!status) {
      return res.status(400).json({ message: 'Missing required field: status' });
    }

    const updatedFeature = await updateFeatureStatus(id, status);
    if (!updatedFeature) {
      return res.status(404).json({ message: 'Feature not found' });
    }

    return res.status(200).json(updatedFeature);
  } catch (err) {
    console.error('Error updating feature status:', err);
    res.status(500).json(err);
  }
});

// Route to add an upvote or downvote to a feature
router.post('/vote/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { isUpvote } = req.body;

    if (!userId) {
      return res.status(403).end();
    }

    const updatedFeature = await addVoteToFeature(id, isUpvote, userId);
    if (!updatedFeature) {
      return res.status(404).json({ message: 'Feature not found' });
    }

    return res.status(200).json(updatedFeature);
  } catch (err) {
    console.error('Error adding vote to feature:', err);
    res.status(500).json(err);
  }
});

// Route to update the usefulness metric of a feature
router.post('/usefulness/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;

    if (!userId) {
      return res.status(403).end();
    }

    if (!['yes', 'no', 'maybe'].includes(feedback)) {
      return res.status(400).json({ message: 'Invalid feedback type' });
    }

    const updatedFeature = await updateUsefulnessMetric(id, feedback, userId);
    if (!updatedFeature) {
      return res.status(404).json({ message: 'Feature not found' });
    }

    return res.status(200).json(updatedFeature);
  } catch (err) {
    console.error('Error updating usefulness metric:', err);
    res.status(500).json(err);
  }
});

// Route to delete a feature by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!userId) {
      return res.status(403).end();
    }

    const feature = await getFeatureById(id);
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }

    if (feature.publisher !== userId) {
      return res.status(403).end();
    }

    await deleteFeature(id);
    return res.status(200).end();
  } catch (err) {
    console.error('Error deleting feature:', err);
    res.status(500).json(err);
  }
});

export default router;