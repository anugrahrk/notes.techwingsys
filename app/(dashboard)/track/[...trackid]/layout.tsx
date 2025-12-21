import { authOptions } from '@/app/lib/auth'
import { Footer } from '@/components/footer'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'


const layout = async({children,params}:{children:React.ReactNode,params:Promise<{trackid:string[]}>}) => {
  const slug=(await params).trackid[0]
  const session=await getServerSession(authOptions)
      if(!session?.user){
              redirect('/login')
      }
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
