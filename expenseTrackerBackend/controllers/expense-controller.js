let expenses = [
  {
        id: 1,
        title: 'Food',
        amount: 200,
        expenseDate: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Travel',
    amount: 500,
    expenseDate: new Date().toISOString()
  }
];
  
  exports.getExpenses = (req, res) => {
    res.json({
      success: true,
      data: expenses
    });
  };

  exports.addExpense = (req, res) => {
  
    const { title, amount, expenseDate} = req.body;
    
    if (!title || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Title and amount are required'
      });
    }
  
    const newExpense = {
      id: Date.now(),
      title,
      amount,
      expenseDate
    };
  
    expenses.push(newExpense);
  
    res.json({
      success: true,
      data: newExpense,
      message: 'NEW BACKEND HIT'
    });
  };
  
  exports.updateExpense = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
  
    const exists = expenses.some(exp => exp.id === id);

if (!exists) {
  return res.status(404).json({
    success: false,
    message: 'Expense not found'
  });
} 
expenses = expenses.map(exp =>
  exp.id === id ? { ...exp, ...updatedData } : exp
);
    res.json({ message: 'Updated' });
  };
  
  exports.deleteExpense = (req, res) => {
    const id = parseInt(req.params.id);
  
    expenses = expenses.filter(exp => exp.id !== id);
  
    res.json({ message: 'Deleted' });
  };