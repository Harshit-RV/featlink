import express, { Application, NextFunction, Request, Response, } from 'express';
import mongoose from 'mongoose';
// import homeRoutes from './routes/home.route';
// import monitorRoutes from './routes/monitor.route';
// import timerRoutes from './routes/timer.route';
// import clockRoutes from './routes/clock.route';
import featureRoutes from './routes/feature.route';
import config from './config';
import "dotenv/config"; // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
import cors from 'cors'; 

const app: Application = express();

// Middleware
app.use(express.json());

app.use(cors());

// Connect to MongoDB
mongoose.connect(config.mongoURI);

app.use('/features', featureRoutes);

// Routes
// app.use('/', homeRoutes);
// app.use('/monitor', monitorRoutes);
// app.use('/timer', timerRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(401).send('Unauthenticated!');
});

// Start the server
app.listen(8080, () => {
  console.log(`Server running on port 8080`);
});