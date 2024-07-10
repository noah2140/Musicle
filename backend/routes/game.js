const express = require('express');
const router = express.Router();
const Puzzle = require('../models/puzzle');

// Holen des täglichen Puzzles
router.get('/puzzle', async (req, res) => {
    try {
        const today = new Date().toISOString().slice(0, 10);
        const puzzle = await Puzzle.findOne({ date: today });
        if (!puzzle) {
            return res.status(404).json({ message: 'Puzzle not found for today' });
        }
        res.json({ puzzle });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
