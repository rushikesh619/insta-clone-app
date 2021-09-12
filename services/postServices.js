const Post = require("../modals/postModal");
const cloudinary = require("cloudinary").v2;

const createPost = async (doc) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const output = cloudinary.uploader.upload(
    doc.img.tempFilePath,{folder: 'images'},
     async (err, result) => {
      if (result) {

          let post = new Post({
            img: result.url,
            caption: doc.caption,
            username: doc.username,
            date: doc.date,
            time: doc.time,
          });
          
          post = await post.save();
          const response = {
            message: "OK",
            result: post
          }
          console.log(response);
          return response;
      } else {
        console.log(err);
        const response = {
          message: "unable to add post",
          result: err,
        };
        console.log(response);
        return response;
      }
    }
  );

  // console.log(output)

  // if(output.message ==="OK"){
  //   let post = new Post({
  //     img: output.result.url,
  //     caption: doc.caption,
  //     username: doc.username,
  //     date: doc.date,
  //     time: doc.time,
  //   });
  //   post = await post.save();
  //   const response = {
  //     message: "OK",
  //     result: post
  //   }
  //   console.log(post);
  //   return response; 
  // }

  return output;
};

const getAllPosts = async () => {
  try {
    let posts = await Post.find({});
    return posts;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

const addComment = async (doc) => {
  try {
    console.log(doc);
    const result = await Post.updateOne(
      { _id: doc.id },
      { $push: { comments: doc.comment } }
    );
    if (result.modifiedCount) {
      const output = { message: "OK", result: result };
      return output;
    } else {
      const output = { message: "something went wrong" };
      return output;
    }
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

const likePost = async (doc) => {
  try {
    const result = await Post.updateOne(
      { _id: doc.id },
      { $push: { likes: doc.username } }
    );
    if (result.modifiedCount) {
      const output = { message: "OK", result: result };
      return output;
    } else {
      const output = { message: "something went wrong" };
      return output;
    }
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

const disLikePost = async (doc) => {
  try {
    const post = await Post.findOne({ _id: doc.id });
    let newLikes = [];
    newLikes = post.likes.filter((e) => {
      if (e !== doc.username) {
        return true;
      } else {
        return false;
      }
    });
    console.log(newLikes);
    const result = await Post.updateOne({ _id: doc.id }, { likes: newLikes });
    if (result.modifiedCount) {
      const output = { message: "OK", result: result };
      return output;
    } else {
      const output = { message: "something went wrong" };
      return output;
    }
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

module.exports = {
  createPost,
  getAllPosts,
  addComment,
  likePost,
  disLikePost,
};
