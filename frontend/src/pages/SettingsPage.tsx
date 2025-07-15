import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, Settings, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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
  padding: ${({ theme }) => theme.spacing[6]};
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const Section = styled.div`
  background: ${({ theme }) => theme.gradients.card};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.neutral[900]};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.neutral[700]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]};
  background: rgba(239, 68, 68, 0.1);
  color: ${({ theme }) => theme.colors.error};
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animation.duration.normal};
  
  &:hover {
    background: rgba(239, 68, 68, 0.15);
  }
`;

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/swipe')}>
          <ArrowLeft size={20} />
        </BackButton>
        <Title>Settings</Title>
      </Header>
      <Content>
        <Section>
          <SectionTitle>Profile</SectionTitle>
          <MenuItem>
            <User size={20} />
            <div>
              <div>{user?.name}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>{user?.email}</div>
            </div>
          </MenuItem>
        </Section>

        <Section>
          <SectionTitle>Account</SectionTitle>
          <LogoutButton onClick={handleLogout}>
            <LogOut size={20} />
            Sign Out
          </LogoutButton>
        </Section>
      </Content>
    </Container>
  );
};

export default SettingsPage;