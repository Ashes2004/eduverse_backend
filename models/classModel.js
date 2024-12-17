import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    classId: { type: String, required: true },
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    subjects:[{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    teachers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }
    ],
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", ClassSchema);
export default Class;
