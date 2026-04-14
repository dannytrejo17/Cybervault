function toggleDark(){

const html = document.documentElement /*Selecciona el elemento raíz (html) para aplicar la clase de tema oscuro*/;

html.classList.toggle("dark") /*alterna la clase "dark" en el elemento raíz, lo que activa o desactiva el tema oscuro según su presencia.*/

if(html.classList.contains("dark")){
localStorage.setItem("theme","dark")
}else{
localStorage.setItem("theme","light")
}

}

if(localStorage.getItem("theme") === "dark"){
document.documentElement.classList.add("dark")
}