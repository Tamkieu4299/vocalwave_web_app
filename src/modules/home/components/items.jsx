import { EyeOutlined } from "@ant-design/icons";
import { noop } from "lodash";
import IconButton from "../../../components/Button/IconButton";
import { TEXT } from "../../../localization/en";
import CustomButtonStatus from "./CustomButtomStatus";
import SelectStatus from "./SelectStatus";
import dayjs from "dayjs";

export const initAudioValues = {
  status: "",
};

export const itemStatus = {
  todo: {
    color: "rgb(155, 155, 155)",
    label: TEXT.status.todo,
  },
  inprogress: {
    color: "rgb(46, 124, 209)",
    label: TEXT.status.inprogress,
  },
  done: {
    color: "rgb(45, 153, 100)",
    label: TEXT.status.done,
  },
};

export const selectOptions = [
  {
    key: "0",
    label: (
      <CustomButtonStatus
        color={itemStatus.todo.color}
        label={itemStatus.todo.label}
      />
    ),
    text: itemStatus.todo.label,
    color: itemStatus.todo.color,
  },
  {
    key: "1",
    label: (
      <CustomButtonStatus
        color={itemStatus.done.color}
        label={itemStatus.done.label}
      />
    ),
    text: itemStatus.done.label,
    color: itemStatus.done.color,
  },
  {
    key: "2",
    label: (
      <CustomButtonStatus
        color={itemStatus.inprogress.color}
        label={itemStatus.inprogress.label}
      />
    ),
    text: itemStatus.inprogress.label,
    color: itemStatus.inprogress.color,
  },
];

export const columns = ({ handleOpenDetail = noop }) => [
  {
    title: "Index",
    dataIndex: "inquiry_id",
    key: "inquiry_id",
    render: (id, record, index) => {
      ++index;
      return index;
    },
    width: 100,
  },
  {
    title: "Create by",
    dataIndex: "driver_name",
    key: "driver_name",
    render: (id, record) => record.user.name,
  },
  {
    title: "Phone Number",
    dataIndex: "driver_phone",
    key: "driver_phone",
    render: (id, record) => record.user.phone,
  },
  {
    title: "Updated at",
    dataIndex: "updated_at",
    key: "updated_at",
    sorter: (a, b) =>
      new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
    render: (record) => dayjs(record.updated_at).format("DD-MM-YYYY HH:mm"),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 150,
    align: "center",
    filters: [
      {
        text: "Todo",
        value: "0",
      },
      {
        text: "Done",
        value: "1",
      },
      {
        text: "Reject",
        value: "2",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: (_text, record) => (
      <SelectStatus status={record.status} id={record.inquiry_id} disabled />
    ),
  },
  {
    title: "Actions",
    key: "action",
    fixed: "right",
    align: "center",
    width: 100,
    render: (_text, record) => (
      <IconButton
        onClick={() => handleOpenDetail(record.inquiry_id)}
        title="Edit"
        icon={<EyeOutlined />}
        className="text-base text-sky-500"
      />
    ),
  },
];
