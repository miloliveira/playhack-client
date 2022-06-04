import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditGamePage() {
  const { gameId } = useParams();
  const [title, setTitle] = useState("");
  const [gameUrl, setGameUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const getToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);


  const getGame = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/game/${gameId}`
      );
      setTitle(response.data.title);
      setDescription(response.data.description);
      setCategory(response.data.category);
      setGameUrl(response.data.gameUrl);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.errorMessage)
    }
  };

  useEffect(() => {
    getGame();
  }, []);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleGameUrl = (e) => {
    setGameUrl(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      title, gameUrl, description, category
    };
    axios
      .put(`${process.env.REACT_APP_API_URL}/game/${gameId}`, body, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((response) => {
        setTitle("");
        setDescription("");
        setCategory("");
        setGameUrl("");
        navigate(`/playing/${response.data._id}`);
      })
      .catch((err) => console.log(err));
  };

  return <div>
  
  <h2>EditGamePage</h2>
  
  <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title*</label>
        <input
          type="text"
          value={title}
          name="title"
          onChange={handleTitle}
        />

<label htmlFor="description">description:</label>
        <textarea
          name="description"
          cols="30"
          rows="10"
          value={description}
          onChange={handleDescription}
        ></textarea>

<label htmlFor="gameUrl">GameUrl*</label>
        <input
          type="text"
          value={gameUrl}
          name="gameUrl"
          onChange={handleGameUrl}
        />

<label htmlFor="category">category:</label>
        <select
          id="category"
          name="category"
          onChange={handleCategory}
        >
          <option value="Action">Action</option>
          <option value="Arcade">Arcade</option>
          <option value="Adventure">Adventure</option>
          <option value="Racing">Racing</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Shoting">Shoting</option>
          <option value="Sports">Sports</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">Edit your game</button>

      </form>
      <button>Delete Game</button>
      {errorMessage && <p >{errorMessage}</p>}
  </div>;
}

export default EditGamePage;
