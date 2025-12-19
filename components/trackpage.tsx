
import { Footer } from './footer'

export const Trackpage = ({content}:{content:string}) => {
  return (
    <div className='w-full min-h-screen relative'>
    <div className=' flex justify-center p-3'>
        <div className=''>{content}</div>
    </div>
    <div className=' fixed bottom-3 left-3'>
    <Footer/>
    </div>
    
    </div>
    
  )
}
