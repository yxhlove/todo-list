import { Button, Input, Space } from "antd";
import "./index.less";
import { ProTable } from "@ant-design/pro-components";
import { ChangeEvent, useEffect, useState } from "react";
import api from "@/api";

function App() {
  const [taskTitle, setTaskTile] = useState<string>("");

  const handleAddTask = async () => {
    const res: any = await api.insert({ title: taskTitle, completed: false });
    console.log("todo-insert",res)
  };

  const handleInputTask = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTile(e.target.value);
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const res: any = await fetch("http://localhost:3000/todo/getAll");
    console.log("zsl-88", res.json());
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
      <ProTable options={false} search={false} />
    </div>
  );
}

export default App;
