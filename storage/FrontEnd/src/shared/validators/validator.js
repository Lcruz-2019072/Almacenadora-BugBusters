export const validateNombre = (nombre) => {
    const regex = /^[\w\s]{3,400}$/ // Acepta letras, números y espacios, de 3 a 400 caracteres
    return regex.test(nombre)
}

export const validateDescription = (description) => {
    const regex = /^[\w\s]{3,400}$/ // Acepta letras, números y espacios, de 3 a 400 caracteres
    return regex.test(description)
}

export const validateFechaInicio = (fechaInicio) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/ // Formato YYYY-MM-DD
    return regex.test(fechaInicio)
}

export const validateFechaFin = (fechaFin) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/ // Formato YYYY-MM-DD
    return regex.test(fechaFin)
}

export const validateFechaInicioFin = (fechaInicio, fechaFin) => {
    return fechaInicio <= fechaFin
}

export const validateNombreUsuario = (nombreUsuario) => {
    const regex = /^[\w\s]{3,100}$/; // Acepta letras, números y espacios, de 3 a 100 caracteres
    return regex.test(nombreUsuario);
};

export const validateApellidoUsuario = (apellidoUsuario) => {
    const regex = /^[\w\s]{3,100}$/; // Acepta letras, números y espacios, de 3 a 100 caracteres
    return regex.test(apellidoUsuario);
};

export const validateEstado = (estado) => {
    const regex = /^(Finalizado|En proceso|Sin comenzar)$/; // Acepta solo "Finalizado", "En proceso" o "Sin comenzar"
    return regex.test(estado);
};

export const nombreUsuarioValidationMessage = 'El nombre del usuario debe ser de entre 3 y 100 caracteres, con espacios permitidos.';
export const apellidoUsuarioValidationMessage = 'El apellido del usuario debe ser de entre 3 y 100 caracteres, con espacios permitidos.';
export const nombreValidationMessage = 'El nombre de la tarea debe ser de entre 3 y 200 caracteres, con espacios permitidos.'
export const descriptionValidationMessage = 'La descripción debe ser de entre 3 y 400 caracteres, con espacios permitidos.'
export const fechaInicioValidationMessage = 'Verifica que sea una fecha correcta en formato YYYY-MM-DD.'
export const fechaFinValidationMessage = 'Verifica que sea una fecha correcta en formato YYYY-MM-DD.'
export const estadoValidationMessage = 'Por favor, selecciona un estado válido.'; 
