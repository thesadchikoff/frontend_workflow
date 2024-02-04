import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import { OnlyAdmin, OnlyAuth, OnlyUnAuth } from "./hoc/ProtectedRoute.tsx";
import { useAppDispatch } from "./hooks/useAppDispatch.ts";
import HomePage from "./screens/home";
import LoginPage from "./screens/login";
import ProfilePage from "./screens/profile";
import RegisterPage from "./screens/register/index.tsx";
import ShopPage from "./screens/shop/index.tsx";
import SubdivisionPage from "./screens/subdivision/index.tsx";
import TasksPage from "./screens/tasks/index.tsx";
import userService from "./services/user/user.service.ts";
import { logout, updateProfile } from "./store/auth/auth.slice.ts";
import InvitesPage from "./screens/invites/index.tsx";
import NotFound from "./screens/not-found/index.tsx";

function App() {
  const dispatch = useAppDispatch();
  const { data, isError } = useQuery({
    queryKey: ["getMe"],
    queryFn: userService.getProfile,
    refetchOnWindowFocus: "always",
  });
  const revalid = () => {
    if (isError) {
      console.log("error");
      dispatch(logout());
    }
    dispatch(updateProfile(data));
  };
  useEffect(() => {
    revalid();
  }, [data]);
  console.log(data);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={"/"} element={<OnlyAuth component={<HomePage />} />} />
          <Route
            path={"/profile"}
            element={<OnlyAuth component={<ProfilePage />} />}
          />
          <Route
            path={"/tasks"}
            element={<OnlyAuth component={<TasksPage />} />}
          />
          <Route
            path={"/shop"}
            element={<OnlyAuth component={<ShopPage />} />}
          />
          <Route
            path={"/subdivision"}
            element={<OnlyAuth component={<SubdivisionPage />} />}
          />
          <Route
            path={"/invites"}
            element={<OnlyAdmin component={<InvitesPage />} />}
          />
          <Route
            path={"/login"}
            element={<OnlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path={"/register"}
            element={<OnlyUnAuth component={<RegisterPage />} />}
          />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
