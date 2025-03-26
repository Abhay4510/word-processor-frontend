import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { EditorProvider } from "./context/EditorContext";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import Editor from "./pages/Editor";
import CreateLetter from "./pages/CreateLetter";
import UpdateLetter from "./pages/UpdateLetter";
import Profile from "./pages/Profile";
import "./tailwind.css";

function App() {
  return (
    <AuthProvider>
      <EditorProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <CreateLetter />
                </PrivateRoute>
              }
            />

            <Route
              path="/update/:id"
              element={
                <PrivateRoute>
                  <UpdateLetter />
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </EditorProvider>
    </AuthProvider>
  );
}


export default App;