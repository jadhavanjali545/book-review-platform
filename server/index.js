const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
//const path = require('path');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
//const staticFilesPath = path.resolve(__dirname, 'public'); // Use path.resolve for absolute certainty
//console.log('Backend attempting to serve from ABSOLUTE PATH:', staticFilesPath);
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware
});
//app.use('/images',express.static(staticFilesPath));

app.get('/', (req, res) => {
  res.send('Book Review API running');
});
app.get('/test', (req, res) => {
  console.log('Received /test request');
  res.json([{ id: 1, title: 'Test Book', author: 'Test Author' }]);
});

// Import route files
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');

// Import your Book model
const Book = require('./models/Book'); // <-- adjust this path if your model is elsewhere
const User = require('./models/User');




// Use routes
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);



async function seedBooks() {
  try {
    const count = await Book.countDocuments();
    if (count === 0) {
      console.log('--- Attempting to delete existing books for re-seeding... ---');
      await Book.deleteMany({}); // <--- KEEP THIS LINE
      console.log('--- Existing books deleted. Proceeding to insert new seeds... ---');

      await Book.insertMany([
        { title: "My First Book", author: "Anjali", description: "Sample book description", genre: "Fiction", rating: 4, image: "/logo001.png" },
        { title: "Adventures in Coding", author: "John Doe", description: "Learn programming with fun!", genre: "Education", rating: 5, image: "/logo002.png" },
        { title: "Nature's Secrets", author: "Jane Smith", description: "Discover the beauty of nature", genre: "Non-Fiction", rating: 3 , image: "/logo003.png"},
        { title: "Mystery of the Lost City", author: "Alex Roe", description: "A thrilling mystery awaits", genre: "Thriller", rating: 4 , image: "/logo004.png"},
        { title: "Cooking Made Easy", author: "Chef Sanjeev", description: "Delicious recipes for beginners", genre: "Cooking", rating: 5 , image: "/logo005.png"},
        { title: "Space Explorers", author: "Elon Space", description: "Journey through the stars", genre: "Sci-Fi", rating: 4 , image: "/logo006.png"},
      ]);
      console.log('Books seeded successfully!');
    }else{
      console.log('--- Books already exist. Skipping seeding. ---');
        }
  } catch (err) {
    console.error('Error seeding books:', err);
  }
}


async function seedUsers() {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      await User.insertMany([
        { name: "Anjali", email: "anjali@example.com" },
        { name: "John", email: "john@example.com" },
      ]);
      console.log('Users seeded!');
    }
  } catch (err) {
    console.error('Error seeding users:', err);
  }
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    seedBooks(); // Seed after DB connection is established
    seedUsers();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
