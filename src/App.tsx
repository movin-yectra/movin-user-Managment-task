import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import UsersPage from "./pages/UsersPage";
import PrivateRoute from "./routes/PrivateRoute";
import { Layout } from "antd";
import Navbar from "./components/Navbar";

const { Content } = Layout;

export default function App() {
  return (
    <Layout style={{ minHeight: "100vh", background: "#EFF2F5" }}>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <div>
                <Navbar />
                <Content style={{ padding: 40 }}>
                  <UsersPage />
                </Content>
              </div>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Layout>
  );
}
