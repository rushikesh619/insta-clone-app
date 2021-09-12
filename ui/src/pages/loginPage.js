import React, { useState } from "react";
import {
  Card,
  CardHeader,
  TextField,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import logoinsta from "../src/images/logoinsta.png"
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const useStyles = makeStyles({
  signUpCard: {
    maxWidth: 348,
    padding: "16px 40px",
    marginBottom: 10,
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: "2fr 1fr",
  },
  card: {
    maxWidth: 348,
    padding: "16px 40px",
    marginBottom: 10,
  },
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
  textField: {
    marginBottom: 6,
  },
  button: {
    margin: "8px 0px",
  },
  typography: {
    margin: "10px 0px",
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
  facebookIcon: {
    height: 16,
    width: 16,
    marginRight: 8,
  },
});

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const handleClick = () => {
    var data = {
      username: username,
      password: password,
    };
    axios.post("/api/users/login", data).then((response) => {
      if (response.data) {
        console.log(response.data.user);
        if (response.data.token) {
          for (const i in response.data) {
              localStorage.setItem(i, JSON.stringify(response.data[i]));
              cookies.set(i, JSON.stringify(response.data[i]), { path: '/' });
          }
        }
      }
    });
  };

  return (
    <>
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} />
            <form action="">
              <TextField
                fullWidth
                variant="outlined"
                label="Phone number, username, or email"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                fullWidth
                onClick={handleClick}
              >
                Log In
              </Button>
            </form>
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <Button fullWidth color="secondary">
              <Typography variant="caption">Forgot password?</Typography>
            </Button>
          </Card>
          <Card className={classes.signUpCard}>
            <Typography align="right" variant="body2" fullWidth>
              Don't have an account?
              <Link to="/signup">
                <Button color="primary" className={classes.signUpButton}>
                  Sign up
                </Button>
              </Link>
            </Typography>
          </Card>
        </article>
      </section>
    </>
  );
}

export default LoginPage;
