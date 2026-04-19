import { useState } from "react"
import HandWriting from "./HandWriting"
import "./WelcomeComp.css"
import WaitlistForm from "./WaitlistForm"

export default function WelcomeComp() {

  return (
    <div className="welcome grid grid-cols-2 gap-4">
      <div className="welcome-handwriting-animation flex items-center justify-center"> 
        <HandWriting />
      </div>
      <div className="waitlist-form col-span-1 flex flex-col justify-center">
        <WaitlistForm />
      </div>

    </div>  
  )
}