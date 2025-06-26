const router = require("express").Router();
const admin = require("firebase-admin");
let data = [];

router.get("/", (req, res) => {
  return res.send("Inside User Route");
});

router.get("/jwtVerfication", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).json({success: false, msg: "Token not found"});
  }

//comment
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(500).json({success: false, msg: "Unauthorized access"});
    }
    return res.status(200).json({success: true, data: decodeValue});
  } catch (err) {
    return res.send({
      success: false,
      msg: `Error in extracting the token: ${err}`, 
    });
  }
});

// Función para listar todos los usuarios
const listAllUsers = async (nextPageToken = undefined, users = []) => {
  try {
    const result = await admin.auth().listUsers(1000, nextPageToken);
    const currentBatch = result.users.map(userRecord => userRecord.toJSON());
    users.push(...currentBatch);

    if (result.pageToken) {
      return await listAllUsers(result.pageToken, users);
    }

    return users;
  } catch (error) {
    console.error("❌ Error listing users:", error);
    throw error;
  }
};


// Ruta para obtener todos los usuarios
router.get("/all", async (req, res) => {
  try {
    const users = await listAllUsers();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Failed to fetch users" });
  }
});

module.exports = router;