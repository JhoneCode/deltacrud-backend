const Alumn = require('../models/alumn.js');

  const defaultValues = {
    imageName: "no image",
    imageSize: null,
    key: "",
    url: "not found",
  }

module.exports = class CreateAlumnController{

  async handle(req, res) {
    try {
      if(!req.file) {
        var { imageName, imageSize, url, key } = defaultValues;
      }
      else {
        var { originalname: imageName, size: imageSize, key, location: url} = req.file;
      }

      const {  name, address } = req.body;
    
    const alumn = await Alumn.create({
      name,
      address,
      imageName,
      imageSize,
      url,
      key,
    })
    return res.json(alumn);

  } catch(err){
    return res.json(err);

   }
  }
}
