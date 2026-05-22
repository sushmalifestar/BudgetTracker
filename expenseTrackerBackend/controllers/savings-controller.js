let savings = [
    {
        id: 1,
        title: 'FD',
        amount: 20000,
        savingsDate: new Date().toISOString()
    },
    {
        id: 2,
        title: 'RD',
        amount: 20000,
        savingsDate: new Date().toISOString()
    }
]

exports.getAllsavings=(req, res)=>{
    res.json({
        success:true,
        data:savings
    })
}

exports.addSaving=(req, res)=>{
    const{title, amount, savingsDate}=req.body;
    if (!title || !amount){
        return res.status(400).json({
            success: false,
            message: 'Title and amount are required'
        })
    }
    const newSaving ={
        id: Date.now(),
        title, 
        amount,
        savingsDate
    }

    savings.push(newSaving);

    res.json({
        success:true,
        data: newSaving
    })

} 

exports.updateSaving =(req,res)=>{

    const id = parseInt(req.params.id)
    const updatedData = req.body;

    const exists = savings.some((sav)=> sav.id ===id)

    if(!exists){
        return res.status(404).json({
            success:false,
            message:'Saving not found'
        })
    }
    savings = savings.map(sav=> sav.id === id? {...sav, ...updatedData}: sav)

    res.json({
        message:'Updated'
    })
}

exports.deleteSaving=(req, res)=>{
    const id = parseInt(req.params.id);
    savings = savings.filter(sav=>sav.id !== id);
    res.json({
        message:'Deleted'
    })
}