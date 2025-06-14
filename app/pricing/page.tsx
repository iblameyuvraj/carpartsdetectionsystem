'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  color: string;
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Basic',
    price: 1999,
    description: 'Perfect for individuals and small projects',
    features: [
      'Basic car parts detection',
      'Up to 100 scans per month',
      'Standard accuracy',
      'Email support',
      'Basic analytics',
    ],
    color: '#3B82F6',
  },
  {
    name: 'Professional',
    price: 4999,
    description: 'Ideal for growing businesses',
    features: [
      'Advanced car parts detection',
      'Up to 500 scans per month',
      'High accuracy',
      'Priority support',
      'Advanced analytics',
      'API access',
      'Custom reporting',
    ],
    color: '#8B5CF6',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 9999,
    description: 'For large organizations with custom needs',
    features: [
      'Premium car parts detection',
      'Unlimited scans',
      'Highest accuracy',
      '24/7 dedicated support',
      'Custom analytics',
      'Full API access',
      'Custom integrations',
      'Dedicated account manager',
    ],
    color: '#EC4899',
  },
];

export default function PricingPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particles: THREE.Mesh[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(
          (Math.random() * 0.1) + 0.6,
          0.8,
          0.5
        ),
        transparent: true,
        opacity: 0.6
      });

      const particle = new THREE.Mesh(geometry, material);
      
      particle.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30
      );

      particle.userData = {
        originalPosition: particle.position.clone(),
        speed: Math.random() * 0.2 + 0.1,
        amplitude: Math.random() * 5 + 2,
        phase: Math.random() * Math.PI * 2
      };

      particles.push(particle);
      scene.add(particle);
    }

    // Create connections
    const connections: { line: THREE.Line; nodeA: THREE.Mesh; nodeB: THREE.Mesh }[] = [];
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = particles[i].position.distanceTo(particles[j].position);
        
        if (distance < 20 && Math.random() > 0.7) {
          const geometry = new THREE.BufferGeometry();
          const positions = new Float32Array([
            particles[i].position.x, particles[i].position.y, particles[i].position.z,
            particles[j].position.x, particles[j].position.y, particles[j].position.z
          ]);
          
          geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          
          const material = new THREE.LineBasicMaterial({
            color: 0x2a2a4a,
            transparent: true,
            opacity: 0.2
          });
          
          const line = new THREE.Line(geometry, material);
          connections.push({ line, nodeA: particles[i], nodeB: particles[j] });
          scene.add(line);
        }
      }
    }

    const clock = new THREE.Clock();

    // Animation loop
    function animate() {
      if (!sceneRef.current || !rendererRef.current) return;
      
      animationIdRef.current = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Animate particles
      particles.forEach((particle, index) => {
        const userData = particle.userData;
        
        particle.position.x = userData.originalPosition.x + 
          Math.sin(time * userData.speed + userData.phase) * userData.amplitude;
        particle.position.y = userData.originalPosition.y + 
          Math.cos(time * userData.speed * 0.7 + userData.phase) * userData.amplitude;
        particle.position.z = userData.originalPosition.z + 
          Math.sin(time * userData.speed * 0.5 + userData.phase) * (userData.amplitude * 0.5);

        // Color shift
        const material = particle.material as THREE.MeshBasicMaterial;
        material.color.setHSL(
          (Math.sin(time * 0.1 + index) * 0.1) + 0.6,
          0.8,
          0.5
        );
      });

      // Update connections
      connections.forEach(({ line, nodeA, nodeB }) => {
        const positions = line.geometry.attributes.position.array as Float32Array;
        positions[0] = nodeA.position.x;
        positions[1] = nodeA.position.y;
        positions[2] = nodeA.position.z;
        positions[3] = nodeB.position.x;
        positions[4] = nodeB.position.y;
        positions[5] = nodeB.position.z;
        line.geometry.attributes.position.needsUpdate = true;

        const distance = nodeA.position.distanceTo(nodeB.position);
        const opacity = Math.max(0, 0.3 - distance / 40);
        (line.material as THREE.LineBasicMaterial).opacity = opacity;
      });

      // Camera movement
      camera.position.x = Math.sin(time * 0.1) * 3;
      camera.position.y = Math.cos(time * 0.15) * 2;
      camera.lookAt(0, 0, 0);

      rendererRef.current.render(scene, camera);
    }

    animate();

    // Resize handler
    function onResize() {
      if (!mountRef.current || !rendererRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    }
    
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      particles.forEach(particle => {
        if (particle.geometry) particle.geometry.dispose();
        if (particle.material) {
          if (Array.isArray(particle.material)) {
            particle.material.forEach(material => material.dispose());
          } else {
            particle.material.dispose();
          }
        }
      });
      
      connections.forEach(({ line }) => {
        if (line.geometry) line.geometry.dispose();
        if (line.material) {
          if (Array.isArray(line.material)) {
            line.material.forEach(material => material.dispose());
          } else {
            line.material.dispose();
          }
        }
      });
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full text-white">
      {/* Three.js Background */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Choose Your Plan
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Select the perfect plan for your car parts detection needs. All plans include our core features.
            </p>

            {/* Billing Toggle */}
            <div className="mt-8 flex items-center justify-center space-x-4">
              <span className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-800"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isYearly ? 'text-white' : 'text-gray-400'}`}>
                Yearly <span className="text-green-400">(Save 20%)</span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative ${
                  tier.popular ? 'md:-mt-8 md:mb-8' : ''
                }`}
              >
                <div
                  className={`h-full bg-black/60 backdrop-blur-xl rounded-2xl p-8 border ${
                    tier.popular
                      ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20'
                      : 'border-gray-800/50'
                  } transition-all duration-300 hover:scale-[1.02]`}
                  style={{
                    background: tier.popular
                      ? 'linear-gradient(to bottom, rgba(139, 92, 246, 0.1), rgba(0, 0, 0, 0.6))'
                      : undefined,
                  }}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-4xl font-bold">₹{isYearly ? Math.round(tier.price * 0.8) : tier.price}</span>
                      <span className="text-gray-400">/month</span>
                    </div>
                    {isYearly && (
                      <p className="text-sm text-green-400 mt-2">Billed annually (₹{Math.round(tier.price * 0.8 * 12)})</p>
                    )}
                    <p className="text-gray-400 mt-4">{tier.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <svg
                          className="w-5 h-5 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold mb-12">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: 'Can I change plans later?',
                  answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
                },
                {
                  question: 'What payment methods do you accept?',
                  answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.',
                },
                {
                  question: 'Is there a free trial?',
                  answer: 'Yes, we offer a 14-day free trial on all plans. No credit card required.',
                },
                {
                  question: 'Do you offer custom plans?',
                  answer: 'Yes, we can create custom plans for enterprise customers with specific needs. Contact our sales team for details.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-gray-800/50"
                >
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 