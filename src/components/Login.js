import AuthForm from './AuthForm';

function Login(props) {

  return (
    <AuthForm
      name="login"
      title="Вход"
      submitName="Войти"
      submitLoadingName="Заходим..."
      onSubmit={props.onLogin}
    />
  )
}

export default Login;
