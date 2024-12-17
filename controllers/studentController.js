import Student from "../models/StudentModel.js";

export const createStudent = async (req, res) => {
  try {
    const { name, email, dateOfBirth, instituteId } = req.body;
    req.body.password = dateOfBirth;

    // Check for required fields
    if (!name || !email || !instituteId) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const newStudent = new Student(req.body);

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("instituteId classId");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single student by ID
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate('classId');

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student by ID
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(id, updates, {
      new: true,
    }).populate("instituteId classId quizAttended");

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const UpdatePoints = async (req, res) => {
  try {
    const { id } = req.params;
    const points = req.body;
    const Student = await Student.findById(id);
    if (!Student) {
      return res.status(404).json({ message: "Student not found." });
    }
    Student.points = points;
    await Student.save();
    res.status(200).json(Student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a student by ID
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Find the student by email
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Validate the password
    if (password !== student.password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // // Generate JWT token
    // const token = jwt.sign({ id: student._id, email: student.email }, JWT_SECRET, {
    //   expiresIn: JWT_EXPIRES_IN,
    // });

    res.status(200).json({ message: "Login successful.", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
