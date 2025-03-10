"use client"

/* eslint-disable react/no-unknown-property */
import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Preload, Center } from "@react-three/drei"
import * as THREE from "three"
import { useNavigate } from "react-router-dom"

const Model = () => {
  const { scene } = useGLTF("/models/scene.gltf")
  const modelRef = useRef()

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.side = THREE.DoubleSide
    }
  })

  return (
    <Center>
      <primitive
        ref={modelRef}
        object={scene}
        scale={[10, 10, 10]}
        position={[-1, 0, 0]}
      />
    </Center>
  )
}

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ffffff", 
      }}
    >
      <Canvas
        camera={{ position: [10, 8, 20], fov: 50 }}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[0, 10, 10]} intensity={1.2} />
        <Model />
        <OrbitControls enableZoom={true} />
        <Preload all />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: "37%",
          left: "4%",
          transform: "translate(0, -50%)",
          width: "350px",
          padding: "30px",
          color: "white", 
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, marginBottom: "1rem" }}>
          Welcome to my portfolio web!
        </h1>
        <p style={{ fontSize: "1.2rem", margin: 0, marginBottom: "1.5rem" }}>
          Explore my projects and skills
        </p>
        <button
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "12px 24px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1.1rem",
          }}
          onClick={() => navigate("/home")}
        >
          Learn More
        </button>
      </div>
    </div>
  )
}

export default LandingPage
