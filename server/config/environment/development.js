'use strict';
// Development specific configuration
// ==================================
module.exports = {
    dist : 'dist',
    views : 'views',
    DOMAIN: 'http://'+this.ip+':'+this.port,
    // Server IP
    ip: process.env.IP || 'localhost',
    // Server port
    http_port: process.env.HTTP_PORT || '3000',
    https_port: process.env.HTTPS_PORT || '443',
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://10.1.0.2:27017/fincash-passport'
    },
    serverLogin: {
        user: "server",
        password: "fincash"
    },
    playServer : {
        ip :  'localhost',
        http_port : 9000,
        https_port : 9000,
        path : '/papi'
    },
    bsePanel : {
        url :  'http://bsestarmfdemo.bseindia.com',
        usename : '1023001',
        memberid : '10230',
        passwd : '123456$'
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
