const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const signupRoutes = require('./routes/signupRouters');
const signup = require('./models/signup');
const os = require('os');

// Retrieve your local machine's IP address
const networkInterfaces = os.networkInterfaces();
const localIP = networkInterfaces['en0'] ? networkInterfaces['en0'][1].address : '127.0.0.1';

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
app.use('/api', signupRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server started on http://${localIP}:${PORT}`);
});
