const { use } = require('../routes/expense-routes');
const savingService = require('../services/savings.service')

exports.getAllsavings = async (req, res) => {
    try {
        const userId = req.user.userId;
        const saving = await savingService.getAllSavings(userId);
        res.json({
            success: true,
            data: saving
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch saving'
        });
    }
};

exports.addSavings = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { title, amount, savingsDate } = req.body;
        if (!title || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Title and amount are required'
            })
        }
        await savingService.addSavings({
            title, amount, savingsDate,userId
        })
        res.json({
            success: true,
            message: 'Saving added Successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to add saving'
        });
    }
};

exports.updateSavings = async (req, res) => {
    try {
        const userId = req.user.userId;
        const id = parseInt(req.params.id);
        await savingService.updateSavings(id, userId, req.body)
        res.json({
            success: true,
            message: 'Saving Updated Successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to update saving'
        });
    }
};

exports.deleteSavings = async (req, res) => {
    try {
        const userId = req.user.userId;
        const id = parseInt(req.params.id);
        await savingService.deleteSavings(id,userId)
        res.json({
            success: true,
            message: 'Saving deleted successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to delete Saving'
        });
    }
};