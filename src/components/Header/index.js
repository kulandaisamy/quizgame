import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import './index.css'

class Header extends Component {
  logOut = async () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <div className="header-container">
        <img
          src="https://res.cloudinary.com/dtylwiy9x/image/upload/v1762314578/Frame_8787_fpmqw0.png"
          className="logo-img"
          alt="login website logo"
        />
        <button
          type="button"
          className="btn btn-outline-dark logOut"
          onClick={this.logOut}
        >
          Logout
        </button>
        <button type="button" className="logout-btn" onClick={this.logOut}>
          <img
            src="https://res.cloudinary.com/dtylwiy9x/image/upload/v1762341432/log-out-02_c1sw9r.png"
            alt="logout icon"
          />
        </button>
      </div>
    )
  }
}

export default withRouter(Header)
