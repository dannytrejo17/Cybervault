# Backend - CyberVault

## Descripción

Este backend está desarrollado con Node.js y Express. Proporciona una API REST para gestionar comandos de ciberseguridad por categorías.


### Funcionalidades:
- ✅ Listar comandos por categoría
- ✅ Crear comandos de usuario
- ✅ Actualizar comandos propios
- ✅ Eliminar comandos propios


##  Arquitectura

Cliente → Routes → Controllers → Services → Response ↓ Middleware (Errores)

**Separación de responsabilidades:**
- `routes/` - Endpoints HTTP
- `controllers/` - Manejo req/res + validación
- `services/` - Lógica de negocio pura
- `middlewares/` - manejo de errores



## Endpoints

### GET /api/v1/commands?category={category}
**Obtiene comandos por categoría**

**Respuesta:**

    {
        "id": 1,
        "cmd": "sudo nmap -sS 192.168.0.15",
        "desc": "Escaneo de servicios con TCP SYN",
        "type": "predefinido",
        "category": "network"
    }


## POST /api/v1/commands/create
Crea comando de usuario

POST http://localhost:3000/api/v1/commands/create
Content-Type: application/json
Body:


{
  "cmd": "nmap -sS 192.168.1.1",
  "desc": "Escaneo SYN stealth",
  "category": "network"
}
Respuesta: 201 Created



## PUT /api/v1/commands/update/:id
Actualiza comando propio

PUT http://localhost:3000/api/v1/commands/update/id
Body:


{
  "cmd": "nmap -sS -p- 192.168.1.1",
  "desc": "Escaneo completo SYN"
}


## DELETE /api/v1/commands/eliminar/:id
Elimina comando propio

DELETE http://localhost:3000/api/v1/commands/eliminar/123
Respuesta: 204 OK




## Manejo de Errores
Middleware global (err, req, res, next):


console.error(err)                    → Logs desarrollador
if (err.message === 'NOT_FOUND')      → 404 cliente  
else                                  → 500 "Error interno"
Casos probados:


GET sin category     → 400 "requerido"
POST campos vacíos   → 400 "incompletos"
DELETE ID inválido   → 400 "id invalido" 
DELETE ID no existe  → 404 "recurso no encontradp"



