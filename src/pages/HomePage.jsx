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
</div>

      <h3>Most Played Games</h3>
<div className="mostPlayedGames">
      {mostPlayed &&
        mostPlayed.map((game) => {
          return (
            <div key={game._id}>
              <Link to={`/playing/${game._id}`}>
                <img src={game.imageUrl} alt="game thumbnail" />
                <h2>{game.title}</h2>
              </Link>
            </div>
          );
        })}
</div>

      <h3>Most Liked Games</h3>
<div className="mostLikedGames">
      {mostLiked &&
        mostLiked.map((game) => {
          return (
            <div key={game._id}>
              <Link to={`/playing/${game._id}`}>
                <img src={game.imageUrl} alt="game thumbnail" />
                <h2>{game.title}</h2>
              </Link>
            </div>
          );
        })}
        </div>
    </div>
  );
}

export default HomePage;
