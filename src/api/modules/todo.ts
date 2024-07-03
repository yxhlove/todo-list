import http from "../http/httpclient";
import { Todo } from "@/pages/entity/index";

const insert = (todo: Todo) => {
  return http.post<Todo>("/todo/insert", todo);
};

export const todoApi = {
  insert,
};
