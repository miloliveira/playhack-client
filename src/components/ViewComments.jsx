import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
function ViewComments(props) {
  const { gameId, isUpdated, setIsUpdated } = props;
  const { isLoggedIn, user } = useContext(AuthContext);
  const [commentList, setCommentList] = useState([]);
  const getToken = localStorage.getItem("authToken");

  const getComments = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/game/${gameId}/comments`
      );
      setCommentList(response.data);
      console.log(response.data);
      setIsUpdated(true);
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
    setIsUpdated(false);
  };

  useEffect(() => {
    getComments();
  }, [isUpdated]);
  console.log(commentList);
  return (
    <div className="viewCommentsDiv">
      {commentList.length === 0 && <p className="noCommentsP">No comments to show yet!</p>}
      {commentList.length > 0 &&
        commentList.map((comment) => {
          return (
            <div key={comment._id} className="eachComment">
              <div className="userCommentInfo">
                <Link
                  to={`/profile/${comment.user._id}`}
                  className="commentCreatorLink"
                >
                  <img src={comment.user.imageUrl} alt="profile pic" />
                  <p>{comment.user.name}</p>
                </Link>
                {user && user._id === comment.user._id && (
                  <button onClick={() => deleteComment(comment._id)} className="deleteCommentBtn" >
                    <img src="https://cdn2.iconfinder.com/data/icons/cleaning-19/30/30x30-10-512.png" alt="trash bin" />
                  </button>
                )}
              </div>
              <div className="commentContentDiv">
                <p>{comment.content}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ViewComments;
