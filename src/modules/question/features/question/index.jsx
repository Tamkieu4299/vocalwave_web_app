import TableAudio from "../../components/TableAudio";
import { columns } from "../../components/items";
import { Col, Row, Button, Typography } from "antd";
import { useState, useCallback } from "react";
import useFetchQuestion from "../../services/useFetchQuestion";
import { useParams } from 'react-router-dom';
import { TEXT } from "../../../../localization/en";
import ModalContainer from "@/components/Modal/containers/ModalContainer";
import { useForm } from "antd/es/form/Form";
import { displaySuccessMessage } from "../../../../utils/request";
import useCreateQuestion from "../../services/useCreateQuestion";
import ModalDetailQuestion from "../../components/ModalDetail";

function QuestionPage() {
  const { id } = useParams();
  const [form] = useForm();
  const [question, setQuestion] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { isLoading: isFetchQuestion, refetch } = useFetchQuestion(id, {
    enabled: Boolean(id),
    onSuccess: (rs) => {setQuestion(rs)},
  });
  //handle Modal
  const handleOpenDetail = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const onCancel = useCallback(() => {
    setIsOpenModal(false);
    form.resetFields();

  }, [form]);
  const { mutateAsync: createQuestion, isLoading: isCreate } = useCreateQuestion({
    onSuccess: () => {
      refetch();
      onCancel();
      displaySuccessMessage(TEXT.message.create_success);
    },
  });

  const onSubmit = async () => {
    const value = form.getFieldValue();
    const { question_title, instruction, criteria } = value;
    const formData = new FormData();
    formData.append("instruction", instruction.file.originFileObj);
    formData.append("criteria", criteria.file.originFileObj);

    formData.append(
      "question_data",
      JSON.stringify({ "assignment_id": id, "question_title": question_title })
    );
    await createQuestion(formData);
    
  };

  return (
    <>
      <Row style={{padding: "15px"}}>
      <Col span={12}>
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

      {!isFetchQuestion && <TableAudio
        loading={isFetchQuestion}
        columns={columns()}
        dataSource={question}
        rowKey="id"
      />}
      <ModalContainer
        title={"Add question"}
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
        <ModalDetailQuestion form={form} onSubmit={onSubmit} />
      </ModalContainer>
    </>
  );
}

export default QuestionPage;
