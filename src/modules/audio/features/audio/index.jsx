import ModalContainer from "@/components/Modal/containers/ModalContainer";
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect, useMemo, useState } from "react";
import useDetailActionType from "../../../../hooks/useDetailActionType";
import { TEXT } from "../../../../localization/en";
import ModalDetailAudio from "../../components/ModalDetail";
import TableAudio from "../../components/TableAudio";
import { columns } from "../../components/items";
import useCreateAudio from "../../services/useCreateAudio";
import request, { displaySuccessMessage } from "../../../../utils/request";
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
import MusicPlayer from "../../../../components/MusicPlayer/MusicPlayer";
import { formatDuration } from "../../../../utils/util";
import ShareAudio from "../../components/ShareAudio";

function AudioPage() {
  const [form] = useForm();
  const [audioList, setAudioList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { editPermission, deletePermission, viewPermission } = usePermission();
  const user = getLocalStorage("tempUser");
  const param = user.emotion_type || "";
  const [shareSong, setShareSong] = useState(null);

  const [modalDetailId, setModalDetailId] = useState(null);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isOpenShare, setIsOpenShare] = useState(false);


  const { isNew, isEdit } = useDetailActionType(modalDetailId);

  const [currentPlaySong, setCurrentPlaySong] = useState(null);

  useEffect(() => {
    searchParams.get('audio_id') && handlePlayDetail(searchParams.get('audio_id'))
    setSearchParams("")
  }, [searchParams])

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

  const handleOpenShare = useCallback(async (id = -1) => {
    setIsOpenShare(true);
    const selected = await request.get(`audio/get/${id}`)
    setShareSong(selected)
  }, []);

  const handlePlayDetail = useCallback((id = -1) => {
    setModalDetailId(id)
  }, []);

  const onCancel = useCallback(() => {
    setModalDetailId(null);
    setIsOpenModal(false);
    form.resetFields();
  }, [form]);
  
  const onCancelShare = () => {
    setModalDetailId(null);
    setIsOpenShare(false);
  };

  const { data: listAudio, isLoading, refetch } = useFetchAllAudio(param, {});

  useEffect(() => {
    if (listAudio && listAudio.length > 0) {
      const formattedList = listAudio.map(item => ({
        ...item,
        durations: formatDuration(item.durations),
      }));

      setAudioList(formattedList);
    }
  }, [listAudio])

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
    console.log(value);
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
    if(searchParams.get('name'))
      setAudioList(listAudio.filter(a => a.audio_name.startsWith(searchParams.get('name'))))
    else setAudioList(listAudio)
  };

  return (
    <>
      <Row style={{padding: "15px"}}>
        <Col span={12}>
          <SearchDriver onSearch={onSearch} />
        </Col>
        <Col span={12} className="text-right">
        {editPermission && deletePermission && <Button
            className="backgroundThemeColor"
            onClick={() => handleOpenDetail()}
          >
            <Typography className="text-white">
              {TEXT.button.addNew}
            </Typography>
          </Button>}
        </Col>
      </Row>

      {audioList && <TableAudio
        loading={isLoading}
        columns={columns({
          handlePlayDetail,
          handleOpenDetail,
          handleOpenDelete: openModalDelete,
          handleOpenShare
        })}
        dataSource={audioList}
        rowKey="audio_id"
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
      <ModalContainer
        title="Share"
        open={isOpenShare}
        onOk={onCancelShare}
        okText="Later"
        onCancel={onCancelShare}
        width={1000}
      >
        {isOpenShare && shareSong && <ShareAudio currentPlaySong={shareSong}/>}
      </ModalContainer>
      {/* {(!editPermission || !deletePermission) && <TrackTable tracklist={audioList} onPlay={handlePlayDetail}/>} */}
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
