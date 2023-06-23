import { Form } from "@remix-run/react";
import style from "../styles/signup.css";
import { redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { userRegistration, userEmailExist } from "../utils/services";

export const meta = () => {
  return [{ title: "User Registration" }];
};

export async function action({ request }) {
  const formData = await request.formData();
  const formEntries = Object.fromEntries(formData);
  const checkUserEmail = await userEmailExist(formEntries.email);
  if(checkUserEmail != null){
    return {message: 'email already exist'}
  }
  userRegistration(formEntries);
  return redirect("/login");
}

export default function Signup() {
  const actionData = useActionData();
  return (
    <div className="main-div">
      <Form className="signup-form" method="post">
        <h1>Register User</h1>
        <div className="signup-div">
          <label htmlFor="name">Enter name</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Enter email</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="password">Enter password</label>
          <input type="password" id="password" name="password" required />
          {actionData?.message && <p className="error">{actionData.message}</p>}
        </div>
        <button>Register</button>
      </Form>
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: style }];
}
