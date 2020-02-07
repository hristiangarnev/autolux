import UpdateCar from '../components/UpdateCar';
import { withRouter } from "next/router";

const Sell = withRouter(({ router }) => {
  return (
    <div>
      <UpdateCar id={router.query.id} />
    </div>
  )
});

export default Sell;