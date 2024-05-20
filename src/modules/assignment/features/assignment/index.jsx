import ModalContainer from "@/components/Modal/containers/ModalContainer";
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect, useMemo, useState } from "react";
import useDetailActionType from "../../../../hooks/useDetailActionType";
import { TEXT } from "../../../../localization/en";
import ModalDetailAudio from "../../components/ModalDetail";
import TableAudio from "../../components/TableAudio";
import { columns } from "../../components/items";
import { displaySuccessMessage } from "../../../../utils/request";
import useFetchAudio from "../../services/useFetchAudio";
import useDeleteAudio from "../../services/useDeleteAudio";
import useModal from "../../../../hooks/useModal";
import { useSearchParams } from "react-router-dom";
import SearchDriver from "../../../driver/features/components/Search";
import { Button, Col, Row, Typography } from "antd";
import useUpdateAudio from "../../services/useUpdateAudio";
import useFetchAllAssignment from "../../services/useFetchAllAssignment";
import useCreateAssignment from "../../services/useCreateAssignment";

function AudioPage() {
  const [form] = useForm();

  const [searchParams, setSearchParams] = useSearchParams();

  const [modalDetailId, setModalDetailId] = useState(null);

  const [isOpenModal, setIsOpenModal] = useState(false);



  const { isNew, isEdit } = useDetailActionType(modalDetailId);

  useEffect(() => {
    searchParams.get('audio_id') && handlePlayDetail(searchParams.get('audio_id'))
    setSearchParams("")
  }, [searchParams])

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

  const handlePlayDetail = useCallback((id = -1) => {
    setModalDetailId(id)
  }, []);

  const onCancel = useCallback(() => {
    setModalDetailId(null);
    setIsOpenModal(false);
    form.resetFields();
  }, [form]);

  const { data: listAssignment, isLoading, refetch } = useFetchAllAssignment({});
  
  const { isLoading: isFetchAudio } = useFetchAudio(modalDetailId, {
    enabled: Boolean(modalDetailId && modalDetailId !== -1),
    onSuccess: (rs) => {
      !isOpenModal && setModalDetailId(null);
      isOpenModal && form.setFieldsValue(rs)
    },
  });

  const { mutateAsync: deleteAudio } = useDeleteAudio({
    onSuccess: () => {
      displaySuccessMessage(TEXT.message.delete_success);
      refetch();
      onCloseModal();
    },
  });

  const { openModalDelete, onCloseModal } = useModal({
    onDeleteOk: deleteAudio,
  });

  const { mutateAsync: createAssignment, isLoading: isCreate } = useCreateAssignment({
    onSuccess: () => {
      refetch();
      onCancel();
      displaySuccessMessage(TEXT.message.create_success);
    },
  });

  const { isLoading: isUpdate } = useUpdateAudio({
    onSuccess: () => {
      refetch();
      onCancel();
      displaySuccessMessage(TEXT.message.update_success);
    },
  });

  const onSubmit = async () => {
    const value = form.getFieldValue();
    console.log(value);

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
          handlePlayDetail,
          handleOpenDetail,
          handleOpenDelete: openModalDelete,
        })}
        dataSource={listAssignment}
        rowKey="id"
      />}
      <ModalContainer
        title={title}
        loading={isFetchAudio}
        open={isOpenModal}
        onOk={() => form.submit()}
        confirmLoading={isCreate || isUpdate}
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
    </>
  );
}

export default AudioPage;
