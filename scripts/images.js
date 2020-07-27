const csv = require("csv-parser");
const fs = require("fs");
const axios = require("axios");
const AWS = require("aws-sdk");
const sharp = require("sharp");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadFile = (file, filename) => {
  const params = {
    Bucket: "nara-bia-photos",
    Key: filename,
    Body: file,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

const processImages = () => {
  fs.createReadStream("./src/data/records.csv")
    .pipe(csv())
    .on("data", (row) => {
      const objects = JSON.parse(row.objects);

      objects.forEach((object, i) => {
        if (object.type !== "application/pdf") {
          fs.stat(
            `./tmp/processed-images/${row.naId}-${i}.jpg`,
            (err, stat) => {
              if (err === null) {
                // console.log("file exists");
              } else if (err.code === "ENOENT") {
                axios
                  .get(object.file.url, {
                    responseType: "arraybuffer",
                  })
                  .then((response) => {
                    console.log(`${row.naId}-${i}`);
                    sharp(response.data)
                      .resize(600)
                      .toFile(`./tmp/processed-images/${row.naId}-${i}.jpg`);
                    // .then((data) => {
                    //   uploadFile(data, `${row.naId}-${i}.jpg`);
                    // });
                  })
                  .catch((error) => {
                    console.log(`${row.naId}-${i}`);
                    console.log(error.message);
                  });
              } else {
                console.log("Error: ", err.code);
              }
            }
          );
        } else {
          // console.log("PDF:", row.naId);
        }
      });
    });
};

processImages();
