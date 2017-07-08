var multer = require('multer'),
    config = require('../../config/environment'),
    express = require('express'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs'),
    mime = require('mime');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var userId = '';
        var fieldName = file.fieldname;
        if (fieldName.indexOf('-') > 0) {
            var fArray = fieldName.split('-');
            if (fArray.length > 1) {
                if(fArray[1]){
                    userId = fArray[1];
                }
            }
        }
        var dirpath;
        if (userId.length > 0) {
            dirpath = path.join(config.root, config.document.rootPath,config.document.upload + '/' + userId);
        } else {
            dirpath = path.join(config.root, config.document.rootPath,config.document.upload);
        }

        if (!fs.existsSync(dirpath)) {
            fs.mkdir(dirpath);
        }
        //console.log("file destination >> " + dirpath);
        cb(null, dirpath);
    },
    filename: function (req, file, cb) {
        var extention = mime.extension(file.mimetype);
        var fileName = file.originalname.replace(/[^a-zA-Z]/g, "");
        if (fileName.length > 30) {
            fileName = fileName.substring(0, 30);
        }
        var fieldName = file.fieldname;
        var ffileName = fieldName + '-' + fileName + "-" + Date.now() + "." + extention;
        console.log("file name >> " + ffileName);
        cb(null, ffileName);
    }
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 10485760 // 10 MB upload file limit
    },
    includeEmptyFields: false
}).any();

router.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if(err){
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.json({success: false, msg: "File size if higher than 10MB", error: "File size if higher than 10MB"});
            } else {
                res.json({success: false, msg: err, error: err});
            }
            return
        }
        var userId = '';
        var fieldName = req.files[0].filename;
        if (fieldName.indexOf('-') > 0) {
            var fArray = fieldName.split('-');
            if (fArray.length > 1) {
                if(fArray[1])
                    userId = fArray[1];
            }
        }

        // Everything went fine
        if(userId.length==0){
            res.json({success: true, msg: "success", uploadfile: config.document.upload+'/'+req.files[0].filename});
        }else{
            res.json({success: true, msg: "success", uploadfile: config.document.upload+'/'+userId+'/'+req.files[0].filename});
        }
    })
});

function getRandomInt(min, max) {
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    //console.log("min " + min+" max "+ max + " random no " + number);
    return number;
}

// json parser
router.post('/snapshot', function (req, res) {
    var body = req.body;
    var orderId = body.id;
    var folder = body.type;
    console.log("order  id ["+orderId+"] folder  ["+folder+"]");
    var base64Data = body.snapshot;
    var dirpath;
    if (folder) {
        folder = folder.replace(/[^a-zA-Z]/g, "");
        dirpath = path.join(config.root, config.document.rootPath, config.document.snapshot + '/' + folder);
    } else {
        dirpath = path.join(config.root, config.document.rootPath, config.document.snapshot);
    }
    if (!fs.existsSync(dirpath)) {
        fs.mkdir(dirpath);
    }
    if (base64Data) {
        base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
        base64Data += base64Data.replace('+', ' ');
        var binaryData = new Buffer(base64Data, 'base64').toString('binary');
        if (orderId) {

        } else {
            orderId = '';
        }

        var fileName;
        if(orderId.length>0){
            fileName = orderId + "-" + Date.now() + ".png";
        }else{
            fileName = getRandomInt(1000000,9999999) + "-" + Date.now() + ".png";
        }
        fs.writeFile(dirpath + "/" + fileName, binaryData, "binary", function (err) {
            if (err) {
                res.json({success: false, msg: err});
                return
            }
            if(folder && folder.length>0){
                res.json({success: true, msg: "success", uploadfile: config.document.snapshot+'/'+folder+'/'+fileName});
            }else{
                res.json({success: true, msg: "success", uploadfile: config.document.snapshot+'/'+fileName});
            }
        });
    }else{
        res.json({success: false, msg: "no snapshot parameter"});
    }
});

module.exports = router;