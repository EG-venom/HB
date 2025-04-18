import type React from 'react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password);
      navigate('/browse');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error
        ? err.message
        : 'Failed to register. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black/75 p-8 sm:p-12 rounded w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-8">Sign Up</h2>

      {error && (
        <div className="bg-netflix-red/20 border border-netflix-red text-white p-3 mb-4 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-4 bg-[#333] rounded text-white placeholder-[#8c8c8c] focus:outline-none focus:bg-[#454545]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-4 bg-[#333] rounded text-white placeholder-[#8c8c8c] focus:outline-none focus:bg-[#454545]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-4 bg-[#333] rounded text-white placeholder-[#8c8c8c] focus:outline-none focus:bg-[#454545]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-4 bg-[#333] rounded text-white placeholder-[#8c8c8c] focus:outline-none focus:bg-[#454545]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-netflix-red hover:bg-[#f40612] text-white font-medium text-base sm:text-lg py-3 rounded transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-16 text-[#b3b3b3]">
        <p>
          Already have an account?{' '}
          <a href="/login" className="text-white hover:underline">
            Sign in
          </a>
        </p>
        <p className="text-xs mt-2">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
