import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";

function EditProfilePage() {
  const { userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cohort, setCohort] = useState("");
  const [cohortType, setCohortType] = useState("");
  const [campus, setCampus] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const getToken = localStorage.getItem("authToken");
  const { logoutUser } = useContext(AuthContext);
  const getUser = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${userId}` /* , {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      } */
      );
      console.log(response.data);
      setName(response.data.name);
      setEmail(response.data.email);

      setBio(response.data.bio);
      setCohort(response.data.cohort);
      setCohortType(response.data.cohortType);
      setCampus(response.data.campus);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = (userId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    logoutUser();
    navigate(`/`);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleBio = (e) => {
    setBio(e.target.value);
  };

  const handleCohort = (e) => {
    setCohort(e.target.value);
  };

  const handleCohortType = (e) => {
    setCohortType(e.target.value);
  };

  const handleCampus = (e) => {
    setCampus(e.target.value);
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    setIsUploading(true);
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setIsUploading(false);
        console.log(response);
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
        name,
        email,
        password,
        bio,
        cohort,
        imageUrl,
        cohortType,
        campus,
      };
    }else{
      body = {
        name,
        email,
        password,
        bio,
        cohort,
        cohortType,
        campus,
      };
    }
    axios
      .put(`${process.env.REACT_APP_API_URL}/user/${userId}`, body, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then(() => {
        setName("");
        setEmail("");
        setPassword("");
        setBio("");

        setCohort("");
        setCohortType("");
        setCampus("");
        navigate(`/profile/${userId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="editProfileBody">
      <form onSubmit={handleSubmit} className="editProfileForm">
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label htmlFor="email">Email address:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label htmlFor="bio">Bio:</label>
        <textarea
          name="bio"
          cols="30"
          rows="10"
          value={bio}
          onChange={handleBio}
        ></textarea>

        <input
          type="file"
          name="imageUrl"
          onChange={(e) => handleFileUpload(e)}
        />

        <label htmlFor="cohort">Cohort:</label>
        <input
          type="text"
          name="cohort"
          value={cohort}
          onChange={handleCohort}
        />

        <label htmlFor="cohortType">Type of cohort:</label>

        <select
          id="cohortType"
          name="cohortType"
          /* value={cohortType} */
          onClick={handleCohortType}
        >
          <option value="" selected={cohortType===""}></option>
          <option value="In person" selected={cohortType==="In person"} >In person</option>
          <option value="Remote" selected={cohortType==="Remote"} >Remote</option>
        </select>

        <label htmlFor="campus">Campus:</label>
        <select
          id="campus"
          name="campus"
          /* value={campus} */
          onClick={handleCampus}
        >
          <option value="" selected={campus===""} ></option>
          <option value="Lisbon" selected={campus==="Lisbon"} >Lisbon</option>
          <option value="Berlin" selected={campus==="Berlin"} >Berlin</option>
          <option value="London" selected={campus==="Berlin"} >London</option>
          <option value="Barcelona" selected={campus==="Barcelona"} >Barcelona</option>
          <option value="Madrid" selected={campus==="Madrid"} >Madrid</option>
          <option value="Amsterdam" selected={campus==="Amsterdam"} >Amsterdam</option>
          <option value="Miami" selected={campus==="Miami"} >Miami</option>
          <option value="New York City" selected={campus==="New York City"} >New York City</option>
          <option value="Tampa" selected={campus==="Tampa"} >Tampa</option>
          <option value="Mexico City" selected={campus==="Mexico City"} >Mexico City</option>
          <option value="São Paulo" selected={campus==="São Paulo"} >São Paulo</option>
        </select>

        <button type="submit">Edit profile</button>
        <button onClick={() => deleteUser(userId)} className="deleteProfileBtn">
          Delete profile
        </button>
      </form>
    </div>
  );
}

export default EditProfilePage;
