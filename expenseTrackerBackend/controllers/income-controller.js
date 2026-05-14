let income = [
    {
        id: 1,
        source: 'Salary',
        amount: 150000,
        date: new Date().toISOString()
    },
    {
        id: 2,
        source: 'RD Mature amount',
        amount: 50000,
        date: new Date().toISOString()
    }
]

exports.getAllIncomes = (req, res) => {
    res.json({
        success: true,
        data: income
    })
}

exports.addIncome = (req, res) => {
    const { source, amount, date } = req.body;
    console.log(req.body);
    console.log(source, amount, date);
    if (!source || !amount) {
        return res.status(400).json({
            success: false,
            message: 'Title and amount are required'
        });
    }

    const newIncome = {
        id: Date.now(),
        source,
        amount,
        date
    };

    console.log("added new income is", newIncome)

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
    console.log("inside the delete income in the backend")
    const id = parseInt(req.params.id);
    income = income.filter(inc => inc.id !== id);
    res.json({ message: 'Deleted' });
}

