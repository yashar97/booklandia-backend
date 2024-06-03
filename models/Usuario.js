import { Schema, model } from 'mongoose'

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    confirmado: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: null
    }
});

export default model('Usuario', usuarioSchema);