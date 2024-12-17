// Controller: studentEnrollmentController.js

import StudentEnrollment from "../models/studentEnrollmentModel.js";

export const createEnrollment = async (req, res) => {
    const { studentId } = req.body;
  
    try {
      
      const existingEnrollment = await StudentEnrollment.findOne({ studentId });
  
      if (existingEnrollment) {
        return res.status(400).json({ error: "Enrollment already exists for this student in the class." });
      }
  
     
      const newEnrollment = await StudentEnrollment.create(req.body);
      res.status(201).json(newEnrollment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await StudentEnrollment.find().populate("studentId").populate("classId");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnrollmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const enrollment = await StudentEnrollment.findById(id).populate("studentId").populate("classId");
    if (!enrollment) return res.status(404).json({ error: "Enrollment not found" });
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEnrollment = async (req, res) => {
  const { id } = req.params;
  const { studentId, classId } = req.body;
  try {
    const updatedEnrollment = await StudentEnrollment.findByIdAndUpdate(
      id,
      { studentId, classId },
      { new: true }
    );
    if (!updatedEnrollment) return res.status(404).json({ error: "Enrollment not found" });
    res.status(200).json(updatedEnrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEnrollment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEnrollment = await StudentEnrollment.findByIdAndDelete(id);
    if (!deletedEnrollment) return res.status(404).json({ error: "Enrollment not found" });
    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

