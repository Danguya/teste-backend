import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./private"
import { Suspense, lazy } from "react";

const Login = lazy(()=> import("../pages/login"));
const Register = lazy(()=> import("../pages/register"));
const NotFound = lazy(()=> import("../pages/notfound"));
const Profile = lazy(()=> import("../pages/profile"));


function PageLoader(){
  return (
    <div >
      <h2>Carregando...</h2>
    </div>
  )
}

export default function MyRoutes() {
  return (
    <>
      <Suspense fallback={<PageLoader/>}>
        <Routes>
            <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Profile />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
