
import { useDispatch, useSelector } from "react-redux";
import { SignUpApi } from "../Redux/Slices/AuthSlice";
import { Grid, Paper, Typography, Avatar, TextField, Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const paperStyle = {
    padding: '30px 20px',
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
    username: "",
    email: "",
    password: "",
    contact: "",
    address: "",
  });

  const { onLoad } = useSelector((state) => state.Auth);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setAuthstate({ ...authstate, [name]: value });
  };

  const notifySuccess = () => toast.success("Account created successfully!");
  const notifyError = (message) => toast.error(message);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const dataToEncrypt = {
      username: authstate.username,
      email: authstate.email,
      password: authstate.password,
      contact: authstate.contact,
      address: authstate.address,
    };

    if (dataToEncrypt?.email && dataToEncrypt?.password && dataToEncrypt?.username && dataToEncrypt?.contact && dataToEncrypt?.address) {
      try {
       const data= await dispatch(SignUpApi(dataToEncrypt));
       if(data){
          notifySuccess();
          navigate("/login");

        }
      } catch (error) {
        notifyError("Error creating account. Please try again.");
      }
    } else {
      notifyError("Fill in all details");
    }
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
          </Grid>
          <Typography variant="h4" color="initial" style={headerStyle}>
            Sign Up
          </Typography>
          <Typography variant="caption" color="initial">
            Please fill this form to create an account.
          </Typography>

          {/* form */}
          <form>
            
        
            <TextField
              fullWidth
               required
              placeholder="Enter Your Name"
              id="standard-basic"
              label="UserName"
              variant="standard"
              name="username"
              value={authstate?.username}
              onChange={handelChange}
            />
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
            <TextField
              fullWidth
              required
              placeholder="Enter Your Contact"
              id="standard-basic"
              label="Contact"
              variant="standard"
              name="contact"
              value={authstate.contact}
              onChange={handelChange}
            />
            <TextField
              fullWidth
              multiline
              required
              placeholder="Enter Your Address"
              id="standard-basic"
              label="Address"
              variant="standard"
              name="address"
              value={authstate.address}
              onChange={handelChange}
            />

            
         
            
            
            <Button variant="contained" style={{ margin: 10 }} color="success" onClick={handelSubmit} disabled={onLoad}>
              {onLoad ? "Submitting..." : "Submit"}
            </Button>
          </form>

          <Typography variant="body1" color="inherit" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              Already Have An Account?
            </Link>
          </Typography>
        </Paper>
      </Grid>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}
