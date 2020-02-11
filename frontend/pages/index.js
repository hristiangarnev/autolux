import Cars from '../components/Cars';
import { withRouter } from 'next/router'
import Loading from '../components/Loading';

const Home = withRouter(({ router }) => {
  if(!router) return <Loading />
  return (
    <Cars page={parseInt(router.query.page) || 1} />
  )
});

export default Home;