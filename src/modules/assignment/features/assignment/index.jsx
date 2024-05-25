import ModalContainer from "@/components/Modal/containers/ModalContainer";
import { useForm } from "antd/es/form/Form";
import { useCallback, useMemo, useState } from "react";
import useDetailActionType from "../../../../hooks/useDetailActionType";
import { TEXT } from "../../../../localization/en";
import ModalDetailAudio from "../../components/ModalDetail";
import ModalEvaluation from "../../components/ModalEvaluation";
import TableAudio from "../../components/TableAudio";
import { columns } from "../../components/items";
import { displaySuccessMessage } from "../../../../utils/request";
import useDeleteAudio from "../../services/useDeleteAudio";
import useModal from "../../../../hooks/useModal";
import SearchDriver from "../../../driver/features/components/Search";
import { Button, Col, Row, Typography } from "antd";
import useFetchAllAssignment from "../../services/useFetchAllAssignment";
import useCreateAssignment from "../../services/useCreateAssignment";
import { useNavigate } from "react-router";
import useRunEvaProcess from "../../services/useRunEvaProcess";

function AudioPage() {
  const [form] = useForm();
  const navigate = useNavigate();

  const [modalDetailId, setModalDetailId] = useState(null);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isOpenModalEva, setIsOpenModalEva] = useState(false);
  const { isNew, isEdit } = useDetailActionType(modalDetailId);

  //Title modal
  const title = useMemo(() => {
    if (isNew) return `${TEXT.button.addNew} ${TEXT.assignment.assignment}`;
    if (isEdit) return `${TEXT.button.edit} ${TEXT.assignment.assignment}`;
    return "";
  }, [isEdit, isNew]);

  //handle Modal
  const handleOpenDetail = useCallback((id = -1) => {
    setIsOpenModal(true), setModalDetailId(id);
  }, []);

  const handleOpenModalEva = useCallback((id = -1) => {
    setIsOpenModalEva(true)
    setModalDetailId(id)
  }, [])

  const handleViewSummary = (id = 1) => {
    navigate(`/summary/${id}`)
  }

  const handleViewQuestion = (id = 1) => {
    navigate(`/question/${id}`)
  }

  const onCancel = useCallback(() => {
    setModalDetailId(null);
    setIsOpenModal(false);
    setIsOpenModalEva(false)
    form.resetFields();
  }, [form]);

  const { data: listAssignment, isLoading, refetch } = useFetchAllAssignment({});
  
  const { mutateAsync: runEva, isLoading: isEvaRun } = useRunEvaProcess({
    onSuccess: () => {
      refetch();
      onCancel();
      displaySuccessMessage(TEXT.message.create_success);
    },
  });

  const { mutateAsync: deleteAudio } = useDeleteAudio({
    onSuccess: () => {
      displaySuccessMessage(TEXT.message.delete_success);
      refetch();
      onCloseModal();
    },
  });

  const { onCloseModal } = useModal({
    onDeleteOk: deleteAudio,
  });

  const { mutateAsync: createAssignment, isLoading: isCreate } = useCreateAssignment({
    onSuccess: () => {
      refetch();
      onCancel();
      displaySuccessMessage(TEXT.message.create_success);
    },
  });

  const onSubmitProcessEva = async () => {
    const value = form.getFieldValue();
    const { file } = value;
    const formData = new FormData();
    formData.append("file", file.file.originFileObj);
    formData.append(
      "student_answer_data",
      JSON.stringify({ "assignment_id": modalDetailId })
    );
    await runEva(formData);
    
  };

  const onSubmit = async () => {
    const value = form.getFieldValue();
    if (isNew) {
      await createAssignment(value);
    }
  };
  const onSearch = () => {
    // if(searchParams.get('name'))
    //   setAssignmentList(listAssignment.filter(a => a.audio_name.startsWith(searchParams.get('name'))))
    // else setAssignmentList(listAssignment)
  };

  return (
    <>
      <Row style={{padding: "15px"}}>
        <Col span={12}>
          <SearchDriver onSearch={onSearch} />
        </Col>
        <Col span={12} className="text-right">
        <Button
            className="backgroundThemeColor"
            onClick={() => handleOpenDetail()}
          >
            <Typography className="text-white">
              {TEXT.button.addNew}
            </Typography>
          </Button>
        </Col>
      </Row>

      {listAssignment && <TableAudio
        loading={isLoading}
        columns={columns({
          handleViewSummary,
          handleViewQuestion,
          handleOpenModalEva,
        })}
        dataSource={listAssignment}
        rowKey="id"
      />}

      <ModalContainer
        title={title}
        open={isOpenModal}
        onOk={() => form.submit()}
        confirmLoading={isCreate}
        okText={TEXT.button.ok}
        onCancel={onCancel}
        cancelButtonProps={{ style: { padding: "0 15px" } }}
        okButtonProps={{
          className: "backgroundThemeColor",
          style: { padding: "0 15px" },
        }}
        cancelText={TEXT.button.cancel}
        width={600}
      >
        <ModalDetailAudio form={form} onSubmit={onSubmit} isNew={isNew} />
      </ModalContainer>

      <ModalContainer
        title={"Run Process Evaluation"}
        loading={isEvaRun}
        open={isOpenModalEva}
        onOk={() => form.submit()}
        confirmLoading={isCreate}
        okText={TEXT.button.ok}
        onCancel={onCancel}
        cancelButtonProps={{ style: { padding: "0 15px" } }}
        okButtonProps={{
          className: "backgroundThemeColor",
          style: { padding: "0 15px" },
        }}
        cancelText={TEXT.button.cancel}
        width={600}
      >
        <ModalEvaluation form={form} onSubmit={onSubmitProcessEva} isNew={isNew} />
      </ModalContainer>
    </>
  );
}

export default AudioPage;
