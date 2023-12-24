import ModalContainer from "@/components/Modal/containers/ModalContainer";
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect, useMemo, useState } from "react";
import useDetailActionType from "../../../../hooks/useDetailActionType";
import { TEXT } from "../../../../localization/en";
import ModalDetailAudio from "../../components/ModalDetail";
import TableAudio from "../../components/TableAudio";
import { columns } from "../../components/items";
import useCreateAudio from "../../services/useCreateAudio";
import { displaySuccessMessage } from "../../../../utils/request";
import useFetchAllAudio from "../../services/useFetchAllAudio";
import useFetchAudio from "../../services/useFetchAudio";
import useDeleteAudio from "../../services/useDeleteAudio";
import useModal from "../../../../hooks/useModal";
import { useSearchParams } from "react-router-dom";
import SearchDriver from "../../../driver/features/components/Search";
import { Button, Col, Row, Typography } from "antd";
import useUpdateAudio from "../../services/useUpdateAudio";
import usePermission from "../../../../hooks/usePermission";
import { getLocalStorage } from "../../../../utils/storage";
import TrackTable from "../../../../components/Table/TrackTable";
import { list } from "postcss";
import MusicPlayer from "../../../../components/MusicPlayer/MusicPlayer";
import moonlight from "../../../../assets/moonlight.mp3";

const testTracklistData = [
  {
    name: "Song 1",
    artist: "Artist 1",
    playlistName: "Playlist A",
    duration: "03:45",
  },
  {
    name: "Song 2",
    artist: "Artist 2",
    playlistName: "Playlist B",
    duration: "04:20",
  },
  {
    name: "Song 3",
    artist: "Artist 3",
    duration: "02:55",
  },
];

function AudioPage() {
  const [form] = useForm();
  const [searchParams] = useSearchParams();
  const { editPermission, deletePermission, viewPermission } = usePermission();
  const user = getLocalStorage("tempUser");
  const param = user.emotion_type || "";

  const [modalDetailId, setModalDetailId] = useState(null);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { isNew, isEdit } = useDetailActionType(modalDetailId);

  const [currentPlaySong, setCurrentPlaySong] = useState(null);

  //Title modal
  const title = useMemo(() => {
    if (isNew) return `${TEXT.button.addNew} ${TEXT.audio.audio}`;
    if (isEdit) return `${TEXT.button.edit} ${TEXT.audio.audio}`;
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
  const { data: listAudio, isLoading, refetch } = useFetchAllAudio(param, {});

  useEffect(() => {
    refetch();
  }, [param]);
  
  const { isLoading: isFetchAudio } = useFetchAudio(modalDetailId, {
    enabled: Boolean(modalDetailId && modalDetailId !== -1),
    onSuccess: (rs) => {
      setCurrentPlaySong(rs)
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

  const { mutateAsync: createAudio, isLoading: isCreate } = useCreateAudio({
    onSuccess: () => {
      refetch();
      onCancel();
      displaySuccessMessage(TEXT.message.create_success);
    },
  });

  const { mutateAsync: updateAudio, isLoading: isUpdate } = useUpdateAudio({
    onSuccess: () => {
      refetch();
      onCancel();
      displaySuccessMessage(TEXT.message.update_success);
    },
  });

  const onSubmit = async () => {
    const value = form.getFieldValue();
    const userName = user?.name;

    if (isNew) {
      const { file, ...payload } = value;
      const formData = new FormData();
      formData.append("file", file.file.originFileObj);
      formData.append(
        "audio_data",
        JSON.stringify({ ...payload, created_by: userName })
      );
      await createAudio(formData);
    }
    if (isEdit) {
      await updateAudio({
        id: modalDetailId,
        body: { ...value, created_by: userName },
      });
    }
  };
  const onSearch = () => {
    refetch();
  };
  return (
    <>
      <Row>
        <Col span={12}>
          <SearchDriver onSearch={onSearch} />
        </Col>
        <Col span={12} className="text-right">
          {editPermission && (
            <Button
              className="backgroundThemeColor"
              onClick={() => handleOpenDetail()}
            >
              <Typography className="text-white">
                {TEXT.button.addNew}
              </Typography>
            </Button>
          )}
        </Col>
      </Row>

      <TableAudio
        loading={isLoading}
        columns={columns({
          handlePlayDetail,
          handleOpenDetail,
          handleOpenDelete: openModalDelete,
        })}
        dataSource={listAudio}
        rowKey="audio_id"
        // rowSelection={rowSelection}
      />
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
          disabled: !editPermission,
          className: "backgroundThemeColor",
          style: { padding: "0 15px" },
        }}
        cancelText={TEXT.button.cancel}
        width={600}
      >
        <ModalDetailAudio form={form} onSubmit={onSubmit} isNew={isNew} />
      </ModalContainer>
      {/* <TrackTable tracklist={listAudio}/> */}
      {currentPlaySong && (
        <MusicPlayer
          name={currentPlaySong.audio_name}
          artist={currentPlaySong.created_by}
          song={`http://localhost:8001/static/audio/${currentPlaySong.audio_name}.mp3`}
        />
      )}
    </>
  );
}

export default AudioPage;
