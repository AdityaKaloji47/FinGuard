import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/project', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log('MongoDB connection error:', err));

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create the 'uploads' directory if it doesn't exist
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads/'); // Save files to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Define schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  profilePhoto: { type: String },
  savings: { type: Number, default: 0 }, // Add savings field to track user's savings
  createdAt: { type: Date, default: Date.now }
});

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  source: { type: String, required: true },
  note: { type: String },
  type: { type: String, enum: ['income', 'expense', 'saving'], required: true }, // Added 'saving' type
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const goalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  category: { type: String, required: true },
  dueDate: { type: Date, required: true },
  note: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Define models
const User = mongoose.model('User', userSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
const Goal = mongoose.model('Goal', goalSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Routes

// Contact form submission route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create new contact message
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    // Save contact message
    await contact.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact form submission error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, dob, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      dob
    });
    
    // Save user
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Return user data (excluding password)
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      dob: user.dob,
      profilePhoto: user.profilePhoto,
    };
    
    res.json({ 
      message: 'Login successful',
      user: userData
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// User routes
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, dob, profilePhoto } = req.body;
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, dob, profilePhoto },
      { new: true }
    ).select('-password');
    
    res.json(updatedUser);
  } catch (err) {
    console.error('User update error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Profile photo upload route
app.post('/api/upload-profile-photo', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Construct the file URL
    const fileUrl = `http://localhost:${PORT}/uploads/${file.filename}`;

    // For demo purposes, assume the user ID is passed in the request body
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Save the file URL to the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePhoto: fileUrl },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ url: fileUrl, user: updatedUser });
  } catch (err) {
    console.error('Error uploading profile photo:', err);
    res.status(500).json({ message: 'Failed to upload profile photo' });
  }
});

// Transaction routes
app.get('/api/transactions', async (req, res) => {
  try {
    const { userId, type } = req.query;
    
    // Find transactions
    const query = { userId };
    if (type) {
      query.type = type;
    }
    const transactions = await Transaction.find(query).sort({ date: -1 });
    
    res.json(transactions);
  } catch (err) {
    console.error('Transactions fetch error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    const { amount, source, note, type, userId } = req.body;
    
    // Validate input
    if (!amount || !source || !type || !userId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create transaction
    const transaction = new Transaction({
      amount,
      source,
      note,
      type,
      userId
    });

    // Update user's savings if the transaction is a saving or withdrawal
    if (type === 'saving') {
      user.savings += amount; 
    }

    // Save transaction and update user
    await transaction.save();
    await user.save();
    
    res.status(201).json({ message: 'Transaction added successfully' });
  } catch (err) {
    console.error('Transaction add error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Goal routes
app.get('/api/goals', async (req, res) => {
  try {
    const { userId } = req.query;
    
    // Find goals
    const goals = await Goal.find({ userId }).sort({ dueDate: 1 });
    
    res.json(goals);
  } catch (err) {
    console.error('Goals fetch error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/goals', async (req, res) => {
  try {
    const { name, amount, currentAmount, category, dueDate, note, userId } = req.body;
    
    // Create goal
    const goal = new Goal({
      name,
      amount,
      currentAmount,
      category,
      dueDate,
      note,
      userId
    });
    
    // Save goal
    await goal.save();
    
    res.status(201).json({ message: 'Goal added successfully' });
  } catch (err) {
    console.error('Goal add error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this route after your other goal routes
router.post('/api/goals/:id/withdraw', async (req, res) => {
  try {
    console.log('Withdrawal request received:', {
      params: req.params,
      body: req.body,
      headers: req.headers
    });

    const { id } = req.params;
    const { amount, source, note, userId } = req.body;

    // Convert amount to number if it comes as string
    const withdrawalAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    // Enhanced validation with specific errors
    const errors = {};
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      errors.goalId = 'Invalid goal ID format';
    }

    if (typeof withdrawalAmount !== 'number' || isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      errors.amount = 'Amount must be a positive number';
    }

    if (typeof source !== 'string' || source.trim().length === 0) {
      errors.source = 'Source is required';
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      errors.userId = 'Invalid user ID format';
    }

    if (Object.keys(errors).length > 0) {
      console.log('Validation errors:', errors);
      return res.status(400).json({ 
        message: 'Validation failed',
        errors,
        receivedData: {
          amount: withdrawalAmount,
          source,
          userId
        }
      });
    }

    // Find the goal with proper error handling
    const goal = await Goal.findById(id).lean();
    if (!goal) {
      return res.status(404).json({ 
        message: 'Goal not found',
        goalId: id
      });
    }

    // Check ownership
    if (goal.userId.toString() !== userId) {
      return res.status(403).json({ 
        message: 'Unauthorized access to this goal',
        goalOwner: goal.userId,
        requestingUser: userId
      });
    }

    // Check sufficient funds with tolerance for floating point
    const available = parseFloat(goal.currentAmount.toFixed(2));
    const requested = parseFloat(withdrawalAmount.toFixed(2));
    
    if (available < requested) {
      return res.status(400).json({ 
        message: 'Insufficient funds in goal',
        available,
        requested,
        difference: parseFloat((requested - available).toFixed(2))
      });
    }

    // Create transaction record
    const transaction = new Transaction({
      amount: -requested,
      source: `Withdrawal from ${goal.name}: ${source}`,
      note: note || undefined,
      type: 'expense',
      userId,
      date: new Date()
    });

    // Update goal balance with precise decimal handling
    const newBalance = parseFloat((available - requested).toFixed(2));

    // Save changes in transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      await Goal.findByIdAndUpdate(
        id,
        { $set: { currentAmount: newBalance } },
        { session }
      );
      
      await transaction.save({ session });
      
      await session.commitTransaction();
      
      res.status(200).json({
        message: 'Withdrawal successful',
        newBalance,
        transactionId: transaction._id,
        details: {
          goalName: goal.name,
          previousBalance: available
        }
      });
    } catch (transactionError) {
      await session.abortTransaction();
      throw transactionError;
    } finally {
      session.endSession();
    }

  } catch (err) {
    console.error('Withdrawal processing error:', {
      error: err.message,
      stack: err.stack,
      timestamp: new Date().toISOString()
    });
    
    res.status(500).json({ 
      message: 'Internal server error',
      errorDetails: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Add this route for general withdrawals
app.post('/api/transactions/withdraw', async (req, res) => {
  try {
    const { amount, source, note, userId } = req.body;

    // Validate input
    if (!amount || !source || !userId) {
      return res.status(400).json({ message: 'Amount, source, and userId are required' });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user has sufficient savings
    if (user.savings < amount) {
      return res.status(400).json({ 
        message: `Insufficient savings. Available: ₹${user.savings}` 
      });
    }

    // Create withdrawal transaction
    const transaction = new Transaction({
      amount: -Math.abs(amount),
      source,
      note,
      type: 'expense',
      userId
    });

    // Update user savings
    user.savings -= amount;

    // Save changes
    await Promise.all([transaction.save(), user.save()]);

    res.status(201).json({ message: 'Withdrawal successful' });
  } catch (err) {
    console.error('Withdrawal error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});
// Password change route
app.post('/api/auth/change-password', async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    // Validate input
    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Password change error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/goals/:id/contribute', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    
    // Update goal
    const goal = await Goal.findById(id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    
    goal.currentAmount += amount;
    await goal.save();
    
    res.json({ message: 'Contribution added successfully' });
  } catch (err) {
    console.error('Goal contribution error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});
app.put('/api/goals/:id', async (req, res) => {
  try {
    const { name, amount, category, dueDate, note } = req.body;
    
    if (!name || !amount || !category || !dueDate) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      {
        name,
        amount,
        category,
        dueDate: parsedDueDate,
        note: note || undefined
      },
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    
    res.json({ 
      message: 'Goal updated successfully',
      goal: updatedGoal
    });
  } catch (err) {
    console.error('Goal update error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Goal deletion route
app.delete('/api/goals/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the goal
    const deletedGoal = await Goal.findByIdAndDelete(id);
    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json({ message: 'Goal deleted successfully' });
  } catch (err) {
    console.error('Goal deletion error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});