
import mongoose from "mongoose";

const quizResponseSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student' }, 
    responses: [
      {
        question: { type: String, required: true },
        options: [
          { type: String, required: true },
          { type: String, required: true },
          { type: String, required: true },
          { type: String, required: true },
        ],
        correctAnswer: { type: String, required: true },
        studentAnswer: { type: String, required: true }, 
      },
    ],
   Subject: { type: String},
   Topic : { type: String},
   TotalMarks: {type: Number},
   ObtainedMarks: {type: Number},
  
    createdAt: { type: Date, default: Date.now },
  });
  
 
  const QuizResponse = mongoose.model('Quiz', quizResponseSchema);
  export default QuizResponse;