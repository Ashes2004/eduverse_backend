import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  InstituteId:  { type: String, required: true },
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;
