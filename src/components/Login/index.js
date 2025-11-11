import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShowPassword: false,
    isError: false,
    errorMsg: '',
  }

  getUsername = e => {
    this.setState({
      username: e.target.value,
    })
  }

  getPassword = e => {
    this.setState({
      password: e.target.value,
    })
  }

  submitUserDetails = async e => {
    e.preventDefault()
    console.log(this.props)
    const {history} = this.props
    console.log(history)
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const jwtToken = data.jwt_token // eslint-disable-line camelcase
      Cookies.set('jwt_token', jwtToken, {expires: 30}) // eslint-disable-line camelcase
      history.replace('/')
    } else {
      const data = await response.json()
      this.setState({
        isError: true,
        errorMsg: data.error_msg,
      })
    }
  }

  showPassword = () => {
    this.setState(preState => ({
      isShowPassword: !preState.isShowPassword,
    }))
  }

  render() {
    const {isError, isShowPassword, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="login-container">
          <img
            src="https://res.cloudinary.com/dtylwiy9x/image/upload/v1762314578/Frame_8787_fpmqw0.png"
            alt="login website logo"
          />
          <form className="form-container" onSubmit={this.submitUserDetails}>
            <label htmlFor="username" className="label-container">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              className="textbox-container"
              onChange={this.getUsername}
            />
            <label htmlFor="password" className="label-container">
              PASSWORD
            </label>
            <input
              id="password"
              type={isShowPassword ? 'text' : 'password'}
              className="textbox-container"
              onChange={this.getPassword}
            />
            <div className="checkbox-container">
              <input
                id="showPassword"
                type="checkbox"
                className="check-box"
                onChange={this.showPassword}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>
            <button type="submit" className="login-btn btn btn-primary">
              Login
            </button>
          </form>
          {isError && <p className="isError">*{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
