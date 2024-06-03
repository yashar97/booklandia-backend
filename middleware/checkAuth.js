import Usuario from "../models/Usuario.js"
import { verificarJWT } from "../utils/JWT.js";

export const checkAuth = async (req, res, next) => {

    if (req.headers.authorization) {

        try {

            const token = req.headers.authorization.split(' ')[1];

            const { id } = verificarJWT(token);

            const usuario = await Usuario.findById(id).select('-password -__v -token');

            req.usuario = usuario;

            return next();

        } catch (error) {
            return res.status(403).json({ msg: 'No autenticado' });
        }
    } else {
        return res.status(401).json({ msg: 'No autenticado' });
    }

}