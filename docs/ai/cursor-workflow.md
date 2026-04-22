Atajos de teclado

Ctrl + l → abrir chat

Tab → aceptar sugerencia de autocompletado

Ctrl + D → seleccionar palabra o bloque




Mejoras de código sugeridas por Cursor
1. Diferenciar comandos del usuario

Cursor sugirió añadir una propiedad isUser a los comandos para diferenciar los comandos predefinidos de los que añade el usuario.
Antes el código utilizaba includes() para comprobar si un comando pertenecía al usuario. Este método dependía de que el objeto fuera exactamente el mismo en memoria, lo que podía generar errores si se creaban objetos con el mismo contenido pero en diferentes momentos.
Con la propiedad isUser, el código ahora puede comprobar directamente:

if (item.isUser)

Esto hace que la lógica sea más clara, más fácil de entender y menos propensa a errores.




2. Mejora al usar localStorage

Cursor sugirió utilizar una clave más específica para guardar los comandos en localStorage:

cybervault:${window.location.pathname}

Esto evita posibles conflictos con otros datos almacenados en localStorage dentro del navegador.
Además, recomendó usar un bloque try...catch al leer los datos con JSON.parse. De esta forma, si los datos guardados en localStorage no son válidos o están corruptos, el programa no se rompe y simplemente utiliza un array vacío.





1. Refactorización de funciones

Se refactorizaron algunas partes del código para separar responsabilidades y mejorar la organización.

Por ejemplo, se creó la función:

function createUserCommand(cmd, desc) {
  return { cmd, desc, isUser: true };
}

Antes el objeto del comando se creaba directamente dentro del evento del formulario. Ahora esta función se encarga de crear los comandos del usuario, lo que hace que el código sea más reutilizable y fácil de entender.

2. Mejora de nombres de variables

Se revisaron algunos nombres de variables para hacerlos más claros y descriptivos. El objetivo fue que cualquier persona que lea el código pueda entender fácilmente qué representa cada variable.

Antes:

listEl
formEl
inputEl
descEl

Después:

commandListElement
commandFormElement
commandInputField
commandDescriptionField

Con estos nuevos nombres es más fácil entender que se trata de elementos del DOM relacionados con la lista de comandos y el formulario para añadir comandos.

3. Diferenciación entre comandos predefinidos y comandos del usuario

Se añadió una propiedad llamada isUser a los comandos para poder distinguir entre los comandos predefinidos del sistema y los comandos añadidos por el usuario.

Ejemplo:

{ cmd: "...", desc: "...", isUser: true }

Esto permite comprobar fácilmente si un comando pertenece al usuario:

if (item.isUser)

Antes se utilizaba includes() para comprobar si un comando estaba en la lista de comandos del usuario, lo que podía generar errores si los objetos no eran exactamente iguales en memoria.

4. Mejora en el uso de localStorage

Se mejoró la clave utilizada para guardar los comandos en localStorage.

Ahora se utiliza:

const pageKey = `cybervault:${window.location.pathname}`;

Esto permite que cada página tenga su propio almacenamiento de comandos y evita conflictos con otros datos que puedan existir en localStorage.

5. Manejo seguro de datos con try...catch

Para evitar errores al leer datos de localStorage, se añadió un bloque try...catch.

try {
  userCommands = JSON.parse(localStorage.getItem(pageKey)) || [];
} catch {
  userCommands = [];
}

De esta forma, si los datos almacenados están corruptos o tienen un formato incorrecto, el programa no se rompe y simplemente utiliza una lista vacía.

6. Simplificación de la lógica de eliminación

Se mejoró la lógica que se encarga de eliminar comandos.

Ahora primero se comprueba si el comando eliminado pertenece al usuario:

if (removed[0].isUser)

Solo en ese caso se elimina también de localStorage. Esto evita que los comandos predefinidos puedan eliminarse por error.

7. Validaciones en el formulario

Se añadió una validación para evitar que se añadan comandos vacíos.

if (!cmd) return;

Esto asegura que el usuario solo pueda añadir comandos que contengan texto.

8. Uso de comentarios JSDoc

Se añadieron comentarios para explicar mejor algunas funciones del código y facilitar su comprensión.

Ejemplo:

/**
 * Crea un objeto de comando añadido por el usuario
 * @param {string} cmd comando que se quiere guardar
 * @param {string} desc descripción del comando
 * @returns {object} objeto comando con propiedad isUser
 */

Esto ayuda a que otros desarrolladores entiendan mejor el propósito de cada función.

9. Revisión manual del código generado por IA

Todas las sugerencias realizadas por Cursor fueron revisadas manualmente antes de aplicarlas al proyecto. Esto permitió comprobar que los cambios mejoraban el código sin afectar al funcionamiento de la aplicación.

10. Commits claros en el repositorio

Durante el proceso de mejora se realizaron commits con mensajes claros para registrar los cambios realizados.

Ejemplos de commits utilizados:

refactor: create function to generate user commands
refactor: improve variable names for DOM elements
feat: add isUser property to differentiate commands
fix: improve localStorage key to avoid conflicts
refactor: simplify command deletion logic

Esto permite mantener un historial claro de las mejoras aplicadas al proyecto.


















1. Qué es MCP (Model Context Protocol)

Protocolo que permite a modelos de IA (como los de Cursor) acceder a datos externos en tiempo real: filesystem, repositorios GitHub, APIs, etc. Permite que la IA lea archivos, resuma código, consulte documentación o commits, sin depender solo de su memoria interna.



2. Configuración MCP en Cursor

Archivo .cursor/mcp.json:

{
  "mcpServers": {
    "Filesystem": {
      "command": "npx",
      "args": ["-y", "mcp-filesystem-server", "--root", "./"],
      "type": "stdio"
    }
  }
}


Esto activa el servidor MCP automáticamente usando npx, sin instalar nada más.

También se podría hacer desde la interfaz de Cursor:
Settings → Features → MCP → + Add New MCP Server con los mismos datos.



3. Comprobar que funciona

Ejemplo de prueba en Cursor:

Accede a la carpeta raíz del proyecto y dime qué archivos hay.

Resultado: la IA lista todos los archivos reales del proyecto (.html, .js, .css, docs/, package.json, etc.).




4. Cinco consultas distintas usando MCP

Listar todos los archivos .js.

Listar todos los archivos .css con su carpeta.

Mostrar los archivos .md dentro de docs/ai/.

Buscar la función bruteAttack en todos los .js.

Resumen de la estructura del proyecto indicando cantidad de archivos por tipo (HTML, JS, CSS, MD).





5. Documentación paso a paso (compacta)

Crear .cursor/mcp.json con la configuración del servidor.

Abrir Cursor → activar MCP (si se desea desde interfaz).

Probar consultas reales; si la IA devuelve archivos reales, MCP funciona correctamente.





6. Casos de uso en proyectos reales

Analizar código y documentación automáticamente.

Revisar commits, issues y pull requests en repositorios.

Automatizar tareas: resúmenes, refactorizaciones, tests.

Consultar múltiples fuentes sin copiar/pegar archivos.

Facilitar colaboración, dando contexto real a la IA.