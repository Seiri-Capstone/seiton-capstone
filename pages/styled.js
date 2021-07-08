import Button from '../components/styled/Button'
import Card from '../components/styled/Card'

import { tw } from 'twind'

const Styled = () => {
  return (
    <div>
      <h1>Styled</h1>
      <div className={tw`flex bg-gray-200`}>
        <Button>Normal Button</Button>
        <Button variant="warning">Warning</Button>
        <Button round disabled>
          Round, Disabled
        </Button>
        <Button className={tw`bg-red-200 text-green-700`} size="xl">
          Overwritten
        </Button>
      </div>
      <div className={tw`flex bg-gray-200`}>
        <Card title="Hello">
          <div>Hello World!</div>
          <Button>Hello!</Button>
        </Card>
      </div>
    </div>
  )
}

export default Styled
