import { useState } from "react"
import HandWriting from "./HandWriting"
import "./WelcomeComp.css"
import WaitlistForm from "./WaitlistForm"

export default function WelcomeComp() {

  return (
    <div className="welcome-container flex flex-col items-center">
      <div className="waitlist-form">
        <WaitlistForm />
      </div>
      <hr className="w-48 h-1 mx-auto my-4 bg-neutral-quaternary border-3 rounded-sm md:my-10"/>
      <div className="m-10">
        <div className="grid grid-cols-3">
          <h1 className="col-span-1 flex flex-col text-3xl font-bold ">
            JurisSuite Case Briefing
          </h1>
                  
        </div>
        
      </div>
    </div>
  )
}