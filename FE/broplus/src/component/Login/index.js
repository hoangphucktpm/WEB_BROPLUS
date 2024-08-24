import { memo, useState } from "react";
import "./style.scss";
import BannerLogin from "assets/user/images/hero/banner_login.png";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false); // Track OTP sent status
  const [passwordVisible, setPasswordVisible] = useState(false); // Track password visibility

  const handleToggleForm = () => {
    setIsRegistering(!isRegistering);
    setIsForgotPassword(false);
    setIsOtpSent(false); // Reset OTP sent status when toggling forms
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setIsRegistering(false);
    setIsOtpSent(false); // Reset OTP sent status when switching to forgot password
  };

  const handleSendOtp = () => {
    // Logic to send OTP
    setIsOtpSent(true); // Set OTP sent status
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle password visibility
  };

  return (
    <div className="login-container">
      <div className="content">
        <img src={BannerLogin} alt="Example" className="login-image" />
      </div>
      <div className="form">
        {isForgotPassword ? (
          <div>
            <h3>Khôi phục mật khẩu</h3>
            <form>
              <label htmlFor="phone">Số điện thoại:</label>
              <input type="text" id="phone" name="phone" required />
              <button type="submit">Gửi liên kết khôi phục</button>
            </form>
            <button
              className="toggle-button"
              onClick={() => setIsForgotPassword(false)}
            >
              Quay lại
            </button>
          </div>
        ) : isRegistering ? (
          <div>
            <h3>Đăng ký tài khoản</h3>
            {!isOtpSent ? (
              <div>
                <form>
                  <label htmlFor="phone">Số điện thoại:</label>
                  <input type="text" id="phone" name="phone" required />
                  <button type="button" onClick={handleSendOtp}>
                    Gửi mã OTP
                  </button>
                </form>
                <button className="toggle-button" onClick={handleToggleForm}>
                  Đã có tài khoản? Đăng nhập
                </button>
              </div>
            ) : (
              <div>
                <form>
                  <label htmlFor="otp">Nhập mã OTP:</label>
                  <input type="text" id="otp" name="otp" required />
                  <button type="submit">Xác nhận OTP</button>
                </form>
                <button className="toggle-button" onClick={handleToggleForm}>
                  Đã có tài khoản? Đăng nhập
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3>Đăng nhập vào tài khoản</h3>
            <form>
              <label htmlFor="phone">Số điện thoại:</label>
              <input type="text" id="phone" name="phone" required />
              <label htmlFor="password">Mật khẩu:</label>
              <div className="password-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? "Ẩn" : "Hiện"}
                </button>
              </div>
              <button type="submit">Đăng nhập</button>
            </form>
            <button className="toggle-button" onClick={handleToggleForm}>
              Chưa có tài khoản? Đăng ký
            </button>
            <button className="forgot-password" onClick={handleForgotPassword}>
              Quên mật khẩu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Login);
