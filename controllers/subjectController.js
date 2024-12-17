import Subject from '../models/subjectModel.js';

export const createSubject = async (req, res) => {
  const { name, code , InstituteId } = req.body;

  if (!name || !code || !InstituteId) {
    return res.status(400).json({ error: 'Name and code are required' });
  }

  try {
    const newSubject = new Subject({ name, code , InstituteId });
    const savedSubject = await newSubject.save();
    res.status(201).json({ message: 'Subject created successfully', subject: savedSubject });
  } catch (error) {
    res.status(500).json({ error: 'Error creating subject', details: error.message });
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json({ subjects });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching subjects', details: error.message });
  }
};

export const getSubjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.status(200).json({ subject });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching subject', details: error.message });
  }
};

export const updateSubject = async (req, res) => {
  const { id } = req.params;
  const { name, code } = req.body;

  try {
    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    subject.name = name || subject.name;
    subject.code = code || subject.code;

    const updatedSubject = await subject.save();
    res.status(200).json({ message: 'Subject updated successfully', subject: updatedSubject });
  } catch (error) {
    res.status(500).json({ error: 'Error updating subject', details: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    await Subject.findByIdAndDelete(id);
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting subject', details: error.message });
  }
};
