import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";

function EditGamePage() {
  const { gameId } = useParams();
  const [title, setTitle] = useState("");
  const [gameUrl, setGameUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const getToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { user } = useContext(AuthContext);
  const [isUploading, setIsUploading] = useState(false);
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
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  const deleteGame = (gameId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/game/${gameId}`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    navigate(`/profile/${user._id}`);
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
    if (e.target.checked) {
      let newCat = [...category, e.target.value];
      setCategory(newCat);
    } else {
      let newCat = [...category].filter((el) => el !== e.target.value);
      setCategory(newCat);
    }
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    setIsUploading(true);
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setIsUploading(false);
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUploading) {
      alert("Image still uploading");
      return;
    }
    let body;
    if(imageUrl){
      body = {
        title,
        gameUrl,
        description,
        imageUrl,
        category,
      };
    }else{
      body = {
        title,
        gameUrl,
        description,
        category,
      };
    }
    console.log(category);
    axios
      .put(`${process.env.REACT_APP_API_URL}/game/${gameId}`, body, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((response) => {
        navigate(`/playing/${response.data._id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="editGameBody">
      <h2>EditGamePage</h2>

      <form onSubmit={handleSubmit} className="editGameForm">
        <label htmlFor="title">Title*</label>
        <input type="text" value={title} name="title" onChange={handleTitle} />

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
        <div>
          <input
            type="checkbox"
            value="Action"
            checked={category.includes("Action")}
            name="category"
            onChange={handleCategory}
          />
          <label htmlFor="Action">Action</label>

          <input
            type="checkbox"
            value="Arcade"
            checked={category.includes("Arcade")}
            name="category"
            onChange={handleCategory}
          />
          <label htmlFor="Arcade">Arcade</label>

          <input
            type="checkbox"
            value="Adventure"
            checked={category.includes("Adventure")}
            name="category"
            onChange={handleCategory}
          />
          <label htmlFor="Adventure">Adventure</label>

          <input
            type="checkbox"
            value="Racing"
            checked={category.includes("Racing")}
            name="category"
            onChange={handleCategory}
          />
          <label htmlFor="Racing">Racing</label>

          <input
            type="checkbox"
            value="Puzzle"
            checked={category.includes("Puzzle")}
            name="category"
            onChange={handleCategory}
          />
          <label htmlFor="Puzzle">Puzzle</label>

          <input
            type="checkbox"
            value="Shooting"
            checked={category.includes("Shooting")}
            name="category"
            onChange={handleCategory}
          />
          <label htmlFor="Shooting">Shooting</label>

          <input
            type="checkbox"
            value="Sports"
            checked={category.includes("Sports")}
            name="category"
            onChange={handleCategory}
          />
          <label htmlFor="Sports">Sports</label>

          <input
            type="checkbox"
            value="Other"
            checked={category.includes("Other")}
            name="category"
            onChange={handleCategory}
          />
          <label htmlFor="Other">Other</label>
        </div>

        <button type="submit">Edit your game</button>

        <button onClick={() => deleteGame(gameId)} className="deleteGameBtn">
          Delete Game
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default EditGamePage;
