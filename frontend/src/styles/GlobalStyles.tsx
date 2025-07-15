import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  /* Import Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');

  /* CSS Reset and Base Styles */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.neutral[900]};
    background: ${({ theme }) => theme.gradients.background};
    background-attachment: fixed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* Root Container */
  #root {
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.neutral[900]};
    margin: 0;
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    }
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize.xl};
    }
  }

  h5 {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
    }
  }

  h6 {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize.base};
    }
  }

  p {
    margin: 0;
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }

  /* Links */
  a {
    color: ${({ theme }) => theme.colors.primary[600]};
    text-decoration: none;
    transition: color ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.timing.ease};

    &:hover {
      color: ${({ theme }) => theme.colors.primary[700]};
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
      outline-offset: 2px;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
    }
  }

  /* Buttons */
  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    border: none;
    background: none;
    cursor: pointer;
    color: inherit;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
      outline-offset: 2px;
    }
  }

  /* Form Elements */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
    border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
    background: ${({ theme }) => theme.colors.white};
    transition: border-color ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.timing.ease};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary[500]};
      box-shadow: 0 0 0 3px rgba(232, 93, 117, 0.1);
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.neutral[400]};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.neutral[100]};
      cursor: not-allowed;
    }
  }

  /* Lists */
  ul, ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Utility Classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    width: 100%;
    max-width: ${({ theme }) => theme.breakpoints.lg};
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing[4]};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 0 ${({ theme }) => theme.spacing[6]};
    }
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.neutral[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral[300]};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.neutral[400]};
  }

  /* Mobile-specific optimizations */
  @media (max-width: 767px) {
    body {
      /* Prevent zoom on input focus on iOS */
      -webkit-text-size-adjust: 100%;
    }

    /* Improve touch targets */
    button, 
    [role="button"],
    input[type="submit"],
    input[type="button"] {
      min-height: 44px;
      min-width: 44px;
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      transform: translate3d(0, -10px, 0);
    }
    70% {
      transform: translate3d(0, -5px, 0);
    }
    90% {
      transform: translate3d(0, -2px, 0);
    }
  }

  .fade-in {
    animation: fadeIn ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.timing.ease};
  }

  .slide-up {
    animation: slideUp ${({ theme }) => theme.animation.duration.normal} ${({ theme }) => theme.animation.timing.ease};
  }

  .bounce {
    animation: bounce 1s ${({ theme }) => theme.animation.timing.ease};
  }
`;