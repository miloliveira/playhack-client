import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
function ViewComments(props) {
  const { gameId } = props;
  const { isLoggedIn, user } = useContext(AuthContext);
  const [commentList, setCommentList] = useState([]);
  const getToken = localStorage.getItem("authToken");

  const getComments = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/game/${gameId}/comments`
      );
      setCommentList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = (commentId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
  };

  useEffect(() => {
    getComments();
  }, []);
console.log(commentList)
  return (
    <div>
      {commentList.length === 0 && <p>No comments yet</p>}
      {commentList.length > 0 &&
        commentList.map((comment) => {
          return (
            <div key={comment._id}>
           {/*  <p>{comment.user._id}</p> */}
              {/* <Link to={`/profile/${comment.user._id}`}>
                {comment.user.name}
              </Link> */}
              <p>{comment.content}</p>
              <p>{comment.user._id}</p>
              {/* {user._id === comment.user._id && (
                <button onClick={() => deleteComment(comment._id)}>
                  Delete
                </button>
              )} */}
            
            </div>
          );
        })}
    </div>
  );
}

export default ViewComments;
