import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function NavBar() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

  return (
    <nav>
    <div className="navLeft">
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/games">
        <button>Games</button>
      </Link>
      </div>

<div className="navRight">
      {isLoggedIn && (
        <>

          <Link to={`/submit-game/${user._id}`}>
            <button>Submit a game</button>
          </Link>
      
      <div class="dropdown">
        <button class="dropbtn">
          <img className="navUser" src="https://res.cloudinary.com/dzwl5teme/image/upload/v1654704986/playHack/2_pfemvl.png" alt="user"/>
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
  
        <Link to={`/profile/${user._id}`}>
            <button className="dropLink">profile</button>
          </Link>

          <Link to={`/edit-profile/${user._id}`}>
            <button className="dropLink">settings</button>
          </Link>

          <Link to="/">
            <button className="dropLink" onClick={logoutUser}>logout</button>
          </Link>
        </div>
      </div>
      </>
      )}


      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/games">
            <button>Games</button>
          </Link>
        </>
      )}
      </div>
    </nav>
  );
}

export default NavBar;
