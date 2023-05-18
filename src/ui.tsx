import { engine, Material, Transform } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, ReactEcsRenderer, UiEntity, Input } from '@dcl/sdk/react-ecs'
import { createShape } from './factory'
import { promptOpenAI } from './openAI'

let userInput = ''

const handleInputChange = (prompt: string) => {
  userInput = prompt
}

const handleSubmitPrompt = async () => {
  const response = await promptOpenAI(userInput)
  response.shapes.forEach((shape) => {
    try {
      const createdShape = createShape(shape.shape, shape.position)
      Material.setPbrMaterial(createdShape, { albedoColor: Color4.create(1.0, 0.85, 0.42) })
    } catch (error) {
      console.log('error: ', error)
    }
  })
}

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: 600,
      height: 300,
      margin: '16px 0 8px 300px',
      padding: 4
    }}
    uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
  >
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      uiBackground={{ color: Color4.fromHexString('#70ac76ff') }}
    >
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 50,
          margin: '8px 0'
        }}
        uiBackground={{
          textureMode: 'center',
          texture: {
            src: 'images/scene-thumbnail.png'
          }
        }}
        uiText={{ value: 'SDK7', fontSize: 18 }}
      />
      <Input
        fontSize={20}
        onChange={handleInputChange}
        uiTransform={{ width: '100%', margin: 30, padding: 20 }}
        placeholder="Ask here what you want..."
      />
      <Button
        uiTransform={{ width: 150, height: 40, margin: 8 }}
        value="Generate Scene"
        variant="primary"
        fontSize={14}
        onMouseDown={handleSubmitPrompt}
        // onMouseDown={() => {
        //   createCube(1 + Math.random() * 8, Math.random() * 8, 1 + Math.random() * 8, false)
        // }}
      />
      {/* <Label
        onMouseDown={() => {
          console.log('Player Position clicked !')
        }}
        value={`Player: ${getPlayerPosition()}`}
        fontSize={18}
        uiTransform={{ width: '100%', height: 30 }}
      />
      <Label
        onMouseDown={() => {
          console.log('# Cubes clicked !')
        }}
        value={`# Cubes: ${[...engine.getEntitiesWith(Cube)].length}`}
        fontSize={18}
        uiTransform={{ width: '100%', height: 30 }}
      />
      <Button
        uiTransform={{ width: 100, height: 40, margin: 8 }}
        value="Spawn cube"
        variant="primary"
        fontSize={14}
        onMouseDown={() => {
          createCube(1 + Math.random() * 8, Math.random() * 8, 1 + Math.random() * 8, false)
        }}
      /> */}
    </UiEntity>
  </UiEntity>
)

function getPlayerPosition() {
  const playerPosition = Transform.getOrNull(engine.PlayerEntity)
  if (!playerPosition) return ' no data yet'
  const { x, y, z } = playerPosition.position
  return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
}

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}
