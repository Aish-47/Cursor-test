import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Heart } from 'lucide-react';

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.gradients.background};
  padding: ${({ theme }) => theme.spacing[4]};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  animation: ${fadeIn} 0.8s ${({ theme }) => theme.animation.timing.ease};
`;

const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.gradients.primary};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${pulse} 2s infinite ${({ theme }) => theme.animation.timing.ease};
`;

const HeartIcon = styled(Heart)`
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.white};
  fill: currentColor;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  text-align: center;
  margin: 0;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.neutral[600]};
  text-align: center;
  margin: 0;
  max-width: 300px;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const LoadingDots = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

const dot = keyframes`
  0%, 20% {
    transform: scale(1);
    background-color: ${({ theme }) => theme.colors.primary[400]};
  }
  50% {
    transform: scale(1.3);
    background-color: ${({ theme }) => theme.colors.primary[600]};
  }
  80%, 100% {
    transform: scale(1);
    background-color: ${({ theme }) => theme.colors.primary[400]};
  }
`;

const Dot = styled.div<{ delay: number }>`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.primary[400]};
  animation: ${dot} 1.4s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay}s;
`;

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Finding the perfect names for your little one..." 
}) => {
  return (
    <Container>
      <Content>
        <IconContainer>
          <HeartIcon />
        </IconContainer>
        <Title>Baby Names</Title>
        <Subtitle>{message}</Subtitle>
        <LoadingDots>
          <Dot delay={0} />
          <Dot delay={0.2} />
          <Dot delay={0.4} />
        </LoadingDots>
      </Content>
    </Container>
  );
};

export default LoadingScreen;