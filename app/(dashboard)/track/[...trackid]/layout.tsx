import { Footer } from '@/components/footer'
import React from 'react'

const layout = async({children,params}:{children:React.ReactNode,params:Promise<{trackid:string}>}) => {
  const slug=(await params).trackid[0]
  return (
    <div>
        {children}
        <div className=' fixed bottom-3 left-3'>
            <Footer slug={slug}/>
            </div>
    </div>
  )
}

export default layout
