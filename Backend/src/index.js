const express = require("express");
const morgan = require("morgan");
const database = require("./database");
const cors = require("cors");

//Config inicial
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Ejecutando a través del puerto " + app.get("port"));

//Middlewares
app.use(cors({
    origin: ["http://localhost:5501","http://localhost:5500"]
}))
app.use(morgan("dev"));
app.use(express.json());

//Rutas
app.get("/productos", async (req, res) => {
   const connection = await database.getConnection();
   const result = await connection.query("SELECT * from productos")

   res.json(result);
});
app.post("/carrito/comprar", async (req, res) => {
    if(req.body && req.body.length > 0){
        return res.sendStatus(200);
    }
    res.sendStatus(400);
});



