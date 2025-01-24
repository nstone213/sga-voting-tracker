import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignInPage from "./pages/signinpage/SignInPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;