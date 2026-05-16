import BriefGenerator from '../components/CaseBriefGenerator/BriefGenerator.js'
export default function CaseBriefGenerator() {
  return (
    <div className="pt-20">
      <div className="generate-brief-hero text-center pt-5">
        <span className="thumb-tack thumb-tack-top-left" aria-hidden="true" />
        <span className="thumb-tack thumb-tack-top-right" aria-hidden="true" />
        <span className="thumb-tack thumb-tack-bottom-left" aria-hidden="true" />
        <span className="thumb-tack thumb-tack-bottom-right" aria-hidden="true" />
        <h1 className="text-4xl font-bold mb-4">Case Brief Generator</h1>
        <p className="w-120 mx-auto text-lg text-gray-700">Generate concise case briefs with ease. Input your case details and let our tool do the rest.</p>
      </div>
      
      <BriefGenerator />
    </div>
  )
}