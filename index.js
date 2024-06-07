import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import conectarDB from './database/db.js'
import usuarioRouter from './routes/usuarioRoutes.js'
import librosRouter from './routes/librosRoutes.js'


const app = express();
dotenv.config();
conectarDB();

const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}


app.use(express.json());
app.use(cors(corsOptions));


app.use('/api/usuarios', usuarioRouter);
app.use('/api/libros', librosRouter);


const port = process.env.PORT;
app.listen(port, () => console.log('servidor listo'));