import { noop } from "lodash";
import GroupButtonAction from "../../../components/Button/GroupButtonAction";
export const initAssignmentValues = {
  name: "",
};

export const columns = () => [
  {
    title: "Index",
    dataIndex: "id",
    key: "id",
    render: (id, record, index) => {
      ++index;
      return index;
    },
    width: 100,
  },
  {
    title: "Student Name",
    dataIndex: "student_name",
    key: "student_name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Question Title",
    dataIndex: "question_title",
    key: "question_title",
  },
  {
    title: "Answer",
    dataIndex: "answer",
    key: "answer",
  },
  {
    title: "Result",
    dataIndex: "result",
    key: "result",
  },
];
