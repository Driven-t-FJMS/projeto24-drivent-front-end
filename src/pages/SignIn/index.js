import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import qs from 'query-string';
import axios from 'axios';
import dotenv from 'dotenv';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import AuthGitHub from '../../components/Form/AuthGithub';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
dotenv.config();

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  async function callOfAuthToBackend(code) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/sign-in/github`, { code });
      setUserData(response.data);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  async function redirectGitHub() {
    const { code, state } = qs.parseUrl(window.location.href).query;
    
    if (code) callOfAuthToBackend(code);
    else {
      const GITHUB_AUTH = 'https://github.com/login/oauth/authorize';
      const params = {
        response_type: 'code',
        client_id: 'c43223d2717448436873',
        redirect_uri: 'http://localhost:3000/sign-in',
        scope: 'user public_repo',
        state: 'protocol-OAuth',
      };
  
      const authorizationUrl = `${GITHUB_AUTH}?${qs.stringify(params)}`;
      window.location.href = authorizationUrl;
      
      if(code && state === 'protocol-OAuth') await callOfAuthToBackend(code);
      else toast('Autenticação autorizada pelo GitHub!');
    }
  }

  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>
            Entrar
          </Button>
        </form>
        <AuthGitHub onClick={redirectGitHub} />
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}
