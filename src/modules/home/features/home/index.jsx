import { getLocalStorage } from "../../../../utils/storage";
import Post from "../../components/Post";
import Share from "../../../../components/Share/Share";

function HomePage() {
  const user = getLocalStorage("tempUser");
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "15px"
    }}>
      <Share user={user?.name}/>
      <Post user={user?.name} date="11/12/2023 09:44:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero."/>
      <Post user={user?.name} date="06/10/2023 12:10:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero."/>
      <Post user={user?.name} date="06/10/2023 12:10:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero."/>
      <Post user={user?.name} date="06/10/2023 12:10:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero."/>
      <Post user={user?.name} date="06/10/2023 12:10:00" content="Lorem ipsum dolor sit amet. Nam enim odit qui suscipit dolores et galisum dolorem est galisum nesciunt. Et quis veniam vel unde nihil eum aliquid consequuntur. Et nihil perferendis ex deserunt optio et enim eaque ut blanditiis nemo sit consequatur voluptas et minima eius At eius corrupti. Id amet quia sit excepturi consequatur nam autem sint. At dolor quia eum harum iusto eos nulla expedita ut itaque itaque et autem velit? Nam doloremque saepe 33 velit deserunt non quae libero."/>
    </div>
  );
}

export default HomePage;
