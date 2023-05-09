import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="label-element" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          className="input-element"
          id="username"
          value={username}
          onChange={this.onChangeUserName}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="label-element" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="text"
          className="input-element"
          id="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {errorMsg, showError} = this.state

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-card">
          <div className="logo-container">
            <img
              src="https://ik.imagekit.io/s6mmkfu6u/tkwebsitelogo.png?updatedAt=1683609307287"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="logo-heading">Tasty Kitchens</h1>
          </div>
          <div className="logo-title-container">
            <h1 className="login-heading">Login</h1>
            <img
              src="https://ik.imagekit.io/s6mmkfu6u/Rectangle_1457.png?updatedAt=1683610502721"
              alt="website logo"
              className="mobile-landing-image"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            {showError ? <p className="error-msg">{errorMsg}</p> : null}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <div className="large-view-container">
          <img
            src="https://ik.imagekit.io/s6mmkfu6u/Rectangle_1456.png?updatedAt=1683608437814"
            alt="website-login"
            className="large-view-image"
          />
        </div>
      </div>
    )
  }
}

export default LoginForm
