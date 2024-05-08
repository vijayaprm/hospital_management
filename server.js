const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require("dotenv").config(); 

// routes 
const patientRoutes = require("./routes/patientRoutes"); 
const doctorRoutes = require("./routes/doctorRoutes");




const mongoUrl = process.env.MONGODB_URL; 
mongoose.connect(mongoUrl)
    .then(() => console.log("Mongodb connected...")) 
    .catch((err) => console.error('Connection error:', err)); 


app.use(cors());
app.use(express.json());

app.use("/api/doctor", doctorRoutes);
app.use("/api/patient", patientRoutes); 

const port = process.env.PORT || 5000; 
app.listen(port, () => { 
	console.log(`Backend is running on port ${port}`); 
}); 

