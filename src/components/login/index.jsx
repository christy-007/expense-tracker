import { useState } from "react";
import { Paper, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import a CSS file for additional styling

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(e) {
    e.preventDefault();
    if (email === "christy@gmail.com" && password === "123456") {
      localStorage.setItem("login", "true");
      navigate("/");
    } else {
      alert("Your username or password is incorrect");
    }
  }

  return (
    <div className="login-container">
      <Paper
        elevation={4}
        square={false}
        p={10}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          maxWidth: "400px",
          width: "100%",
          padding: "50px",
          boxSizing: "border-box",
        }}>
        <h1 className="login-header">TRACKER Login</h1>

        <TextField
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          value={email}
          label="Email"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          label="Password"
          variant="outlined"
        />
        <Button
          onClick={(e) => login(e)}
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "#8EC5FC",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#E0C3FC",
              color: "#3c52b2",
            },
          }}
          className="login-button">
          Submit
        </Button>
      </Paper>
    </div>
  );
}

export default Login;
