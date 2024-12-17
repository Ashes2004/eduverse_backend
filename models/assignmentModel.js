import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  InstituteId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  dueDate: { type: Date, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },

  submissions: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
      fileUrl: { type: String, required: true },
      submittedAt: { type: Date, default: Date.now },
      grade: { type: String, enum: ["A", "B", "C", "D", "F", null], default: null }, 
      feedback: { type: String, default: null },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;