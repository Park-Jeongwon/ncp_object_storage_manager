const AWS = require('aws-sdk')
const path = require('path')
const fs = require('fs')
const { getFiles, getContentType } = require('./commons/utils')
const uploadDir = path.join(__dirname, '/upload/');
if ( !fs.existsSync(uploadDir) ) {
    fs.mkdirSync(uploadDir)
}

module.exports = function (config) {
    const endpoint = new AWS.Endpoint(config.endpoint);
    const region = config.region;
    const access_key = config.access_key;
    const secret_key = config.secret_key;
    const Bucket = config.bucket;
    const baseDirectoryInBucket = config.sub_directory_in_bucket;
    const ACL = config.public_read? 'public-read' : undefined;


    const S3 = new AWS.S3({
        endpoint,
        region,
        credentials: {
            accessKeyId: access_key,
            secretAccessKey: secret_key
        }
    });

    getFiles(uploadDir, async (dir, file) => {
        const filepath = path.join(dir.split(uploadDir)[1], file);
        const Key = filepath.replace(/\\/gi, '/');

        const params = {
            Bucket,
            Key: baseDirectoryInBucket + Key,
            ACL,
            ContentType: getContentType(file),
            Body: fs.createReadStream(path.join(dir, file))
        };
        S3.upload(params, (err, data) => {
            if ( err ) {
                return console.error(`${file}`);
            }
            console.log(data.Location)
        })
    });
}
