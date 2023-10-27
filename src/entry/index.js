//引入three.js
import * as THREE from "three"

// 引入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 创建场景、摄像机、渲染器、轨道控制器、全局变量
let scene, camera, renderer, controls

//获取渲染的dom节点
const app = document.querySelector(".app")

//初始化场景和摄像机
function init() {
    //创建场景
    scene = new THREE.Scene()
    //创建摄像机
    camera = new THREE.PerspectiveCamera(75, app.clientWidth / app.clientHeight, 0.1, 1000)
    //设置摄像机位置
    camera.position.z = 5

    //创建渲染器
    renderer = new THREE.WebGLRenderer({
        //开启抗矩尺
        antialias: true
    })

    //渲染器显示阴影贴图
    renderer.shadowMap.enabled = true

    //设置渲染器画布
    renderer.setSize(app.clientWidth, app.clientHeight)

    //添加到DOM的节点中
    app.appendChild(renderer.domElement)
}


//初始化轨道控制器
function createControls() {
    //创建轨道控制器
    controls = new OrbitControls(camera, renderer.domElement)
}

//初始化坐标轴
function createHelper() {
    //创建坐标轴
    const axesHelper = new THREE.AxesHelper(5)
    //将坐标添加到场景
    scene.add(axesHelper)
}

//场景适配
function resizeRender() {
    //监听浏览器的变化
    window.addEventListener("resize", () => {
        //设置渲染器画布的大小，随着浏览器的变化而变化
        renderer.setSize(app.clientWidth, app.clientHeight)
        // 设置摄像机的宽高比, 让它随着浏览器的变化而变化
        camera.aspect = app.clientWidth / app.clientHeight
        // 更新物体的锥体空间, 让它随着浏览器的变化而变化
        camera.updateProjectionMatrix()
    })
}

//循环渲染
function renderLoop() {
    // 将场景与摄像机渲染到画布上
    renderer.render(scene, camera)
    //手动更新场景
    controls.update()
    //循环渲染
    requestAnimationFrame(renderLoop)
}

//开始的方法
function start(){
    init()
    createControls()
    createHelper()
    resizeRender()
    renderLoop()
}

//调用开始的方法
start()