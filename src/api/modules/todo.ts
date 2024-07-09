import http from "../http/httpclient";
import { Todo } from "@/pages/entity/index";

const insert = (todo: Todo) => {
  return http.post<Todo>("/insert", todo);
};

const getAll = () => {
  return http.get("/getAll");
};

const remove = (id: number) => {
  return http.delete(`/delete/${id}`);
};

const update = () => { 
  return http.
}

export const todoApi = {
  insert,
  getAll,
  remove,
  update,
};
