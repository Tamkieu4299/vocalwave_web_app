import TableAudio from "../../components/TableAudio";
import { columns } from "../../components/items";
import { Col, Row } from "antd";
import { useState } from "react";
import useFetchQuestion from "../../services/useFetchQuestion";
import { useParams } from 'react-router-dom';

function QuestionPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState([])
  console.log(question)
  const { isLoading: isFetchQuestion } = useFetchQuestion(id, {
    enabled: Boolean(id),
    onSuccess: (rs) => {setQuestion(rs)},
  });

  return (
    <>
      <Row style={{padding: "15px"}}>
        <Col span={12} className="text-right">
        </Col>
      </Row>

      {!isFetchQuestion && <TableAudio
        loading={isFetchQuestion}
        columns={columns()}
        dataSource={question}
        rowKey="id"
      />}
    </>
  );
}

export default QuestionPage;
