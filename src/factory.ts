import {
  Entity,
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  PointerEvents,
  PointerEventType,
  InputAction,
  Material
} from '@dcl/sdk/ecs'
import { Cube } from './components'
import { Color4 } from '@dcl/ecs-math'
import { GeneratedShape } from './openAI'

export enum Shape {
  CUBE = 'cube',
  SPHERE = 'sphere',
  CYLINDER = 'cylinder',
  PLANE = 'PLANE'
}

// Shape factory
export function createShape(shape: GeneratedShape, spawner = true): Entity {
  // export function createShape(shape: Shape, position: { x: number; y: number; z: number }, spawner = true): Entity {
  const meshEntity = engine.addEntity()

  // Used to track the cubes
  Cube.create(meshEntity)

  Transform.create(meshEntity, { position: shape.position })
  // set how the cube looks and collides
  switch (shape.shape) {
    case Shape.CUBE:
      MeshRenderer.setBox(meshEntity)
      MeshCollider.setBox(meshEntity)
      break
    case Shape.SPHERE:
      MeshRenderer.setSphere(meshEntity)
      MeshCollider.setSphere(meshEntity)
      break
    case Shape.CYLINDER:
      MeshRenderer.setCylinder(meshEntity)
      MeshCollider.setCylinder(meshEntity)

      if (shape.scale) {
        Transform.createOrReplace(meshEntity, { scale: { x: 0, y: 10, z: 0 } })
      }
      if (shape.rotation) {
        Transform.createOrReplace(meshEntity, { rotation: { ...shape.rotation, w: 0 } })
      }

      // apply rotation
      // apply color
      // apply

      break
    case Shape.PLANE:
      MeshRenderer.setPlane(meshEntity)
      MeshCollider.setPlane(meshEntity)

      break
  }

  // set the color
  Material.setPbrMaterial(meshEntity, { albedoColor: Color4.create(1.0, 0.85, 0.42) })

  // if it is a spawner, then we set the pointer hover feedback
  if (spawner) {
    PointerEvents.create(meshEntity, {
      pointerEvents: [
        {
          eventType: PointerEventType.PET_DOWN,
          eventInfo: {
            button: InputAction.IA_PRIMARY,
            hoverText: 'Press E to spawn',
            maxDistance: 100,
            showFeedback: true
          }
        }
      ]
    })
  }

  return meshEntity
}

// Cube factory
export function createCube(x: number, y: number, z: number, spawner = true): Entity {
  const meshEntity = engine.addEntity()

  // Used to track the cubes
  Cube.create(meshEntity)

  Transform.create(meshEntity, { position: { x, y, z } })
  // set how the cube looks and collides
  MeshRenderer.setBox(meshEntity)
  MeshCollider.setBox(meshEntity)

  // if it is a spawner, then we set the pointer hover feedback
  if (spawner) {
    PointerEvents.create(meshEntity, {
      pointerEvents: [
        {
          eventType: PointerEventType.PET_DOWN,
          eventInfo: {
            button: InputAction.IA_PRIMARY,
            hoverText: 'Press E to spawn',
            maxDistance: 100,
            showFeedback: true
          }
        }
      ]
    })
  }

  return meshEntity
}
