import { getLocalStorage } from "../../../../utils/storage";
import Post from "../../../../components/Post/Post"; 
import Share from "../../../../components/Share/Share";
import useFetchAllInQuery from "../../services/useFetchAllInQuery";

const musicInfoTest = {
  name: 'test',
  artist: 'test'
}

function HomePage() {
  const user = getLocalStorage("tempUser");
  const { data: listPosts, isLoading, refetch } = useFetchAllInQuery("", {});
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "15px"
    }}>
      <Share user={user?.name}/>
      {listPosts?.map((data, index) => {
        return <Post key={data.post_id} user={data.user_id} date={data.created_at} content={data.content} uploaded_link = {data.uploaded_link} music={data?.audio_id ?? null}/>
      })}
    </div>
  );
}

export default HomePage;
