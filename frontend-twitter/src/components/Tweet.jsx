import { useSelector } from "react-redux";

function Tweet({ tweet }) {
  const user = useSelector((state) => state.user.user);
  return (
    <div>
      <p>{tweet.content}</p>
      <span>{tweet.likes.length}</span>{" "}
      {user._id === tweet.author._id ? (
        <span>
          <button>Eliminar</button>
        </span>
      ) : null}
    </div>
  );
}

export default Tweet;
