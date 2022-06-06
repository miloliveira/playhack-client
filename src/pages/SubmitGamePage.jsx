import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import service from "../api/service";

function SubmitGamePage() {
  const { userId } = useParams();
  const [title, setTitle] = useState("");
  const [gameUrl, setGameUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const getToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);

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
    if (!title || !description || !gameUrl || !category) return;

    const body = { title, description, gameUrl, imageUrl, category };

    axios
      .post(`${process.env.REACT_APP_API_URL}/game-submit/${userId}`, body, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(() => {
        navigate(`/profile/${userId}`);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
      });
  };

  return (
    <div>
      SubmitGamePage
      <form onSubmit={handleSubmit}>
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

        <input
          type="checkbox"
          value="Action"
          name="category"
          onClick={handleCategory}
        />
        <label htmlFor="Action">Action</label>

        <input
          type="checkbox"
          value="Arcade"
          name="category"
          onClick={handleCategory}
        />
        <label htmlFor="Arcade">Arcade</label>

        <input
          type="checkbox"
          value="Adventure"
          name="category"
          onClick={handleCategory}
        />
        <label htmlFor="Adventure">Adventure</label>

        <input
          type="checkbox"
          value="Racing"
          name="category"
          onClick={handleCategory}
        />
        <label htmlFor="Racing">Racing</label>

        <input
          type="checkbox"
          value="Puzzle"
          name="category"
          onClick={handleCategory}
        />
        <label htmlFor="Puzzle">Puzzle</label>

        <input
          type="checkbox"
          value="Shooting"
          name="category"
          onClick={handleCategory}
        />
        <label htmlFor="Shooting">Shooting</label>

        <input
          type="checkbox"
          value="Sports"
          name="category"
          onClick={handleCategory}
        />
        <label htmlFor="Sports">Sports</label>

        <input
          type="checkbox"
          value="Other"
          name="category"
          onClick={handleCategory}
        />
        <label htmlFor="Other">Other</label>

        <button type="submit">Submit your game</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default SubmitGamePage;
