import { noop } from "lodash";
import GroupButtonAction from "../../../components/Button/GroupButtonAction";
import dayjs from "dayjs";
export const initAudioValues = {
  audio_name: "",
  durations: "",
  link: "",
  type: "",
  image_id: "",
  file: null,
};

export const columns = ({
  handlePlayDetail = noop,
  handleOpenDetail = noop,
  handleOpenDelete = noop,
  handleOpenShare= noop,
}) => [
  {
    title: "Index",
    dataIndex: "audio_id",
    key: "audio_id",
    render: (id, record, index) => {
      ++index;
      return index;
    },
    width: 100,
  },
  {
    title: "Name",
    dataIndex: "audio_name",
    key: "audio_name",
    sorter: (a, b) => a.audio_name.length - b.audio_name.length,
  },
  {
    title: "Durations",
    dataIndex: "durations",
    key: "durations",
    sorter: (a, b) => parseInt(a.durations) - parseInt(b.durations),
  },

  {
    title: "Updated at",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (record) => dayjs(record.updated_at).format("DD-MM-YYYY HH:mm"),

    sorter: (a, b) =>
      new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
  },
  {
    title: "Created by",
    dataIndex: "created_by",
    key: "created_by",
    filters: [
      {
        text: "admin",
        value: "admin",
      },
      {
        text: "operator",
        value: "operator",
      },
    ],
    onFilter: (value, record) => record.created_by.indexOf(value) === 0,
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
