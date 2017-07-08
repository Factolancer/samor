'use strict';

// Production specific configuration
// =================================
module.exports = {
    dist : 'server/dist',
    views : 'server/views',
    DOMAIN: 'https://www.fincash.com',
    // Server IP
    ip: process.env.IP || '172.31.13.209',
    // Server port
    http_port: process.env.HTTP_PORT || '80',
    https_port: process.env.HTTPS_PORT || '443',
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://ec2-35-154-154-160.ap-south-1.compute.amazonaws.com:27017,ec2-35-154-108-186.ap-south-1.compute.amazonaws.com:27017/fincash-passport'
    },
    serverLogin: {
        user: "server",
        password: "fincash"
    },
    playServer : {
      ip :  'www.fincash.com',
      http_port : 80,
      https_port : 443,
      path : '/papi'
    },
    bsePanel : {
        url :  'http://www.bsestarmf.in/index.aspx',
        usename : '1144101',
        memberid : '11441',
        passwd : 'Finca$h!'
    },
    document : {
        rootPath : 'documents',
        pdfPath : 'app-pdfs',
        imagePath : 'app-images',
        upload : 'app-uploads',
        snapshot :  'snapshot'
    },
    passport: {
        facebook : {
            "CLIENT_ID" : "342662919464567",
            "CLIENT_SECRET" : "952629e76f5cce6abfbbc2f83b7890ce",
            "CALLBACK" : "/api/auth/facebook/callback"
        },
        google : {
            "CLIENT_ID" : "570992030271-hvv6m29lpedcr6ltncbfj8ota0ig1c74.apps.googleusercontent.com",
            "CLIENT_SECRET" : "eAwyRmSfsjM3FUFeQY2d0B3e",
            "CALLBACK" : "/api/auth/google/callback"
        },
        redirectSuccess : '/auth/status/success',
        redirectFailure : '/auth/status/failure'
    }/*,
    NODEMAILER: {
        service: 'Gmail',
        auth: {
            user: 'taiga@fincash.com',
            pass: 'finc@$h'
        }
    }*/
};
