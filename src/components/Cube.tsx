import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { useContext } from '../context/AppContext'

const Box = (props: ThreeElements['mesh']) => {
  const { size } = useContext()
  const mesh = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => (mesh.current.rotation.x += delta))
  return (
    <mesh {...props} ref={mesh} rotation={[-Math.PI / 1.2, 0, 0]}>
      <boxGeometry args={size} />
      <meshStandardMaterial color='royalblue' />
    </mesh>
  )
}

interface props {
  bufferGeometry: THREE.BufferGeometry
}
export default ({ xyz }: { xyz?: number[] }) => {
  const boxGeometry = new THREE.BufferGeometry()

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} />
    </Canvas>
  )
}
