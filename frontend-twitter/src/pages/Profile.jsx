import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const user = useSelector((state) => state.user);
  const [profileOwner, setProfileOwner] = useState({});
  const params = useParams();
  useEffect(() => {
    const getData = async () => {
      const response = await axios({
        url: `http://localhost:8000/profile/${params.username}`,
        method: "get",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfileOwner(response.data);
    };
    getData();
  }, []);
  return <div>Entraste al perfil</div>;
}

export default Profile;
