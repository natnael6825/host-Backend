// server.js
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
import inspectionRoutes from "./routes/inspectorRoute.js"
import categoryRoutes from "./routes/categoryRoute.js"
import areaRoutes from "./routes/areaRoute.js"
import issueReportRoutes from "./routes/reportRoute.js"
import inspectionResponseRoutes from "./routes/inspectionResponseRoute.js"
import bodyParser from 'body-parser';

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());  // Parse JSON bodies


// Routes
app.use('/api/', userRoutes);
app.use('/api/inspect', inspectionRoutes);

app.use('/api', categoryRoutes); // All category-related routes will be prefixed with /api
app.use('/api', areaRoutes);

app.use('/api/issue-reports', issueReportRoutes);
app.use('/api/inspection-responses', inspectionResponseRoutes);


app.get('/', (req, res) => res.send("API is running..."));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


