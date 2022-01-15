import { useState } from "react";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";
const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: { email, password },
    onSuccess: () => Router.push("/"),
  });
  const onSubmit = (e) => {
    e.preventDefault();
    doRequest();
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>signin!</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      {errors}
      <button className="btn btn-primary">Sign in</button>
    </form>
  );
};
export default Signin;
