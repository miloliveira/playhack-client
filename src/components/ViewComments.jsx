import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
function ViewComments(props) {
  const { gameId } = props;
  const { isLoggedIn, user}= useContext(AuthContext);
  const [commentList, setCommentList] = useState([]);
  
  
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

  useEffect(() => {
     
    getComments();
  }, []);

  return (
    <div>
    {commentList.length===0 && <p>No comments yet</p>}
      {commentList.length > 0 &&
        commentList.map((comment) => {
          return (
            <div key={comment._id}>
              <Link to={`/profile/${comment.user._id}`}>
                {comment.user.name}
              </Link>
              <p>{comment.content}</p>
              {user._id === comment.user._id && <> <button>Delete</button></> }
            </div>
          );
        })}
    </div>
  );
}

export default ViewComments;
