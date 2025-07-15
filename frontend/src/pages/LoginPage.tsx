import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, Eye, EyeOff } from 'lucide-react';
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

const FormContainer = styled(motion.div)`
  width: 100%;
  max-width: 400px;
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing[4]};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.neutral[400]};
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[12]};
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  transition: all ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.timing.ease};
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 4px rgba(232, 93, 117, 0.1);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[400]};
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing[4]};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.neutral[400]};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: color ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.timing.ease};
  
  &:hover {
    color: ${({ theme }) => theme.colors.neutral[600]};
  }
`;

const SubmitButton = styled(motion.button)`
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
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
`;

const Footer = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.neutral[600]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const SignupLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary[600]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary[700]};
    text-decoration: underline;
  }
`;

const LoginPage: React.FC = () => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await signIn(formData.email, formData.password);
    if (success) {
      navigate('/swipe');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <FormContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Header>
          <IconContainer>
            <HeartIcon />
          </IconContainer>
          <Title>Welcome Back</Title>
          <Subtitle>Sign in to continue finding names</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          {error && (
            <ErrorMessage
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </ErrorMessage>
          )}

          <InputGroup>
            <InputIcon>
              <Mail size={20} />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
              required
            />
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </PasswordToggle>
          </InputGroup>

          <SubmitButton
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </SubmitButton>
        </Form>

        <Footer>
          Don't have an account?{' '}
          <SignupLink to="/signup">Sign up here</SignupLink>
        </Footer>
      </FormContainer>
    </Container>
  );
};

export default LoginPage;