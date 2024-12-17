import Admin from "../models/adminModel.js"; // Importing the Admin model

// Create a new admin
export const signup = async (req, res) => {
  try {
   

    const newAdmin = new Admin(req.body);

    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', error: error.message });
  }
};




export const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // Check if Email and Password are provided
    if (!Email || !Password) {
      return res.status(400).json({ message: "Email and Password are required." });
    }

    // Find admin by Email
    const admin = await Admin.findOne({ Email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    // Validate the password
    if (Password !== admin.Password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

   

    res.status(200).json({ message: "Login successful.", admin : admin });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error: error.message });
  }
};

// Get admin by ID
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin', error: error.message });
  }
};

// Update admin by ID
export const updateAdminById = async (req, res) => {
  try {
    const { InstituteName, InstituteId, Address, Phone, Email, Password } = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      { InstituteName, InstituteId, Address, Phone, Email, Password },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin updated successfully', updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Error updating admin', error: error.message });
  }
};

// Delete admin by ID
export const deleteAdminById = async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admin', error: error.message });
  }
};
