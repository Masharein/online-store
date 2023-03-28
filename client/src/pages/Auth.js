import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data.user)
      user.setIsAuth(data.token)
      navigate(SHOP_ROUTE)
    } catch (e) {
      if (e.response && e.response.data) {
        alert(e.response.data.message)
      } else {
        alert(e.message)
      }
    }

  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Sign in' : "Sign up"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ?
              <div>
                Still don't have an account? <NavLink to={REGISTRATION_ROUTE}>Sign up!</NavLink>
              </div>
              :
              <div>
                Do you have an account? <NavLink to={LOGIN_ROUTE}>Sign in!</NavLink>
              </div>
            }
            <Button
              variant={"outline-success"}
              onClick={click}
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </Button>
          </Row>

        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
