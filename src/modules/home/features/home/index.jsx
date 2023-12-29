import { getLocalStorage } from "../../../../utils/storage";
import Post from "../../../../components/Post/Post";
import Share from "../../../../components/Share/Share";
import useFetchAllInQuery from "../../services/useFetchAllInQuery";

function HomePage() {
  const user = getLocalStorage("tempUser");
  const { data: listPosts, isLoading, refetch } = useFetchAllInQuery("", {});
  console.log(listPosts)
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "15px"
    }}>
      <Share user={user?.name}/>
      {listPosts?.map((l) => {
        return <Post user={l.user_id} date={l.created_at} content={l.content} uploaded_link = {l.uploaded_link}/>
      })}
    </div>
  );
}

export default HomePage;
