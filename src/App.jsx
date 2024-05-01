import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const SignUpSignIn = lazy(() => import("./pages/Signup"));

const App = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <Loader />
              ) : user ? (
                <Navigate to="/dashboard" />
              ) : (
                <SignUpSignIn />
              )
            }
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
