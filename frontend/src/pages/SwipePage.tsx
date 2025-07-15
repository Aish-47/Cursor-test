import React from 'react';
import styled from 'styled-components';
import { Heart, X, Settings, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.gradients.background};
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary[600]};
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const IconButton = styled.button`
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
  transition: all ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.timing.ease};
  
  &:hover {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.neutral[800]};
    transform: translateY(-1px);
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[8]};
  text-align: center;
`;

const PlaceholderCard = styled.div`
  width: 100%;
  max-width: 320px;
  height: 400px;
  background: ${({ theme }) => theme.gradients.card};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.card};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const PlaceholderText = styled.h2`
  color: ${({ theme }) => theme.colors.neutral[600]};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.neutral[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  max-width: 250px;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

const ActionButton = styled.button<{ variant: 'reject' | 'like' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: ${({ variant, theme }) => 
    variant === 'like' ? theme.colors.success : theme.colors.error
  };
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.timing.ease};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SwipePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <Logo>
          <Heart size={24} fill="currentColor" />
          Baby Names
        </Logo>
        <HeaderActions>
          <IconButton onClick={() => navigate('/matches')}>
            <Users size={20} />
          </IconButton>
          <IconButton onClick={() => navigate('/settings')}>
            <Settings size={20} />
          </IconButton>
        </HeaderActions>
      </Header>

      <MainContent>
        <PlaceholderCard>
          <PlaceholderText>Coming Soon!</PlaceholderText>
          <SubText>
            The swipe interface will be implemented with smooth animations and gesture support
          </SubText>
        </PlaceholderCard>

        <ActionButtons>
          <ActionButton variant="reject">
            <X size={28} />
          </ActionButton>
          <ActionButton variant="like">
            <Heart size={28} fill="currentColor" />
          </ActionButton>
        </ActionButtons>
      </MainContent>
    </Container>
  );
};

export default SwipePage;