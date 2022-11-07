import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Tweet from "../components/Tweet";

function Profile() {
  const user = useSelector((state) => state.user);
  const [profileOwner, setProfileOwner] = useState(null);
  const params = useParams();
  const [selectedTweetDelete, setSelectedTweetDelete] = useState(null); //Seteo el tweet seleccionado para eliminar
  const [selectedTweetLike, setSelectedTweetLike] = useState(null); // Lo mismo para el like

  useEffect(() => {
    console.log("hola");
    const getData = async () => {
      const response = await axios({
        url: `http://localhost:8000/profile/${params.username}`,
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfileOwner(response.data);
    };

    getData();
  }, []);

  useEffect(() => {
    if (selectedTweetDelete !== null) {
      //Solo se ejecuta si hay un tweet seleccionado
      const deleteTweet = async () => {
        console.log(selectedTweetDelete);
        await axios({
          url: `http://localhost:8000/tweet/${selectedTweetDelete}`, //sumo a la url el id del tweet
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        }); //Llamada con el metodo delete
        setSelectedTweetDelete(null); // vuelvo a setear el tweet como nulo para poder eliminar otro
      };
      deleteTweet();
    }
  }, [selectedTweetDelete]);

  useEffect(() => {
    if (selectedTweetLike !== null) {
      console.log(selectedTweetLike);
      const like = async () => {
        await axios({
          url: `http://localhost:8000/tweet/${selectedTweetLike}`,
          method: "PATCH",
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setSelectedTweetLike(null);
      };
      like();
    }
  }, [selectedTweetLike]);

  return (
    profileOwner && (
      <div className="profile-container col-sm-9 col-md-6 col-lg-6 container">
        <header id="profile-header">
          <img
            src={`/img/${profileOwner.avatar}`}
            alt="profile-pic"
            id="profile-image"
          />
        </header>
        <div className="d-flex justify-content-end profile-info">
          <h3>
            {profileOwner.firstname} {profileOwner.lastname}{" "}
          </h3>

          <div className="d-flex justify-content-between profileOwner-info">
            <p> {profileOwner.username} </p>
            <p>
              <Link to={`/profile/${profileOwner.username}/following`}>
                {profileOwner.following.length} Following
              </Link>
              <Link to={`/profile/${profileOwner.username}/followers`}>
                {profileOwner.followers.length} Followers
              </Link>
            </p>
          </div>
        </div>
        <h5>Tweets</h5>
        {profileOwner.tweets.map((tweet) => {
          return <Tweet tweet={tweet} key={tweet._id} setSelectedTweetDelete={setSelectedTweetDelete} setSelectedTweetLike={setSelectedTweetLike} />;
        })}
      </div>
    )
  );
}

export default Profile;
