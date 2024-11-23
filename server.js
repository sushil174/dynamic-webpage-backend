const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const pageRoutes = require('./routes/pageRoutes')
const cloudinary = require('cloudinary').v2
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()
app.use(cors())
app.use(bodyParser.json())


mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.err('MongoDB connection error', err))

app.use('/api/pages', pageRoutes)

app.get('/api/cloudinary-signature', (req, res) => {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = cloudinary.utils.api_sign_request(
        { timestamp },
        process.env.CLOUDINARY_API_SECRET
      );
      res.json({ signature, timestamp });
    } catch (error) {
      console.error('Error generating signature:', error);
      res.status(500).json({ message: 'Error generating Cloudinary signature' });
    }
  });



const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running on port ${PORT}`))