import QuizResponse from "../models/QuizModel.js";
import Student from "../models/StudentModel.js";

export const createQuizResponse = async (req, res) => {
  try {
    const quizResponse = new QuizResponse(req.body);

    await quizResponse.save();
    const student = await Student.findById(req.body.studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    student.quizAttended.push(quizResponse._id);
    student.points = student.points + quizResponse.ObtainedMarks + 1;
    student.pointHistry.push({points: quizResponse.ObtainedMarks  + 1, date: Date.now() })
    await student.save();  
    res.status(201).json(quizResponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllQuizzes = async (req, res) => {
  const { studentId } = req.params;
  try {
    const quizResponses = await QuizResponse.find({ studentId: studentId });
    if (quizResponses.length === 0) {
      return res
        .status(404)
        .json({ message: "No quiz responses found for this student." });
    }
    res.status(200).json(quizResponses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
