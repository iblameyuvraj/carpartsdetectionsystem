// app/login/page.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Particle animation effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    
    // Initialize particles
    const particles: Particle[] = [];
    const colors = [
     'hsla(262, 83%, 58%, 0.4)',
    'hsla(262, 84%, 66%, 0.3)',
    'hsla(256, 42%, 25%, 0.25)',
    'hsla(240, 3.7%, 15.9%, 0.2)'
    ];
    
    // Create particles with natural movement
    const createParticle = (): Particle => {
      const speed = Math.random() * 0.8 + 0.2;
      const angle = Math.random() * Math.PI * 2;
      
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    };
    
    // Create initial particles
    const particleCount = window.innerWidth < 768 ? 40 : 70;
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }
    
    let animationFrameId: number;
    
    const animate = () => {
      // Clear canvas with transparent background
      ctx.fillStyle = 'hsla(240, 10%, 3.9%, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 3
        );
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'hsla(210, 83%, 58%, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Seamless wrapping around edges
        if (p.x > canvas.width + 20) p.x = -20;
        else if (p.x < -20) p.x = canvas.width + 20;
        
        if (p.y > canvas.height + 20) p.y = -20;
        else if (p.y < -20) p.y = canvas.height + 20;
      }
      
      // Draw connections on desktop
      if (window.innerWidth > 768) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
              const opacity = 1 - distance / 120;
              ctx.beginPath();
              ctx.strokeStyle = `hsla(210, 83%, 58%, ${opacity * 0.1})`;
              ctx.lineWidth = 0.2;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate login API call
      setTimeout(() => {
        console.log('Login submitted:', formData);
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Reset form
        if (!rememberMe) {
          setFormData({ email: '', password: '' });
        }
        
        // Reset success message after 3 seconds
        setTimeout(() => setIsSuccess(false), 3000);
      }, 1500);
    }
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    signIn('google', { callbackUrl: '/dashboard' }).finally(() => {
      setGoogleLoading(false);
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-auto bg-gradient-to-br from-gray-900 to-black">
      {/* Interactive Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full z-0"
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6 bg-gray-900 bg-opacity-80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 mx-4 my-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
                {/* link-age of logo  */}
              </div>
            </div>
            <h2 className="mt-2 text-3xl font-bold text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Sign in to your account
            </p>
          </div>

          {isSuccess && (
            <div className="rounded-md bg-green-500/10 p-4 mb-4 text-green-400 animate-fadeIn">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    Login successful! Redirecting...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Google Sign In Button */}
          <div>
            <button
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 bg-opacity-50 hover:bg-gray-700 transition-colors duration-300"
            >
              {googleLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <FcGoogle className="h-5 w-5 mr-2" />
                  <span>log in with Google</span>
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 bg-opacity-80 text-gray-400">or with email</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="rounded-md -space-y-px">
              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full px-3 py-2.5 border ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  } placeholder-gray-500 text-white bg-gray-800 bg-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400 animate-fadeIn">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full px-3 py-2.5 border ${
                    errors.password ? 'border-red-500' : 'border-gray-700'
                  } placeholder-gray-500 text-white bg-gray-800 bg-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400 animate-fadeIn">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="mt-4">
              <button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2.5 px-4 text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ease-out"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="transition-all duration-300">Signing in...</span>
                  </div>
                ) : (
                  <span className="transition-all duration-300">log In</span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link href="/sign-up" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}