import { engine } from '@dcl/sdk/ecs'

// We use this component to track and group all the cubes.
// engine.getEntitiesWith(Cube)
export const Cube = engine.defineComponent('cube-id', {})

export const JustGenerated = engine.defineComponent('just-generated-marker', {})
export const Generated = engine.defineComponent('generated-marker', {})
