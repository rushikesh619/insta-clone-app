import React, { Component } from "react";
import "./MainPage.css";
import uploadImage from "../../images/upload.png";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Post from "../Post/Post";
import axios from "axios";

class MainPage extends Component {
  constructor(props) {
    super(props);
    let user;
    if (localStorage.user) {
      user = JSON.parse(localStorage.user);
    }
    this.state = {
      user: user,
      postArray: [],
      progressBar: "",
      visible: false,
      postImg: null,
      caption: "",
    };
  }

  componentDidMount() {
    this.getPost();
  }

  getPost = () => {
    try {
      const token = localStorage.getItem('token');
      axios.get("/api/posts/getAllPosts", {headers: {"auth-token": token}}).then((res) => {
        console.log(res.data.result);
        if (res) {
          this.setState({ postArray: res.data.result });
        } else {
          console.log("not able to get posts");
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  upload = () => {
    let data = new FormData();
    data.append("file", this.state.postImg);
    data.set("caption", this.state.caption);
    data.set("username", this.state.user.username);

    console.log(data);
    const token = localStorage.getItem('token');
    axios
      .post(`/api/posts/createPost/${this.state.user._id}`, data, {
        headers: {
          "content-type": "multipart/form-data",
          "auth-token": token
        },
      })
      .then((response) => {
        if (response.data) {
          window.location.reload();
        }
      });
  };

  render() {
    return (
      <div>
        <div className="mainpage__container">
          <div className="mainpage__divider"></div>
          <div className="fileupload">
            <button     
                id="file-upload"
              onClick={() => {
                const value = !this.state.visible;
                this.setState({ visible: value });
              }}>
              <img className="mainpage__uploadicon" src={uploadImage} />
            </button>
          </div>
          <div className="mainpage__divider"></div>
        </div>
        <div className="upload_text">{this.state.progressBar}</div>
        {console.log(this.state.postArray)}
        {this.state.postArray.map((item, index) => (
          <Post
            id={item._id}
            userName={item.username}
            comment={item.comments}
            caption={item.caption}
            img={item.img}
            likes={item.likes}
          />
        ))}
        <Dialog
          fullWidth="sm"
          open={this.state.visible}
          onClose={() => {
            const value = !this.state.visible;
            this.setState({ visible: value });
          }}
          aria-labelledby="post-model"
        >
          <DialogTitle id="form-dialog-title">Upload Post</DialogTitle>
          <DialogContent>
            <input
              type="file"
              onChange={(e) => {
                this.setState({ postImg: e.target.files[0] });
                console.log(e.target.files[0]);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="caption"
              label="Enter Caption"
              type="string"
              fullWidth
              onChange={(e) => {
                this.setState({ caption: e.target.value });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                const value = !this.state.visible;
                this.setState({ visible: value });
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button type="Submit" onClick={this.upload} color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default MainPage;



