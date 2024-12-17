import mongoose from 'mongoose';

const mcqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      option: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }, // Teacher who created the MCQ
  createdAt: { type: Date, default: Date.now },
});

const MCQ = mongoose.model('MCQ', mcqSchema);

export default MCQ;
