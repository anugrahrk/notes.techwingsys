import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const CardOutlineDemo = () => {
  return (
    <Card className='border-primary max-w-md gap-0 bg-transparent shadow-none'>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        Description
      </CardContent>
    </Card>
  )
}

export default CardOutlineDemo
