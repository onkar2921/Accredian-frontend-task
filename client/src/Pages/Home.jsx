import { useDispatch, useSelector } from "react-redux";
import { GetUserDataApi } from "../Redux/Slices/AuthSlice";

import Navbar from "../Components/Navbar";
import Container from "@mui/material/Container";
import {

  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  

  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      await dispatch(GetUserDataApi());
      toast.success("User data fetched successfully!");
    } catch (error) {
      toast.error("Error fetching user data. Please try again.");
    }
  };

  const state = useSelector((state) => state);
  console.log("state", state?.Auth);

  const cardStyle = {
    maxWidth: 400,
    margin: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    
  };

  const contentStyle = {
    padding: "16px",
  };

  return (
    <>
     
        <Container>
          <Navbar />
        </Container>



        {/* image */}
        <Container maxWidth="lg" justifyContent="center"  style={{ backgroundColor: "#faf3dd",marginTop:"50px" ,padding:"10px" }} >
  <Grid container spacing={3} justifyContent="center"    alignItems="center">
    <Grid item xs={12} md={6}>
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://t3.ftcdn.net/jpg/00/59/34/62/500_F_59346269_nNDRfHBrwsKjqW4haPVvopb1i3Z5THJ6.jpg"
        alt="man with laptop"
      />
    </Grid>
    <Grid item xs={12} md={6}>
      {/* loading */}{
        state.Auth.loading && (
          <>
          <Grid style={{ width: "100%",display:"flex",justifyContent:"center", alignItems:"center" }}>
            <CircularProgress />

          </Grid>
          </>
        )
      }
      {state?.Auth?.userName && (
        <Card style={cardStyle}>
          <CardContent style={contentStyle}>
            {state?.Auth ? (
              <>
                <Avatar
                  alt="User Avatar"
                  src="/avatar.jpg"
                  sx={{ width: 80, height: 80, marginBottom: 2 }}
                />
                <Typography variant="h5" component="div" gutterBottom>
                  {state?.Auth?.userName}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Email: {state?.Auth?.email}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Contact: {state?.Auth?.contact}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Address: {state?.Auth?.address}
                </Typography>
              </>
            ) : (
              <CircularProgress />
            )}
          </CardContent>
        </Card>
      )}
    </Grid>
  </Grid>

  <Grid align="center">
    <Button
      variant="contained"
      color="primary"
      onClick={getUser}
      style={{ marginTop: "20px" }}
    >
      Get User Data
    </Button>
  </Grid>
</Container>

        <ToastContainer position="top-right" autoClose={5000} />
      
    </>
  );
}
