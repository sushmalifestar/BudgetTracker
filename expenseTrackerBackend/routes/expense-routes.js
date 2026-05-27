const express = require('express');
const router = express.Router();
const {verifyToken}=require('../middleware/auth-middleware')
const expenseController = require('../controllers/expense-controller');

router.get('/expenses', verifyToken, expenseController.getAllExpenses);
router.post('/expenses',verifyToken, expenseController.addExpense);
router.put('/expenses/:id', verifyToken, expenseController.updateExpense);
router.delete('/expenses/:id', verifyToken, expenseController.deleteExpense);

module.exports = router;