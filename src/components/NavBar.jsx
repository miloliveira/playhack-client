import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';


function NavBar() {
    const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

    return (
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
  
        {isLoggedIn && (
          <>
          <Link to="/games">
                <button>Games</button>
            </Link>
            <Link to={`/profile/${user._id}`}>
              <button>Profile</button>
            </Link>
            <Link to="/" ><button onClick={logoutUser}>Logout</button></Link>
            <Link to={`/edit-profile/${user._id}`}><button>Edit your profile</button></Link>
            <Link to={`/submit-game/${user._id}`}><button>Submit a game</button></Link>
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
      </nav>
    );
}

export default NavBar