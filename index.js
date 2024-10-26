const express = require('express');
const cors = require ('cors')
const router = require('./routes/authRoutes.js');
const { PrismaClient } = require('@prisma/client');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors())

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => {
    console.log("Connected to Prisma successfully!");
  })
  .catch((err) => {
    console.error("Failed to connect to Prisma:", err);
  });

app.use('/api', router);

const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  
  console.log(`Server is running on port ${PORT}`);
});
