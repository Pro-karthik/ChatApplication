const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const initializeSocket = require('./server/socket'); // Import the socket file

dotenv.config();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;

const initializeDbAndServer = () => {
  try {
    connectDB();
    server.listen(PORT, () => {  // Use `server.listen` instead of `app.listen`
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

initializeDbAndServer();
