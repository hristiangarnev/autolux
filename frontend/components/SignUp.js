import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, password: $password, name: $name) {
      id
      name
      email
    }
  }
`;

class SignUp extends Component {
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
      <Mutation
        mutation={SIGN_UP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <form
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              await signup();
              this.setState({ name: '', password: '', email: ''});
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up</h2>
              {error}
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
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
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

export default SignUp;