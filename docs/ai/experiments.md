Problemas pequeños resueltos sin IA

Problema 1: Ordenar números


                  0   1   2    3    4 
int[] numeros = {4,  21,  11,  13,  6} 

for(int i = 0; i < números.length - 1; i++){
   
   for(int j = 0; j < números.length - 1; j++)   
 
    if(numeros[j] < numeros[j + 1]){
        
          int a = numeros[j];
          
          numeros[j] = numeros[ j + 1] ;
          -
          numeros[j + 1] = a;   
    }
}


Método: bucles anidados (for) y comparación de elementos (if) para hacer un bubble sort para ordenar de mayor a menor .

Tiempo invertido: ~10 minutos

Calidad del código: funcional, comprensible.





Problema 2: Contar vocales


  String texto = "Hola Mundo";
        texto = texto.toLowerCase();

        int a = 0;
        int e = 0;
        int i = 0;
        int o = 0;
        int u = 0;

        for(int j = 0; j < texto.length(); j++) {
            char c = texto.charAt(j);
            if(c == 'a') {
                a++;
            } else if(c == 'e') {
                e++;
            } else if(c == 'i') {
                i++;
            } else if(c == 'o') {
                o++;
            } else if(c == 'u') {
                u++;
            }
        }

Método: recorrer el string con un bucle for y charAt para comparar cada carácter con las vocales.

Tiempo invertido: 5 minutos

Calidad del código: sencillo y entendible.








Problema 3: Contar positivos y negativos

 int[] numeros = {4, -3, 0, 7, -1, 2};
        int positivos = 0;
        int negativos = 0;

        for(int i = 0; i < numeros.length; i++) {
            if(numeros[i] > 0) {
                positivos++;
            } else if(numeros[i] < 0) {
                negativos++;
            }
        }

Método: recorrer el array con for y condicionales if/else para contar positivos y negativos.

Tiempo invertido: 5 minutos

Calidad del código: claro y directo.





## Resolviendo los mismos problemas con IA

Utilicé la IA para generar soluciones de manera rápida.
Las soluciones fueron todas correctas.
Tiempo invertido: < 1 minuto por problema.
Calidad del código: muy buena, y entendible.
Comprensión: menos interacción con la lógica interna, pero permite comparar enfoques y mejorar mis propias soluciones.









## Experimentos con IA en programación (tareas del proyecto) 


## 1 Validación de comandos (validateCommand)

Función analizada:

function validateCommand(cmd) {
  if (!cmd || cmd.length < 2) {
    alert("El comando no puede estar vacío");
    return false;
  }
  return true;
}


sin ia: esta funcion toma como parametro el comando y valida que no este vacia ni que tenga menos de 2 caracteres
si cumple una de esas condiciones se mostrar un mensaje de alert
Tiempo invertido: 2 minutos
Comprensión: buena, ya que el código es corto y fácil de leer.



Usando IA

Se pidió a la IA que explicara la función y su lógica.
La IA explicó rápidamente el funcionamiento de la condición y y lo que devuelve si es true o false.
Tiempo invertido: 1 minuto
Resultado: explicación clara y rápida.



## 2 Guardar comandos en LocalStorage (saveUserCommands)

Función analizada:

function saveUserCommands() {
  localStorage.setItem(storageKey, JSON.stringify(userCommands));
}




Sin usar IA

esta funcion guarda los comandos del usuario en el localstorage , antes de guardarlo el json.stringify convierte en texto el array
usercomands , ya que el localstorage solo guarda texto.
Tiempo invertido: 2 minutos
Comprensión: facil de entender ya que el codigo es corto .

con IA: 
Se pidió a la IA que explicara cómo funciona y la respuesta fue clara y concisa.
Tiempo invertido: 1 minuto
Resultado: explicación clara de como funciona.





## 3 Renderizar comandos en la página (renderCommands)

Función analizada:

function renderCommands() {
  commandListElement.innerHTML = "";

  commands.forEach((command, index) => {
    const commandElement = createCommandElement(command, index);
    commandListElement.appendChild(commandElement);
  });
}


Sin usar IA

la función limpia primero la lista y luego recorre todos los comandos usando forEach,
por cada comando se crea un elemento HTML usando createCommandElement y se añade a la lista .

Tiempo invertido: 5 minutos
Comprensión: buena 


Usando IA

Se pidió a la IA que explicara la función y cómo se renderizan los comandos.
La IA explicó claramente el proceso de limpiar la lista, recorrer los comandos, crear elementos HTML y añadirlos al DOM.

Tiempo invertido: 1 minuto
Resultado: explicación rápida y completa.