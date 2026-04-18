import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

const MetalShaderMaterial = shaderMaterial(
  {
    uTilt: new THREE.Vector2(0, 0),
    uTime: 0,
    uColor1: new THREE.Color('#2a2a2a'),
    uColor2: new THREE.Color('#1a1a1a'),
  },
  // vertex
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment
  `
    uniform vec2 uTilt;
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    // Noise function for rough texture
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    // Generate a micro-normal for rough light scattering
    vec3 getMicroNormal(vec2 uv) {
        float n1 = random(uv * 800.0);
        float n2 = random(uv * 800.0 + vec2(13.1, 57.9));
        // Map to -1 to 1, z controls the strength of the base normal
        return normalize(vec3(n1 * 2.0 - 1.0, n2 * 2.0 - 1.0, 1.5)); 
    }

    void main() {
      vec3 baseNormal = normalize(vNormal);

      // Convert tilt percentages to radians (matches CSS: xPct * 25deg, yPct * -25deg)
      float rotY = uTilt.x * 0.436332; // 25 degrees in radians
      float rotX = uTilt.y * -0.436332; // -25 degrees in radians

      // Inverse rotation matrix to bring fixed screen-space coordinates into local space
      float cx = cos(-rotX);
      float sx = sin(-rotX);
      float cy = cos(-rotY);
      float sy = sin(-rotY);

      mat3 rotXMat = mat3(
          1.0, 0.0, 0.0,
          0.0, cx, -sx,
          0.0, sx, cx
      );
      mat3 rotYMat = mat3(
          cy, 0.0, sy,
          0.0, 1.0, 0.0,
          -sy, 0.0, cy
      );
      
      mat3 invRot = rotYMat * rotXMat;

      // Fixed screen-space light and camera
      vec3 screenLightPos1 = vec3(8.0, 8.0, 12.0); 
      vec3 screenLightPos2 = vec3(-8.0, -8.0, 8.0); // Fill/rim light
      vec3 screenViewPos = vec3(0.0, 0.0, 10.0);

      vec3 localLightPos1 = invRot * screenLightPos1;
      vec3 localLightPos2 = invRot * screenLightPos2;
      vec3 localViewPos = invRot * screenViewPos;

      vec3 lightDir1 = normalize(localLightPos1 - vWorldPosition);
      vec3 lightDir2 = normalize(localLightPos2 - vWorldPosition);
      vec3 viewDir = normalize(localViewPos - vWorldPosition);

      // Radial gradient from center-left
      float dist = distance(vUv, vec2(0.0, 0.5));
      vec3 baseColor = mix(uColor1, uColor2, smoothstep(0.0, 1.1, dist));

      // Perturb normal for rough metallic texture (scattering light)
      vec3 microNormal = getMicroNormal(vUv);
      vec3 normal = normalize(baseNormal + microNormal * 0.6); // 0.6 controls roughness

      // Diffuse
      float diff1 = max(dot(normal, lightDir1), 0.0);
      float diff2 = max(dot(normal, lightDir2), 0.0);
      
      // Specular (Main Light) - lower exponent for wider scattering due to roughness
      vec3 halfVector1 = normalize(lightDir1 + viewDir);
      float NdotH1 = max(0.0, dot(normal, halfVector1));
      float spec1 = pow(NdotH1, 25.0); // Lower exponent = rougher, wider spread
      
      // Secondary light for rim/environment
      vec3 halfVector2 = normalize(lightDir2 + viewDir);
      float NdotH2 = max(0.0, dot(normal, halfVector2));
      float spec2 = pow(NdotH2, 15.0);

      // Fresnel
      float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);

      // Combine
      // Tint specular slightly with base color for a more metallic look
      vec3 specularColor = mix(vec3(1.0), baseColor, 0.4);
      
      vec3 finalColor = baseColor * (diff1 * 0.4 + diff2 * 0.2 + 0.5) + 
                        specularColor * spec1 * 1.8 + 
                        vec3(0.9, 0.8, 0.9) * spec2 * 0.6 + 
                        vec3(1.0) * fresnel * 0.3;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ MetalShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      metalShaderMaterial: any;
    }
  }
}

interface ShaderPlaneProps {
  tiltRef: React.MutableRefObject<{ x: number; y: number }>;
  color1: string;
  color2: string;
}

export const ShaderPlane: React.FC<ShaderPlaneProps> = ({ tiltRef, color1, color2 }) => {
  const materialRef = useRef<any>();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      // Smoothly interpolate tilt for the shader
      materialRef.current.uTilt.x = THREE.MathUtils.lerp(materialRef.current.uTilt.x, tiltRef.current.x, 0.1);
      materialRef.current.uTilt.y = THREE.MathUtils.lerp(materialRef.current.uTilt.y, tiltRef.current.y, 0.1);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[15, 15]} />
      <metalShaderMaterial 
        ref={materialRef} 
        uColor1={new THREE.Color(color1)} 
        uColor2={new THREE.Color(color2)} 
      />
    </mesh>
  );
};
