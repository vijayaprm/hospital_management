const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require("dotenv").config(); 

// routes 
const patientRoutes = require("./routes/patientRoutes"); 
const doctorRoutes = require("./routes/doctorRoutes");
const pharmaRoutes = require("./routes/pharmaRoutes");
const appoinRoutes = require("./routes/appoinRoutes");
const recordRoutes = require("./routes/recordRoutes");

const mongoUrl = process.env.MONGODB_URL; 
mongoose.connect(mongoUrl)
    .then(() => console.log("Mongodb connected...")) 
    .catch((err) => console.error('Connection error:', err)); 


app.use(cors());
app.use(express.json());

app.use("/api/doctor", doctorRoutes);
app.use("/api/patient", patientRoutes); 
app.use("/api/pharma", pharmaRoutes);
app.use("/api/appointment", appoinRoutes); 
app.use("/api/record", recordRoutes);

const port = process.env.PORT || 5000; 
app.listen(port, () => { 
	console.log(`Backend is running on port ${port}`); 
}); 

