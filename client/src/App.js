import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedPage from "./components/ProtectedPage";
import Spinner from "./components/Spinner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProjectInfo from "./pages/ProjectInfo";
import Register from "./pages/Register";

function App() {
  // Select the 'loading' state from the Redux store
  const { loading } = useSelector((state) => state.loaders);

  return (
    <div data-testid="appRender">
      {/* Display a spinner when 'loading' state is true */}
      {loading && <Spinner />}

      <BrowserRouter>
        <Routes>
          {/* Define routes for different pages */}
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route
            path="/project/:id"
            element={
              <ProtectedPage>
                <ProjectInfo />
              </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
