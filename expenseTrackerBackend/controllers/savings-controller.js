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