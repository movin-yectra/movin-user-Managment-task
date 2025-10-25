import { Table, Avatar, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { User } from "../types";
import "../style/UserTable.css";

// --------------------------------------------------------------------

interface Props {
  data: User[];
  onEdit: (u: User) => void;
  onDelete: (id: number) => void;
}

// --------------------------------------------------------------------

export default function UserTable({ data, onEdit, onDelete }: Props) {
  const columns: ColumnsType<User> = [
    {
      title: "",
      render: (_: any, r: User) => <Avatar src={r.avatar} size={40} />,
      align: "center",
      onCell: () => ({ style: { paddingLeft: 12, paddingRight: 12 } }),
      onHeaderCell: () => ({ style: { paddingLeft: 12, paddingRight: 12 } }),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      render: (email: string) => (
        <a href={`mailto:${email}`} style={{ color: "#1890ff" }}>
          {email}
        </a>
      ),
      onCell: () => ({ style: { paddingLeft: 12, paddingRight: 12 } }),
      onHeaderCell: () => ({ style: { paddingLeft: 12, paddingRight: 12 } }),
    },

    {
      title: "First Name",
      dataIndex: "first_name",
      align: "center",
      onCell: () => ({ style: { paddingLeft: 12, paddingRight: 12 } }),
      onHeaderCell: () => ({ style: { paddingLeft: 12, paddingRight: 12 } }),
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      align: "center",
      onCell: () => ({ style: { paddingLeft: 12, paddingRight: 12 } }),
      onHeaderCell: () => ({ style: { paddingLeft: 12, paddingRight: 12 } }),
    },

    {
      title: "Action",
      align: "center",
      render: (_: any, r: User) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          <Button
            type="primary"
            style={{ borderRadius: 3 }}
            onClick={() => onEdit(r)}
          >
            Edit
          </Button>
          <Popconfirm title="Delete user?" onConfirm={() => onDelete(r.id)}>
            <Button type="primary" danger style={{ borderRadius: 3 }}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
      onCell: () => ({ style: { paddingLeft: 12, paddingRight: 12 } }),
      onHeaderCell: () => ({ style: { paddingLeft: 12, paddingRight: 12 } }),
    },
  ];

  return (
    <Table rowKey="id" dataSource={data} columns={columns} pagination={false} />
  );
}
