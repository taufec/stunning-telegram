import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

export const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/submit';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        
        // Create profile manually if trigger is not set up
        if (data.user) {
          const { error: profileError } = await supabase.from('profiles').insert([
            { id: data.user.id, full_name: fullName, email: email, role: 'user' }
          ]);
          if (profileError && profileError.code !== '23505') {
            console.error('Error creating profile:', profileError);
          }
        }
        
        setMessage('Check your email for the confirmation link.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/auth/callback',
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'An error occurred with Google Sign In.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian px-6 py-24">
      <div className="w-full max-w-md bg-slate/20 border border-ivory/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-champagne/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-champagne flex items-center justify-center text-obsidian font-bold text-2xl mx-auto mb-6 shadow-[0_0_30px_rgba(0,255,102,0.3)]">
              KT
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-ivory mb-2">
              {isSignUp ? 'Join the Directory' : 'Welcome Back'}
            </h2>
            <p className="text-ivory/60 text-sm">
              {isSignUp ? 'Create an account to submit your listing.' : 'Sign in to manage your listings.'}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-2xl mb-6">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm p-4 rounded-2xl mb-6">
              {message}
            </div>
          )}

          <form onSubmit={handleAuth} className="flex flex-col gap-5 mb-8">
            {isSignUp && (
              <div className="relative">
                <UserIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full bg-obsidian/50 border border-ivory/10 rounded-full py-4 pl-12 pr-6 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-champagne/50 transition-colors"
                />
              </div>
            )}
            <div className="relative">
              <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-obsidian/50 border border-ivory/10 rounded-full py-4 pl-12 pr-6 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-champagne/50 transition-colors"
              />
            </div>
            <div className="relative">
              <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-obsidian/50 border border-ivory/10 rounded-full py-4 pl-12 pr-6 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-champagne/50 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-champagne text-obsidian rounded-full py-4 font-bold btn-magnetic flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-x-0 h-px bg-ivory/10" />
            <span className="relative bg-slate px-4 text-xs font-mono text-ivory/40 uppercase tracking-widest">
              Or continue with
            </span>
          </div>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full bg-ivory text-obsidian rounded-full py-4 font-bold flex items-center justify-center gap-3 hover:bg-ivory/90 transition-colors mb-8"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>

          <div className="text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-ivory/60 hover:text-champagne transition-colors text-sm font-medium"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
