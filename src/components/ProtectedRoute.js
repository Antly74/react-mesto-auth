import { Route, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

const ProtectedRoute = ({ component: Component, ...props }) => {

  const currentUser = useContext(CurrentUserContext);

  return (
    <Route>
      {() =>
        currentUser.loggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />
      }
    </Route>
  );
};

export default ProtectedRoute;
