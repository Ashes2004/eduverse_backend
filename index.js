import express from 'express';
import { configDotenv } from 'dotenv';
import { connectDB } from './connectDB.js';
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import mcqRoutes from "./routes/mcqRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import aiQuizRoutes from "./routes/aiQuizRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import studentEnrollmentRoutes from "./routes/studentEnrollmentRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import StudyHub from "./routes/StudyHub.js";
import quizRoutes from "./routes/quizRoutes.js";
import aiNotesMker from "./routes/aiNotesMaker.js";
import attendaceRoutes from "./routes/attendenceRoutes.js";
import cors from 'cors';
configDotenv();
const app = express();
const port = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/student' , studentRoutes);
app.use('/api/teacher' , teacherRoutes);
app.use('/api/admin' , adminRoutes);
app.use('/api/class' , classRoutes);
app.use('/api/assignment' , assignmentRoutes);
app.use('/api/mcqTest' , mcqRoutes);
app.use('/api/chat' , chatRoutes);
app.use('/api/quiz' , aiQuizRoutes);
app.use('/api/saveQuiz' , quizRoutes);
app.use('/api/goal' , goalRoutes);
app.use('/api/study' , StudyHub);
app.use('/api/subject' , subjectRoutes);
app.use('/api/notes' , aiNotesMker);
app.use('/api/attendence' , attendaceRoutes);
app.use('/api/student-enrollment' , studentEnrollmentRoutes);



app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
});

