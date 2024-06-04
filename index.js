import express from 'express'
import dotenv from 'dotenv'

import conectarDB from './database/db.js'
import usuarioRouter from './routes/usuarioRoutes.js'

const app = express();
dotenv.config();
conectarDB();

app.use(express.json());

app.use('/api/usuarios', usuarioRouter);



const port = process.env.PORT;
app.listen(port, () => console.log('servidor listo'));