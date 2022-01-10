import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          {error.response.data.errors.map((error) => (
            <li key={error.message} className="my-0">
              {error.message}
            </li>
          ))}
        </div>
      );
    }
  };
  return { doRequest, errors };
};
