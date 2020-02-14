import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../components/Error';
import { CURRENT_USER_QUERY } from './User';
import styled from 'styled-components';

const Form = styled.form`
  max-width: 960px;
  margin: 0 auto;

  fieldset {
    border: none;

    label {
      font-size: 16px;

      input {
        display: block;
        border: 1px solid #ccc;
        background: #fff;
        font-size: 16px;
        padding: 5px;
      }
    }

    button {
      margin: 0 auto;
    }
  }
`;

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
    email: ''
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <Mutation
        mutation={SIGN_IN_MUTATION}
        variables={this.state}
        refetchQueries={[{
          query: CURRENT_USER_QUERY
        }]}
      >
        {(signin, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              await signin();
              this.setState({ password: '', email: ''});
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign In</h2>
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
          </Form>
        )}
      </Mutation>
    )
  }
}

export default SignIn;