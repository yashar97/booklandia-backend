import nodemailer from 'nodemailer'


export const enviarEmailRegistro = async usuario => {

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
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

export const enviarEmailInstrucciones = async usuario => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: 'Booklandia', // Dirección del remitente
        to: usuario.email, // Lista de destinatarios
        subject: 'Restablecer Contraseña - Booklandia', // Línea de Asunto
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <h1 style="color: #333;">Restablecer Contraseña - Booklandia</h1>
                <p>Hola ${usuario.nombre},</p>
                <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en Booklandia. Para proceder con el restablecimiento, por favor sigue las siguientes instrucciones:</p>
                <ol>
                    <li>Ingresa al siguiente enlace para restablecer tu contraseña: <a href="https://www.booklandia.com/restablecer-contrasena/${usuario.token}">Restablecer Contraseña</a></li>
                    <li>Sigue las instrucciones en la página para crear una nueva contraseña segura.</li>
                </ol>
                <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este mensaje.</p>
                <p>Para cualquier duda o ayuda, no dudes en contactar a nuestro equipo de soporte.</p>
                <p>Saludos,<br>El equipo de Booklandia</p>
            </div>
        `
    });

}