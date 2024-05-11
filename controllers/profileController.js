const User = require("../models/User");

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename
    }
});

const upload = multer({ storage: storage });

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  // Validation
  // Update profile
  try {
    let user = await User.findById(req.user.id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user fields
    user.profile = {
      ...user.profile,
      ...req.body,
    };

    // Save user to database
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};



exports.updateProfileDetails = async (req, res) => {
  try {
    const { name, bio, phone, email, password } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ msg: "Name and email are required" });
    }
    // Example: Check if email is valid
    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: "Invalid email address" });
    }
    
    // Logic to update user details in the database
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    user.name = name;
    user.bio = bio;
    user.phone = phone;
    user.email = email;

    // Check if password is provided and update if necessary
    if (password) {
      // Logic to update password (e.g., hash new password)
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({ msg: "Profile details updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const { uploadFilesToBlobStorage } = require('../utils/blob');


// Upload photo or provide image URL
exports.uploadPhoto = [ upload.single('photo'), async (req, res) => {
  try {
    // Logic to handle photo upload or image URL update
    //uploading a photo and getting the URL requires an AWS or Azure account
    //so I am going to just extract the file and leave the uploading part

    const files = req.files;

    if(!files){
      return res.status(400).json({msg: "Files not found"});
    }

    const photoUrls = await uploadFilesToBlobStorage(files, process.env.AZURE_STORAGE_CONTAINER_NAME);


    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Assuming photoUrls is an array of URLs (can be just one URL if single file upload)
    user.photoUrl = photoUrls[0]; // Assuming single file upload, adjust accordingly if multiple files
    
    await user.save();



    res.json({ msg: "Photo uploaded successfully", photoUrl: user.photoUrl });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}];


// Set profile visibility (public or private)
exports.setProfileVisibility = async (req, res) => {
  try {
    const { isPublic } = req.body;

    // Logic to update user's profile visibility in the database
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    user.profile.isPublic = isPublic;

    await user.save();

    res.json({ msg: "Profile visibility updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};



// Get user profile details (for admin)
exports.getProfileDetailsForAdmin = async (req, res) => {
  try {
    // Logic to fetch user profile details for admin
    // Ensure proper authorization checks for admin role

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    console.log("Role:",user.role);


    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Unauthorized access" });
    }
    
    const users = await User.find().select("-password");
    
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};




// Get public user profiles
exports.getPublicProfiles = async (req, res) => {
  try {
    // Fetch public user profiles from the database
    const publicProfiles = await User.find({ "profile.isPublic": true }).select("-password");

    res.json(publicProfiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get user profile details (for normal user)
exports.getProfileDetailsForNormalUser = async (req, res) => {
  try {
    // Logic to fetch user profile details
    // Ensure proper authorization checks for normal user

    res.json({ msg: "Profile details retrieved successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

