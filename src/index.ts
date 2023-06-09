import { engine, executeTask, Material, Transform } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import { createCube } from './factory'
import { bounceScalingSystem, circularSystem, myLogic, spawnerSystem } from './systems'
import { setupUi } from './ui'

// Defining behavior. See `src/systems.ts` file.
// engine.addSystem(circularSystem)
// engine.addSystem(spawnerSystem)
// engine.addSystem(bounceScalingSystem)

export const parent = engine.addEntity();
Transform.create(parent, { position: { x: 8, y: 0, z: 8 } })
// engine.addSystem(myLogic)

export function main() {
  setupUi()

  // Create my main cube and color it.
  const cube = createCube(15, 1, 1)
  Material.setPbrMaterial(cube, { albedoColor: Color4.create(1.0, 0.85, 0.42) })
}
