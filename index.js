const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/my_spells', async (req, res) => {
  try {
    const { spellname } = req.body;
    const newSpell = await pool.query(
      'INSERT INTO my_spells (spellname) VALUES($1)',
      [spellname]
    );
    console.log(spellname);
    res.json(newSpell);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
