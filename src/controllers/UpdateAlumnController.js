const Alumn = require('../models/alumn');
const aws = require("aws-sdk");




module.exports = class UpdateAlumnController{

  async handle(req, res) {
    const dataToUpdate = ((body, archive) =>{
      
      if (body){
        //var dataFromBody = (({ name, address }) => ({ name, address }))(body);
        var dataFromBody = (({ name, address }) => ({ name, address }))(body);
      }
      if (archive){
         var dataFromArchive = (({ originalname: imageName, size: imageSize, key, location: url }) => ({ imageName, imageSize, key, url }))(archive);
      }
      let data = {
        ...dataFromBody,
        ...dataFromArchive
      };
      function clean(obj) {
        for (var propName in obj) {
          if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
          }
        }
        return obj
      }

      clean(data);
      return data;
    })(req.body, req.file);
    console.log(dataToUpdate)

const s3 = new aws.S3();

    const alumn = await Alumn.findById(req.params.id);
    async function deleteOldPhoto(alumn){
      if (dataToUpdate.key && process.env.STORAGE_TYPE === "s3") {
        try {
          const response = await s3
            .deleteObject({
              Bucket: process.env.BUCKET_NAME,
              Key: alumn.key
            })
            .promise();
          console.log(response.status);
        } catch (response_1) {
          console.log(response_1.status);
        }
      } else {return}
    }
    await deleteOldPhoto(alumn);
    await alumn.updateOne(dataToUpdate);
  
    return res.send(); 
  }
}