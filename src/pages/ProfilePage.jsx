import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
function ProfilePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [thisUser, setThisUser] = useState(null);
  const { userId } = useParams();
  const getUser = async () => {
    try {
      /* const getToken = localStorage.getItem("authToken"); */
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${userId}` /* , {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      } */
      );
      setThisUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <div className="profileBody">
      {thisUser && (
        <>
          <div className="profileUpperDiv">
            <div className="userDiv">
              <div className="userPicDiv">
                <img
                  src={thisUser.imageUrl}
                  alt="profile img"
                  id="userProfilePic"
                />
              </div>
              <div className="userInfoDiv">
                <h4>{thisUser.name}</h4>
                <br />
                <p>{thisUser.cohort}</p>
                <p>{thisUser.campus}</p>
                <br />
                <p className="userBioP">{thisUser.bio}</p>
<br />
                <div className="userAccountsLinks">
                  <a href={thisUser.linkedin} target="_blank" rel="noreferrer">
                    <img
                      src="https://res.cloudinary.com/dzwl5teme/image/upload/v1654766013/playHack/linkedin_eifgp8.png"
                      alt="linkedin icon "
                      className="accountIcon"
                    />
                  </a>
                  <a href={thisUser.github} target="_blank" rel="noreferrer">
                    <img
                      src="https://res.cloudinary.com/dzwl5teme/image/upload/v1654848433/playHack/github_wwxlcp.png"
                      alt="github icon "
                      className="accountIcon"
                    />
                  </a>
                </div>
              </div>
            </div>

            {thisUser.games.length > 0 && (
              <div className="thisUserGames">
                <h3>Submited Games</h3>
                <div className="allThisUserGames">
                  {thisUser.games.map((userGame) => {
                    return (
                      <div key={userGame._id} className="eachSubmitedGameDiv">
                        <div className="eachSubmitedGame">
                          <Link to={`/playing/${userGame._id}`}>
                            <img
                              src={userGame.imageUrl}
                              alt="game-img"
                              className="submitedGamePic"
                            />
                          </Link>
                          <div className="submitedGameInfoDiv">
                            {user && user._id === userId && (
                              <div className="editGameBtnDiv">
                              <Link to={`/edit-game/${userGame._id}`} className="editGameBtnLink"  >
                                <img src="https://res.cloudinary.com/dzwl5teme/image/upload/v1654783345/playHack/edit_jotcsw.png" alt="edit icon" id="editGameIcon"/>
                              </Link>
                              </div>
                            )}
                            <div className="submitedGameTitleP">
                              <p className="titleP">{userGame.title}</p>
                            </div>

                            <div className="thisUserGameCat">
                              {userGame.category.map((cat) => (
                                <p key={cat}>{cat}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {thisUser.likedGames.length > 0 && (
            <div className="likedGamesDiv">
              <h4>The ones you like</h4>
              <div className="allLikedGames">
                {thisUser.likedGames.map((likedGame) => {
                  return (
                    <div key={likedGame._id} className="eachLikedGame">
                      <Link
                        to={`/playing/${likedGame._id}`}
                        className="eachLikedGameLink"
                      >
                        <img
                          src={likedGame.imageUrl}
                          alt="game-img"
                          className="likedGamePic"
                        />
                        <div className="eachLikedGamePDiv">
                          <p className="titleP">{likedGame.title}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProfilePage;
