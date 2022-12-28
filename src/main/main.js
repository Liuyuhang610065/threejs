import * as THREE from 'three'

// console.log(THREE)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight, 
    0.1, 
    1000
)

camera.position.set(0, 0, 10)
scene.add(camera)

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00})

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

scene.add(cube)
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)


