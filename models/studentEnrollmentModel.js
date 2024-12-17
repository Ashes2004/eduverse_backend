import mongoose from "mongoose";

const StudentEnrollmentSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
    InstituteId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }

  },
  { timestamps: true }
);

const StudentEnrollment = mongoose.model("StudentEnrollment", StudentEnrollmentSchema);
export default StudentEnrollment;
