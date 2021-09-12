import React, { useState } from "react";
import {
  Card,
  TextField,
  Button,
  Typography,
  makeStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";
import logoinsta from "../src/images/logoinsta.png";
import axios from "axios";
import Cookies from 'universal-cookie';


const useStyles = makeStyles({
        card: { maxWidth: 348, padding: "16px 40px", marginBottom: 10 },
        section: {
          display: "grid",
          placeItems: "center",
          height: "100vh",
        },
        cardHeader: {
          backgroundImage: `url(${logoinsta})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "-98px 0",
          height: 51,
          width: 175,
          margin: "22px auto 12px",
        },
        cardHeaderSubHeader: {
          textAlign: "center",
          fontWeight: "bold !important",
          lineHeight: 1.2,
          color: "#999",
          margin: "0 0 20px",
        },
        textField: {
          marginBottom: 6,
        },
        button: {
          margin: "10px 0px 16px 0px",
        },
        orContainer: {
          margin: "10px 0px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gridGap: 18,
          placeItems: "center",
        },
        orLine: {
          justifySelf: "stretch",
          height: 1,
          background: "#e6e6e6",
        },
        loginCard: {
          maxWidth: 348,
          padding: "16px 40px",
          marginBottom: 10,
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "3fr 2fr",
        },
        loginButton: {
          justifySelf: "start",
        },
});

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");

  const handleClick = () =>{
    const data = {
      username: username,
      password: password,
      email: email,
      fullname: fullname
    }
    axios.post("/api/users/register", data).then((response) => {
      console.log(response.data);
      if (response.data.message === "OK") {
        window.location.replace('/login');
    }
    });
  }

  const classes = useStyles();

  return (
    <>
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <div className={classes.cardHeader} />
            <Typography className={classes.cardHeaderSubHeader}>
              Sign up to see photos and videos from your friends.
            </Typography>
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <form action="">
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                type="email"
                margin="dense"
                className={classes.textField}
                onChange={(e)=>{setEmail(e.target.value);}}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Full Name"
                margin="dense"
                className={classes.textField}
                onChange={(e)=>{setFullname(e.target.value);}}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Username"
                margin="dense"
                className={classes.textField}
                onChange={(e)=>{setUsername(e.target.value)}}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
                margin="dense"
                className={classes.textField}
                autoComplete="new-password"
                onChange={(e)=>{setPassword(e.target.value)}}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                fullWidth
                onClick={handleClick}
              >
                Sign Up
              </Button>
            </form>
          </Card>
          <Card className={classes.loginCard}>
            <Typography align="right" variant="body2" fullWidth>
              Have an account?
              <Link to="/">
                {" "}
                <Button color="primary" className={classes.loginButton}>
                  Log In
                </Button>
              </Link>
            </Typography>
          </Card>
        </article>
      </section>
    </>
  );
}

export default SignUpPage;