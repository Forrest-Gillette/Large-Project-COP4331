import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const url = "/api/reset-password";
      await axios.post(url, { password });
      setSuccess(true);
    } catch (error) {
      setError("Failed to reset password");
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      {success ? (
        <p>Password reset successful. Please login with your new password.</p>
      ) : (
        <form onSubmit={handleChangePassword}>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p>{error}</p>}
          <button type="submit">Submit</button>
          <button type="button">Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
