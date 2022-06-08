import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

import { Link, useParams } from "react-router-dom";
import CreateComments from "../components/CreateComments";
import ViewComments from "../components/ViewComments";

function GameDetailsPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
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
      console.log(response.data.likes.includes(user._id));
      if (response.data.likes.includes(user._id)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likeGame = async (gameId) => {
    if (isLiked === false) {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/game/${gameId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setIsLiked(true);
    } else {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/game/${gameId}/dislike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setIsLiked(false);
    }
    getGame();
  };

  useEffect(() => {
    getGame();
  }, [gameId]);

  function disable() {
    // To get the scroll position of current webpage
    let TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    let LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;

    // if scroll happens, set it to the previous value
    window.onscroll = function () {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  function enable() {
    window.onscroll = function () {};
  }

  return (
    <div className="gameDetailsBody">
      {game && (
        <div className="gameDetailsDiv">
          <h2>{game.title}</h2>
          <div className="innerDivGameInfo">
            <Link to={`/profile/${game.user._id}`} className="gameCreatorLink">
              <h4>by {game.user.name}</h4>
            </Link>
            <div className="gameCats">
              {game.category.map((cat) => (
                <p key={cat}>{cat}</p>
              ))}
            </div>
          </div>
          
          <p className="gameDescriptionP">{game.description}</p>

          <div id="wrapper">
            <iframe
              id="scaled-frame"
              src={game.gameUrl}
              title={game.title}
              onMouseOver={() => disable()}
              onMouseOut={() => enable()}
            ></iframe>
          </div>
          <div className="gameButtons">
            <button className="fullScreenBtn">
              <a href={game.gameUrl} target="_blank" rel="noreferrer">
                Play in full screen
              </a>
            </button>
            {user && (
              <button onClick={() => likeGame(game._id)} className="likeBtn">
                {isLiked ? "dislike" : "like"}
              </button>
            )}
          </div>
<div className="gameComments">
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
          </div>

        </div>
      )}
    </div>
  );
}

export default GameDetailsPage;
