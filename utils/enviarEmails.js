import nodemailer from 'nodemailer'

export const enviarEmailRegistro = async usuario => {
    var transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const info = await transporter.sendMail({
        from: 'Booklandia', // Dirección del remitente
        to: usuario.email, // Lista de destinatarios
        subject: '¡Bienvenido a Booklandia!', // Línea de Asunto
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <h1 style="color: #333;">¡Bienvenido a Booklandia, ${usuario.nombre}!</h1>
                <p>¡Gracias por registrarte en nuestro sitio web! Estamos encantados de tenerte como parte de nuestra comunidad.</p>
                <p>Con tu cuenta de Booklandia, podrás acceder a una amplia variedad de libros, compartir reseñas, participar en discusiones y mucho más.</p>
                <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
                <p>¡Disfruta explorando y leyendo en Booklandia!</p>
                <p>Saludos,<br>El equipo de Booklandia</p>
            </div>
        `
    });
}