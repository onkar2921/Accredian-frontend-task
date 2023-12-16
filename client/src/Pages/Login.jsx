
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginApi } from "../Redux/Slices/AuthSlice";
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton, Container,
} from "@mui/material";

import { Fingerprint } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { onLoad } = useSelector((state) => state.Auth);

  const paperStyle = {
    padding: "30px 20px",
    width: 300,
    margin: "20px auto",
  };

  const headerStyle = {
    margin: 0,
  };

  const avatarStyle = {
    backgroundColor: "#1bbd7e",
  };

  const [authstate, setAuthstate] = useState({
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setAuthstate({ ...authstate, [name]: value });
  };

  const notifySuccess = () => toast.success("Wow, login successful!");
  const notifyError = (message) => toast.error(message);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const dataToEncrypt = {
      email: authstate.email,
      password: authstate.password,
    };

    if (dataToEncrypt?.email && dataToEncrypt?.password) {
      try {
        const data = await dispatch(LoginApi(dataToEncrypt));

        if (data.payload?.exist.length > 0) {
          notifySuccess();
        }
         navigate("/", { replace: true });
         window.location.replace("/")
      } catch (error) {
        notifyError("Error logging in. Please try again.");
      }
    } else {
      notifyError("Fill all details");
    }
  };

  
  const [isEmailValid, setIsEmailValid] = useState(true);
  
  const validateEmail = () => {
    const isValid = /\S+@\S+\.\S+/.test(authstate.email);
    setIsEmailValid(isValid);
    if (!isValid) {
      notifyError("Enter a valid email address");
    }
  };

  return (
    <>
      <Container maxWidth="lg" style={{display:"flex",justifyContent:"center", alignItems:"center", height: "100vh",}}>
        
     
      <Grid container alignContent="center" justifyContent="center">
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <IconButton aria-label="fingerprint" color="success">
                <Fingerprint />
              </IconButton>
            </Avatar>
          </Grid>
          <Typography variant="h4" color="initial" style={headerStyle}>
            Login
          </Typography>
          <Typography variant="caption" color="initial">
            Please fill this form to login.
          </Typography>

          {/* form */}
          <form>
          <TextField
        fullWidth
        placeholder="Enter Your Email"
        required
        id="standard-basic"
        label="Email"
        variant="standard"
        type="email"
        name="email"
        value={authstate.email}
        onChange={handelChange}
        onBlur={validateEmail} 
        error={!isEmailValid}
      /> 
            <TextField
              fullWidth
              required
              placeholder="Enter Your Password"
              id="standard-basic"
              label="Password"
              type="password"
              variant="standard"
              name="password"
              value={authstate.password}
              onChange={handelChange}
            />

            <Button
              variant="contained"
              style={{ margin: 10 }}
              color="success"
              onClick={handelSubmit}
              disabled={onLoad}
            >
              {onLoad ? "Logging In..." : "Submit"}
            </Button>
          </form>
          <Typography variant="body1" color="inherit">
            <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
              Create A New Account
            </Link>
          </Typography>
        </Paper>
      </Grid>
      </Container>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}
