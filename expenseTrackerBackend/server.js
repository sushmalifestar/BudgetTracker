const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());

const expenseRoutes = require('./routes/expense-routes');
const incomeRoutes = require ('./routes/income-routes');
const savingRoutes = require ('./routes/savings-routes');
const authRoutes = require ('./routes/auth-routes');

app.use(express.json());
app.use('/', expenseRoutes);
app.use('/', incomeRoutes);
app.use ('/', savingRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});