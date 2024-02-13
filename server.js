// Configuración del server
const express = require("express");
const app = express();
const morgan = require("morgan");
const routes = require("./routes");
const db = require("./db");
const cors = require("cors");
const envs = require("./config/envs");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({origin:envs.CORS_ORIGIN, credentials:true})); // para comunicar entre puertos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("tiny"));
//app.use(express.static(__dirname + "/public"));

app.use("/api", routes);

// app.use("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

db.sync().then(() => {
  //{ force: false }
  app.listen(envs.PORT, () => {
    console.log("Escuchando en el puerto ", envs.PORT);
  });
});

module.exports = app;
