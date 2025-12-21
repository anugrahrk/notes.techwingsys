import { Card } from './ui/card'
import { Input } from './ui/input'
import CardOutlineDemo from './searchcard'

function Searchcomponent() {
  return (
    <Card className='max-w-4xl max-h-4xl p-3'>
        <Input/>
        <CardOutlineDemo/>
    </Card>
  )
}

export default Searchcomponent