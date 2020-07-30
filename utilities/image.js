var fs = require("fs");

const ImageUtility = {
  toImage: (base64Image, filename) => {
    base64Image = base64Image.split(";base64,").pop();
    fs.writeFile(filename, base64Image, { encoding: "base64" }, function (err) {
      console.log(`File ${filename} created.`);
    });
  },
  toBase64: (file) => {
    var bitmap = fs.readFileSync(file);
    return new Buffer.from(bitmap).toString("base64");
  },
};

export default ImageUtility;
