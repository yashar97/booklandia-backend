import Libro from '../models/Libro.js'

export const agregarLibro = async (req, res) => {

    try {

        await Libro.create(req.body);

        return res.json({ msg: 'Libro agregado correctamente' });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ msg: 'Ocurrió un error en el servidor' });
    }

}

export const obtenerLibros = async (req, res) => {

    let libros;
    const { genero } = req.query;

    try {

        if (!genero) {
            libros = await Libro.find();
        } else {
            libros = await Libro.find({ genero });
        }

        return res.json(libros);


    } catch (error) {
        return res.status(500).json({ msg: 'Ocurrió un error en el servidor' });
    }
}

export const obtenerLibroId = async (req, res) => {
    const { id } = req.params;
    try {

        const libro = await Libro.findById(id);

        return res.json(libro);

    } catch (error) {
        return res.status(500).json({ msg: 'Ocurrió un error en el servidor' });
    }
}
