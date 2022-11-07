import { useSelector } from "react-redux";

function Tweet({ tweet, setSelectedTweetLike, setSelectedTweetDelete }) {
  const user = useSelector((state) => state.user);

  return (
    tweet && (
      <div>
        <p>{tweet.content}</p>
        <span>
          <button
            onClick={() => {
              setSelectedTweetLike(tweet._id); //selecciono el tweet a likear
            }}
          >
            {tweet.likes.length}
          </button>
        </span>
        {user.user._id === tweet.author ? ( //solo aparece si el dueño del tweet es el usuario logueado
          <span>
            <button
              onClick={() => {
                setSelectedTweetDelete(tweet._id); //selecciono el tweet a eliminar
              }}
            >
              Eliminar
            </button>
          </span>
        ) : null}
      </div>
    )
  );
}

export default Tweet;
