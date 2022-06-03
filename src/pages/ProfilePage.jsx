import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ProfilePage() {


  const [user, setUser] = useState(null);
const{userId}= useParams()
  const getUser = async () => {
    try {
      /* const getToken = localStorage.getItem("authToken"); */
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`/* , {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      } */);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);


  return (<div>
    {user && 
  <>
  <div>
   <h2>Hello {user.name}</h2>
   <h2>bio: {user.bio}</h2>
   <h4>cohort: {user.cohort}</h4>
   <h4>cohort type:{user.cohortType}</h4>
   <h4>campus: {user.campus}</h4>
   <img src={user.imageUrl} alt="profile img"
   />   
</div>
<div>
  {user.games.map((userGame)=>{
    return(
      <div key={userGame._id}>
      <p>{userGame.title}</p>
        <img src={userGame.thumbnail} alt="game-img"/>
      </div>
    )
  })}
</div>
<div>

{user.likedGames.map((likedGame)=>{
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