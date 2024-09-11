let express = require("express");
let cors = require("cors");
let { getAllEmployees, getEmployeeById } = require("./controllers/index");
let app = express();
app.use(express.json());
app.use(cors());

// Exercise 1: Retrieve All Employees
app.get("/employees", async (req, res) => {
  try {
    let result = await getAllEmployees();
    if (result.length === 0) {
      return res.status(404).json({ error: "Employees not found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error."});
  }
});
// Exercise 2: Retrieve Employee by ID
app.get("/employees/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let result = await getEmployeeById(id);
    if (! result ) {
      return res.status(404).json({ error: "employee not found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error"});
  }
});
module.exports = { app };