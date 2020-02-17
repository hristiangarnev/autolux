import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import Error from '../components/Error';

const Form = styled.form`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  fieldset {
    border: none;

    label {
      display: block;
      font-size: 16px;
      margin: 10px 0;

      input {
        display: block;
        border: 1px solid #ccc;
        background: #fff;
        font-size: 16px;
        padding: 5px;
        margin: 5px 0;
      }
    }

    button {
      display: block;
      margin: 10px 0;
      background: orange;
      color: #fff;
      border: none;
      padding: 10px;
      font-size: 16px;
    }
  }
`;

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class SignIn extends Component {
  state = {
    email: ''
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <Mutation
        mutation={REQUEST_RESET_MUTATION}
        variables={this.state}
      >
        {(reset, { error, loading, called }) => (
          <>
            <Head>
              <title>Reset Password | AutoLux</title>
            </Head>
            <Form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await reset();
                this.setState({ password: '', email: ''});
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset password</h2>
                <Error error={error} />
                {!error && !loading && called && <p>Success! Check your email for reset link.</p>}

                {!called && <div>
                  <label htmlFor="email">
                    Email
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.saveToState}
                    />
                  </label>
                  <button type="submit">Request reset</button>
                </div>}
              </fieldset>
            </Form>
          </>
        )}
      </Mutation>
    )
  }
}

export default SignIn;