import UpdateCar from '../components/UpdateCar';
import { withRouter } from "next/router";
import Loading from '../components/Loading';

const Sell = withRouter(({ router }) => {
  if(!router.query.id) return <Loading />
  return (
    <div>
      <UpdateCar id={router.query.id} />
    </div>
  )
});

export default Sell;