import express from 'express';
import cors from 'cors'
import baseRoutes from './routes/baseRoutes.js'
import userRoutes from './routes/userRoutes.js'
import vendorRoutes from './routes/vendorRoutes.js'
const app = express();

app.use(cors())


app.use(express.json());


app.get('/api/test', (req, res) => {
  res.send('CORS is working!');
});

app.use('/api/base', baseRoutes);
app.use('/api/user',userRoutes)
app.use('/api/vendor',vendorRoutes)
app.get('/', (req, res) => {
  res.send('API is running...'); 
});


export default app;  // Use default export
