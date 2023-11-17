import React from 'react';
import { useNavigate } from 'react-router-dom';
import SetupHeader from '../components/SetupHeader';
import { signUpWithGoogle } from '../utility/firebase';
import logo from '../assets/budget_buddy_cropped.png';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      await signUpWithGoogle();
      // Navigate to the home page after successful sign-up
      navigate('/home');
    } catch (error) {
      console.error('Error signing up with Google:', error);
      // Handle error if needed
    }
  };

  return (
    <div>
      <SetupHeader />
      <div>
        <img src={logo} alt="BudgetBuddy Logo" />
        <h2>Login to BudgetBuddy</h2>
        {/* Your login form components go here */}
        <button onClick={handleGoogleSignUp}>
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
