import express from 'express'
import dotenv from 'dotenv'
import connectToMongo from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js'
dotenv.config();

const app = express();
const port = process.env.port;

app.use(express.json());

connectToMongo();

// routes section
app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes)

app.use('/', (req, res) => {
    res.send('wellcome in timelock')
});
app.listen(port, () => {
    console.log(`app is running on http://localhost:${port}`);
})