import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import TopNavigation from "./components/TopNavigation";
import Holidays from "./components/Holidays";
import Messages from "./components/Messages";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}>Login</Route>
        <Route path="/signup" element={<Signup/>}>Signup</Route>
        <Route path="/dashboard" element={<Dashboard/>}>Dashboard</Route>
        <Route path="/tasks" element={<Tasks/>}>Tasks</Route>
        <Route path="/topNavigation" element={<TopNavigation/>}>TopNavigation</Route>
        <Route path="/holidays" element={<Holidays/>}>Holidays</Route>
        <Route path="/messages" element={<Messages/>}>Messages</Route>
        <Route path="/editProfile" element={<EditProfile/>}>EditProfile</Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
