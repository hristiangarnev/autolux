import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../components/Error';

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

class SignIn extends Component {
  state = {
    password: '',
    name: '',
    email: ''
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <Mutation mutation={SIGN_IN_MUTATION} variables={this.state}>
        {(signin, { error, loading }) => (
          <form
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              await signin();
              this.setState({ name: '', password: '', email: ''});
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign up</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Sign up</button>
            </fieldset>
          </form>
        )}
      </Mutation>
    )
  }
}

export default SignIn;