const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Save spell to DB
app.post('/my_spells', async (req, res) => {
  try {
    const {
      slug,
      name,
      spell_level,
      school,
      duration,
      range,
      casting_time,
      components,
      requires_material_components,
      material,
      can_be_cast_as_ritual,
      requires_concentration,
    } = req.body;
    const newSpell = await pool.query(
      'INSERT INTO my_spells (slug, name, spell_level, school, duration, range, casting_time, components, requires_material_components, material, can_be_cast_as_ritual, requires_concentration) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [
        slug,
        name,
        spell_level,
        school,
        duration,
        range,
        casting_time,
        components,
        requires_material_components,
        material,
        can_be_cast_as_ritual,
        requires_concentration,
      ]
    );

    res.json(newSpell.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all my saved spells
app.get('/my_spells', async (req, res) => {
  try {
    const allSpells = await pool.query('SELECT * FROM my_spells');
    res.json(allSpells.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.delete('/my_spells/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM my_spells WHERE slug = $1', [id]);
    res.json('Spell was removed');
  } catch (error) {}
});

// Delete all saved spells
app.delete('/my_spells', async (req, res) => {
  try {
    await pool.query('DELETE FROM my_spells');
    res.json('All spells were removed');
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
