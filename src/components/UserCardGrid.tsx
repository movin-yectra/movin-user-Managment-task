import { Card, Row, Col, Avatar, Popconfirm, Grid } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { User } from "../types";
import "../style/UserCardGrid.css";

const { useBreakpoint } = Grid;

interface Props {
  data: User[];
  onEdit: (u: User) => void;
  onDelete: (id: number) => void;
}

export default function UserCardGrid({ data, onEdit, onDelete }: Props) {
  const screens = useBreakpoint();

  return (
    <Row gutter={[16, 16]} style={{ padding: screens.xs ? 8 : 24 }}>
      {data.map((u) => (
        <Col key={u.id} xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            className="user-card"
            style={{
              textAlign: "center",
              borderRadius: 8,
              position: "relative",
              paddingTop: screens.xs ? 16 : 24,
              paddingBottom: screens.xs ? 16 : 24,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              margin: screens.xs ? 8 : 20,
            }}
            bodyStyle={{ paddingTop: 0, paddingBottom: screens.xs ? 16 : 24 }}
          >
            <Avatar
              src={u.avatar}
              size={screens.xs ? 80 : 120}
              style={{ marginBottom: screens.xs ? 8 : 12 }}
            />
            <div
              style={{
                fontWeight: 600,
                fontSize: screens.xs ? 20 : 30,
                wordBreak: "break-word",
              }}
            >
              {`${u.first_name} ${u.last_name}`}
            </div>
            <div
              style={{
                color: "#888",
                fontSize: screens.xs ? 14 : 24,
                wordBreak: "break-word",
              }}
            >
              {u.email}
            </div>

            <div
              className="card-actions"
              style={{
                marginTop: screens.xs ? 8 : 16,
                display: "flex",
                justifyContent: "center",
                gap: screens.xs ? 12 : 16,
              }}
            >
              <EditOutlined
                className="edit-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(u);
                }}
                style={{ fontSize: screens.xs ? 18 : 24, cursor: "pointer" }}
              />
              <Popconfirm
                title="Delete user?"
                onConfirm={(e) => {
                  e?.stopPropagation();
                  onDelete(u.id);
                }}
              >
                <DeleteOutlined
                  className="delete-icon"
                  onClick={(e) => e.stopPropagation()}
                  style={{ fontSize: screens.xs ? 18 : 24, cursor: "pointer" }}
                />
              </Popconfirm>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
