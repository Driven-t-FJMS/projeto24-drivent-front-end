import MuiButton from '@material-ui/core/Button';
import styled from 'styled-components';
import { IoLogoGithub } from 'react-icons/io5';

function AuthGitHub({ onClick }) {
  return (
    <StyledMuiButton variant="contained" onClick={onClick}>
      <IoLogoGithub />
      <span>Entrar com GitHub</span>
    </StyledMuiButton>
  );
}

export default AuthGitHub;

const StyledMuiButton = styled(MuiButton)`
  width: 100%;
  margin-top: 10px !important;

  span {
    margin-left: 6px;
  }
`;
