const Alumn = require('../models/alumn');

module.exports = class ReadAlumnController{
  async handle(req, res) {
    try{
      const alumns = await Alumn.find();
      (alumns.lenght != 0) ? res.json(alumns) : new Error("No Alumn was created");
    } catch (err) {
    console.log(err);

    return res.status(500).send();
}


  }
}

