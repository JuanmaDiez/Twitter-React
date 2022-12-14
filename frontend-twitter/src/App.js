import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import PrivateRoute from "./protectedRoutes/PrivateRoute";
import PublicRoute from "./protectedRoutes/PublicRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/profile/:username"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:username/followers"
          element={
            <PrivateRoute>
              <Followers />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:username/following"
          element={
            <PrivateRoute>
              <Following />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
