
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const User = require("../models/user");
const fs = require('fs');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const TOKEN_PATH = 'token.json';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'isdogtr01@gmail.com', // your email
    pass: 'isdogtr001' // your email password
  }
});
var imgur = require('imgur');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, 'D:/Project/AwesomeProject/resources/img/');
  },
  filename: function (req, file, cb) {
    // cb(null, new Date().toISOString() + file.originalname);
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({

  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post("/uploadimage2", (req, res, next) => {
  console.log(req.file)
  img = req.body.img
  // 'C:/Users/Admin/Desktop/1 4/2 - n70mjzn.jpg'
  console.log(img)
  imgur.uploadFile(img)
    .then(function (json) {
      console.log(json.data.link);
      return res.status(201).json({
        message: "upload complete",
        img: json.data.link
      })


    })
    .catch(function (err) {
      console.error(err.message);
    });
});

router.post("/uploadimage_img2", (req, res, next) => {
  console.log(req.file)
  img = req.body.img
  // 'C:/Users/Admin/Desktop/1 4/2 - n70mjzn.jpg'
  console.log(img)
  imgur.uploadImages(img, 'File')
    .then(docs => {
      const response = {
        message: "upload complete",
        img: docs.map(doc => {
          return doc.link
          ;
        })
      };

      res.status(200).json(response);

    })
    .catch(function (err) {
      console.error(err.message);
    });
});

router.post("/uploadimage", upload.single('UserImage'), (req, res, next) => {
  console.log(req.file)
  if (req.file) {
    res.status(200).json({
      message: "upload complete",
      img: req.file
    })
  } else {
    res.status(500).json({
      message: "fail",

    })
  }
});

router.post("/sentmail", (req, res, next) => {

  let randomnumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  console.log(randomnumber)
  email_send = req.body.email
  random = req.body.random

  let mailOptions = {
    from: 'isdogtr01@gmail.com',                // sender
    to: 'isdogtr01@gmail.com',                // list of receivers
    subject: 'Hello from sender',              // Mail subject
    html: '<b>Your code is = </b>' + random // HTML body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
      res.status(500).json(info);
    }
    else {
      console.log(info);
      res.status(200).json(info);
    }
  });

});



router.get('/', (req, res, next) => {
  if (req.query.search) {
    User.find({ user_name: { $regex: ".*" + req.query.search + ".*", $options: 'i' } })
      .select()
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          user: docs.map(doc => {
            return {
              email: doc.email,
              password: doc.password,
              faculty: doc.faculty,
              branch: doc.branch,
              student_id: doc.student_id,
              telephone: doc.telephone,
              user_name: doc.user_name,
              admin: doc.admin,
              Img: doc.Img,
              _id: doc._id,

            };
          })
        };

        res.status(200).json(response);

      }
      )
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  } else {
    User.find()
      .select()
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          user: docs.map(doc => {
            return {
              email: doc.email,
              password: doc.password,
              faculty: doc.faculty,
              branch: doc.branch,
              student_id: doc.student_id,
              telephone: doc.telephone,
              user_name: doc.user_name,
              admin: doc.admin,
              Img: doc.Img,
              _id: doc._id,

            };
          })
        };

        res.status(200).json(response);

      }
      )
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }


});

router.get('/:userId', (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    }
    )
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });



});

router.post('/getid', (req, res, next) => {
  const Token = req.body.token
  const decoded = jwt.verify(Token, process.env.JWT_KEY)
  const id = decoded.userId
  User.findById(id)
    .select()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });


});

router.delete('/:usertId', (req, res, next) => {

  const id = req.params.usertId;
  User.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted',

      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/uploadimage", upload.single('UserImage'), (req, res, next) => {
  console.log(req.file)
  if (req.file) {
    return res.status(201).json({
      message: "upload complete",
      name: req.file.filename
    })
  } else {
    return res.status(500).json({
      message: "err"
    })
  }
});

router.post("/uploadimagea_array", upload.array('UserImage', 20), (req, res, next) => {
  try {
    res.send(req.files);
  } catch (error) {
    console.log(error);
    res.send(400);
  }
});

router.post("/signup", (req, res, next) => {


  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "This email has already been registered"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err)
            return res.status(500).json({
              message: "Email address is invalid."
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              faculty: req.body.faculty,
              branch: req.body.branch,
              student_id: req.body.student_id,
              telephone: req.body.telephone,
              user_name: req.body.user_name,
              admin: req.body.admin,
              Img: req.body.Img,


            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                  createdUser: {
                    _id: result._id,
                    email: result.email,
                    password: result.password,
                    faculty: result.faculty,
                    branch: result.branch,
                    student_id: result.student_id,
                    telephone: result.telephone,
                    user_name: result.user_name,
                    admin: result.admin,
                    Img: result.Img,

                  }
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    })


});


router.post('/update/:usertId', (req, res, next) => {
  const id = req.params.usertId;
  const updateOps = {}
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      req.body.password = hash
      for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
      }

      User.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
          res.status(200).json({
            message: 'Project updated',
            request: {
              type: 'GET',
              url: 'http:// localhost:4000/project' + id
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    });
  } else {

    for (const key of Object.keys(req.body)) {
      updateOps[key] = req.body[key]
    }
    User.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Project updated',
          request: {
            type: 'GET',
            url: 'http:// localhost:4000/project' + id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }




});


router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/", (req, res, next) => {
  User.remove({})
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.post("/check", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Your email is not associated with any account.",
        });
      } else {
        res.status(200).json({ message: "correct", email: user[0] });
      }
      ;
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Your email is not associated with any account."
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Your email or password is incorrect"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            },


          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            _id: user[0]._id,
            name: user[0].user_name


          });
        }
        res.status(401).json({
          message: "Your password is incorrect"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
