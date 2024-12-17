import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePhoto: { type: String, required: true},
  password: { type: String, required: true },
  dateOfBirth : { type: String, required: true },
  qualification : { type: String },
  subjects : [{ type: String }],
  instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  AssignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', TeacherSchema);
export default Teacher;
