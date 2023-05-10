import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  usernameValue = event => {
    this.setState({username: event.target.value})
  }

  passwordValue = event => {
    this.setState({password: event.target.value})
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-card">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/dyss1em2x/image/upload/v1683694727/TastyKitchens/tkwebsitelogo_my1mce.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="company-heading">Tasty Kitchens</h1>
          </div>
          <div className="login-title-container">
            <h1 className="login-heading">Login</h1>
            <img
              src="https://res.cloudinary.com/dyss1em2x/image/upload/v1683694686/TastyKitchens/Rectangle_1457_doyxeu.png"
              alt="website log"
              className="small-landing-img"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              className="input"
              onChange={this.usernameValue}
              value={username}
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="input"
              onChange={this.passwordValue}
              value={password}
            />
            {showErrorMsg ? <p className="error-msg">{errorMsg}</p> : ''}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
        <div className="login-large-view">
          <img
            src="https://res.cloudinary.com/dyss1em2x/image/upload/v1683694742/TastyKitchens/Rectangle_1456_qqzy5l.png"
            alt="website login"
            className="large-landing-img"
          />
        </div>
      </div>
    )
  }
}

export default LoginForm
