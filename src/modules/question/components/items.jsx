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
    title: "Question Title",
    dataIndex: "question_title",
    key: "question_title",
  },
  {
    title: "Marking criteria",
    dataIndex: "marking_criteria",
    key: "marking_criteria",
  },
  {
    title: "Instruction",
    dataIndex: "instruction",
    key: "instruction",
  },
];
