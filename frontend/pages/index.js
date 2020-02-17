import Cars from '../components/Cars';

const Home = props => (
  <Cars page={parseInt(props.query.page) || 1} />
)

export default Home;