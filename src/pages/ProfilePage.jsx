import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ProfilePage() {


  const [user, setUser] = useState(null);
const{userId}= useParams()
  const getUser = async () => {
    try {
      /* const getToken = localStorage.getItem("authToken"); */
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`/* , {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      } */);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);


  return (
    <div>
    <h2>Hello</h2>
   {/* <h2>{user.name}</h2>
   <h2>{user.email}</h2>
   <p>{user.imageUrl}</p>    */}
    </div>
  )
}

export default ProfilePage