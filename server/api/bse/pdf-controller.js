var config = require('../../config/environment'),
    fs = require('fs'),
    path = require('path'),
    gm = require('gm'),
    express = require('express'),
    dateFormat = require('dateformat'),
    bodyParser = require('body-parser'),
    pdfdocument = require('pdfkit'),
    pdfhelper = require('./pdfhelper'),
    helper = require('./helper');

var mode = process.env.NODE_ENV;
if(mode=='production'){
    console.log("Production will be using imageMagick");
    gm = gm.subClass({imageMagick: true});
}

exports.bsedoc = function (req, res) {
    var doc = new pdfdocument();
    var fileName = new Date().getUTCMilliseconds()+'output.pdf';
    doc.pipe(fs.createWriteStream(path.join(config.root,config.document.pdfPath,fileName)));
    doc.Title = "Document";
    doc.Author = "Fincash.com";
    doc.Subject = "Form";
    doc.Keywords   = "BSE FINCASH";
    var userDetails = helper.getUserDetails();
    var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.'
    doc.fontSize(10).text('This text is left aligned. '+lorem,
        {columns: 3,
         columnGap: 15,
         height: 25,
         width: 465,
         align: 'justify'
        });
    doc.rect(doc.x, 0, 465, doc.y).stroke();
    doc.link(100, 100, 160, 27, 'http://google.com/');
    doc.end();
    res.json({sucess : true, msg : 'file saves  with name ' + fileName});
}