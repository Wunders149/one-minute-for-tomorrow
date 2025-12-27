const express = require('express');
const router = express.Router();
const Wish = require('../config/models');

// GET all wishes (public)
router.get('/wishes', async (req, res) => {
  try {
    const { isPublic, limit = 50, skip = 0 } = req.query;
    
    const filter = {};
    if (isPublic !== undefined) {
      filter.isPublic = isPublic === 'true';
    }

    const wishes = await Wish.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .exec();

    const total = await Wish.countDocuments(filter);

    res.json({
      success: true,
      data: wishes,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip)
      }
    });
  } catch (error) {
    console.error('Error fetching wishes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch wishes',
      error: error.message
    });
  }
});

// GET single wish by ID
router.get('/wishes/:id', async (req, res) => {
  try {
    const wish = await Wish.findById(req.params.id);
    
    if (!wish) {
      return res.status(404).json({
        success: false,
        message: 'Wish not found'
      });
    }

    res.json({
      success: true,
      data: wish
    });
  } catch (error) {
    console.error('Error fetching wish:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch wish',
      error: error.message
    });
  }
});

// POST new wish
router.post('/wishes', async (req, res) => {
  try {
    const { text, isPublic = false, userId = null } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Wish text is required'
      });
    }

    const wish = new Wish({
      text: text.trim(),
      isPublic,
      userId
    });

    await wish.save();

    res.status(201).json({
      success: true,
      message: 'Wish created successfully',
      data: wish
    });
  } catch (error) {
    console.error('Error creating wish:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create wish',
      error: error.message
    });
  }
});

// PUT/UPDATE wish by ID
router.put('/wishes/:id', async (req, res) => {
  try {
    const { text, isPublic } = req.body;
    
    const updates = {};
    if (text !== undefined) updates.text = text.trim();
    if (isPublic !== undefined) updates.isPublic = isPublic;

    const wish = await Wish.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!wish) {
      return res.status(404).json({
        success: false,
        message: 'Wish not found'
      });
    }

    res.json({
      success: true,
      message: 'Wish updated successfully',
      data: wish
    });
  } catch (error) {
    console.error('Error updating wish:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update wish',
      error: error.message
    });
  }
});

// DELETE wish by ID
router.delete('/wishes/:id', async (req, res) => {
  try {
    const wish = await Wish.findByIdAndDelete(req.params.id);

    if (!wish) {
      return res.status(404).json({
        success: false,
        message: 'Wish not found'
      });
    }

    res.json({
      success: true,
      message: 'Wish deleted successfully',
      data: wish
    });
  } catch (error) {
    console.error('Error deleting wish:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete wish',
      error: error.message
    });
  }
});

// GET statistics
router.get('/stats', async (req, res) => {
  try {
    const totalWishes = await Wish.countDocuments();
    const publicWishes = await Wish.countDocuments({ isPublic: true });
    const privateWishes = await Wish.countDocuments({ isPublic: false });

    res.json({
      success: true,
      data: {
        total: totalWishes,
        public: publicWishes,
        private: privateWishes
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

module.exports = router;
