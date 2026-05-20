let savings = [
    {
        id: 1,
        source: 'FD',
        amount: 20000,
        date: new Date().toISOString()
    },
    {
        id: 2,
        source: 'RD',
        amount: 20000,
        date: new Date().toISOString()
    }
]

exports.getAllsavings=(req, res)=>{
    res.json({
        success:true,
        data:savings
    })
}

exports.addSaving=(req, res)=>{
    const{source, amount, date}=req.body;
    if (!source || !amount){
        return res.status(400).json({
            success: false,
            message: 'Title and amount are required'
        })
    }
    const newSaving ={
        id: Date.now(),
        source, 
        amount,
        date
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