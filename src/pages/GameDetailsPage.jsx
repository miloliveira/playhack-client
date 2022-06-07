import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

import { Link, useParams } from "react-router-dom";
import CreateComments from "../components/CreateComments";
import ViewComments from "../components/ViewComments";

function GameDetailsPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [game, setGame] = useState(null);
  const [isUpdated, setIsUpdated] = useState(true);
  const { gameId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const getToken = localStorage.getItem("authToken");

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

  const likeGame = async (gameId) => {
    try {
      if (isLiked === false){
        await axios.put(
          `${process.env.REACT_APP_API_URL}/game/${gameId}/like`,
          {
            headers: {
              Authorization: `Bearer ${getToken}`,
              "Content-Type":"application/json"
            },
          }
        )
        setIsLiked(true)
      } else {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/game/${gameId}/dislike`,
          {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          }
        )
        setIsLiked(false)
      }
    } catch (error) {
      console.log(error)
    }
    
  };

  useEffect(() => {
    getGame();
  }, [gameId]);

  return (
    <div className="gameDetailsBody">
      {game && (
        <>
          <h2>{game.title}</h2>
          <button onClick={() => likeGame(game._id)}>
            like
          </button>
          <Link to={`/profile/${game.user._id}`}>
            <h4>Submited by: {game.user.name}</h4>
          </Link>
          <p>{game.description}</p>
          {game.category.map((cat) => (
            <p key={cat}>{cat}</p>
          ))}

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

          <ViewComments
            gameId={game._id}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
          />
          {isLoggedIn && (
            <CreateComments
              gameId={game._id}
              isUpdated={isUpdated}
              setIsUpdated={setIsUpdated}
            />
          )}
        </>
      )}
    </div>
  );
}

export default GameDetailsPage;
