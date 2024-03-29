const router = require("express").Router();
const postServcices = require("../services/postServices");
const authFun = require("./auth");

router.get("/getAllPosts", authFun, async (req, res) => {
  try {
    const result = await postServcices.getAllPosts();
    console.log(result);
    res.status(200).json({ result: result });
  } catch (ex) {
    console.log(ex);
    res.status(400).json(ex);
  }
});

router.post("/addComment", authFun, async (req, res) => {
  try {
    console.log(req.body);
    const result = await postServcices.addComment(req.body);
    console.log(result);
    res.status(200).json({ result: result });
  } catch (ex) {
    console.log(ex);
    res.status(400).json(ex);
  }
});

router.post("/likePost", authFun, async (req, res) => {
  try {
    const result = await postServcices.likePost(req.body, req.user.username);
    res.status(200).json({ result: result });
  } catch (ex) {
    console.log(ex);
    res.status(400).json(ex);
  }
});

router.post("/disLikePost", authFun, async (req, res) => {
  try {
    const result = await postServcices.disLikePost(req.body, req.user.username);
    res.status(200).json({ result: result });
  } catch (ex) {
    console.log(ex);
    res.status(400).json(ex);
  }
});

router.post("/createPost/:id", authFun, async (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  var today = new Date(),
    time = today.getHours() + ":" + today.getMinutes();

  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const doc = {
    img: req.files.file,
    caption: req.body.caption,
    username: req.body.username,
    date: date,
    time: time,
  };
  console.log(doc);
  try {
    const result = await postServcices.createPost(doc);
    console.log("finishd creating post")
    console.log(result);
      res.status(200).json({ result: result });
  } catch (ex) {
    console.log(ex);
    res.status(400).json(ex);
  }
});

module.exports = router;
