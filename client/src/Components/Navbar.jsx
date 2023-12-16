import { Container, Toolbar, Divider, Button, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "space-between",
    backgroundColor:"#a8dadc"
  },
  icon: {
    color: "white", 
  },
}));





export default function Navbar() {
  const classes = useStyles();


const navigate=useNavigate()



  const handelLogout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
        navigate("/login")
}



  return (
    <Container>
      <Toolbar className={classes.toolbar}>
        
        <Typography variant="h6" className={classes.title} color="inherit">
          Auth Demo
        </Typography>

       <Button variant="contained"
          color="error"
          onClick={handelLogout}
          style={{ marginTop: "20px",marginBottom:"10px"}} >Logout</Button>
      </Toolbar>
      <Divider />
     
    </Container>
  );
}
