import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.entries(user).length === 0) {
      navigate("/login");
    }
  }, []);

  return children;
}

export default PrivateRoute;
