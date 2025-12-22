
import { Button } from './ui/button'

export const Footer = ({slug}:{slug:string}) => {
  return (
        <div className='no-print z-100 relative bottom-0 left-0 max-w-fit bg-white flex justify-start gap-2 p-2 border border-gray-200 rounded-lg backdrop:backdrop-blur-md'><a href={`/api/pdf?slug=${slug}`}><Button className='cursor-pointer'>download PDF</Button></a></div>
  )
}
