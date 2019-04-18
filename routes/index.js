const router = require("express").Router();
const User = require("../models").User;
/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* POST req to create or update user */
router.post("/", async (req, res, next) => {
  try {
    const [user, created] = await User.findOrCreate({
      where: { emailId: req.body.email },
      defaults: {
        userName: req.body.username,
        emailId: req.body.email,
        phoneNo: req.body.phoneno,
        password: req.body.password,
        dateTime: new Date()
      }
    });
    if (!created) {
      const result = await User.update(
        {
          userName: req.body.username,
          emailId: req.body.email,
          phoneNo: req.body.phoneno,
          password: req.body.password,
          dateTime: new Date()
        },
        {
          where: {
            emailId: req.body.email,
            password: req.body.password
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
router.get("/user", async (req, res, next) => {
  try {
    const user = await User.findOne({
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
router.delete("/user", async (req, res, next) => {
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
