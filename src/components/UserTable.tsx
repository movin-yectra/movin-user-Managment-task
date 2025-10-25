import { Table, Avatar, Button, Popconfirm, Grid, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { User } from "../types";
import "../style/UserTable.css";

const { useBreakpoint } = Grid;

interface Props {
  data: User[];
  onEdit: (u: User) => void;
  onDelete: (id: number) => void;
}

export default function UserTable({ data, onEdit, onDelete }: Props) {
  const screens = useBreakpoint(); // AntD breakpoints

  const columns: ColumnsType<User> = [
    {
      title: "",
      render: (_: any, r: User) => (
        <Avatar src={r.avatar} size={screens.xs ? 30 : 40} />
      ),
      align: "center",
      width: screens.xs ? 50 : 60,
      onCell: () => ({ style: { paddingLeft: 8, paddingRight: 8 } }),
      onHeaderCell: () => ({ style: { paddingLeft: 8, paddingRight: 8 } }),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      render: (email: string) => (
        <a
          href={`mailto:${email}`}
          style={{ color: "#1890ff", fontSize: screens.xs ? 12 : 14 }}
        >
          {email}
        </a>
      ),
      onCell: () => ({ style: { paddingLeft: 8, paddingRight: 8 } }),
      onHeaderCell: () => ({ style: { paddingLeft: 8, paddingRight: 8 } }),
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      align: "center",
      render: (text) => <span style={{ fontSize: screens.xs ? 12 : 14 }}>{text}</span>,
      onCell: () => ({ style: { paddingLeft: 8, paddingRight: 8 } }),
      onHeaderCell: () => ({ style: { paddingLeft: 8, paddingRight: 8 } }),
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      align: "center",
      render: (text) => <span style={{ fontSize: screens.xs ? 12 : 14 }}>{text}</span>,
      onCell: () => ({ style: { paddingLeft: 8, paddingRight: 8 } }),
      onHeaderCell: () => ({ style: { paddingLeft: 8, paddingRight: 8 } }),
    },
    {
      title: "Action",
      align: "center",
      render: (_: any, r: User) => (
        <Space
          direction={screens.xs ? "vertical" : "horizontal"}
          size={screens.xs ? 4 : 8}
          style={{ justifyContent: "center", width: "100%" }}
        >
          <Button
            type="primary"
            style={{
              borderRadius: 3,
              width: screens.xs ? "100%" : "auto",
              fontSize: screens.xs ? 12 : 14,
            }}
            onClick={() => onEdit(r)}
          >
            Edit
          </Button>
          <Popconfirm title="Delete user?" onConfirm={() => onDelete(r.id)}>
            <Button
              type="primary"
              danger
              style={{
                borderRadius: 3,
                width: screens.xs ? "100%" : "auto",
                fontSize: screens.xs ? 12 : 14,
              }}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: screens.xs ? 140 : 200,
      onCell: () => ({ style: { paddingLeft: 8, paddingRight: 8 } }),
      onHeaderCell: () => ({ style: { paddingLeft: 8, paddingRight: 8 } }),
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={data}
      columns={columns}
      pagination={false}
      scroll={{ x: "max-content" }} // horizontal scroll for small screens
      size={screens.xs ? "small" : "middle"} // smaller table on mobile
    />
  );
}
