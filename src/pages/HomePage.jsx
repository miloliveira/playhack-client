import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  ZoomIn
} from "react-scroll-motion";

function HomePage() {
  const [mostPlayed, setMostPlayed] = useState([]);
  const [mostLiked, setMostLiked] = useState([]);
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext)

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

  
  const FadeUp = batch(Fade(), Move(0, 1000), Sticky());

  return (
    <>
        <div className="mEscuro"></div>
        <div className="bgVideo"></div>
    <ScrollContainer>


        <ScrollPage page={0}>
          <Animator animation={batch(Fade(), Sticky(), MoveOut())}>
            <div className="bheader">
              <h1>A gaming hub from ironhackers, to ironhackers</h1>
              <div className="homeCard">
              <img src="https://res.cloudinary.com/dzwl5teme/image/upload/v1654793120/playHack/ghjk_mo3dd9.png" alt="ironhack logo"/>
              <br />
              <p>Ironhack alumni?</p>
              <p>Signup and submit your game from Web Dev's Bootcamp!</p>
              <br />
              {user ? <Link to={`/submit-game/${user._id}`}>
            <button className="subGameBut">Submit a game</button>
          </Link> : <Link to={`/login`}>
            <button className="subGameBut">Submit a game</button>
          </Link>}

              </div>
            </div>
          </Animator>
        </ScrollPage>

        <ScrollPage page={1}>
        <Animator animation={FadeUp}>
          <div className="bMostPlayed">
            <div className="mostHeader">
              <h3>MOST PLAYED GAMES</h3>
            </div>

            <div className="mostPlayedGames">
              {mostPlayed &&
                mostPlayed.map((game) => {
                  return (
                    <div key={game._id} className="eachGame">
                      <Link
                        to={`/playing/${game._id}`}
                        className="eachGameLink"
                      >
                        <div className="eachGameThumbnailDiv">
                          <img
                            src={game.imageUrl}
                            alt="game thumbnail"
                            id="eachGameThumbnail"
                          />
                        </div>
                        <h5>{game.title}</h5>
                      </Link>
                      <Link
                        to={`/profile/${game.user._id}`}
                        className="gameUserInfoLink"
                      >
                        <img
                          src={game.user.imageUrl}
                          alt="user profile pic"
                          id="GameUserProfilePic"
                        />
                        <p>{game.user.name}</p>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
          </Animator>
        </ScrollPage>

        <ScrollPage page={2}>
        <Animator animation={FadeUp}>
          <div className="bMostLiked">
            <div className="mostHeader">
              <h3>MOST LIKED GAMES</h3>
            </div>
            <div className="mostLikedGames">
              {mostLiked &&
                mostLiked.map((game) => {
                  return (
                    <div key={game._id} className="eachGame">
                      <Link
                        to={`/playing/${game._id}`}
                        className="eachGameLink"
                      >
                        <div className="eachGameThumbnailDiv">
                          <img
                            src={game.imageUrl}
                            alt="game thumbnail"
                            id="eachGameThumbnail"
                          />
                        </div>
                        <h5>{game.title}</h5>
                      </Link>
                      <Link
                        to={`/profile/${game.user._id}`}
                        className="gameUserInfoLink"
                      >
                        <img
                          src={game.user.imageUrl}
                          alt="user profile pic"
                          id="GameUserProfilePic"
                        />
                        <p>{game.user.name}</p>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
          </Animator>
        </ScrollPage>

    </ScrollContainer>
    </>
  );
}

export default HomePage;
