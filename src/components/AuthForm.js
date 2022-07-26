import React from 'react';
import { Link } from 'react-router-dom';
import InputWithValidation from './InputWithValidation';

class AuthForm extends React.Component {
  constructor(props){
    super(props);
    this._handleSubmit = props.onSubmit;

    this.state = {
      email: '',
      password: '',
      isValid: false,
      isEmailValid: true,
      isPasswordValid: true,
      isLoading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleInput(valid, name) {
    if (name === 'email') {
      this.setState({
        isEmailValid: valid,
        isValid: valid && this.state.isPasswordValid && this.state.password.length > 0
      })
    } else if (name === 'password') {
      this.setState({
        isPasswordValid: valid,
        isValid: valid && this.state.isEmailValid && this.state.email.length > 0
      })
    }
  }

  handleEndLoading = () => {
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 500);
  };

  handleSubmit(e){
    e.preventDefault();
    this.setState({isLoading: true});
    this._handleSubmit({email: this.state.email, password: this.state.password}, this.handleEndLoading);
  }

  render(){
    return(
      <div className="popup__window popup__window_centered popup__window_theme_dark">
        <h2 className="popup__header">{this.props.title}</h2>
        <form className="popup__form" name={this.props.name} noValidate onSubmit={this.handleSubmit}>
          <InputWithValidation
            isValid={this.state.isEmailValid} onInputEvent={this.handleInput}
            type="email" id="email"
            placeholder="Email" required
            value={this.state.email} onChange={this.handleChange}
            isDarkTheme={true}
          />
          <InputWithValidation
            isValid={this.state.isPasswordValid} onInputEvent={this.handleInput}
            type="password" id="password"
            placeholder="Пароль" required minLength="6" maxLength="40"
            value={this.state.password} onChange={this.handleChange}
            isDarkTheme={true}
          />
          <button
            aria-label={this.props.submitName}
            type="submit"
            className={`popup__save-button popup__save-button_theme_dark link ${!this.state.isValid && 'popup__save-button_disabled'}`}
            name="submit"
            disabled={!this.state.isValid}
          >
            {this.state.isLoading ? this.props.submitLoadingName : this.props.submitName}
          </button>
        </form>
        {this.props.children}
      </div>
    )
  }
}

export default AuthForm;
