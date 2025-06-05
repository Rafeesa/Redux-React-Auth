import User from "../models/userModel.js";

// Get all users
{/*export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: { $ne: true } }).select("-password"); // avoid sending passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};*/}

// controllers/AdminController.js


export const getAllUsers = async (req, res) => {
  try {
    const search = req.query.search || "";

    // Create a regex-based query for partial match (case-insensitive)
    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } }
      ],
      isAdmin: false, // Optional: exclude admin users
    };

    const users = await User.find(query).select("-password"); // Exclude password field
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


// Delete a user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};
// PUT /api/admin/users/:id
export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
        },
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const searchRegex = new RegExp(search, "i");

    const users = await User.find({
      isAdmin: false,
      $or: [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
        { phone: { $regex: searchRegex } }
      ]
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
