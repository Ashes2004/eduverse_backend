import Class from "../models/ClassModel.js";
import Student from '../models/StudentModel.js';
import Teacher from '../models/teacherModel.js';

// Create a new class
export const createClass = async (req, res) => {
  const { name,classId ,  instituteId, teachers } = req.body;

  if (!name || !instituteId) {
    return res.status(400).json({ error: 'Name and Institute ID are required' });
  }

  try {
    // Check if a class with the same instituteId and classId already exists
    const existingClass = await Class.findOne({ instituteId, classId });
    if (existingClass) {
      return res.status(400).json({ error: 'Class with this name already exists for this institute' });
    }

    const newClass = new Class(req.body);
    const savedClass = await newClass.save();

    // Assign class to teachers and students
    if (teachers) {
      for (const teacher of teachers) {
        const teacherExists = await Teacher.findById(teacher);
        if (teacherExists) {
          teacherExists.AssignedClasses.push(savedClass._id);
          await teacherExists.save();
        }
      }
    }

    res.status(201).json({ message: 'Class created successfully', class: savedClass });
  } catch (error) {
    res.status(500).json({ error: 'Error creating class', details: error.message });
  }
};

// Update a class to add students and/or teachers
export const updateClass = async (req, res) => {
  const { id } = req.params;
  const { students = [], teachers = [] } = req.body;

  try {
    const classToUpdate = await Class.findById(id);

    if (!classToUpdate) {
      return res.status(404).json({ error: "Class not found" });
    }

    // Get a list of current students in the class
    const currentStudents = classToUpdate.students;

    // Remove `classId` from students no longer in the updated list
    for (const studentId of currentStudents) {
      if (!students.includes(studentId.toString())) {
        const oldStudent = await Student.findById(studentId);
        if (oldStudent) {
          oldStudent.classId = null;
          await oldStudent.save();
        }
      }
    }

    // Clear the current students list and reassign based on the new list
    classToUpdate.students = [];

    // Add or update students in the new list
    for (const studentId of students) {
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ error: `Student with ID ${studentId} not found` });
      }
      student.classId = id;
      student.points = 0; // Reset points if required
      await student.save();
      classToUpdate.students.push(studentId);
    }

    // Add or update teachers in the new list
    for (const teacher of teachers) {
      const teacherExists = await Teacher.findById(teacher.teacher);
      if (!teacherExists) {
        return res.status(404).json({ error: `Teacher with ID ${teacher.teacher} not found` });
      }
      if (!teacherExists.AssignedClasses.includes(id)) {
        teacherExists.AssignedClasses.push(id);
        await teacherExists.save();
      }
      classToUpdate.teachers.push(teacher);
    }

    const updatedClass = await classToUpdate.save();
    res.status(200).json({ message: "Class updated successfully", class: updatedClass });
  } catch (error) {
    res.status(500).json({ error: "Error updating class", details: error.message });
  }
};


// Get a specific class by instituteId and classId
export const getClassByInstituteAndClassId = async (req, res) => {
  const { instituteId, classId } = req.params;
    
  try {
    const classData = await Class.findOne({ instituteId, _id:classId })
      .populate('subjects')
      .populate('students', 'name email')
      .populate('teachers.teacher', 'name email')
      .populate('teachers.subjects', 'name');

    if (!classData) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(200).json({ class: classData });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching class', details: error.message });
  }
};

// Get all classes for an institute
export const getClassByID = async (req, res) => {
  const { id } = req.params;

  try {
    const classes = await Class.findById(id);

    res.status(200).json({ classes });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching classes', details: error.message });
  }
};
export const getClassesByInstitute = async (req, res) => {
  const { instituteId } = req.params;

  try {
    const classes = await Class.find({ instituteId })
      .populate('students', 'name email')
      .populate('teachers.teacher', 'name email')
      .populate('teachers.subjects', 'name');

    res.status(200).json({ classes });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching classes', details: error.message });
  }
};

// Delete a class
export const deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    const classToDelete = await Class.findById(id);

    if (!classToDelete) {
      return res.status(404).json({ error: 'Class not found' });
    }

    for (const teacher of classToDelete.teachers) {
      const teacherExists = await Teacher.findById(teacher.teacher);
      if (teacherExists) {
        teacherExists.AssignedClasses = teacherExists.AssignedClasses.filter(
          (assignedClass) => !assignedClass.equals(id)
        );
        await teacherExists.save();
      }
    }

    // Remove classId from all students
    for (const studentId of classToDelete.students) {
      const student = await Student.findById(studentId);
      if (student) {
        student.classId = null;
        student.points = 0;
        await student.save();
      }
    }

    await Class.findByIdAndDelete(id);
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting class', details: error.message });
  }
};



export const getAllClasses = async (req, res) => {
   
  
    try {
      const classes = await Class.find({});
        
  
      res.status(200).json({ classes });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching classes', details: error.message });
    }
  };