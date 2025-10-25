import { useEffect, useMemo, useState } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Spin,
  message,
  Pagination,
  Space,
  Grid,
} from "antd";
import { UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../redux/actions";
import { RootState, User } from "../types";
import UserTable from "../components/UserTable";
import UserCardGrid from "../components/UserCardGrid";
import UserModal from "../components/UserModal";

const { useBreakpoint } = Grid;

export default function UsersPage() {
  const dispatch: any = useDispatch();
  const { items, loading } = useSelector((s: RootState) => s.users);

  const [query, setQuery] = useState("");
  const [isCardView, setIsCardView] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  const screens = useBreakpoint(); // responsive breakpoints

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((u) =>
      `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(q)
    );
  }, [items, query]);

  const total = filtered.length;
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (u: User) => {
    setEditing(u);
    setModalOpen(true);
  };

  const handleCreate = async (values: Partial<User>) => {
    try {
      await dispatch(createUser(values));
      message.success("User created");
      setPage(1);
    } catch {
      message.error("Create failed");
    }
  };

  const handleUpdate = async (values: Partial<User>) => {
    try {
      if (!editing) return;
      await dispatch(updateUser(editing.id, values));
      message.success("User updated");
    } catch {
      message.error("Update failed");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteUser(id));
      message.success("Deleted");
      if ((page - 1) * pageSize >= filtered.length - 1 && page > 1)
        setPage(page - 1);
    } catch {
      message.error("Delete failed");
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "white", padding: screens.xs ? 12 : 20 }}>
        <Row
          justify="space-between"
          gutter={[16, 16]}
          align="middle"
          style={{ marginBottom: 12 }}
        >
          <Col xs={24} sm={12} md={12} lg={8}>
            <div style={{ fontWeight: 600, fontSize: screens.xs ? 20 : 24 }}>
              Users
            </div>
          </Col>

          <Col
            xs={24}
            sm={12}
            md={12}
            lg={16}
            style={{ textAlign: screens.xs ? "left" : "right" }}
          >
            <Space
              direction={screens.xs ? "vertical" : "horizontal"}
              size={screens.xs ? 12 : 20}
            >
              <Input.Search
                placeholder="input search text"
                onSearch={(v) => setQuery(v)}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                style={{ width: screens.xs ? "100%" : 200 }}
                className="no-radius"
              />
              <Button
                type="primary"
                style={{
                  borderRadius: 3,
                }}
                onClick={openCreate}
                block={screens.xs}
              >
                Create User
              </Button>
            </Space>
          </Col>
        </Row>

        <Row justify="start" align="middle" style={{ marginBottom: 12 }}>
          <Col>
            <Button
              type={isCardView ? "default" : "primary"}
              icon={<UnorderedListOutlined />}
              onClick={() => setIsCardView(false)}
              style={{
                borderBottomLeftRadius: 3,
                borderTopLeftRadius: 3,
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
              }}
            >
              Table
            </Button>
          </Col>
          <Col>
            <Button
              type={isCardView ? "primary" : "default"}
              icon={<AppstoreOutlined />}
              onClick={() => setIsCardView(true)}
              style={{
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
                borderBottomRightRadius: 3,
                borderTopRightRadius: 3,
              }}
            >
              Card
            </Button>
          </Col>
        </Row>

        {loading ? (
          <div style={{ textAlign: "center", paddingTop: 60 }}>
            <Spin />
          </div>
        ) : (
          <>
            {!isCardView ? (
              <UserTable
                data={pageData}
                onEdit={openEdit}
                onDelete={handleDelete}
                data-testid="user-table"
              />
            ) : (
              <UserCardGrid
                data={pageData}
                onEdit={openEdit}
                onDelete={handleDelete}
                data-testid="user-card-view"
              />
            )}
          </>
        )}

        <UserModal
          open={modalOpen}
          user={editing}
          onClose={() => setModalOpen(false)}
          onSubmit={editing ? handleUpdate : handleCreate}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 20,
          paddingRight: screens.xs ? 12 : 0,
        }}
      >
        <Pagination
          current={page}
          onChange={(p) => setPage(p)}
          pageSize={pageSize}
          total={total}
          style={{ borderRadius: 0 }}
        />
      </div>
    </>
  );
}
