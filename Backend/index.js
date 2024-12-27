
import app from './app.js';
import connectDB from './db/index.js';  // Your DB connection
import dotenv from 'dotenv';

dotenv.config();  

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start the server 
// const server = http.createServer(app); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); 
});
