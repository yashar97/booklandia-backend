import { Schema, model } from 'mongoose'

const libroSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    autor: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    numeroPaginas: {
        type: Number,
        required: true
    },
    formato: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    sinopsis: {
        type: String,
        required: true
    }
});

export default model('libro', libroSchema);