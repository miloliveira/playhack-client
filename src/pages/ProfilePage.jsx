import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
function ProfilePage() {

  const { isLoggedIn, user}= useContext(AuthContext);
  const [thisUser, setThisUser] = useState(null);
const{userId}= useParams()
  const getUser = async () => {
    try {
      /* const getToken = localStorage.getItem("authToken"); */
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`/* , {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      } */);
      setThisUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);


  return (<div>
    {thisUser && 
  <>
  <div>
   <h2>{thisUser.name}</h2>
   <h2>bio: {thisUser.bio}</h2>
   <h4>cohort: {thisUser.cohort}</h4>
   <h4>cohort type:{thisUser.cohortType}</h4>
   <h4>campus: {thisUser.campus}</h4>
   <img src={thisUser.imageUrl} alt="profile img"
   />   
</div>
<div>
  {thisUser.games.map((userGame)=>{
    return(
      <div key={userGame._id}>
      <Link to={`/playing/${userGame._id}`}><p>{userGame.title}</p>
        <img src={userGame.imageUrl} alt="game-img"/></Link>
      
      {user._id === userId && 
      <Link to={`/edit-game/${userGame._id}`}><button>Edit</button></Link>}
      </div>
    )
  })}
</div>
<div>

{thisUser.likedGames.map((likedGame)=>{
    return(
      <div key={likedGame._id}>
        <img src={likedGame.thumbnail} alt="game-img"/>
      </div>
    )
  })}



</div>

   </>






    }
    </div>)
}

export default ProfilePage