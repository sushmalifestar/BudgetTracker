const express = require ('express')
const router = express.Router();

const savingController = require ('../controllers/savings-controller')

router.get('/savings/', savingController.getAllsavings);
router.post('/savings', savingController.addSaving);
router.put('/savings/:id', savingController.updateSaving);
router.delete('/savings/:id', savingController.deleteSaving);

module.exports = router;