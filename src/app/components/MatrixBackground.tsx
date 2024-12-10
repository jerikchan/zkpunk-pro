import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const MatrixBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 获取容器的实际尺寸
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 初始化场景、相机和渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000);
    containerRef.current.appendChild(renderer.domElement);

    // 创建文字组
    const textGroup = new THREE.Group();
    scene.add(textGroup);

    // 创建随机数字文本
    const createText = () => {
      const loader = new FontLoader();
      loader.load('/fonts/helvetiker_regular.typeface.json', 
        (font) => {
          const characters = ['zk', 'punk'];
          
          for(let i = 0; i < 100; i++) {
            const char = characters[Math.floor(Math.random() * characters.length)];
            const geometry = new TextGeometry(char, {
              font: font,
              size: 0.5,
              height: 0.1
            });
            
            const material = new THREE.MeshBasicMaterial({
              color: 0x00ff00,
              transparent: true,
              opacity: Math.random() * 0.5 + 0.25
            });
            
            const text = new THREE.Mesh(geometry, material);
            
            text.position.x = (Math.random() - 0.5) * 20;
            text.position.y = (Math.random() - 0.5) * 20;
            text.position.z = (Math.random() - 0.5) * 20;
            
            text.rotation.x = Math.random() * Math.PI;
            text.rotation.y = Math.random() * Math.PI;
            
            textGroup.add(text);
          }
        }
      );
    };

    createText();
    camera.position.z = 15;

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      textGroup.rotation.x += 0.001;
      textGroup.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    // 修改处理窗口大小变化的函数
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    animate();

    const current = containerRef.current;
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      current?.removeChild(renderer.domElement);
      // 清理几何体和材质
      textGroup.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
    };
  }, []);

  return <div 
    ref={containerRef} 
    style={{ 
      width: '100%', 
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'hidden'
    }} 
  />;
};

export default MatrixBackground;
