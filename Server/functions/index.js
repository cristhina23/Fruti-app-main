const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey.json");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Firebase Admin (inicialización)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// Rutas base
app.get("/", (req, res) => {
  res.send("🚀 Backend working!");
});

// Rutas importadas
const userRoute = require("./routes/user");
app.use("/api/users", userRoute);

const productRoute = require("./routes/products");
app.use("/api/products", productRoute);

// Escuchar en el puerto asignado por Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
