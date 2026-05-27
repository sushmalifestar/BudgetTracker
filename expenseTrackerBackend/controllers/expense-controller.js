const expenseService = require('../services/expense.service')

exports.getAllExpenses = async (req, res) => {
  try {
    const userId = req.user.userId;
    const expnese = await expenseService.getAllExpenses(userId)
    res.json({
      success: true,
      data: expnese
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch income'
    });
  }
};

exports.addExpense = async (req, res) => {
  const userId = req.user.userId;
  try {
    const { title, amount, expenseDate } = req.body;
    if (!title || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Title and amount are required'
      });
    }
    await expenseService.addExpense({
      title, amount, expenseDate,userId
    })
    res.json({
      success: true,
      message: 'Expense added Successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to add expense'
    });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = parseInt(req.params.id);
    await expenseService.updateExpense(id, userId, req.body)
    res.json({
      success: true,
      message: 'Expense Updated Successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to update expense'
    });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const userId = req.user.userId;
    const id = parseInt(req.params.id);
    await expenseService.deleteExpense(id,userId)
    res.json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete expense'
    });
  }
};