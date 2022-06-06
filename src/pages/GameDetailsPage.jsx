import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../context/auth.context';

import { Link, useParams } from "react-router-dom";
import CreateComments from "../Components/CreateComments";
import ViewComments from "../Components/ViewComments";

function GameDetailsPage() {
  const { isLoggedIn}= useContext(AuthContext);
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
  }, [gameId]);

  return (
    <div className="gameDetailsBody">
      {game && (
        <>
          <h2>{game.title}</h2>
          <Link to={`/profile/${game.user._id}`}>
            <h4>Submited by: {game.user.name}</h4>
          </Link>
          <p>{game.description}</p>
          {game.category.map((cat)=> <p>{cat}</p> )}
         
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
          
          <ViewComments gameId={game._id} />
          {isLoggedIn &&  
          <CreateComments gameId={game._id} />
          }
        </>
      )}
    </div>
  );
}

export default GameDetailsPage;
