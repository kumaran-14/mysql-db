const router = require("express").Router();
const User = require("../models").User;
/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* POST req to create/update user */
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
        { where: { emailId: req.body.email } }
      );
      return res.status(201).json({
        body: {
          message: 'Resource successfully updated',
          data: result
        },
        error: {}
      })
    }
    return res.status(201).json({
      body: {
        message: 'Resource successfully created',
        data: user
      },
      error : {}
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      body: { },
      error: 'Please try again later'
    })
  }
  // .then(result =>
  //   handleResult(result)
  // )
  // .catch(err =
  //   handleError(err)
  // )
  // .then(([user, created]) => {
  //   console.log(user.get({
  //     plain: true
  //   }))
  //   console.log(created)
  // })
});

module.exports = router;
