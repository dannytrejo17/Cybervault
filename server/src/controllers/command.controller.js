// server/src/controllers/command.controller.js
const commandService = require("../services/command.service");

// ===============================
// Obtener comandos por category
// ===============================
const getCommands = (request, response, next) => {
  try {
     
    // valida que venga la categoria como query y que sea valida, si no se lanza un error
    const category = request.query.category;
    if (!category) throw new Error("campo category es requerido");

    const comandos = commandService.getCommands(category);
    response.json(comandos);
  } catch (err) {
    next(err); // Deja que el middleware de errores maneje la respuesta
  }
};

// ===============================
// Crear comandos de usuario 
// ===============================
const createCommand = (request, response, next) => {
  try {
    const { cmd, desc, category } = request.body;
    
    // Validación básica de campos
    if (!cmd || !desc || !category) {
      throw  new Error("campos imcompletos");
    }

    const nuevo = commandService.createCommand({ cmd, desc }, category);
    response.status(201).json(nuevo);
  } catch (err) {
    next(err); // Deja que el middleware de errores maneje la respuesta
  }
};

const updateCommand = (request, response, next) => {
  try {
        const id = parseInt(request.params.id); // obtenemos el id del comando a actualizar y lo convertimos a entero
        const { cmd, desc } = request.body; // obtenemos los nuevos valores del comando y la descripción
        if (!cmd || !desc) throw new Error("campos imcompletos");
        const actualizado = commandService.updateCommand(id, cmd, desc);
        response.json(actualizado);


      }catch (err) {
        next(err);
      }
  };

// ===============================
// Eliminar comando (solo usuario)
// ===============================
const deleteCommand = (request, response, next) => {
  try {
    // convierte el parametro a id entero
    const id = parseInt(request.params.id);
    if( isNaN(id)) throw new Error("id invalido");
    commandService.deleteCommand(id);
    response.status(204).send();
  } catch (err) {
    next(err); // Deja que el middleware de errores maneje la respuesta
  }
};

module.exports = { getCommands, createCommand, deleteCommand, updateCommand };