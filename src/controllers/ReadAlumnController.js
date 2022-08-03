const Alumn = require('../models/Alumn');

module.exports = class ReadAlumnController{
  async handle(res) {
    try{
      const alumns = await Alumn.find();
      (alumns.lenght != 0) ? res.json(alumns) : new Error("No Alumn was created");
    } catch (err) {
    console.log(err);

    return res.status(500).send();
}


  }
}
