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
    <div>
      <Search gameSearch={gameSearch} />
      {games && searchGames.map((game) => {
        return (
          <div key={game._id}>
            <Link to={`/playing/${game._id}`}>
              <img src={game.imageUrl} alt="game thumbnail" />
              <h2>{game.title}</h2>
            </Link>
            <Link to={`/profile/${game.user._id}`}>
              <h3>user name here:{game.user.name}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default AllGamesPage;
