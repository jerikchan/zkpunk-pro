import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const MatrixBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000);
    containerRef.current.appendChild(renderer.domElement);

    const textGroup = new THREE.Group();
    scene.add(textGroup);

    // 创建数字雨
    const createMatrixRain = () => {
      const loader = new FontLoader();
      loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
        const characters = [
          '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
          'zkpunk'
        ];

        const columns = 20;
        const rows = 15;
        const spacing = 1.5;

        for (let i = 0; i < columns; i++) {
          for (let j = 0; j < rows; j++) {
            const char = characters[Math.floor(Math.random() * characters.length)];
            const geometry = new TextGeometry(char, {
              font: font,
              size: 0.4,
              height: 0.1,
            });

            const material = new THREE.MeshBasicMaterial({
              color: 0x00ff00,
              transparent: true,
              opacity: Math.random() * 0.5 + 0.25
            });

            const text = new THREE.Mesh(geometry, material);

            // 设置初始位置
            text.position.x = (i - columns / 2) * spacing;
            text.position.y = (j - rows / 2) * spacing;
            text.position.z = Math.random() * -10;

            // 添加自定义属性用于动画
            (text as any).velocity = Math.random() * 0.05 + 0.02;
            (text as any).originalY = text.position.y;

            textGroup.add(text);
          }
        }
      });
    };

    createMatrixRain();
    camera.position.z = 15;

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);

      // 更新每个字符的位置
      textGroup.children.forEach((child) => {
        child.position.y -= (child as any).velocity;

        // 当字符降到底部时，重置到顶部
        if (child.position.y < -10) {
          child.position.y = 10;
          // 随机更新透明度
          ((child as any).material as THREE.MeshBasicMaterial).opacity = Math.random() * 0.5 + 0.25;
        }
      });

      renderer.render(scene, camera);
    };

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
    return () => {
      window.removeEventListener('resize', handleResize);
      current?.removeChild(renderer.domElement);
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
      overflow: 'hidden',
      background: '#000'
    }} 
  />;
};

export default MatrixBackground;
