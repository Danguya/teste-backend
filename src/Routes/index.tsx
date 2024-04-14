import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./private"
import Login from "../pages/login";
import Register from "../pages/register";
import NotFound from "../pages/notfound";
import Profile from "../pages/profile";


export default function MyRoutes() {
  return (
    <>
      <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Profile />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}
