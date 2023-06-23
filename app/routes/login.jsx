import { Link , Form, useNavigation, useActionData} from '@remix-run/react';
import { useState } from 'react';
import {userLoginAuth} from '../utils/services'
import style from '../styles/login.css';
import { redirect } from '@remix-run/node';
export const meta = () => {
  return [{ title: "User Login" }];
};

export async function action({request}){
const formData = await request.formData();
const loginEntries = Object.fromEntries(formData);
const loginAuth = await userLoginAuth(loginEntries);
if (loginAuth === null)
{
    return {message: 'email and password not match'}
}
return redirect('/login');
}

export default function Login() {
    const [data , setData] = useState(false);
    const actionData = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    function showErrorHandler(){
        setData(true);
    }
  return (
    <div className='main-div'>
      <Form className='login-form' method='post'>
        <h1>Login</h1>
        <div className="login-div">
            <label htmlFor= 'email'>Enter email</label>
            <input type="email" id='email' name='email' onChange={showErrorHandler} required/> 
            <label htmlFor='password'>Enter password</label>
            <input type="password" id='password' name='password' onChange={showErrorHandler} required/>
            {data ? null : actionData?.message&&<p className='error'>{actionData.message}</p>}
        </div>
        <button disabled={isSubmitting} onClick={()=> setData(false)}>Login</button>
        <Link to={'/signup'}>
        <p>Register User !</p>
        </Link>
      </Form>
    </div>
  );
}

export function links(){
  return[{rel: 'stylesheet', href: style }]
}
