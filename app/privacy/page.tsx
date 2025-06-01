'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function PrivacyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Initialize Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 20 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      colors[i3] = 0.4 + Math.random() * 0.2;
      colors[i3 + 1] = 0.4 + Math.random() * 0.2;
      colors[i3 + 2] = 0.8 + Math.random() * 0.2;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      particles.rotation.x = elapsedTime * 0.05;
      particles.rotation.y = elapsedTime * 0.03;
      
      camera.position.x += (mouse.x * 10 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 10 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <div className="bg-black/80 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-800">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Last updated: {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </header>

          <section className="space-y-10 text-gray-300">
            {/* Content sections remain unchanged */}
            <article className="border-b border-gray-800 pb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 w-3 h-3 rounded-full mr-3"></span>
                Introduction
              </h2>
              <p className="mb-4 leading-relaxed">
                We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we handle your personal data, 
                your privacy rights, and how the law protects you.
              </p>
            </article>

            <article className="border-b border-gray-800 pb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 w-3 h-3 rounded-full mr-3"></span>
                Data Collection
              </h2>
              <p className="mb-4 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, 
                subscribe to our newsletter, or contact us for support. This may include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Name and contact details
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Account credentials
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Payment information
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Communications with us
                </li>
              </ul>
            </article>

            <article className="border-b border-gray-800 pb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 w-3 h-3 rounded-full mr-3"></span>
                Data Usage
              </h2>
              <p className="mb-4 leading-relaxed">
                We use your personal data for the following purposes:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Provide and maintain our services",
                  "Notify about changes to our service",
                  "Allow participation in interactive features",
                  "Provide customer support",
                  "Gather analysis for service improvement",
                  "Monitor service usage",
                  "Detect and prevent technical issues",
                  "Send marketing communications"
                ].map((item, i) => (
                  <li key={i} className="flex items-start bg-gray-900/50 p-3 rounded-lg">
                    <span className="text-purple-500 mr-2">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="border-b border-gray-800 pb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 w-3 h-3 rounded-full mr-3"></span>
                Data Security
              </h2>
              <p className="mb-4 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your 
                personal data against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-800 mt-4">
                <h3 className="font-medium text-blue-400 mb-2">Our security measures include:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "End-to-end encryption",
                    "Regular security audits",
                    "Two-factor authentication",
                    "Access control systems",
                    "Secure data storage",
                    "Incident response plan"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="border-b border-gray-800 pb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 w-3 h-3 rounded-full mr-3"></span>
                Your Rights
              </h2>
              <p className="mb-4 leading-relaxed">
                Under data protection laws, you have rights including:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {[
                  { title: "Data Access", desc: "Request copies of your personal data" },
                  { title: "Data Correction", desc: "Request correction of inaccurate data" },
                  { title: "Data Erasure", desc: "Request deletion of your data" },
                  { title: "Processing Objection", desc: "Object to processing of your data" },
                  { title: "Data Portability", desc: "Request transfer of data to another organization" },
                  { title: "Consent Withdrawal", desc: "Withdraw consent at any time" }
                ].map((right, i) => (
                  <div key={i} className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                    <h3 className="font-medium text-purple-400">{right.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{right.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6">
                To exercise these rights, please contact us at <span className="text-blue-400">privacy@yourdomain.com</span>.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 w-3 h-3 rounded-full mr-3"></span>
                Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have questions about this privacy policy, contact us at:
              </p>
              <div className="mt-4 p-4 bg-gradient-to-r from-gray-900 to-black rounded-lg border border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <p className="text-blue-400 text-lg font-medium">privacy@yourdomain.com</p>
                    <p className="text-gray-400 text-sm">We typically respond within 24 hours</p>
                  </div>
                  <button className="mt-4 md:mt-0 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg hover:opacity-90 transition-opacity">
                    Contact Form
                  </button>
                </div>
              </div>
            </article>
          </section>

          <footer className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
            <p className="mt-2">Last revised: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </footer>
        </div>
      </div>
    </div>
  );
}