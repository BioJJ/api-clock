const router = require('express-promise-router')();
const clockController = require('../controllers/clock.controller');

// ==> Definindo as rotas do CRUD - 'clock':

router.get('/clocks', clockController.getClock);
// ==> Rota responsável por criar um novo 'clock': (POST): localhost:3000/api/clocks
router.post('/clocks/:horas/:minutos', clockController.createClock);


module.exports = router;