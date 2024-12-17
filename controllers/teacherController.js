import Teacher from "../models/teacherModel.js";

export const createTeacher = async (req, res) => {
  try {
    const { name, email, dateOfBirth, instituteId } = req.body;
      req.body.password = dateOfBirth;
  
    if (!name || !email  || !instituteId) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const newTeacher = new Teacher(req.body);

    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("instituteId AssignedClasses");
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id).populate("instituteId AssignedClasses");

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a teacher by ID
export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, updates, { new: true }).populate(
      "instituteId AssignedClasses"
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a teacher by ID
export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    res.status(200).json({ message: "Teacher deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find the student by email
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(404).json({ message: "teacher not found." });
    }

    // Validate the password
    if (password !== teacher.password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // // Generate JWT token
    // const token = jwt.sign({ id: student._id, email: student.email }, JWT_SECRET, {
    //   expiresIn: JWT_EXPIRES_IN,
    // });

    res.status(200).json({ message: "Login successful.", teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};