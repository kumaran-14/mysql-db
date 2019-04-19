const router = require("express").Router();
const { check, validationResult } = require("express-validator/check");
const { sanitizeBody, sanitizeQuery } = require("express-validator/filter");
const crypto = require('crypto')


const User = require("../models").User;

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index");
});

const createUserValidations = [
  check("username")
    .isLength({
      min: 3,
      max: 25
    })
    .trim()
    .escape(),
  check("email")
    .trim()
    .isLength({ max: 25 })
    .isEmail()
    .normalizeEmail(),
  check("phoneno")
    .trim()
    .isLength({
      min: 10,
      max: 10
    })
    .isNumeric(),
  check("password")
    .trim()
    .isLength({
      min: 5,
      max: 50
    }),
  sanitizeBody("username"),
  sanitizeBody("email"),
  sanitizeBody("phoneno"),
  sanitizeBody("password")
];

const getUserValidations = [
  check("email")
    .trim()
    .isLength({ max: 25 })
    .isEmail()
    .normalizeEmail(),
  sanitizeQuery("email")
];

const deleteUserValidations = [
  check("email")
    .trim()
    .isLength({ max: 25 })
    .isEmail()
    .normalizeEmail(),
  sanitizeQuery("email")
];

/* POST req to create or update user */
router.post("/", createUserValidations, async (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ body: {}, error: errors.array() });
  }

  try {
    const hash = crypto.createHash('md5').update(req.body.password).digest("hex")

    const [user, created] = await User.findOrCreate({
      attributes: { exclude: ['password'] },
      where: { emailId: req.body.email },
      defaults: {
        userName: req.body.username,
        emailId: req.body.email,
        phoneNo: req.body.phoneno,
        password: hash,
        dateTime: new Date()
      }
    });
    if (!created) {
      const result = await User.update(
        {
          userName: req.body.username,
          emailId: req.body.email,
          phoneNo: req.body.phoneno,
          password: hash,
          dateTime: new Date()
        },
        {
          where: {
            emailId: req.body.email,
            password: hash,
          }
        }
      );
      if (result[0] === 0) {
        return res.status(200).json({
          body: {
            message: "Resource not updated. Credentials wrong",
            data: result
          },
          error: ""
        });
      }
      return res.status(201).json({
        body: {
          message: "Resource successfully updated",
          data: result
        },
        error: ""
      });
    }
    delete user.dataValues.password;
    return res.status(201).json({
      body: {
        message: "Resource successfully created",
        data: user
      },
      error: ""
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      body: {},
      error: "Please try again later"
    });
  }
});

/* GET req to find user */
router.get("/user", getUserValidations, async (req, res, next) => {

    // Finds the validation errors in this request and wraps them in an object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ body: {}, error: errors.array() });
    }

  try {
    const user = await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        emailId: req.query.email
      }
    });
    if (!user) {
      return res.status(200).json({
        body: {
          message: "User not found",
          data: {}
        },
        error: ""
      });
    }
    return res.status(200).json({
      body: {
        message: "User found",
        data: user
      },
      error: ""
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      body: {},
      error: "Please try again later"
    });
  }
});

/* DELETE req to delete user */
router.delete("/user", deleteUserValidations, async (req, res, next) => {

    // Finds the validation errors in this request and wraps them in an object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ body: {}, error: errors.array() });
    }

  try {
    const user = await User.destroy({
      where: {
        emailId: req.query.email
      }
    });
    if (!user) {
      return res.status(404).json({
        body: {
          message: "User not found",
          data: {}
        },
        error: ""
      });
    }
    return res.status(200).json({
      body: {
        message: "User deleted",
        data: user
      },
      error: ""
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      body: {},
      error: "Please try again later"
    });
  }
});

module.exports = router;
