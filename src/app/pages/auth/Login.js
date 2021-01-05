import React, { useState } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Redirect } from "react-router-dom";
import { login } from "../../crud/auth.crud";
import * as auth from "../../store/ducks/auth.duck";
import { showErrorMessage } from '../../actions/notification';
import './Login.scss';

function Login(props) {
  const [showPassWord, setShowPassWord] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLogined, setIsLogined] = useState(false);

  if (isLogined) {
    return <Redirect to="/dashboard" />;
  }

  const togglePasswordVisibility = () => {
    setShowPassWord(!showPassWord);
  }

  const onChangeEmail = (value) => {
    setEmail(value);
  }

  const onChangePassword = (value) => {
    setPassword(value);
  }

  const submitLogin = (e) => {
    e.preventDefault();
    if (!email) {
      return showErrorMessage('Vui lòng nhập tài khoản');
    }

    if (!password) {
      return showErrorMessage('Vui lòng nhập mật khẩu');
    }
    setIsSubmitting(true);
    const data = {
      username: email,
      password: password
    }
    login(data)
      .then(({ data }) => {
        if (data.signal) {
          setIsSubmitting(false);
          props.login(data.data.token);
          setIsLogined(true);
        } else {
          setIsSubmitting(false);
          showErrorMessage(data.message)
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        showErrorMessage('Lỗi đăng nhập');
      });

  }

  return (
    <>
      <main className="main-site">
        <div className="wp-main-mail">
          <div className="content-wrapper">
            <div className="bg-login clearfix">
              <div className="tn-row">
                <div className="custom-left">
                  <div className="bxinfo">
                    <h1 className="titu">Hệ thống Quản lý T_Phim</h1>
                    <div>  </div>
                    <div > <span>Điện thoại:  0926 866 559           </span>
                      <span style={{paddingLeft:'40px'}}>Email: anhthu127at@gmail.com</span> </div>
                    <div>  <span>Địa chỉ: Số 1 Đại Cồ Việt Hai Bà Trưng Hà Nội</span> </div>

                  </div>
                </div>
                <div className="custom-right">
                  <div className="bxform">
                    <div className="logolg">
                      <div className="tn-logo">
                        <img className="tn-logo__image" src={require('../../../_metronic/_assets/media/image/logo.jpg')} alt="" title="" />
                        <div className="tn-logo__text-wrapper">
                          <div className="tn-logo__text-line-1">T_Phim</div>
                          <div className="tn-logo__text-line-2"></div>
                        </div>
                      </div>
                    </div>
                    <form method="" action="" className="tn-form-container" >
                      <div className="form-group md-focus tn-form-control">
                        <div className="tn-form-control__icon icon-account-outline"><i className="fas fa-user"></i></div>
                        <input id="username" autoFocus="" type="text" className="form-control frmcust tn-form-control__input"
                          placeholder="Tên đăng nhập" value={email} onChange={(e) => onChangeEmail(e.target.value)} />
                      </div>
                      <div className="form-group md-focus tn-form-control">
                        <div className="tn-form-control__icon icon-key-variant"><i className="fas fa-key"></i></div>
                        <input type={showPassWord ? 'text' : 'password'} className="form-control frmcust tn-form-control__input tn-form-control__input-password"
                          placeholder="Mật khẩu" value={password} onChange={(e) => onChangePassword(e.target.value)} />
                        <div className="tn-form-control__icon --password-visibility" onClick={(e) => togglePasswordVisibility()}>
                          <i className="fas fa-eye"></i>
                        </div>
                      </div>
                      <div className="form-check tn-form-check clearfix">
                      </div>
                      <button name="button" value="login" type="submit" className="submit-button btn btn-block my-4 mx-auto tn-submit-button"
                        aria-label="Đăng nhập" disabled={isSubmitting} onClick={(e) => submitLogin(e)}>Đăng nhập</button>
                      <div className="tn-other-login-methods">
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default injectIntl(
  connect(
    null,
    auth.actions
  )(Login)
);
