import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import AllGamesPage from "./Pages/AllGamesPage";
import GameDetailsPage from "./Pages/GameDetailsPage";
import SubmitGamePage from "./Pages/SubmitGamePage";
import EditGamePage from "./Pages/EditGamePage";
import ProfilePage from "./Pages/ProfilePage";
import EditProfilePage from "./Pages/EditProfilePage";
import IsPrivate from "./Components/IsPrivate";
import IsPublic from "./Components/IsPublic";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/games" element={<AllGamesPage />} />

        <Route path="/playing/:gameId" element={<GameDetailsPage />} />

        <Route path="/submit-game/:userId" element={<SubmitGamePage />} />

        <Route path="/edit-game/:gameId" element={<EditGamePage />} />

        <Route path="/profile/:userId" element={<ProfilePage />} />

        <Route path="/edit-profile/:userId" element={<EditProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
