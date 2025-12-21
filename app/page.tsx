import { redirect } from "next/navigation";

export default async function Page(){
        // const session=await getServerSession(authOptions)
        // if(session?.user){
                redirect("/dashboard")
        // }
        // else{
        //         redirect('/login')
        // }
        
}