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

// --------------------------------------------------------------------

export default function UsersPage() {
  const dispatch: any = useDispatch();
  const { items, loading } = useSelector((s: RootState) => s.users);

  const [query, setQuery] = useState("");
  const [isCardView, setIsCardView] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

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
      // if last item on page removed, go to previous page when necessary
      if ((page - 1) * pageSize >= filtered.length - 1 && page > 1)
        setPage(page - 1);
    } catch {
      message.error("Delete failed");
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <Row
          justify="space-between"
          style={{ marginBottom: 12, padding: 20 }}
          align="middle"
        >
          <Col>
            <div style={{ fontWeight: 600, fontSize: 24 }}>Users</div>
          </Col>

          <Col>
            <Space direction="horizontal" size={20}>
              <Input.Search
                placeholder="input search text"
                onSearch={(v) => setQuery(v)}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                style={{
                  width: 260,
                  borderRadius: 0,
                  outline: "none",
                }}
                className="no-radius"
              />
              <Button
                style={{
                  borderRadius: 0,
                }}
                type="primary"
                onClick={openCreate}
              >
                Create User
              </Button>
            </Space>
          </Col>
        </Row>
        <Row
          justify="start"
          style={{ marginBottom: 12, paddingLeft: 24 }}
          align="middle"
        >
          <Button
            type={isCardView ? "default" : "primary"}
            icon={<UnorderedListOutlined />}
            onClick={() => setIsCardView(false)}
            style={{ borderRadius: 0 }}
          >
            Table
          </Button>
          <Button
            type={isCardView ? "primary" : "default"}
            icon={<AppstoreOutlined />}
            onClick={() => setIsCardView(true)}
            style={{ borderRadius: 0 }}
          >
            Card
          </Button>
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
