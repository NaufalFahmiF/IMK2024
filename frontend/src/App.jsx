import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import NotificationsPage from "./pages/NotificationsPage";
import NetworkPage from "./pages/NetworkPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
	const { data: authUser, isLoading } = useQuery({
	  queryKey: ["authUser"],
	  queryFn: async () => {
		try {
		  const res = await axiosInstance.get("/auth/me");
		  return res.data;
		} catch (err) {
		  if (err.response && err.response.status === 401) {
			return null;
		  }
		  toast.error(err.response.data.message || "Something went wrong");
		}
	  },
	});
  
	if (isLoading) return null;
  
	return (
	  <>
		<Routes>
		  {/* Rute tanpa layout */}
		  <Route
			path="/signup"
			element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
		  />
		  <Route
			path="/signin"
			element={!authUser ? <SignInPage /> : <Navigate to={"/"} />}
		  />
  
		  {/* Rute dengan layout */}
		  <Route element={<Layout />}>
			<Route
			  path="/"
			  element={authUser ? <HomePage /> : <Navigate to="/signin" />}
			/>
			<Route
			  path="/notifications"
			  element={
				authUser ? <NotificationsPage /> : <Navigate to="/signin" />
			  }
			/>
			<Route
			  path="/network"
			  element={authUser ? <NetworkPage /> : <Navigate to="/signin" />}
			/>
			<Route
			  path="/post/:postId"
			  element={authUser ? <PostPage /> : <Navigate to="/signin" />}
			/>
			<Route
			  path="/profile/:username"
			  element={authUser ? <ProfilePage /> : <Navigate to="/signin" />}
			/>
		  </Route>
		</Routes>
		<Toaster />
	  </>
	);
}

export default App;
