import { Route, Routes, useLocation, useNavigate } from "react-router";
import "./App.css";
import HomePage from "./pages";
import CreateWorkoutPage from "./pages/create";
import Workout from "./pages/workout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { useEffect } from "react";
import { get_token } from "./capacitor/auth";
import { GuestLayout } from "./components/layout/layout";




function App() {
  let nav = useNavigate()
  let location=useLocation()
  useEffect(() => {
    
    const handle = async () => {
      const token = await get_token()
      if ( !token && location.pathname !== "/auth/login" && location.pathname !== "/auth/register") {
        nav("/auth/register")
      }

    }
    handle()
  },[])
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<GuestLayout/>}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="/workout/:id" element={<Workout />} />
        <Route path="/create" element={<CreateWorkoutPage />} />
      </Routes>
  );
}
export default App
