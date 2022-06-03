import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function GameDetailsPage() {
  const [game, setGame] = useState(null);

  const { gameId } = useParams();

  const getGame = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/game/${gameId}`
      );
      setGame(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGame();
  }, []);

  return (
    <div className="gameDetailsBody">
      {game && (
        <>
          <h2>{game.title}</h2>
          <Link to={`/profile/${game.user._id}`}>
            <h4>{game.user.name}</h4>
          </Link>
          <p>{game.description}</p>
          <button>
            <a href={game.gameUrl} target="_blank" rel="noreferrer">
              Play in full screen
            </a>
          </button>
          <div id="wrapper">
            <iframe
              id="scaled-frame"
              src={game.gameUrl}
              title={game.title}
            ></iframe>
          </div>
        </>
      )}
    </div>
  );
}

export default GameDetailsPage;
