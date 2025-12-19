import { authOptions } from "@/app/lib/auth"
import { Trackpage } from "@/components/trackpage"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

// interface Pageparams{
//   params:Promise<{trackid:string}>
// }

async function page() {
  const session=await getServerSession(authOptions)
  // const trackid=await params

        if(!session?.user){
          redirect('/login')
        }
  return (
    <div><Trackpage content={"hello"}/></div>
  )
}

export default page