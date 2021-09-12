const router = require("express").Router();
const userService = require("../services/userService");
const auth = require('./auth')

router.get("/", auth,(req,res) => {
    console.log(req.user);
    res.json({
        posts:{
            title:"my first post",
            discription:"baba ka dhabha"
        }
    })
})

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    if (req.body) {
      if (req.body.username && req.body.password) {
        const data = req.body;
        let result = await userService.createUser(data);
        {
          result.message
            ? res
                .status(200)
                .json({ user: null, success: false, message: result.message })
            : res
                .status(200)
                .json({ user: result, success: true, message: "OK" });
        }
      } else {
        throw {
          message: "Not allowd!",
        };
      }
    } else {
      throw {
        message: "username and password required",
      };
    }
  } catch (ex) {
    console.log(ex);
    res.status(200).json({
      success: false,
      ...ex,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    if (!req.body.username || !req.body.password)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    let result = await userService.login(req.body);
    console.log(result)
    res.status(200).header('auth-token', result.token).json(result);
    // res.header('auth-token', result.token).send(result.token);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// router.post("/logout", passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.clearCookie('access_token');
//     res.json({ success: true });
// });

module.exports = router;
