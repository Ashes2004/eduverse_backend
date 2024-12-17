import Assignment from "../models/assignmentModel.js";
import Student from "../models/StudentModel.js";
import Teacher from "../models/teacherModel.js";

// Create a new assignment
export const createAssignment = async (req, res) => {
  const { title, description, classId, instituteId, dueDate, teacherId } =
    req.body;

  if (
    !title ||
    !description ||
    !classId ||
    !instituteId ||
    !dueDate ||
    !teacherId
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    const newAssignment = new Assignment({
      title,
      description,
      class: classId,
      InstituteId: instituteId,
      dueDate,
      teacher: teacherId,
      submissions: [],
    });

    const savedAssignment = await newAssignment.save();
    res
      .status(201)
      .json({
        message: "Assignment created successfully",
        assignment: savedAssignment,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating assignment", details: error.message });
  }
};

// Get assignments for a specific class
export const getAssignmentsById = async (req, res) => {
  const { id } = req.params;

  try {
    
    
    const assignments = await Assignment.findById(id)
      .populate("teacher", "name email")
      .populate("submissions.student", "name email");

    res.status(200).json({ assignments });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching assignments", details: error.message });
  }
};


export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({});

    res.status(200).json(assignments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching assignments", details: error.message });
  }
};



export const getAssignmentsByClass = async (req, res) => {
  const { classId } = req.params;

  try {
    const assignments = await Assignment.find({ class: classId })
      .populate("teacher", "name email")
      .populate("submissions.student", "name email");

    res.status(200).json({ assignments });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching assignments", details: error.message });
  }
};


// Submit an assignment for a student
export const submitAssignment = async (req, res) => {
  const { assignmentId, studentId, fileUrl } = req.body;

  if (!assignmentId || !studentId || !fileUrl) {
    return res
      .status(400)
      .json({ error: "Assignment ID, Student ID, and file URL are required" });
  }

  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Check if the student has already submitted the assignment
    const existingSubmission = assignment.submissions.find(
      (sub) => sub.student.toString() === studentId
    );
    if (existingSubmission) {
      return res
        .status(400)
        .json({ error: "Student has already submitted this assignment" });
    }

    assignment.submissions.push({
      student: studentId,
      fileUrl,
      submittedAt: Date.now(),
      grade: null,
      feedback: null,
    });
     student.assignments.push(assignment._id);
    const updatedAssignment = await assignment.save();
    res
      .status(200)
      .json({
        message: "Assignment submitted successfully",
        assignment: updatedAssignment,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error submitting assignment", details: error.message });
  }
};

// Grade an assignment
export const gradeAssignment = async (req, res) => {
  const { assignmentId, studentId, grade, feedback } = req.body;

  if (!assignmentId || !studentId || !grade) {
    return res
      .status(400)
      .json({ error: "Assignment ID, Student ID, and grade are required" });
  }

  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const submission = assignment.submissions.find(
      (sub) => sub.student.toString() === studentId
    );
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    submission.grade = grade;
    submission.feedback = feedback;

    const updatedAssignment = await assignment.save();
    res
      .status(200)
      .json({
        message: "Assignment graded successfully",
        assignment: updatedAssignment,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error grading assignment", details: error.message });
  }
};

export const updatedAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    const assignment = await Assignment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({
        message: "Assignment updated successfully",
        assignment: assignment,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating assignment", details: error.message });
  }
};

export const deleteAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    await Assignment.findByIdAndDelete(id);
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting assignment", details: error.message });
  }
};
