import "./App.css";
import Register from "./components/Register";
import Display from "./components/Display";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" Component={Register} exact />
          <Route path="/display" Component={Display} exact />
          <Route path="/" Component={Home} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
