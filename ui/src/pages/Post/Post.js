import { useState, useEffect } from "react";
import "./Post.css";
import {
  Avatar,
  Paper,
  makeStyles,
  IconButton,
  InputBase,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function Post(props) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [likesArray, setLikesArray] = useState([]);
  const [currUserUsername, setCurrUserUsername] = useState("");

  const classes = useStyles();

  useEffect(() => {
    if (props.likes) {
      setLikesArray(props.likes);
      const user = JSON.parse(localStorage.getItem('user'));
      setCurrUserUsername(user.username);
      props.likes?.forEach((e) => {
        if (e == user.userName) {
          setLiked(true);
        }
      });
    }
    if (props.comment) {
      setComments(props.comment);
    }
  }, []);

  const likePost = () => {
    try {
      const data = {
        id: props.id,
        username: currUserUsername,
      };
      console.log(data);
      const token = localStorage.getItem('token');
      axios.post("/api/posts/likePost", data, {headers: {"auth-token": token}}).then((res) => {
        console.log(res.data.result.message);
        if (res.data.result) {
          if (res.data.result.message === "OK") {
            setLiked(!liked);
            setLikesArray([...likesArray, currUserUsername]);
          }
        } else {
          alert("something went wrong");
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  const disLikePost = () => {
    try {
      const data = {
        id: props.id,
        username: currUserUsername,
      };
      console.log(data);
      const token = localStorage.getItem('token');
      axios.post("/api/posts/disLikePost", data, {headers: {"auth-token": token}}).then((res) => {
        console.log(res.data.result.message);
        if (res.data.result) {
          if (res.data.result.message === "OK") {
            setLiked(!liked);
            let arr = likesArray;
            const index = arr.indexOf(currUserUsername);
            if (index > -1) {
              arr.splice(index, 1);
            }
            setLikesArray([...arr]);
          }
        } else {
          alert("something went wrong");
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  const submitComments = () => {
    try {
      const data = {
        id: props.id,
        comment: newComment,
      };
      console.log(data);
      const token = localStorage.getItem('token');
      axios.post("/api/posts/addComment", data, {headers: {"auth-token": token}}).then((res) => {
        console.log(res.data.result.message);
        if (res.data.result) {
          if (res.data.result.message) {
            setComments([...comments, newComment]);
            setNewComment("");
          } else {
            alert("comment fail");
          }
        } else {
          alert("something went wrong");
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className="post__container">
      <div className="post__header">
        <Avatar className="post__image" src="" />
        <div className="post__username">{props.userName}</div>
      </div>

      <div>
        <img src={props.img} width="615px" />
      </div>

      <div>
        <div style={{ marginLeft: "10px" }}>
          {liked ? (
            <IconButton onClick={disLikePost}>
              <FavoriteIcon className="post_reactimage" />
            </IconButton>
          ) : (
            <IconButton onClick={likePost}>
              <FavoriteBorderIcon className="post_reactimage" />
            </IconButton>
          )}
          <IconButton onClick={() => {}}>
            <ChatBubbleOutlineIcon className="post_reactimage" />
          </IconButton>
          <IconButton onClick={() => {}}>
            <SendIcon className="post_reactimage" />
          </IconButton>
        </div>
        <div style={{ fontWeight: "bold", marginLeft: "20px  " }}>
          {likesArray?.length} likes
        </div>
        <div style={{ fontWeight: "bold", marginLeft: "20px  " }}>
          {props.caption?props.caption:"Caption not available"} 
        </div>
      </div>

      <div>
        {comments?.map((item, index) => (
          <div className="post_comment">{item}</div>
        ))}
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="text"
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <IconButton
            className={classes.iconButton}
            aria-label="comment"
            onClick={submitComments}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
}
