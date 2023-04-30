import { useRef, FC } from "react";
import * as THREE from 'three';
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { useIntersect } from "@react-three/drei";
import { HomeTopItemProps as IItemProps } from "../../types/containers";


const Item: FC<IItemProps> = ({ url, position }) => {
  const visible = useRef(false);
  const texture = useLoader(THREE.TextureLoader, url);
  const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);
  const { height } = useThree((state) => state.viewport);

  const ref: React.MutableRefObject<THREE.Object3D<THREE.Event>> = useIntersect(
    (isVisible) => {
      visible.current = isVisible;
    }
  );

  useFrame((_state, delta) => {
    visible.current ? 0 : -height / 2 + 1;
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      visible.current ? 0 : -height / 2 + 1,
      5,
      delta
    );
    ref.current.rotateZ(0.007);
    ref.current.rotateX(0.009);
    ref.current.rotateY(0.007);
  });

  return (
    <group position={position}>
      <primitive object={mesh} ref={ref} />
    </group>
  );
};

export const Back: FC = () => {
  const { width: w, height: h } = useThree((state) => state.viewport);
  return (
    <group>
      <Item
        url="/images/1.jpg"
        position={[-w / 11, 0, 1]}

      />
      <Item
        url="/images/2.jpg"
        position={[w / 5, -h * 0.4, -1]}
      />
      <Item
        url="/images/3.jpg"
        position={[-w / 5, -h * 0.9 * 0.7, 0.8]}
      />
      <Item
        url="/images/4.jpg"
        position={[w / 10, -h * 1.2, 0.2]}
      />
      <Item
        url="/images/5.jpg"
        position={[-w / 5, -h * 1.4, -0.4]}
      />
      <Item
        url="/images/6.jpg"
        position={[w / 10, -h * 1.9, 0.5]}
      />
      <Item
        url="/images/7.jpg"
        position={[-w / 4, -h * 2.2, -0.1]}
      />
      <Item
        url="/images/8.jpg"
        position={[w / 12, -h * 2.5, -1.4]}
      />
      <Item
        url="/images/9.jpg"
        position={[-w / 7, -h * 2.8, 0.6]}
      />
    </group>
  );
};
