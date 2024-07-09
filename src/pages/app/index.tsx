import { Button, Input, Space } from "antd";
import "./index.less";
import {
  ActionType,
  ProColumnType,
  ProTable,
} from "@ant-design/pro-components";
import { ChangeEvent, useRef, useState } from "react";
import api from "@/api";
import { Todo } from "../entity";

function App() {
  const [taskTitle, setTaskTile] = useState<string>("");
  const tableRef = useRef<ActionType>();

  const columns: ProColumnType<Todo>[] = [
    {
      title: "序号",
      dataIndex: "index",
      valueType: "index",
    },
    { title: "任务名称", dataIndex: "title" },
    {
      title: "是否完成",
      dataIndex: "completed",
      render: (value) => <span>{value ? "是" : "否"}</span>,
    },
    {
      title: "操作",
      render: (_, entity: Todo) => (
        <Space>
          <a>标记完成</a>
          <a onClick={() => handleDelete(entity.id!)}>删除</a>
        </Space>
      ),
    },
  ];

  const handleDelete = async (id: number) => {
    const res: any = await api.remove(id);
    if (res.code === 200) reloadTable();
  };

  const handleAddTask = async () => {
    const res: any = await api.insert({ title: taskTitle, completed: false });
    if (res.code === 200) reloadTable();
  };

  const handleInputTask = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTile(e.target.value);
  };

  const reloadTable = () => {
    tableRef.current?.reload();
  };

  return (
    <div className="box">
      <div className="header">
        <Space.Compact style={{ width: "100%" }}>
          <Input value={taskTitle} onChange={handleInputTask} />
          <Button onClick={handleAddTask} disabled={!taskTitle}>
            添加任务
          </Button>
        </Space.Compact>
      </div>
      <ProTable
        rowKey="id"
        actionRef={tableRef}
        options={false}
        search={false}
        columns={columns}
        request={async () => {
          const res: any = await api.getAll();
          return {
            success: res.code === 200,
            total: res.data.length,
            data: res.data,
          };
        }}
      />
    </div>
  );
}

export default App;
