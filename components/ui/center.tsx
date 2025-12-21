import { BackgroundRippleEffect } from "./background-ripple-effect";

export default function Center({children}:{children:React.ReactNode}){
    return(
        <div className="flex justify-center h-screen items-center">
            <BackgroundRippleEffect className="no-print"/>
            <div className="w-full h-full flex justify-center items-center z-10">
                {children}
            </div>
            
        </div>
    )
}