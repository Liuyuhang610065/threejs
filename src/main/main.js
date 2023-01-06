import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// console.log(THREE)
import gsap from 'gsap'
import * as dat from 'dat.gui'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight, 
    0.1, 
    1000
)

camera.position.set(0, 0, 10)
scene.add(camera)

// 纹理
const textureLoader = new THREE.TextureLoader()
const door = textureLoader.load('./textures/a.jpg')

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// 材质
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    map: door
})


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
controls.enableDamping = true // 阻尼

// 添加坐标轴辅助器
const axes = new THREE.AxesHelper(5)
scene.add(axes)

// 修改物体位置
cube.position.set(0, 0, 0)
cube.position.y = 5

// 缩放
cube.scale.set(1, 0.5, 2)

// 旋转
cube.rotation.set(Math.PI / 4, 0, 0)

// 时钟
const clock = new THREE.Clock()

// 设置动画
// var animation = gsap.to(cube.position, {
//     x:5, 
//     duration:5, 
//     ease:'power1.inOut', 
//     onComplete:() => {
        
//     },
//     onStart: () => {

//     },
//     repeat: 2, // -1无限循环，
//     yoyo: true, // 往返
//     delay: 2, //延迟
// })

// 动画控制
// window.addEventListener('dblclick', ()=>{
//     if(animation.isActive()){
//         animation.pause()
//     } else {
//         animation.resume()
//     }
// })

// 监听画面变化
window.addEventListener("resize", ()=>{
    // 更新宽高比
    camera.aspect = window.innerWidth / window.innerHeight
    // 更新投影矩阵
    camera.updateProjectionMatrix()
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 设置像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})

// 控制全屏
// renderer.domElement.requestFullscreen()
// document.exitFullscreen()

function render() {
    // let t = time/1000 % 5
    // cube.position.x = 1*t
    // cube.rotateX(1*t)

    // let time = clock.getElapsedTime()
    // let deltaTime = clock.getDelta()
    // cube.position.x = time % 5
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render()


// gui控制
const gui = new dat.GUI()
gui
    .add(cube.position, 'x')
    .min(0)
    .max(5)
    .step(0.01)
    .name('移动x轴')
    .onChange()
    .onFinishChange()
const params = {
    color: '#ffff00',
    fn: () => {
        gsap.to(cube.position, {x:5, duration:2, yoyo:true})
    }
}
// 控制颜色
gui.addColor(params, 'color').onChange((value) => {
    cube.material.color.set(value)
})
// 控制显示
gui.add(cube, 'visible')
// 触发事件
gui.add(params, 'fn').name('运动')
// 文件夹
var folder = gui.addFolder('设置')
folder.add(cube.material, 'wireframe')

// 顶点创建几何体
// const geometry = new THREE.BufferGeometry()
// const vertrices = new Float32Array([
//     -1.0, -1.0, 1.0,
//     1.0, -1.0, 1.0,
//     1.0, 1.0, 1.0,
//     1.0, 1.0, 1.0,
//     -1.0, 1.0, 1.0,
//     -1.0, -1.0, 1.0
// ])
// geometry.setAttribute('position', new THREE.BufferAttribute(vertrices, 3))
// const material = new THREE.MeshBasicMaterial({color: 0xffff00})
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)


// 爆炸
for(let i=0; i<50; i++){
    const geometry = new THREE.BufferGeometry()
    const positionArray = new Float32Array(9)
    for(let j=0; j<9; j++){
        positionArray[j] = Math.random() * 10 - 5
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
    let color = new THREE.Color(Math.random(), Math.random(), Math.random())
    const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
}

