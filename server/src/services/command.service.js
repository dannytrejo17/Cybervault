let nextId = 1;

const commands = [
  // Comandos predefinidos
  { id: nextId++, cmd: "sudo nmap -sS 192.168.0.15", desc: "Escaneo de servicios con TCP SYN", type: "predefinido", category: "network" },
  { id: nextId++, cmd: "nmap -sS -T4 -n -p- --min-rate 1000 Ip_objetivo", desc: "escaneo para ctfs, thm o hackthebox", type: "predefinido", category: "network" },
  { id: nextId++, cmd: "hydra -l usuario -P /usr/share/wordlists/rockyou.txt <IP> http-post-form /login:username=^USER^&password=^PASS^:F=incorrect", desc: "Fuerza bruta a http", type: "predefinido", category: "brute force" },
  { id: nextId++, cmd: "hydra -l usuario -P /usr/share/wordlists/rockyou.txt ssh://<IP_Objetivo>", desc: "Fuerza bruta a ssh", type: "predefinido", category: "brute force" },
  { id: nextId++, cmd: "python3 GetNPUsers.py dominio/ -usersfile users.txt -dc-ip TARGET_IP", desc: "kerberos as-rp", type: "predefinido", category: "active directory" },
  { id: nextId++, cmd: "kerbrute userenum --dc TARGET_IP -d dominio wordlist.txt", desc: "enumeracion de usuarios", type: "predefinido", category: "active directory" },
  { id: nextId++, cmd: "sqlmap -u 'http://example.com/vulnerable.php?id=1' --dbs", desc: "Escaneo de SQLi", type: "predefinido", category: "sql injection" },
  { id: nextId++, cmd: "?id=1 AND SUBSTRING((SELECT database()), 1, 1) = 'a'" , desc: "SQLi boolean-based blind", type: "predefinido", category: "sql injection" }
];

const categories = ["network", "brute force", "active directory", "sql injection"];

// ===================================
// Obtener comandos por categoría
// ===================================
function getCommands(category) {
  if (!category) throw new Error("campo category es requerido");
  
  // valida que la categoria sea valida 
  if (!categories.includes(category)) 
    throw new Error("categoria invalida");

  // Devuelve predefinidos + comandos del usuario de esa categoría
  return commands.filter(
    c => (c.category === category && c.type === "predefinido") || (c.category === category && c.type === "user")
  );
}
// ===================================
// Agregar comando de usuario
// ===================================
function createCommand(command, category) {
 
  if(!categories.includes(category)) 
    throw new Error("categoria invalida");

  if (!command.cmd || command.cmd.length < 2) throw new Error("comando invalido");
  if (!command.desc || command.desc.length < 2) throw new Error("descripcion invalida");

  const nuevo = {
    id: nextId++,
    type: "user",
    cmd: command.cmd,
    desc: command.desc,
    category 
  };

  commands.push(nuevo);
  return nuevo;
}

// ===================================
// Actualizar comando (solo usuario)
// ===================================
function updateCommand(id, newCmd, newDesc) {
  const index = commands.findIndex(c => c.id === id && c.type === "user");
  if (index === -1) throw new Error("NOT_FOUND");
  if (!newCmd || newCmd.length < 2 ) throw new Error("comando invalido");
  if (!newDesc || newDesc.length < 2 ) throw new Error("descripcion invalida");
 
  commands[index].cmd = newCmd; // actualizamos el comando 
  commands[index].desc = newDesc; // actualizamos la descripcion
  return commands[index];
}

// ===================================
// Eliminar comando (solo usuario)
// ===================================
function deleteCommand(id) {
  // Busca el índice del comando por su ID y tipo "user"
  if(isNaN(id)) throw new Error("id invalido");
  const index = commands.findIndex(c => c.id === id && c.type === "user");
  if (index === -1) throw new Error("NOT_FOUND");
  commands.splice(index, 1);
}

module.exports = { getCommands, createCommand, deleteCommand, updateCommand };