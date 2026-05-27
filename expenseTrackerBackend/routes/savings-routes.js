const express = require ('express')
const router = express.Router();
const {verifyToken} = require ('../middleware/auth-middleware')
const savingController = require ('../controllers/savings-controller')

router.get('/savings/',verifyToken, savingController.getAllsavings);
router.post('/savings',verifyToken, savingController.addSavings);
router.put('/savings/:id',verifyToken, savingController.updateSavings);
router.delete('/savings/:id',verifyToken, savingController.deleteSavings);

module.exports = router;