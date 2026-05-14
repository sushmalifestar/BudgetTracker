const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());

const expenseRoutes = require('./routes/expense-routes');
const incomeRoutes = require ('./routes/income-routes');
const savingRoutes = require ('./routes/savings-routes');

app.use(express.json());
app.use('/', expenseRoutes);
app.use('/', incomeRoutes);
app.use ('/', savingRoutes);

app.listen(PORT, () => {
  console.log("New Server Started")
  console.log(`Server running on http://localhost:${PORT}`);
});