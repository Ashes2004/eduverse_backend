import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    InstituteName: { type: String, required: true },
    InstituteId: { type: String, required: true, unique: true },
    Address: { type: String, required: true },
    Phone: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
