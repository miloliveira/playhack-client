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
      setPassword(response.data.password);
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

  const handlePassword = (e) => {
    setPassword(e.target.value);
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
      name,
      email,
      password,
      bio,
      cohort,
      imageUrl,
      cohortType,
      campus,
    };
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label htmlFor="email">Email address:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

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
          onChange={handleCohortType}
        >
          <option value=""></option>
          <option value="In person">In person</option>
          <option value="Remote">Remote</option>
        </select>

        <label htmlFor="campus">Campus:</label>
        <select
          id="campus"
          name="campus"
          /* value={campus} */
          onChange={handleCampus}
        >
          <option value=""></option>
          <option value="Lisbon">Lisbon</option>
          <option value="Berlin">Berlin</option>
          <option value="London">London</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Madrid">Madrid</option>
          <option value="Amsterdam">Amsterdam</option>
          <option value="Miami">Miami</option>
          <option value="New York City">New York City</option>
          <option value="Tampa">Tampa</option>
          <option value="Mexico City">Mexico City</option>
          <option value="São Paulo">São Paulo</option>
        </select>

        <button type="submit">Edit profile</button>
      </form>
      <button onClick={() => deleteUser(userId)}>Delete profile</button>
    </div>
  );
}

export default EditProfilePage;
