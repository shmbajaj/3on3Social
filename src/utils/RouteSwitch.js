import { Routes, Route } from "react-router-dom";
import {
  Landing,
  Home,
  Profile,
  People,
  Explore,
  Bookmarks,
  NotFound,
} from "pages";
import { Signup, Login } from "features";
import { CheckAuth } from "./CheckAuth";
import { RequiresAuth } from "./RequiresAuth";

function RouteSwitch() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/home"
        element={
          <RequiresAuth>
            <Home />
          </RequiresAuth>
        }
      />
      <Route
        path="/signup"
        element={
          <CheckAuth>
            <Signup />
          </CheckAuth>
        }
      />
      <Route
        path="/login"
        element={
          <CheckAuth>
            <Login />
          </CheckAuth>
        }
      />
      <Route
        path="/bookmarks"
        element={
          <RequiresAuth>
            <Bookmarks />
          </RequiresAuth>
        }
      />
      <Route path="/profile/:uid" element={<Profile />} />
      <Route path="/people" element={<People />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export { RouteSwitch };
