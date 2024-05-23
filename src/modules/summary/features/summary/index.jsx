import TableAudio from "../../components/TableAudio";
import { columns } from "../../components/items";
import { Col, Row } from "antd";
import { useState } from "react";
import useFetchSummary from "../../services/useFetchSummary";
import { useParams } from 'react-router-dom';

function AudioPage() {
  const { id } = useParams();
  const [summary, setSummary] = useState([])
  console.log(summary)
  const { isLoading: isFetchSummary } = useFetchSummary(id, {
    enabled: Boolean(id),
    onSuccess: (rs) => {setSummary(rs)},
  });






  return (
    <>
      <Row style={{padding: "15px"}}>
        <Col span={12} className="text-right">
        </Col>
      </Row>

      {!isFetchSummary && <TableAudio
        loading={isFetchSummary}
        columns={columns()}
        dataSource={summary}
        rowKey="id"
      />}
    </>
  );
}

export default AudioPage;
