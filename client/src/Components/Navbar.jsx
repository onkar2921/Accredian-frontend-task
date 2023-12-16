import { Container, Toolbar, Divider, Button, Typography } from "@mui/material";


import { useNavigate } from "react-router-dom";






export default function Navbar() {
  


const navigate=useNavigate()



  const handelLogout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
        navigate("/login")
}



  return (
    <Container>
      <Toolbar style={{display:"flex",justifyContent:"space-between", alignItems:"center"}} >
        
        <Typography variant="h6"  color="inherit">
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
