import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="form">
      <div class="main_div">
        <div class="title">Login</div>
        <form action="#">
          <div class="input_box">
            <input type="text" placeholder="Name" required />
            <div class="icon">
              <i class="fas fa-user"></i>
            </div>
          </div>
          <div class="input_box">
            <input type="password" placeholder="Password" required />
            <div class="icon">
              <i class="fas fa-lock"></i>
            </div>
          </div>
          {/* <div class="option_div">
            <div class="check_box">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <div class="forget_div">
              <a href="#">Forgot password?</a>
            </div>
          </div> */}
          <div class="input_box button">
            <input type="submit" value="Login" />
          </div>
          <div class="sign_up">
            Not a member? <Link to='/register'>register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login