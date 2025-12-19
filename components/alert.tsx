import { AlertCircleIcon } from "lucide-react"

import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"

export default function AlertDemo({message,err}:{message:string,err:boolean}) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert variant="destructive">
       {err&&<AlertCircleIcon />}
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    </div>
  )
}
