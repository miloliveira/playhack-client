import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllGamesPage() {
  const [games, setGames] = useState([]);

  const getAllGames = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/games`);
      setGames(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <div>
      {games.map((game) => {
        return (
          <div key={game._id}>
            <Link to={`/playing/${game._id}`}>
              <img src={game.thumbnail} alt="game thumbnail" />
              <h2>{game.title}</h2>
            </Link>
            <Link to={`/profile/${game.user}`}>
              <h3>user name here:{game.user}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default AllGamesPage;
