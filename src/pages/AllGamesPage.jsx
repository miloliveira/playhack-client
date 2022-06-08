import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../components/Search";

function AllGamesPage() {
  const [games, setGames] = useState([]);
  const [searchGames, setSearchGames] = useState([]);

  const getAllGames = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/games`);
      setGames(response.data);
      setSearchGames(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const gameSearch = (search) => {
    let updatedGames = games.filter((el) => {

      const filteredByTitle = el.title.toLowerCase().includes(search.toLowerCase())

      const filteredByUser = el.user.name.toLowerCase().includes(search.toLowerCase())


      return filteredByTitle + filteredByUser
    });
    setSearchGames(updatedGames);

  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <div className="allGamesBody"><div className="searchComponent">
      <Search gameSearch={gameSearch} />
      </div>
      <div className="allGamesList">      {games && searchGames.map((game) => {
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
      })}</div>

    </div>
  );
}

export default AllGamesPage;
