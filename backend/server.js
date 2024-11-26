import dotenv from 'dotenv';
import express from 'express';
import connect from './data/database.js';
import indexRoutes from './routes/index.js';
import templesRoutes from './routes/temples.js';

const app = express();

dotenv.config();

// Hide internal technical information
app.disable('x-powered-by');

// Request bodies will be sent as JSON
app.use(express.json());

const port = process.env.PORT || 3001;

app.use('/', indexRoutes);
app.use('/temples', templesRoutes);
// app.use('/docs', docsRoutes);

app.listen(port, async () => {
  await connect(process.env.MONGODB_URI);
  console.log(`Server is running on port ${port}`);
});
