let income = [
    {
        id: 1,
        title: 'Salary',
        amount: 150000,
        incomeDate: new Date().toISOString()
    },
    {
        id: 2,
        title: 'RD Mature amount',
        amount: 50000,
        incomeDate: new Date().toISOString()
    }
]

exports.getAllIncomes = (req, res) => {
    res.json({
        success: true,
        data: income
    })
}

exports.addIncome = (req, res) => {
    const { title, amount, incomeDate } = req.body;
    if (!title || !amount) {
        return res.status(400).json({
            success: false,
            message: 'Title and amount are required'
        });
    }

    const newIncome = {
        id: Date.now(),
        title,
        amount,
        incomeDate
    };

    income.push(newIncome);

    res.json({
        success: true,
        data: newIncome,
        message: 'NEW BACKEND HIT'
    });
}

exports.updateIncome = (req, res) => {
    const id = parseInt(req.params.id)
    const updatedData = req.body;

    const exists = income.some(inc => inc.id === id);

    if (!exists) {
        return res.status(404).json({
            success: false,
            message: 'Income not found'
        });
    }
    income = income.map(inc =>
        inc.id === id ? { ...inc, ...updatedData } : inc
    );

    res.json({ message: 'Updated' });
}

exports.deleteIncome = (req, res) => {
    const id = parseInt(req.params.id);
    income = income.filter(inc => inc.id !== id);
    res.json({ message: 'Deleted' });
}

