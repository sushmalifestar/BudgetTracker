const authService = require('../services/auth.service');

const registerUser = async (req, res) => {
    try {
        const result = await authService.registerUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

const loginUser = async (req, res)=>{
    try{
        const result = await authService.loginUser(req.body);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(401).json({
            message: err.message
        });
    }
}

module.exports = {
    registerUser,
    loginUser
};