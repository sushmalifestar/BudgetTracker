const expenseService = require('../services/expense.service')

exports.getAllExpenses = async (req, res) => {
  try {
    const expnese = await expenseService.getAllExpenses()
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
  try {
    const { title, amount, expenseDate } = req.body;
    if (!title || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Title and amount are required'
      });
    }
    await expenseService.addExpense({
      title, amount, expenseDate
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
    const id = parseInt(req.params.id);
    await expenseService.updateExpense(id, req.body)
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
    const id = parseInt(req.params.id);
    await expenseService.deleteExpense(id)
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