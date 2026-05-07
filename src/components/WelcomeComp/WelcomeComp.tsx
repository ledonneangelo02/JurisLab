import { useState } from "react"
import HandWriting from "./HandWriting"
import "./WelcomeComp.css"
import WaitlistForm from "./WaitlistForm"

export default function WelcomeComp() {

  return (
    <div className="welcome-container flex flex-col w-full justify-center">
        <div className="flex items-center gap-4">
          <div className="handwriting-container flex-1">
            <h2>Filler</h2>
          </div>
          <div className="description-container flex-1">
            <h1>Another</h1>
          </div>
        </div>
      <hr className="w-48 h-1 mx-auto my-4 bg-neutral-quaternary border-3 rounded-sm md:my-10 "/>
      <div className="waitlist-form container">
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
      <hr className="w-48 h-1 mx-auto my-4 bg-neutral-quaternary border-3 rounded-sm md:my-10"/>
    </div>
  )
}