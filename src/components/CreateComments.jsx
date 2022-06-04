import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Comments(props) {

    const [content, setContent] = useState("")
    const{gameId}=props
    const getToken = localStorage.getItem("authToken");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const handleContent = (e) => {
      setContent(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const body = { content };
  
      axios
        .post(`${process.env.REACT_APP_API_URL}/game/${gameId}/comments`, body, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((response) => {
          setContent("")
        })
        .catch((err) => {
          setErrorMessage(err.response.data.errorMessage);
        });
    };


    return (
    <div>
<form onSubmit={handleSubmit}>


        <textarea
          name="content"
          cols="50"
          rows="5"
          value={content}
          onChange={handleContent}
        ></textarea>
<button type="submit">Comment</button>
</form>

    </div>
  )
}

export default Comments