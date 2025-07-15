import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.gradients.background};
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.neutral[600]};
  cursor: pointer;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.neutral[900]};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[8]};
  text-align: center;
`;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const MatchesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/swipe')}>
          <ArrowLeft size={20} />
        </BackButton>
        <Title>Your Matches</Title>
      </Header>
      <Content>
        <Placeholder>
          <Heart size={64} color="#e85d75" fill="currentColor" />
          <h2>Matches Page</h2>
          <p>This will show your matched baby names</p>
        </Placeholder>
      </Content>
    </Container>
  );
};

export default MatchesPage;