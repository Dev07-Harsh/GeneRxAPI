const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', err => console.error('MongoDB connection error:', err));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));


const medicineSchema = new mongoose.Schema({
  brand_name: { type: String, required: true },
  generic_alternatives: [String],
  price: Number,
  drug_class: String,
  indication: String
});


medicineSchema.index({ 
  brand_name: 'text', 
  drug_class: 'text', 
  indication: 'text', 
  generic_alternatives: 'text' 
});


const Medicine = mongoose.model('Medicine', medicineSchema, 'medicines');


app.get('/api/medicines', async (req, res) => {
  try {
    const medicines = await Medicine.find({});
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching medicines' });
  }
});


app.get('/api/medicines/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json(await Medicine.find({}));
    
    
    const regex = new RegExp(query, 'i');
    const results = await Medicine.find({
      $or: [
        { brand_name: { $regex: regex } },
        { drug_class: { $regex: regex } },
        { indication: { $regex: regex } },
        { generic_alternatives: { $regex: regex } }
      ]
    });
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error searching medicines' });
  }
});


app.get('/api/medicines/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching medicine details' });
  }
});


app.post('/api/medicines', async (req, res) => {
  try {
    const { brand_name, generic_alternatives, price, drug_class, indication } = req.body;
    if (!brand_name) {
      return res.status(400).json({ error: 'brand_name is required' });
    }
    const newMedicine = new Medicine({
      brand_name,
      generic_alternatives,
      price,
      drug_class,
      indication
    });
    const savedMedicine = await newMedicine.save();
    res.status(201).json(savedMedicine);
  } catch (error) {
    res.status(500).json({ error: 'Error adding new medicine' });
  }
});


module.exports = app;


if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Medicine API server is running on port ${PORT}`);
  });
}


