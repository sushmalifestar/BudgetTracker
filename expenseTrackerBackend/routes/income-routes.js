const express = require ('express')
const router = express.Router();
const {verifyToken} = require('../middleware/auth-middleware')
const incomeController = require('../controllers/income-controller')

router.get('/income',verifyToken,incomeController.getAllIncomes);
router.post('/income',verifyToken,incomeController.addIncome);
router.put('/income/:id',verifyToken, incomeController.updateIncome);
router.delete('/income/:id',verifyToken, incomeController.deleteIncome);

module.exports=router;
