import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AgentPage from "../agentpage/AgentPage";
import ManagerPage from "../managerpage/ManagerPage";
import PrivatePersPage from "../privateperspage/PrivatePersPage";

class UserPage extends Component {
  render() {
    if (!this.props.user) {
      return (
        <div className="row mt-3 text-center">
          <div className="col-12">
            <h4>This page is only for users. Please Login or sign up first.</h4>
          </div>
          <div className="col-12">
            <Link className="btn btn-outline-success" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline-info ml-1" to="/register">
              Sign Up
            </Link>
          </div>
        </div>
      );
    } else {
      if (this.props.user.user) {
        if (this.props.user.justRegistered) {
          return <h4>Thank you for registration.</h4>;
        } else {
          switch (this.props.user.user.role) {
            case "agencyAgent": {
              return (
                <div>
                  <AgentPage />
                </div>
              );
            }
            case "agencyManager": {
              return (
                <div className="container">
                  <ManagerPage />
                </div>
              );
            }
            case "privatePerson": {
              return (
                <div className="container">
                  <PrivatePersPage />
                </div>
              );
            }
            default:
              return (
                <h1>
                  Something went wrong try log out, and log in one more time.
                </h1>
              );
          }
        }
      } else {
        return <h4>Loading...</h4>;
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps)(UserPage);
