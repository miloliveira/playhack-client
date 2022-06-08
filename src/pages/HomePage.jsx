import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [mostPlayed, setMostPlayed] = useState([]);
  const [mostLiked, setMostLiked] = useState([]);

  const getAllGames = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/games`);

      let gamesCopy = await [...response.data];
      let gamesCopy2 = await [...response.data];

      setMostPlayed(
        await gamesCopy
          .sort((a, b) => b.timesPlayed - a.timesPlayed)
          .slice(0, 5)
      );

      setMostLiked(
        await gamesCopy2
          .sort((a, b) => b.likes.length - a.likes.length)
          .slice(0, 5)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <div className="homePageBody">


<div className="bgVideo">
<h1>A gaming hub from ironhackers to ironhackers</h1>
<div className="homeCard"></div>
</div>

<div className="mostHeader">
      <h3>Most Played Games</h3>
      </div>

<div className="mostPlayedGames">
      {mostPlayed &&
        mostPlayed.map((game) => {
          return (
            <div key={game._id} className="eachGame">
            <Link to={`/playing/${game._id}`} className="eachGameLink">
            <div className="eachGameThumbnailDiv">
              <img src={game.imageUrl} alt="game thumbnail" id="eachGameThumbnail"  />
              </div>
              <h5>{game.title}</h5>
            </Link>
            <Link to={`/profile/${game.user._id}`} className="gameUserInfoLink">
            
            <img src={game.user.imageUrl} alt="user profile pic" id="GameUserProfilePic" />
              <p>{game.user.name}</p>
              
            </Link>
          </div>
          );
        })}
</div>

<div className="mostHeader">
      <h3>Most Liked Games</h3>
      </div>
<div className="mostLikedGames">
      {mostLiked &&
        mostLiked.map((game) => {
          return (
            <div key={game._id} className="eachGame">
            <Link to={`/playing/${game._id}`} className="eachGameLink">
            <div className="eachGameThumbnailDiv">
              <img src={game.imageUrl} alt="game thumbnail" id="eachGameThumbnail"  />
              </div>
              <h5>{game.title}</h5>
            </Link>
            <Link to={`/profile/${game.user._id}`} className="gameUserInfoLink">
            
            <img src={game.user.imageUrl} alt="user profile pic" id="GameUserProfilePic" />
              <p>{game.user.name}</p>
              
            </Link>
          </div>
          );
        })}
        </div>



    </div>
  );
}

export default HomePage;
