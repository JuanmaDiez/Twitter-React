import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../components/Menu";
import Info from "../components/Info";

function Home() {
  const [tweetList, setTweetList] = useState([]);
  const user = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    const getData = async () => {
      const response = await axios({
        url: "http://localhost:8000",
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTweetList(response.data);
    };
    getData();
  }, []);

  return (
    tweetList.length && (
      <>
        {tweetList.map((tweet) => {
          return <div>{tweet.content}</div>;
        })}
        <div>
          <Menu />
        </div>
        <div>
          <Info />
        </div>
      </>
    )
  );
}

export default Home;
