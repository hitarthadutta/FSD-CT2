const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Member = require('../models/Member');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// POST: Add new member
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const memberData = {
      ...req.body,
      imagePath: req.file.path,
      hobbies: req.body.hobbies.split(',').map(hobby => hobby.trim())
    };

    const member = new Member(memberData);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET: List all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Single member details
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update member details
router.put('/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a member
router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Delete the image file if it exists
    if (member.imagePath) {
      const imagePath = path.join(__dirname, '..', member.imagePath);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the member from database
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 