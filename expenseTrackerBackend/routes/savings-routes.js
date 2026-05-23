const express = require ('express')
const router = express.Router();

const savingController = require ('../controllers/savings-controller')

router.get('/savings/', savingController.getAllsavings);
router.post('/savings', savingController.addSavings);
router.put('/savings/:id', savingController.updateSavings);
router.delete('/savings/:id', savingController.deleteSavings);

module.exports = router;