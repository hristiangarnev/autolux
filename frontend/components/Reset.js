import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Error from '../components/Error';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

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

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $newPassword: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, newPassword: $newPassword, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,

  }
  state = {
    newPassword: '',
    confirmPassword: ''
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          newPassword: this.state.newPassword,
          confirmPassword: this.state.confirmPassword
        }}
        refetchQueries={[{
          query: CURRENT_USER_QUERY
        }]}
      >
        {(reset, { error, loading, called }) => (
          <Form
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              await reset();
              this.setState({ newPassword: '', confirmPassword: ''});
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset password</h2>
              <Error error={error} />
              <label htmlFor="newPassword">
                New Password
                <input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={this.state.newPassword}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="confirmPassword">
                Confirm Password
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Reset Your Password</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Reset;