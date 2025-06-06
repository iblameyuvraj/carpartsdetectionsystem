'use client';
import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

export default function PrivacyTermsPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const onResize = useCallback(() => {
    if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
    
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene, camera, renderer setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    rendererRef.current = renderer;
    
    mountRef.current.appendChild(renderer.domElement);

    // Create particles geometry
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      // Initial positions
      positions[i * 3] = (Math.random() - 0.5) * 100;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
      
      // Initial velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;     // x velocity
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02; // y velocity
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02; // z velocity
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material
    const material = new THREE.PointsMaterial({
      color: 0x7f5af0,
      size: 2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Create points system
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const clock = new THREE.Clock();

    // Animate particles floating
    function animate() {
      if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;
      
      animationIdRef.current = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      const positionsArray = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        // Smooth floating motion with sin/cos waves
        positionsArray[i3] += Math.sin(time * 0.5 + i * 0.1) * 0.01;     // x
        positionsArray[i3 + 1] += Math.cos(time * 0.3 + i * 0.05) * 0.008; // y
        positionsArray[i3 + 2] += Math.sin(time * 0.4 + i * 0.15) * 0.006; // z
        
        // Boundary wrapping to keep particles in view
        if (positionsArray[i3] > 50) positionsArray[i3] = -50;
        if (positionsArray[i3] < -50) positionsArray[i3] = 50;
        if (positionsArray[i3 + 1] > 50) positionsArray[i3 + 1] = -50;
        if (positionsArray[i3 + 1] < -50) positionsArray[i3 + 1] = 50;
        if (positionsArray[i3 + 2] > 50) positionsArray[i3 + 2] = -50;
        if (positionsArray[i3 + 2] < -50) positionsArray[i3 + 2] = 50;
      }

      geometry.attributes.position.needsUpdate = true;

      // Rotate particle system slightly for more dynamic effect
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      rendererRef.current.render(scene, cameraRef.current);
    }

    animate();
    
    window.addEventListener('resize', onResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
    };
  }, [onResize]);

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* THREE.js canvas container behind content */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <div className="bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-800/50">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 mb-4">
              Privacy Policy &amp; Terms and Conditions
            </h1>
            <p className="text-gray-400 text-sm">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </header>

          <section className="space-y-10 text-gray-300">
            {/* Privacy Policy Section */}
            <article className="border-b border-gray-700/50 pb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Privacy Policy
              </h2>
              <p className="mb-4 leading-relaxed">
                We value your privacy and are committed to protecting your personal information. This policy outlines
                how we collect, use, and safeguard your data.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>We collect only necessary data to provide services.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Your data is never sold or shared without your consent.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>We use secure servers and encryption to store information.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>You can request deletion or correction of your data at any time.</p>
                </div>
              </div>
            </article>

            {/* Terms and Conditions Section */}
            <article className="border-b border-gray-700/50 pb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Terms and Conditions
              </h2>
              <p className="mb-4 leading-relaxed">
                By accessing or using our website, you agree to comply with and be bound by the following terms and
                conditions:
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-blue-400 font-medium">Acceptance of Terms:</span>
                    <span className="ml-2">Use of our platform signifies acceptance of these terms.</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-blue-400 font-medium">User Conduct:</span>
                    <span className="ml-2">You agree not to misuse the website or engage in any illegal activity.</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-blue-400 font-medium">Intellectual Property:</span>
                    <span className="ml-2">All content and visuals are the intellectual property of our company.</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-blue-400 font-medium">Termination:</span>
                    <span className="ml-2">We reserve the right to terminate access to users who violate our policies.</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-blue-400 font-medium">Changes:</span>
                    <span className="ml-2">Terms may be updated anytime with notice via this page.</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Contact Info */}
            <article>
              <h2 className="text-2xl font-semibold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Contact Us
              </h2>
              <p className="mb-4 leading-relaxed">If you have questions or concerns about our privacy policy or terms, reach out to us at:</p>
              <div className="mt-4 p-6 bg-gradient-to-r from-gray-900/80 to-black/80 rounded-xl border border-gray-700/50 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <p className="text-blue-400 text-lg font-medium">privacy@yourdomain.com</p>
                    <p className="text-gray-400 text-sm mt-1">We typically respond within 24 hours.</p>
                  </div>
                  <button className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Contact Form
                  </button>
                </div>
              </div>
            </article>
          </section>

          <footer className="mt-12 pt-6 border-t border-gray-700/50 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
            <p className="mt-2">Last revised: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </footer>
        </div>
      </div>
    </div>
  );
}