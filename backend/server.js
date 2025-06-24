const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  password: String,
});

const productSchema = new mongoose.Schema({
  category: String,
  name: String,
  price: Number,
});

const orderSchema = new mongoose.Schema({
  token: String,
  totalAmount: Number,
  paymentMethod: String,
  upiApp: String,
  upiId: String,
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

app.post('/signup', async (req, res) => {
  const { id, name, email, password } = req.body;
  const newUser = new User({ id, name, email, password });
  await newUser.save();
  res.send('User registered successfully');
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    res.send('Sign in successful');
  } else {
    res.send('Invalid credentials');
  }
});

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/order', async (req, res) => {
  const { token, totalAmount, paymentMethod, upiApp, upiId } = req.body;
  const newOrder = new Order({ token, totalAmount, paymentMethod, upiApp, upiId });
  await newOrder.save();
  res.send('Order placed successfully');
});

// Additional route for fetching orders (assuming a userId would be passed)
app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
