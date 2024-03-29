import { useRef, FC } from "react";
import {
  BoxGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  TextureLoader,
} from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useIntersect } from "@react-three/drei";

// types
import { HomeTopItemProps as IItemProps } from "../../types/containers";

const Item: FC<IItemProps> = ({ url, position }) => {
  const visible = useRef(false);
  const texture = useLoader(TextureLoader, url);
  const geometry = new BoxGeometry(2.5, 2.5, 2.5);
  const material = new MeshBasicMaterial({ map: texture });
  const mesh = new Mesh(geometry, material);
  const { height } = useThree((state) => state.viewport);

  const ref: React.MutableRefObject<Object3D<Event>> = useIntersect(
    (isVisible) => {
      visible.current = isVisible;
    }
  );

  useFrame((_state, delta) => {
    visible.current ? 0 : -height / 2 + 1;
    ref.current.position.y = MathUtils.damp(
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
      <Item url="/images/logoutHome/1.jpg" position={[-w / 11, 0, 1]} />
      <Item url="/images/logoutHome/2.jpg" position={[w / 5, -h * 0.4, -1]} />
      <Item
        url="/images/logoutHome/3.jpg"
        position={[-w / 5, -h * 0.9 * 0.7, 0.8]}
      />
      <Item url="/images/logoutHome/4.jpg" position={[w / 10, -h * 1.2, 0.2]} />
      <Item
        url="/images/logoutHome/5.jpg"
        position={[-w / 5, -h * 1.4, -0.4]}
      />
      <Item url="/images/logoutHome/6.jpg" position={[w / 10, -h * 1.9, 0.5]} />
      <Item
        url="/images/logoutHome/7.jpg"
        position={[-w / 4, -h * 2.2, -0.1]}
      />
      <Item
        url="/images/logoutHome/8.jpg"
        position={[w / 12, -h * 2.5, -1.4]}
      />
      <Item url="/images/logoutHome/9.jpg" position={[-w / 7, -h * 2.8, 0.6]} />
    </group>
  );
};
