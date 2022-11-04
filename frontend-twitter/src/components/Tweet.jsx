import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

function Tweet({ tweet }) {
  const user = useSelector((state) => state.user.user);
  const [selectedTweetDelete, setSelectedTweetDelete] = useState(null); //Seteo el tweet seleccionado para eliminar
  const [selectedTweetLike, setSelectedTweetLike] = useState(null); // Lo mismo para el like

  useEffect(() => {
    if (!selectedTweetDelete) {
      //Solo se ejecuta si hay un tweet seleccionado
      const deleteTweet = async () => {
        await axios({
          url: `http://localhost:8000/${selectedTweetDelete}`, //sumo a la url el id del tweet
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        }); //Llamada con el metodo delete
        setSelectedTweetDelete(null); // vuelvo a setear el tweet como nulo para poder eliminar otro
      };
      deleteTweet();
    }
  }, [selectedTweetDelete]);

  useEffect(() => {
    const like = async () => {
      await axios({
        url: `http:localhost:8000/${selectedTweetLike}`,
        method: "PATCH",
        headers: { Authorization: `Bearer ${user.token}` },
      });
    };
  }, [selectedTweetLike]);

  return (
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
      {user.user._id === tweet.author._id ? ( //solo aparece si el dueño del tweet es el usuario logueado
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
  );
}

export default Tweet;
