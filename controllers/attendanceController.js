import Attendance from "../models/attendaceModel.js";


export const createAttendance = async (req, res) => {
  try {
    const { classId, instituteId } = req.body;

   
    const newAttendance = new Attendance({
      classId,
      instituteId,
      attendances: [],
    });

    const savedAttendance = await newAttendance.save();

    return res.status(201).json({
      message: 'Attendance record created successfully',
      data: savedAttendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating attendance record',
      error: error.message,
    });
  }
};


export const addStudentToAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, date } = req.body;

    // Find the attendance record
    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    // Check if studentId already exists
    const studentExists = attendance.attendances.some(
      (entry) => entry.studentId.toString() === studentId
    );

    if (studentExists) {
      return res.status(400).json({
        message: 'Student already exists in the attendance list',
      });
    }

    // Add the student to the attendances array
    attendance.attendances.push({ studentId, date: date || Date.now() });

    // Save the updated document
    const updatedAttendance = await attendance.save();

    return res.status(200).json({
      message: 'Student added to attendance successfully',
      data: updatedAttendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error adding student to attendance',
      error: error.message,
    });
  }
};

// @desc    Get all attendance records
// @route   GET /attendance
// @access  Public
export const getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find();
    return res.status(200).json({
      message: 'Attendance records fetched successfully',
      data: attendances,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching attendance records',
      error: error.message,
    });
  }
};
