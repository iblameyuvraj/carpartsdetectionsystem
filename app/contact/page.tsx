'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ContactPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

    // Create animated network/constellation
    const nodes: THREE.Mesh[] = [];
    const connections: { line: THREE.Line; nodeA: THREE.Mesh; nodeB: THREE.Mesh }[] = [];
    const nodeCount = 25;

    // Create nodes (glowing spheres)
    for (let i = 0; i < nodeCount; i++) {
      const geometry = new THREE.SphereGeometry(0.15, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(
          (Math.random() * 0.2) + 0.7, // Blue to purple range
          0.8,
          0.7
        ),
        transparent: true,
        opacity: 0.8
      });

      const sphere = new THREE.Mesh(geometry, material);
      
      sphere.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20
      );

      sphere.userData = {
        originalPosition: sphere.position.clone(),
        floatSpeed: Math.random() * 0.5 + 0.2,
        floatRange: Math.random() * 3 + 1,
        rotationSpeed: (Math.random() - 0.5) * 0.01
      };

      nodes.push(sphere);
      scene.add(sphere);
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        
        if (distance < 15 && Math.random() > 0.6) {
          const geometry = new THREE.BufferGeometry();
          const positions = new Float32Array([
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          ]);
          
          geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          
          const material = new THREE.LineBasicMaterial({
            color: 0x4f46e5,
            transparent: true,
            opacity: 0.3
          });
          
          const line = new THREE.Line(geometry, material);
          connections.push({ line, nodeA: nodes[i], nodeB: nodes[j] });
          scene.add(line);
        }
      }
    }

    // Create floating geometric shapes for extra flair
    const floatingShapes: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const geometries = [
        new THREE.TetrahedronGeometry(1),
        new THREE.OctahedronGeometry(0.8),
        new THREE.IcosahedronGeometry(0.6)
      ];
      
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.8 + Math.random() * 0.1, 0.6, 0.5),
        transparent: true,
        opacity: 0.2,
        wireframe: true
      });

      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30
      );

      shape.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.3 + 0.1,
        originalY: shape.position.y
      };

      floatingShapes.push(shape);
      scene.add(shape);
    }

    const clock = new THREE.Clock();

    // Animation loop
    function animate() {
      if (!sceneRef.current || !rendererRef.current) return;
      
      animationIdRef.current = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Animate nodes
      nodes.forEach((node, index) => {
        const userData = node.userData;
        node.position.y = userData.originalPosition.y + 
          Math.sin(time * userData.floatSpeed + index) * userData.floatRange;
        
        node.position.x = userData.originalPosition.x + 
          Math.cos(time * userData.floatSpeed * 0.7 + index) * (userData.floatRange * 0.5);

        // Pulse effect
        const scale = 1 + Math.sin(time * 2 + index) * 0.2;
        node.scale.setScalar(scale);
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

        // Animate connection opacity
        const distance = nodeA.position.distanceTo(nodeB.position);
        const opacity = Math.max(0, 0.5 - distance / 30);
        (line.material as THREE.LineBasicMaterial).opacity = opacity;
      });

      // Animate floating shapes
      floatingShapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;
        
        shape.position.y = shape.userData.originalY + 
          Math.sin(time * shape.userData.floatSpeed) * 5;
      });

      // Camera gentle movement
      camera.position.x = Math.sin(time * 0.1) * 2;
      camera.position.y = Math.cos(time * 0.15) * 1;
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
      window.removeEventListener('resize', onResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Clean up all geometries and materials
      [...nodes, ...floatingShapes].forEach(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(material => material.dispose());
          } else {
            obj.material.dispose();
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
      
      sceneRef.current = null;
      rendererRef.current = null;
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="relative min-h-screen w-full text-white">
      {/* Three.js Background */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Ready to start your next project? Let&apos;s create something amazing together.
            </p>
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
                  <p className="text-gray-300">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 group-hover:border-gray-500"
                        placeholder="Your Name"
                      />
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 group-hover:border-gray-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 group-hover:border-gray-500"
                      placeholder="Subject"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none group-hover:border-gray-500"
                      placeholder="Tell us about your problem..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                          Sending...
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/30 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Let&apos;s Connect
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group hover:bg-gray-800/30 p-4 rounded-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-all duration-300">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Email</h4>
                    <p className="text-gray-300">xyz@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group hover:bg-gray-800/30 p-4 rounded-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-all duration-300">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Phone</h4>
                    <p className="text-gray-300">+91-0000000000</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group hover:bg-gray-800/30 p-4 rounded-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/30 transition-all duration-300">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Location</h4>
                    <p className="text-gray-300">xyz</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group hover:bg-gray-800/30 p-4 rounded-lg transition-all duration-300">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-all duration-300">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Response Time</h4>
                    <p className="text-gray-300">Within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <p className="text-gray-400 text-sm leading-relaxed">
                  we love to hear from you! Whether you have a question about our services, need assistance, or just want to say hello, feel free to reach out. Our team is here to help and will get back to you as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}