import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

function Following() {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const [profileOwner, setProfileOwner] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await axios({
        url: `http://localhost:8000/profile/${params.username}/following`,
        method: "get",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProfileOwner(response.data);
    };
    getData();
  }, []);
  return <div>Following</div>;
}

export default Following;
