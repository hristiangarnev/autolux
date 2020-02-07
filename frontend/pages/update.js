import UpdateCar from '../components/UpdateCar';
import { withRouter } from "next/router";

const Sell = withRouter(({ router }) => {
  if(!router.query.id) return <div>Loading...</div>;
  return (
    <div>
      <UpdateCar id={router.query.id} />
    </div>
  )
});

export default Sell;