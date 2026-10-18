import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const INDIGO = '#6366f1';
const FUCHSIA = '#d946ef';

const bgVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const bgFragment = `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uScroll;
  varying vec2 vUv;
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  void main() {
    vec2 uv = vUv - 0.5;
    float d = length(uv - uPointer * 0.35);
    float n = noise(uv * 4.0 + uTime * 0.15) * 0.5 + noise(uv * 8.0 - uTime * 0.1) * 0.25;
    float glow = smoothstep(0.65, 0.0, d) * 0.35;
    vec3 col = mix(vec3(0.04, 0.06, 0.14), vec3(0.25, 0.2, 0.55), n + glow);
    col += vec3(0.55, 0.2, 0.75) * glow * (0.6 + uScroll * 0.4);
    gl_FragColor = vec4(col, 0.55 * (1.0 - uScroll * 0.5));
  }
`;

function ShaderBackdrop({ pointer, scroll }) {
  const mat = useRef();
  useFrame((state) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = state.clock.elapsedTime;
    mat.current.uniforms.uPointer.value.set(pointer.current.x * 0.5, pointer.current.y * 0.5);
    mat.current.uniforms.uScroll.value = scroll.current ?? 0;
  });
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    }),
    [],
  );
  return (
    <mesh position={[0, 0, -2]} scale={[12, 12, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={mat} vertexShader={bgVertex} fragmentShader={bgFragment} uniforms={uniforms} transparent depthWrite={false} />
    </mesh>
  );
}

function Core({ pointer, scroll }) {
  const group = useRef();
  const inner = useRef();
  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const scrollBoost = 1 + (scroll.current ?? 0) * 0.4;
    g.rotation.y += dt * 0.18 * scrollBoost;
    g.rotation.x += dt * 0.05;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, pointer.current.x * 0.45, 0.06);
    const sc = scroll.current ?? 0;
    g.position.y = THREE.MathUtils.lerp(g.position.y, pointer.current.y * 0.35 - sc * 0.8, 0.06);
    g.position.z = THREE.MathUtils.lerp(g.position.z, sc * -1.2, 0.04);
    if (inner.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.04;
      inner.current.scale.setScalar(s);
    }
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color={INDIGO} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[0.6, 0.2, 0]}>
        <torusGeometry args={[2.25, 0.012, 8, 160]} />
        <meshBasicMaterial color={FUCHSIA} transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[-0.9, 0.5, 0.3]}>
        <torusGeometry args={[2.6, 0.008, 8, 160]} />
        <meshBasicMaterial color={INDIGO} transparent opacity={0.45} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.95, 4]} />
        <meshStandardMaterial color={INDIGO} emissive={FUCHSIA} emissiveIntensity={0.35} roughness={0.25} metalness={0.6} flatShading />
      </mesh>
    </group>
  );
}

function Particles({ count, pointer, scroll }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 3 + Math.random() * 3.5;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, [count]);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const sc = scroll.current ?? 0;
    ref.current.rotation.y -= dt * (0.03 + sc * 0.08);
    ref.current.rotation.x = pointer.current.y * 0.12;
    ref.current.position.y = sc * -0.5;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#a5b4fc" transparent opacity={0.8} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function Hero3D({ active = true, mobile = false, scrollRef }) {
  const pointer = useRef({ x: 0, y: 0 });
  const fallbackScroll = useRef(0);
  const scroll = scrollRef ?? fallbackScroll;

  return (
    <div
      className="h-full w-full"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        pointer.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        pointer.current.x = 0;
        pointer.current.y = 0;
      }}
    >
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={mobile ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: 'low-power' }}
        aria-hidden="true"
      >
        <ShaderBackdrop pointer={pointer} scroll={scroll} />
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 4]} intensity={40} color="#ffffff" />
        <pointLight position={[-4, -2, 2]} intensity={25} color={FUCHSIA} />
        <Core pointer={pointer} scroll={scroll} />
        <Particles count={mobile ? 200 : 550} pointer={pointer} scroll={scroll} />
      </Canvas>
    </div>
  );
}
