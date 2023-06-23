import style from '../styles/index.css';
import { useNavigate } from '@remix-run/react';
export const meta = () => {
  return [{ title: "User" }];
};

export default function Index() {
  const navigate = useNavigate();
  return (
    <div className="main-div">
      <div className="info-div">
        <h1>Welcome to FireFly Tech Solution</h1>
        <button onClick={()=> navigate('/login')}>Login</button>
        <button onClick={()=> navigate('/signup')}>Signup</button>
      </div>
    </div>
  );
}

export function links(){
  return[{rel: 'stylesheet', href: style}]
}