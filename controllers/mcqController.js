import MCQ from "../models/MCQModel.js";
import Teacher from '../models/teacherModel.js';


// Create a new MCQ question
export const createMCQ = async (req, res) => {
  const { question, options, classId, instituteId } = req.body;
  const teacherId = req.user._id; r

  if (!question || !options || !classId || !instituteId || !teacherId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Ensure at least one option is correct
  const correctOption = options.some(option => option.isCorrect);
  if (!correctOption) {
    return res.status(400).json({ error: 'At least one option must be correct' });
  }

  try {
    // Validate the teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    const newMCQ = new MCQ({
      question,
      options,
      class: classId,
      instituteId,
      teacher: teacherId, // Store teacher ID
    });

    const savedMCQ = await newMCQ.save();
    res.status(201).json({ message: 'MCQ created successfully', mcq: savedMCQ });
  } catch (error) {
    res.status(500).json({ error: 'Error creating MCQ', details: error.message });
  }
};

// Get all MCQs for a specific class
export const getMCQsByClass = async (req, res) => {
  const { classId } = req.params;

  try {
    const mcqs = await MCQ.find({ class: classId })
      .populate('class', 'name')
      .populate('instituteId', 'name')
      .populate('teacher', 'name email'); // Populate teacher info

    res.status(200).json({ mcqs });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching MCQs', details: error.message });
  }
};

// Get a specific MCQ question
export const getMCQ = async (req, res) => {
  const { id } = req.params;

  try {
    const mcq = await MCQ.findById(id)
      .populate('class', 'name')
      .populate('instituteId', 'name')
      .populate('teacher', 'name email'); // Populate teacher info

    if (!mcq) {
      return res.status(404).json({ error: 'MCQ not found' });
    }

    res.status(200).json({ mcq });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching MCQ', details: error.message });
  }
};

// Update an existing MCQ
export const updateMCQ = async (req, res) => {
  const { id } = req.params;
  const { question, options } = req.body;
  const teacherId = req.user._id; // Assuming the teacher is logged in and their ID is stored in req.user

  if (!question || !options) {
    return res.status(400).json({ error: 'Question and options are required' });
  }

  try {
    const mcq = await MCQ.findById(id);
    if (!mcq) {
      return res.status(404).json({ error: 'MCQ not found' });
    }

    // Ensure at least one option is correct
    const correctOption = options.some(option => option.isCorrect);
    if (!correctOption) {
      return res.status(400).json({ error: 'At least one option must be correct' });
    }

    // Only the teacher who created the MCQ can update it
    if (mcq.teacher.toString() !== teacherId.toString()) {
      return res.status(403).json({ error: 'You are not authorized to update this MCQ' });
    }

    mcq.question = question;
    mcq.options = options;

    const updatedMCQ = await mcq.save();
    res.status(200).json({ message: 'MCQ updated successfully', mcq: updatedMCQ });
  } catch (error) {
    res.status(500).json({ error: 'Error updating MCQ', details: error.message });
  }
};

// Delete an MCQ
export const deleteMCQ = async (req, res) => {
  const { id } = req.params;
  const teacherId = req.user._id; // Assuming the teacher is logged in and their ID is stored in req.user

  try {
    const mcq = await MCQ.findById(id);
    if (!mcq) {
      return res.status(404).json({ error: 'MCQ not found' });
    }

    // Only the teacher who created the MCQ can delete it
    if (mcq.teacher.toString() !== teacherId.toString()) {
      return res.status(403).json({ error: 'You are not authorized to delete this MCQ' });
    }

    await MCQ.findByIdAndDelete(id);
    res.status(200).json({ message: 'MCQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting MCQ', details: error.message });
  }
};
