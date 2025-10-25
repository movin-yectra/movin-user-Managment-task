import { Card, Row, Col, Avatar, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { User } from "../types";
import "../style/UserCardGrid.css";

// --------------------------------------------------------------------

interface Props {
  data: User[];
  onEdit: (u: User) => void;
  onDelete: (id: number) => void;
}

// --------------------------------------------------------------------

export default function UserCardGrid({ data, onEdit, onDelete }: Props) {
  return (
    <Row gutter={[16, 16]} style={{ paddingLeft: 24, paddingRight: 24 }}>
      {data.map((u) => (
        <Col key={u.id} xs={24} sm={12} md={8}>
          <Card
            hoverable
            className="user-card"
            style={{
              textAlign: "center",
              borderRadius: 8,
              position: "relative",
              paddingTop: 24,
              paddingBottom: 24,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              margin: 20,
            }}
            bodyStyle={{ paddingTop: 0, paddingBottom: 24 }}
          >
            <Avatar src={u.avatar} size={120} style={{ marginBottom: 12 }} />
            <div
              style={{ fontWeight: 600, fontSize: 30 }}
            >{`${u.first_name} ${u.last_name}`}</div>
            <div style={{ color: "#888", fontSize: 24 }}>{u.email}</div>

            <div className="card-actions">
              <EditOutlined
                className="edit-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(u);
                }}
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
                />
              </Popconfirm>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
