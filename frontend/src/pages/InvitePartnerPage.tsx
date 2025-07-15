import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, UserPlus, Copy, Check, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.gradients.background};
  padding: ${({ theme }) => theme.spacing[4]};
`;

const Card = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.gradients.card};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: ${({ theme }) => theme.spacing[8]};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing[10]};
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  margin: 0 auto ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.gradients.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  box-shadow: ${({ theme }) => theme.shadows.button};
`;

const HeartIcon = styled(Heart)`
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.colors.white};
  fill: currentColor;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.neutral[600]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.neutral[100]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[1]};
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  background: ${({ active, theme }) => active ? theme.colors.white : 'transparent'};
  color: ${({ active, theme }) => active ? theme.colors.neutral[900] : theme.colors.neutral[600]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.timing.ease};
  box-shadow: ${({ active, theme }) => active ? theme.shadows.sm : 'none'};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const InviteCodeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.neutral[50]};
  border: 2px dashed ${({ theme }) => theme.colors.primary[300]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

const InviteCode = styled.div`
  flex: 1;
  font-family: 'Courier New', monospace;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary[700]};
  letter-spacing: 2px;
  text-align: center;
`;

const CopyButton = styled.button<{ copied: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  background: ${({ copied, theme }) => copied ? theme.colors.success : theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.timing.ease};
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  transition: all ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.timing.ease};
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 4px rgba(232, 93, 117, 0.1);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[400]};
    text-transform: none;
    letter-spacing: normal;
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  box-shadow: ${({ theme }) => theme.shadows.button};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.timing.ease};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px 0 rgba(232, 93, 117, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SkipButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  background: none;
  color: ${({ theme }) => theme.colors.neutral[600]};
  border: 2px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.timing.ease};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.neutral[400]};
    color: ${({ theme }) => theme.colors.neutral[700]};
  }
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.neutral[600]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const InvitePartnerPage: React.FC = () => {
  const { user, createInvite, acceptInvite, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'invite' | 'join'>('invite');
  const [inviteCode, setInviteCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [inputCode, setInputCode] = useState('');

  const handleCreateInvite = async () => {
    const code = await createInvite();
    if (code) {
      setGeneratedCode(code);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generatedCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAcceptInvite = async () => {
    if (inputCode.length === 6) {
      const success = await acceptInvite(inputCode);
      if (success) {
        navigate('/swipe');
      }
    }
  };

  const handleSkip = () => {
    navigate('/swipe');
  };

  // If user already has a partner, redirect to swipe
  React.useEffect(() => {
    if (user?.partnerId) {
      navigate('/swipe');
    }
  }, [user, navigate]);

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Header>
          <IconContainer>
            <HeartIcon />
          </IconContainer>
          <Title>Connect with Your Partner</Title>
          <Subtitle>
            Invite your partner to start finding the perfect baby names together
          </Subtitle>
        </Header>

        <TabContainer>
          <Tab
            active={activeTab === 'invite'}
            onClick={() => setActiveTab('invite')}
          >
            <UserPlus size={18} style={{ marginRight: '8px' }} />
            Invite Partner
          </Tab>
          <Tab
            active={activeTab === 'join'}
            onClick={() => setActiveTab('join')}
          >
            <Users size={18} style={{ marginRight: '8px' }} />
            Join Partner
          </Tab>
        </TabContainer>

        <Section>
          {activeTab === 'invite' ? (
            <>
              {!generatedCode ? (
                <>
                  <InfoText>
                    Generate a unique invite code to share with your partner. 
                    The code will expire in 7 days.
                  </InfoText>
                  <Button
                    onClick={handleCreateInvite}
                    disabled={loading}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? 'Generating...' : 'Generate Invite Code'}
                  </Button>
                </>
              ) : (
                <>
                  <InfoText>
                    Share this code with your partner so they can join you:
                  </InfoText>
                  <InviteCodeContainer>
                    <InviteCode>{generatedCode}</InviteCode>
                    <CopyButton copied={copied} onClick={handleCopyCode}>
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </CopyButton>
                  </InviteCodeContainer>
                  <Button
                    onClick={() => navigate('/swipe')}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue to App
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <InfoText>
                Enter the invite code your partner shared with you:
              </InfoText>
              <Input
                type="text"
                placeholder="Enter 6-character code"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase().slice(0, 6))}
                maxLength={6}
              />
              <Button
                onClick={handleAcceptInvite}
                disabled={loading || inputCode.length !== 6}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Joining...' : 'Join Partner'}
              </Button>
            </>
          )}

          <SkipButton onClick={handleSkip}>
            Skip for now - explore alone
          </SkipButton>
        </Section>
      </Card>
    </Container>
  );
};

export default InvitePartnerPage;