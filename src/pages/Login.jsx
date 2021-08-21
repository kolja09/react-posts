import React, {useContext, useEffect, useState} from 'react';
import MyInput from "../component/UI/input/MyInput";
import MyButton from "../component/UI/button/MyButton";
import {AuthContext} from "../context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState("Емейл не может быть пустым")
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым")
    const [formValid, setFormValid] = useState(false)


    useEffect(() =>{
        if(emailError || passwordError){
           setFormValid(false)
        }else {
           setFormValid(true)
        }
    }, [emailError, passwordError])

    const login = event =>{
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    const emailHandler = e =>{
      setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(e.target.value).toLowerCase())){
           setEmailError('Некорректный емейл')
        }else {
            setEmailError('')
        };
    }

   const blurHandler = e =>{
        switch (e.target.name){
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
   }

   const passwordHandler = e =>{
        setPassword(e.target.value)
       if(e.target.value.length < 3 || e.target.value.length > 8){
           setPasswordError('Пароль должен быть длиннее 3 и меньше 8')
           if(!e.target.value){
               setPasswordError('Пароль не может быть пустым')
           }
       }else{
          setPasswordError('')
       }
   }
    return (
        <div>
           <h1>Регистрация</h1>
            <form onSubmit={login}>
             <MyInput onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name='email' type='text' placeholder='Введите логин' />
                {(emailDirty && emailError)&& <div style={{color: 'red'}}>{emailError}</div>}
             <MyInput onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name='password' type='password' placeholder='Введите пароль' />
                {(passwordDirty && passwordError)&& <div style={{color: 'red'}}>{passwordError}</div>}
             <MyButton disabled={!formValid}>Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;