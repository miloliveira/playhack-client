import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AllGamesPage from './pages/AllGamesPage';
import GameDetailsPage from './pages/GameDetailsPage';
import SubmitGamePage from './pages/SubmitGamePage';
import EditGamePage from './pages/EditGamePage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import IsPrivate from "./components/IsPrivate"
import IsPublic from "./components/IsPublic"

function App() {
  return (
    <div className="App">
    <NavBar/>
    <Routes>
   
    <Route path="/" element={<HomePage />} />

<Route path="/signup" element={<SignupPage/>} />

<Route path="/login" element={<LoginPage/>} />

<Route path="/games" element={<AllGamesPage/>} />

<Route path="/playing/:gameId" element={<GameDetailsPage/>} />

<Route path="/submit-game" element={<SubmitGamePage/>} />

<Route path="/edit-game" element={<EditGamePage/>} />

<Route path="/profile/:userId" element={
  
<ProfilePage/>

} />

<Route path="/edit-profile/:userId" element={<EditProfilePage/>} />

    </Routes>
    </div>
  );
}

export default App;
