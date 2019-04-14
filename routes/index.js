const router = require('express').Router();
const User = require('../models').User
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* POST req to create/update user */

router.post('/', (req, res, next) => {

  User
    .findOrCreate({
      where: { username: 'sdepold' }, defaults: {
        userName: req.body.username,
        emailId: req.body.email,
        phoneNo: req.body.phoneno,
        password: req.body.password,
      }
    })
  .then(([user, created]) => {
    console.log(user.get({
      plain: true
    }))
    console.log(created)
  })
  res.send(req.body)
})

module.exports = router;
