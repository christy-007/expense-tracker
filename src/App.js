import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
