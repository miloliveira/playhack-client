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
  const [allGames, setAllGames] = useState([]);


  const getAllGames = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/games`);
      setAllGames(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

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
    getAllGames();
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
                {isLiked ? <img src="https://res.cloudinary.com/dzwl5teme/image/upload/v1654781913/playHack/dislike_r9hsmz.png" alt="dislike btn" className="likeBtnImg" /> : <img src="https://res.cloudinary.com/dzwl5teme/image/upload/v1654781907/playHack/like_ib82o8.png" alt="like btn" className="likeBtnImg"/>}
              </button>
            )}
          </div>
          <div className="lowerDivGameDetails">
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




          <div className="recomendationGames">
            <h3>Related games:</h3>
            <div className="allRelatedGames">
            {allGames.map((eachGame) => {

              if(eachGame.category.includes(game.category[0])){
                console.log(eachGame._id)
        return (
          <div key={eachGame._id} 
          
          className="eachRelatedGame">
            <Link to={`/playing/${eachGame._id}`} className="eachRelatedGameLink">
            
              <img src={eachGame.imageUrl} alt="game thumbnail" className="eachRelatedGameThumbnail" />
              <p>{eachGame.title}</p>
            </Link>
          </div>
        );
      }

      }).splice(0, 6)}
</div>
          </div>



</div>
        </div>
      )}
    </div>
  );
}

export default GameDetailsPage;
