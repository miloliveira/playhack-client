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
            <p>{user.username}</p>
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