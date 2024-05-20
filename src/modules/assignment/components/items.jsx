import { noop } from "lodash";
import GroupButtonAction from "../../../components/Button/GroupButtonAction";
export const initAssignmentValues = {
  name: "",
};

export const columns = ({
  handlePlayDetail = noop,
  handleOpenDetail = noop,
  handleOpenDelete = noop,
  handleOpenShare= noop,
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
        onPlay = {() => handlePlayDetail(record.audio_id)}
        onEdit={() => handleOpenDetail(record.audio_id)}
        onDelete={() => handleOpenDelete(record.audio_id)}
        onShare={() => handleOpenShare(record.audio_id)}
      />
    ),
  },
];
