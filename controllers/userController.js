import Usuario from '../models/Usuario.js';
import uuid4 from 'uuid4';
import { hashearPassword, checkPassword } from '../utils/bcrypt.js'
import { generarJWT } from '../utils/JWT.js';
import { enviarEmailRegistro } from '../utils/enviarEmails.js'


export const registro = async (req, res) => {

    try {

        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        if (existeUsuario) {
            return res.status(409).json({ msg: 'El email ya está registrado' });
        }

        const usuario = new Usuario(req.body);

        usuario.token = uuid4();
        usuario.password = hashearPassword(usuario.password);

        await Usuario.create(usuario);

        enviarEmailRegistro(usuario);

        return res.json({ msg: 'Registro exitoso' });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ msg: 'Error en el servidor' });
    }

}

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const existeUsuario = await Usuario.findOne({ email });
        if (!existeUsuario) {
            return res.status(404).json({ msg: 'El email no está registrado' });
        }

        if (!checkPassword(password, existeUsuario.password)) {
            return res.status(403).json({ msg: 'Credenciales incorrectas' });
        }

        const usuarioAutenticado = {
            nombre: existeUsuario.nombre,
            apellido: existeUsuario.apellido,
            email: existeUsuario.email,
            confirmado: existeUsuario.confirmado,
            token: generarJWT(existeUsuario._id)
        }

        return res.json(usuarioAutenticado);

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
}

export const confirmar = async (req, res) => {
    const { token } = req.params;

    try {

        const usuarioConfirmar = await Usuario.findOne({ token });

        if (!usuarioConfirmar) {
            return res.status(404).json({ msg: "No se pudo confirmar su cuenta" });
        }

        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = null;
        await usuarioConfirmar.save();

        return res.json({ msg: "Cuenta confirmada correctamente" });

    } catch (error) {
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
}

export const cambiarPassword = async (req, res) => {
    const { email } = req.body;

    try {

        const existeUsuario = await Usuario.findOne({ email });
        if (!existeUsuario) {
            return res.status(404).json({ msg: 'El email ingresado no está registrado' });
        }

        // enviar correo con instrucciones para recuperar la contraseña
        return res.json({ msg: 'Se enviaron instrucciones al email' });

    } catch (error) {
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
}

export const actualizarPassword = async (req, res) => {
    const { email, password } = req.body;

    try {
        // por ahora asumimos que siempre va a existir el email
        const existeUsuario = await Usuario.findOne({ email });
        if (!existeUsuario) {
            return res.status(404).json({ msg: 'El email ingresado no está registrado' });
        }

        existeUsuario.password = hashearPassword(password);
        existeUsuario.save();

        return res.json({ msg: 'Contraseña actualizada correctamente' });



    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error en el servidor' });
    }
}

export const perfil = async (req, res) => {
    return res.json(req.usuario);
}
