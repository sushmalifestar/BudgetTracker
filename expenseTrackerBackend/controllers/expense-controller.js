let expenses = [
  {
        id: 1,
        title: 'Food',
        amount: 200,
        date: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Travel',
    amount: 500,
    date: new Date().toISOString()
  }
];
  
  exports.getExpenses = (req, res) => {
    res.json({
      success: true,
      data: expenses
    });
  };
  
  // exports.getExpenseById = (req, res) => {
  //   const id = parseInt(req.params.id);
  //   const expense = expenses.find(e => e.id === id);
  
  //   if (!expense) {
  //     return res.status(404).json({ message: 'Not found' });
  //   }
  
  //   res.json(expense);
  // };

  exports.addExpense = (req, res) => {
  
    const { title, amount, date} = req.body;
    
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
      date
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