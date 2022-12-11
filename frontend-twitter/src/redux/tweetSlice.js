import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
  name: "tweet",
  initialState: [],
  reducers: {
    call_tweets(state, action) {
      return action.payload;
    },
    add_tweet(state, action) {
      return (state = [action.payload, ...state]);
    },
    edit_tweets(state, action) {
      const selectedTweet = state.find((tweet) => {
        return tweet._id === action.payload.tweetId;
      });
      if (
        selectedTweet.likes.find((like) => {
          return like._id === action.payload.user._id;
        })
      ) {
        return state.map((tweet) => {
          return tweet._id !== action.payload.tweetId
            ? tweet
            : {
                ...tweet,
                likes: tweet.likes.filter((like) => {
                  return like._id !== action.payload.user._id;
                }),
              };
        });
      } else {
        return state.map((tweet) => {
          return tweet._id !== action.payload.tweetId
            ? tweet
            : { ...tweet, likes: [...tweet.likes, action.payload.user] };
        });
      }
    },
    delete_tweet(state, action) {
      return state.filter((tweet) => {
        return tweet._id !== action.payload;
      });
    },
    empty_tweets(state, action) {
      return [];
    },
  },
});

export const {
  call_tweets,
  add_tweet,
  edit_tweets,
  delete_tweet,
  empty_tweets,
} = tweetSlice.actions;
export default tweetSlice.reducer;
