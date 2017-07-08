var config = require('../../config/environment');
var ejs = require('ejs');
var fs = require('fs');
var nodemailer = require('nodemailer');

ejs.open = '{{';
ejs.close = '}}';

/*Nodemailer  Init*/
var transporter = nodemailer.createTransport(config.NODEMAILER);
var PATH = '/server/views/email/';

exports.CustomMail = function (obj) {
  this.name = obj.name;
  this.to = obj.to;
  this.password = obj.password;
  this.verificationCode = obj.verificationCode;
  this.subject = obj.subject;
  this.template = obj.template;
  this.data = obj.data;
};

exports.CustomMail.prototype.send = function (callback) {
  var template = process.cwd() + PATH + this.template + '.ejs';
  var data = this.data;
  var from = this.from;
  var to = this.to;
  var subject = this.subject;

  fs.readFile(template, 'utf8', function (err, file) {
    if (err) return callback(err);
    var html = ejs.render(file, {data: data});
    var mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: html
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) return callback(err);
      callback();
    });
  });
};
