import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';

export default function Loading() {
  return (
    <Container>
      <ThreeDots size={30} color='purple' />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
