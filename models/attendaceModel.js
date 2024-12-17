import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Class',
  },
  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Admin',
  },
  attendances: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student', 
      },
      date: {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
  ],
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
