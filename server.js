const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(__dirname)); // Serve static files like HTML/CSS/data

// Dynamic file list endpoint
app.get('/filelist', (req, res) => {
  const dataDir = path.join(__dirname, 'data');
  fs.readdir(dataDir, (err, files) => {
    if (err) {
      console.error('Failed to read data directory:', err);
      return res.status(500).json({ error: 'Failed to read files.' });
    }

    const fileList = files.map(file => ({
      name: file,
      file: file
    }));

    res.json(fileList);
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
