const Alumn = require('../models/Alumn');

module.exports = class DeleteAlumnController{
  async handle(req, res) {
    const alumn = await Alumn.findById(req.params.id);

    await alumn.remove();
  
    return res.send();
  }
}
