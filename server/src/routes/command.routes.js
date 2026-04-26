// server/src/routes/command.routes.js
const express = require('express');
const router = express.Router();
const commandController = require('../controllers/command.controller');



//GET api/v1/commands?category= 
router.get('/', commandController.getCommands);



// POST /api/v1/commands/create
router.post('/create', commandController.createCommand);

// PUT /api/v1/commands/update/:id
router.put('/update/:id', commandController.updateCommand);


//DELETE /api/v1/commands/delete/:id
router.delete('/delete/:id', commandController.deleteCommand); 

module.exports = router;