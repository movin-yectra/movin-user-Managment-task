import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearToken } from "../redux/actions";
import { PoweroffOutlined } from "@ant-design/icons";

// --------------------------------------------------------------------

const { Header } = Layout;

// --------------------------------------------------------------------

export default function Navbar() {
  const nav = useNavigate();
  const dispatch: any = useDispatch();

  const handleLogout = () => {
    dispatch(clearToken());
    nav("/login");
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#050505ff",
        padding: "0 24px",
        boxShadow: "0 2px 8px #f0f1f2",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 18, color: "white" }}>
        User Managment
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Text */}
        <p
          style={{
            color: "white",
            margin: 0,
            lineHeight: "36px",
            marginRight: 20,
            fontWeight: 600,
          }}
        >
          Elon Musk
        </p>

        {/* Icon Box */}
        <div
          onClick={handleLogout}
          style={{
            width: 36,
            height: 36,
            backgroundColor: "#ff4d4f",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transform: "rotate(90deg)",
            borderRadius: 0,
          }}
        >
          <PoweroffOutlined style={{ color: "#fff", fontSize: 18 }} />
        </div>
      </div>
    </Header>
  );
}
