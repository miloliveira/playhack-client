import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";

function EditProfilePage() {
  const { userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cohort, setCohort] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
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
      setLinkedin(response.data.linkedin);
      setGithub(response.data.github);
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

  const handleLinkedin = (e) => {
    setLinkedin(e.target.value);
  };

  const handleGithub = (e) => {
    setGithub(e.target.value);
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
    if (imageUrl) {
      body = {
        name,
        email,
        bio,
        cohort,
        imageUrl,
        linkedin,
        github,
        campus,
      };
    } else {
      body = {
        name,
        email,
        bio,
        cohort,
        linkedin,
        github,
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
        setBio("");
        setCohort("");
        setLinkedin("");
        setGithub("");
        setCampus("");
        navigate(`/profile/${userId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="editProfileBody">
      <form onSubmit={handleSubmit} className="editProfileForm">
        <h4>Edit your profile</h4>
        <div className="deleteProfileBtnDiv">
          <button
            onClick={() => deleteUser(userId)}
            className="deleteProfileBtn"
          >
            Delete profile
          </button>
        </div>
        <div className="editProfileFormInnerDiv">
          <div className="editProfileFormInfoDiv1">
            <label htmlFor="name">Name*:</label>
            <input type="text" name="name" value={name} onChange={handleName} />

            <label htmlFor="email">Email address*</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />

            <label htmlFor="bio">Bio*</label>
            <textarea
              name="bio"
              cols="30"
              rows="7"
              value={bio}
              onChange={handleBio}
            ></textarea>

            <label htmlFor="cohort">Cohort*</label>
            <input
              type="text"
              name="cohort"
              placeholder="ex:April2022"
              value={cohort}
              onChange={handleCohort}
            />

            <label htmlFor="campus">Campus*</label>
            <select
              id="campus"
              name="campus"
              /* value={campus} */
              onClick={handleCampus}
            >
              <option value="" selected={campus === ""}></option>
              <option value="Lisbon" selected={campus === "Lisbon"}>
                Lisbon
              </option>
              <option value="Berlin" selected={campus === "Berlin"}>
                Berlin
              </option>
              <option value="London" selected={campus === "Berlin"}>
                London
              </option>
              <option value="Barcelona" selected={campus === "Barcelona"}>
                Barcelona
              </option>
              <option value="Madrid" selected={campus === "Madrid"}>
                Madrid
              </option>
              <option value="Amsterdam" selected={campus === "Amsterdam"}>
                Amsterdam
              </option>
              <option value="Miami" selected={campus === "Miami"}>
                Miami
              </option>
              <option
                value="New York City"
                selected={campus === "New York City"}
              >
                New York City
              </option>
              <option value="Tampa" selected={campus === "Tampa"}>
                Tampa
              </option>
              <option value="Mexico City" selected={campus === "Mexico City"}>
                Mexico City
              </option>
              <option value="São Paulo" selected={campus === "São Paulo"}>
                São Paulo
              </option>
            </select>
          </div>

          <div className="editProfileFormInfoDiv2">
            <label htmlFor="linkedin">Linkedin profile link*</label>
            <input
              type="text"
              name="linkedin"
              value={linkedin}
              onChange={handleLinkedin}
            />
            <label htmlFor="github">Github profile link*</label>
            <input
              type="text"
              name="github"
              value={github}
              onChange={handleGithub}
            />

            <label htmlFor="imageUrl">Upload profile image*</label>
            {imageUrl && (
              <div className="profilePicPreviewDiv">
                <img
                  src={imageUrl}
                  alt="profile pic preview"
                  id="profilePicPreview"
                />
              </div>
            )}
            <input
              type="file"
              name="imageUrl"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
        </div>

        <button type="submit" className="editProfileSubmitBtn">
          Edit profile
        </button>
      </form>
    </div>
  );
}

export default EditProfilePage;
