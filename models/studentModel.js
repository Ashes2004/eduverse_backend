import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePhoto: {type: String , required:true},
    parentName: {type: String , required : true},
    parentContact: {type: String , required : true},
    dateOfBirth: {type: Date , required : true},
    points: {type: Number , default: 0},
    pointHistry: [{
          points: {type: Number},
          date: {type: Date}
    }],
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
     
    },
  
    quizAttended: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    ],
    assignments: [
      {
        assignment:  { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
        grade: {type: String}
      }
    ],
    
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
export default Student;
