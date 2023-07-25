import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const PrivateRouteComponent = ({ children, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const renderRouter = () => {
      return (
        <Route
        {...rest}
        render={() => {
          return isAuthenticated === true ? (
            children
          ) : (
            <Redirect to="/sign-in" />
          );
        }}
      />
      )
  }
   
  return renderRouter();

};

export default PrivateRouteComponent;
