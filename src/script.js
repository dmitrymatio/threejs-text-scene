import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
const matcapTexture2 = textureLoader.load('/textures/matcaps/1.png')
const matcapTexture3 = textureLoader.load('/textures/matcaps/8.png')

/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader()

fontLoader.load(
    '/fonts/optimer_regular.typeface.json',
    (font) => {
        const textGeometry = new THREE.TextGeometry(
            'Dmitry Matiouchenko', {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )

        const textGeometry2 = new THREE.TextGeometry(
            'Hire this guy ;)', {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.computeBoundingBox()
        textGeometry2.computeBoundingBox()

        textGeometry.center()
        textGeometry2.translate(-textGeometry.boundingBox.max.x, 0, 0)
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        const material2 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 })
        const material3 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture3 })

        const text = new THREE.Mesh(textGeometry, material)
        const text2 = new THREE.Mesh(textGeometry2, material)
        scene.add(text, text2)
        text2.position.y = 1
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

        for (let i = 0; i < 100; i++) {
            const donut = new THREE.Mesh(donutGeometry, material3)
            scene.add(donut)
            donut.position.x = (Math.random() - 0.5) * 15
            donut.position.y = (Math.random() - 0.5) * 15
            donut.position.z = (Math.random() - 0.5) * 15
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            donut.scale.set(scale, scale, scale)
        }

        const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 1, 1)

        for (let i = 0; i < 100; i++) {
            const donut = new THREE.Mesh(boxGeometry, material2)
            scene.add(donut)
            donut.position.x = (Math.random() - 0.5) * 15
            donut.position.y = (Math.random() - 0.5) * 15
            donut.position.z = (Math.random() - 0.5) * 15
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            donut.scale.set(scale, scale, scale)
        }



        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        window.addEventListener('resize', () => {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            // Update renderer
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.x = 1
        camera.position.y = 1
        camera.position.z = 2
        scene.add(camera)

        // Controls
        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true

        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        /**
         * Animate
         */
        const clock = new THREE.Clock()

        const tick = () => {
            const elapsedTime = clock.getElapsedTime()

            // Update controls
            controls.update()
                // Update objects
            camera.position.x = Math.cos(elapsedTime)
            camera.position.y = Math.sin(elapsedTime)
            camera.lookAt(text.position)

            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()
    }
)