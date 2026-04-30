const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());

const expenseRoutes = require('./routes/expense-routes');

app.use(express.json());
app.use('/', expenseRoutes);

app.listen(PORT, () => {
  console.log("New Server Started")
  console.log(`Server running on http://localhost:${PORT}`);
});