import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
 const [login , setLogin] = useState(true);
  return (
   <>
   {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
    </>
  )
}

export default AuthPage