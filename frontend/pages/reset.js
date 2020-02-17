import Reset from '../components/Reset';

const RequestResetPage = props => {
  return (
    <Reset resetToken={props.query.resetToken} />
  )
}

export default RequestResetPage;