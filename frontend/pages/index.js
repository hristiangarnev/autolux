import Cars from '../components/Cars';
import { withRouter } from 'next/router'

const Home = withRouter(({ router }) => {
  return (
    <Cars page={parseInt(router.query.page) || 1} />
  )
});

export default Home;