import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

function Home() {
  const user = useSelector((state) => state.user);
  console.log(user);
  console.log(user.token);
  useEffect(() => {
    const getData = async () => {
      const response = await axios({
        url: "http://localhost:8000",
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log(response.data);
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Accediste a la Home</h1>
    </div>
  );
}

export default Home;
