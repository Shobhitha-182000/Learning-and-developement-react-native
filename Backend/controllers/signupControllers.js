const Signup = require('../models/signup');

exports.createSignup = async (req, res) => {
  try {
    
    const sp = await Signup.create(req.body);
    console.log(sp);
    res.status(201).json(sp);
  } catch (err) {
    console.error('Error creating signup:', err);
    res.status(400).json({ message: 'Error creating signup', error: err });
  }
};

exports.getAllSignups = async (req, res) => {
 
  try {
    const dat = await Signup.find();
   
    res.json(dat);
  } catch (error) {
    console.error('Error fetching signups:', error);
    res.status(400).json({ message: 'Error fetching signups', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email, password });

    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error during login', error: err.message });
  }
};
