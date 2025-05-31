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
  const animationFrameRef = useRef<number>(0);

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
        gradient.addColorStop(1, 'hsla(262, 83%, 58%, 0)');
        
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
              ctx.strokeStyle = `hsla(262, 83%, 58%, ${opacity * 0.1})`;
              ctx.lineWidth = 0.2;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
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
    <div className="relative min-h-screen w-full overflow-auto">
      {/* Interactive Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full z-0"
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6 bg-card bg-opacity-80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-border/30 mx-4 my-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
                {/* Logo placeholder */}
              </div>
            </div>
            <h2 className="mt-2 text-3xl font-extrabold text-foreground">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your account
            </p>
          </div>

          {isSuccess && (
            <div className="rounded-md bg-green-500/10 p-4 mb-4 text-green-600 dark:text-green-400 animate-fadeIn">
              <div className="flex">
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
              className="w-full flex justify-center items-center py-3 px-4 border border-border/50 rounded-md shadow-sm text-sm font-medium text-foreground bg-card bg-opacity-50 hover:bg-accent/20 transition-colors duration-300"
            >
              {googleLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <FcGoogle className="h-5 w-5 mr-2" />
                  <span>Sign in with Google</span>
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card bg-opacity-80 text-muted-foreground">or with email</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="rounded-md -space-y-px">
              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.email ? 'border-destructive' : 'border-border/50'
                  } placeholder-muted-foreground text-foreground bg-card bg-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 sm:text-sm`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive animate-fadeIn">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.password ? 'border-destructive' : 'border-border/50'
                  } placeholder-muted-foreground text-foreground bg-card bg-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 sm:text-sm`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-destructive animate-fadeIn">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="relative">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleCheckboxChange}
                    className="sr-only"
                  />
                  <div 
                    onClick={handleCheckboxChange}
                    className={`flex items-center justify-center w-5 h-5 border rounded transition-all duration-200 cursor-pointer ${
                      rememberMe 
                        ? 'bg-primary border-primary' 
                        : 'bg-card bg-opacity-50 border-border/50 hover:border-primary'
                    }`}
                  >
                    {rememberMe && (
                      <svg 
                        className="w-3.5 h-3.5 text-white transition-all duration-200 ease-out" 
                        viewBox="0 0 24 24" 
                        fill="none"
                      >
                        <path 
                          d="M5 13l4 4L19 7" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <label 
                  htmlFor="remember-me" 
                  className="ml-2 block text-sm text-foreground cursor-pointer select-none"
                  onClick={handleCheckboxChange}
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary-light transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="mt-4">
              <button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary w-full flex justify-center py-2.5 px-4 text-sm font-medium rounded-md text-white transition-all duration-300 ease-out ${
                  isSubmitting 
                    ? 'opacity-80 cursor-not-allowed' 
                    : 'hover:scale-[1.02] active:scale-[0.98]'
                }`}
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
                  <span className="transition-all duration-300">Sign In</span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="font-medium text-primary hover:text-primary-light transition-colors">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}