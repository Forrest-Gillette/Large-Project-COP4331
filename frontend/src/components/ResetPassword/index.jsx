import { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.css";

const ResetPassword = () => {
	const param = useParams();
  const [data, setData] = useState({
    password: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `/api/reset/${param.id}/reset/${param.token}`;
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Cancel?</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Go Back
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Update Password</h1>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <button type="submit" className={styles.green_btn}>
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
