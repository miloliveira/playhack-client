import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Comments(props) {

    const [content, setContent] = useState("")
    const{gameId, setIsUpdated}=props
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
          setIsUpdated(false)
        })
        .catch((err) => {
          setErrorMessage(err.response.data.errorMessage);
        });
    };


    return (
    <div className="createCommentDiv">
<form onSubmit={handleSubmit} className="createCommentForm" >
        <textarea
          name="content"
          cols="20"
          rows="5"
          value={content}
          onChange={handleContent}
        ></textarea>
<button type="submit" className="submitCommentSubmitBtn">Comment</button>
</form>

    </div>
  )
}

export default Comments