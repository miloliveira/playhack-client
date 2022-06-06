import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import service from "../api/service";

function EditGamePage() {
  const { gameId } = useParams();
  const [title, setTitle] = useState("");
  const [gameUrl, setGameUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const getToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { user}= useContext(AuthContext);

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

  const deleteGame = (gameId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/game/${gameId}`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    navigate(`/profile/${user._id}`)
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
    setCategory([...category, e.target.value]);
  };



  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log(err));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      title, gameUrl, description, imageUrl, category
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

<input
          type="file"
          name="imageUrl"
          onChange={(e) => handleFileUpload(e)}
        />

<label htmlFor="category">Category:</label>
        
        <input type="checkbox" value="Action" name="category" onClick={handleCategory} />
        <label htmlFor="Action">Action</label>

        <input type="checkbox" value="Arcade" name="category" onClick={handleCategory}/>
        <label htmlFor="Arcade">Arcade</label>

        <input type="checkbox" value="Adventure" name="category" onClick={handleCategory} />
        <label htmlFor="Adventure">Adventure</label>

        <input type="checkbox" value="Racing" name="category" onClick={handleCategory} />
        <label htmlFor="Racing">Racing</label>

        <input type="checkbox" value="Puzzle" name="category" onClick={handleCategory} />
        <label htmlFor="Puzzle">Puzzle</label>

        <input type="checkbox" value="Shooting" name="category" onClick={handleCategory} />
        <label htmlFor="Shooting">Shooting</label>

        <input type="checkbox" value="Sports" name="category" onClick={handleCategory} />
        <label htmlFor="Sports">Sports</label>
       
        <input type="checkbox" value="Other" name="category" onClick={handleCategory} />
        <label htmlFor="Other">Other</label>
       

        <button type="submit">Edit your game</button>

      </form>
      <button onClick={()=> deleteGame(gameId)}>Delete Game</button>
      {errorMessage && <p >{errorMessage}</p>}
  </div>;
}

export default EditGamePage;
