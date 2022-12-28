import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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
// 将渲染内容添加到body
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)


// 添加坐标轴辅助器
const axes = new THREE.AxesHelper(5)
scene.add(axes)

function render() {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render()