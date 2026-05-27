const incomeService = require('../services/income.service');

exports.getAllIncomes = async (req, res) => {
    try {
        const userId = req.user.userId;
        const income = await incomeService.getAllIncomes(userId);
        res.json({
            success: true,
            data: income
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch income'
        });
    }
};

exports.addIncome = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { title, amount, incomeDate } = req.body;
        if (!title || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Title and amount are required'
            });
        }
        await incomeService.addIncome({
            title, amount, incomeDate,userId
        });
        res.json({
            success: true,
            message: 'Income added Successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to add income'
        });
    }
};

exports.updateIncome = async (req, res) => {
    try {
        const userId = req.user.userId;
        const id = parseInt(req.params.id)
        await incomeService.updateIncome(id, userId, req.body)
        res.json({
            success: true,
            message: 'Income Updated Successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to update income'
        });
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        const userId = req.user.userId;
        const id = parseInt(req.params.id);
        await incomeService.deleteIncome(id,userId);
        res.json({
            success: true,
            message: 'Income deleted successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to delete income'
        });
    }
};

