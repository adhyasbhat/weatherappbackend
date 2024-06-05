const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5777;

app.use(express.json());
app.use(cors());

let eventPlannerData = JSON.parse(fs.readFileSync('eventPlanner.json'));

if (!Array.isArray(eventPlannerData)) {
  eventPlannerData = [];
}

app.get('/events', (req, res) => {
  res.json(eventPlannerData);
});

app.post('/events', (req, res) => {
  const eventData = req.body; 
  eventPlannerData.push(eventData);
  fs.writeFileSync('eventPlanner.json', JSON.stringify(eventPlannerData, null, 2));

  res.json(eventData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
