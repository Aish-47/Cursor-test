import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
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
  gap: ${({ theme }) => theme.spacing[5]};
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

const PasswordStrength = styled.div<{ strength: number }>`
  height: 4px;
  background: ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-top: ${({ theme }) => theme.spacing[2]};
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ strength }) => strength}%;
    background: ${({ strength, theme }) => 
      strength < 25 ? theme.colors.error :
      strength < 50 ? '#f59e0b' :
      strength < 75 ? '#10b981' :
      theme.colors.success
    };
    transition: all ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.timing.ease};
  }
`;

const PasswordHint = styled.p<{ strength: number }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ strength, theme }) => 
    strength < 25 ? theme.colors.error :
    strength < 50 ? '#f59e0b' :
    strength < 75 ? '#10b981' :
    theme.colors.success
  };
  margin-top: ${({ theme }) => theme.spacing[1]};
  transition: color ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.timing.ease};
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

const LoginLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary[600]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary[700]};
    text-decoration: underline;
  }
`;

const SignupPage: React.FC = () => {
  const { signUp, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordHint = (password: string): string => {
    const strength = calculatePasswordStrength(password);
    if (strength < 25) return 'Password is too weak';
    if (strength < 50) return 'Password is weak';
    if (strength < 75) return 'Password is good';
    return 'Password is strong';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (calculatePasswordStrength(formData.password) < 50) {
      setError('Please choose a stronger password');
      return;
    }

    const success = await signUp(formData.email, formData.password, formData.name);
    if (success) {
      navigate('/invite');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

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
          <Title>Get Started</Title>
          <Subtitle>Create your account to find names together</Subtitle>
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
              <User size={20} />
            </InputIcon>
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              autoComplete="name"
              required
            />
          </InputGroup>

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="new-password"
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </PasswordToggle>
            {formData.password && (
              <>
                <PasswordStrength strength={passwordStrength} />
                <PasswordHint strength={passwordStrength}>
                  {getPasswordHint(formData.password)}
                </PasswordHint>
              </>
            )}
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              autoComplete="new-password"
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </PasswordToggle>
          </InputGroup>

          <SubmitButton
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </SubmitButton>
        </Form>

        <Footer>
          Already have an account?{' '}
          <LoginLink to="/login">Sign in here</LoginLink>
        </Footer>
      </FormContainer>
    </Container>
  );
};

export default SignupPage;