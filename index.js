import express from 'express'
import dotenv from 'dotenv'

import conectarDB from './config/db.js';

dotenv.config();
const app = express();
conectarDB();

const port = process.env.PORT;

app.listen(port, () => console.log('servidor listo'));