import { MathUtils, Mesh, BufferGeometry } from "three";
import { useRef, FC, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Image, useIntersect } from "@react-three/drei";
import { HomeTopItemProps as IItemProps } from "../../types/containers";

const Item: FC<IItemProps> = ({ url, scale, ...props }) => {
  const visible = useRef(false);
  const [, hover] = useState(false);
  const ref: React.MutableRefObject<THREE.Object3D<THREE.Event>> = useIntersect(
    (isVisible) => {
      visible.current = isVisible;
    }
  );

  const { height } = useThree((state) => state.viewport);
  useFrame((_state, delta) => {
    ref.current.position.y = MathUtils.damp(
      ref.current.position.y,
      visible.current ? 0 : -height / 2 + 1,
      4,
      delta
    );
    ref.current.rotateZ(0.006);
  });
  return (
    <group {...props}>
      <Image
        ref={ref as React.RefObject<Mesh<BufferGeometry>>}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        scale={scale}
        url={url}
      />
    </group>
  );
};

export const Back: FC = () => {
  const { width: w, height: h } = useThree((state) => state.viewport);
  return (
    <group>
      <Item
        url="/images/1.jpg"
        scale={[w / 3.5, w / 4]}
        position={[-w / 11, 0, 1]}
      />
      <Item
        url="/images/2.jpg"
        scale={[w / 5, w / 3.6]}
        position={[w / 5, -h * 0.4, -1]}
      />
      <Item
        url="/images/3.jpg"
        scale={[w / 3.4, w / 3.7]}
        position={[-w / 5, -h * 0.9 * 0.7, 1.5]}
      />
      <Item
        url="/images/4.jpg"
        scale={[w / 6, w / 3.4]}
        position={[w / 10, -h * 1.2, -0.2]}
      />
      <Item
        url="/images/5.jpg"
        scale={[w / 4.2, w / 4]}
        position={[-w / 5, -h * 1.4, 1.5]}
      />
      <Item
        url="/images/6.jpg"
        scale={[w / 3.8, w / 3.8]}
        position={[w / 10, -h * 1.9, 1.1]}
      />
      <Item
        url="/images/7.jpg"
        scale={[w / 5, w / 3.5]}
        position={[-w / 4, -h * 2.2, 1.6]}
      />
      <Item
        url="/images/8.jpg"
        scale={[w / 3, w / 4]}
        position={[w / 12, -h * 2.5, -1.4]}
      />
      <Item
        url="/images/9.jpg"
        scale={[w / 4, w / 6]}
        position={[-w / 7, -h * 2.9, 1.8]}
      />
    </group>
  );
};
