const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");


const CreateAlumnController = require("./controllers/CreateAlumnController");
const ReadAlumnController = require("./controllers/ReadAlumnController");
const DeleteAlumnController = require("./controllers/DeleteAlumnController");
const UpdateAlumnController = require("./controllers/UpdateAlumnController");

const createAlumn = new CreateAlumnController();
const readAlumn = new ReadAlumnController();
const deleteAlumn = new DeleteAlumnController();
const updateAlumn = new UpdateAlumnController();

routes.get("/alumns", readAlumn.handle);
routes.post("/alumns", multer(multerConfig).single("file"), createAlumn.handle);
routes.delete("/alumns/:id", deleteAlumn.handle);
routes.put("/alumns/:id", multer(multerConfig).single("file"), updateAlumn.handle);

module.exports = routes;
