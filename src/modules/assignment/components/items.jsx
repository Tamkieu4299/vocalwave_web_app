import { noop } from "lodash";
import GroupButtonAction from "../../../components/Button/GroupButtonAction";
export const initAssignmentValues = {
  name: "",
};

export const columns = ({
  handleViewSummary = noop,
  handleViewQuestion = noop,
  handleOpenModalEva = noop
}) => [
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
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Number of Questions",
    dataIndex: "num_of_questions",
    render: (id, record, index) => {
      return record.questions.length;
    },
  },
  {
    title: "Actions",
    key: "action",
    fixed: "right",
    width: 100,
    render: (_text, record) => (
      <GroupButtonAction
        onViewSummary = {() => handleViewSummary(record.id)}
        onViewQuestion = {() => handleViewQuestion(record.id)}
        onRunEva={() => {handleOpenModalEva(record.id)}}
      />
    ),
  },
];
