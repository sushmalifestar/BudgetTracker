const express = require ('express')
const router = express.Router();

const incomeController = require('../controllers/income-controller')

router.get('/income',incomeController.getAllIncomes);
router.post('/income',incomeController.addIncome);
router.put('/income/:id', incomeController.updateIncome);
router.delete('/income/:id', incomeController.deleteIncome);

module.exports=router;
