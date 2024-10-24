const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Initialize the PostgreSQL client
const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (rows.length === 0) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    const token = jwt.sign(payload, "mySecretToken", { expiresIn: '1h' });

    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
