const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/scan', (req, res) => {
  const { ip } = req.body;

  // Validate IP address format (basic validation)
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (!ipRegex.test(ip)) {
    return res.status(400).json({ output: 'Invalid IP address' });
  }

  // Run Nmap scan
  exec(`nmap ${ip}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ output: `Error: ${stderr}` });
    }
    res.json({ output: stdout });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
