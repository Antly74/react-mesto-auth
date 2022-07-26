import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';

function Register(props) {

  return (
    <AuthForm
      name="register"
      title="Регистрация"
      submitName="Зарегистрироваться"
      submitLoadingName="Регистрируем..."
      onSubmit={props.onRegister}
    >
      <Link to="/sign-in" className="popup__link link">Уже зарегистрированы? Войти</Link>
    </AuthForm>
  );
}

export default Register;
