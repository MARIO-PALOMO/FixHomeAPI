var fs = require("fs");

module.exports = {
  subirImagenes: function (req, res, next) {
    for (var x = 0; x < req.files.length; x++) {
      fs.createReadStream("./averias/" + req.files[x].filename).pipe(
        fs.createWriteStream("./public/images/averias/" + req.files[x].originalname)
      );
      res.send({ 'imagen': req.files[x].originalname });
    }
  },
};
