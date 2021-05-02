import React, { useState } from 'react';
import './style.css';
import { Auth } from './auth.api';

export const AuthenticationForm = (props: any) => {
  const [error, setError] = useState('');
  const [SIError, setSIError] = useState('');
  var auth = Auth.getInstance();

  const [{ username, email, password, repeatedPassword }, setSignUpData] = useState({
    username: '',
    email: '',
    password: '',
    repeatedPassword: '',
  });
  const [{ SIusername, SIpassword }, setSignInData] = useState({
    SIusername: '',
    SIpassword: '',
  });

  const SignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password == repeatedPassword) {
      const response = await auth.onSignUp({
        username,
        email,
        password,
      });
      if (response && response.error) {
        setError(response.error);
      }
      if (auth.getAuthenticated()) {
        props.history.push('/ProfilePage');
      }
    } else {
      setError('password and repeated password must match');
    }
  };

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('SignIn Clicked');
    const response = await auth.onSignIn({
      username: SIusername,
      password: SIpassword,
    });

    if (response && response.error) {
      setSIError(response.error);
    }
    if (auth.getAuthenticated()) {
      console.log(response);
      //return <Redirect to= '/'/>
      // return <Redirect to='/' />
      props.history.push('/');
    }
  };

  return (
    <div className="wrapper">
      <div className="login-wrap">
        <div className="login-html">
          <input id="tab-1" type="radio" name="tab" className="sign-in" />
          <label htmlFor="tab-1" className="tab">
            Sign In
          </label>
          <input id="tab-2" type="radio" name="tab" className="sign-up" />
          <label htmlFor="tab-2" className="tab">
            Sign Up
          </label>
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                  Username
                </label>
                <input
                  id="user"
                  type="text"
                  className="input"
                  value={SIusername}
                  onChange={(event) =>
                    setSignInData({
                      SIusername: event.target.value,
                      SIpassword,
                    })
                  }
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Password
                </label>
                <input
                  id="pass"
                  type="password"
                  className="input"
                  data-type="password"
                  value={SIpassword}
                  onChange={(event) =>
                    setSignInData({
                      SIusername,
                      SIpassword: event.target.value,
                    })
                  }
                />
              </div>
                       
		<div className="group">
                <button type="submit" className="button" value="Sign In" onClick={signIn}>
                  Sign In
                </button>
                {SIError.length > 0 && <p className="error">{SIError}</p>}
              </div>
              <div className="hr"></div>
              <div className="foot-lnk">
         <a href="#forgot">WELCOME</a><br></br>
       
	<a href="#forgot">TO</a><br></br>

	<a href="#forgot">PARTY-UP</a>
              </div>
            </div>
            <div className="sign-up-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                  Username
                </label>
                <input
                  id="user"
                  type="text"
                  className="input"
                  value={username}
                  onChange={(event) =>
                    setSignUpData({
                      username: event.target.value,
                      email,
                      password,
                      repeatedPassword,
                    })
                  }
                />
              </div>
		<div className="group">
                <label htmlFor="pass" className="label">
                  Email Address
                </label>
                <input
                  id="pass"
                  type="text"
                  className="input"
                  value={email}
                  onChange={(event) =>
                    setSignUpData({
                      username,
                      email: event.target.value,
                      password,
                      repeatedPassword,
                    })
                  }
                />
              </div>

              <div className="group">
                <label htmlFor="pass" className="label">
                  Password
                </label>
                <input
                  id="pass"
                  type="password"
                  className="input"
                  data-type="password"
                  value={password}
                  onChange={(event) =>
                    setSignUpData({
                      username,
                      email,
                      password: event.target.value,
                      repeatedPassword,
                    })
                  }
                />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">
                  Repeat Password
                </label>
                <input
                  id="pass"
                  type="password"
                  className="input"
                  data-type="password"
                  value={repeatedPassword}
                  onChange={(event) =>
                    setSignUpData({
                      username,
                      email,
                      password,
                      repeatedPassword: event.target.value,
                    })
                  }
                />
              </div>
                            <div className="group">
                <button type="submit" className="button" value="Sign Up" onClick={SignUp}>
                  Register
                </button>
                {error.length > 0 && <p className="error">{error}</p>}
              </div>
              <div className="hr"></div>
              <div className="foot-lnk">
                <label htmlFor="tab-1">PARTY-UP</label><br></br>
		 <label htmlFor="tab-1">KSU</label><br></br>
		<label htmlFor="tab-1">SWE 6813 SPRING 2021</label>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
