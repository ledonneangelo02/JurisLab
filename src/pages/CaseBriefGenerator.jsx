import BriefGenerator from '../components/BriefGenerator'
export default function CaseBriefGenerator() {
  return (
    <div className="pt-20">
      <div className="text-center pt-5">
        <h1 className="text-4xl font-bold mb-4">Case Brief Generator</h1>
        <p className="text-lg text-gray-700">Generate concise case briefs with ease. Input your case details and let our tool do the rest.</p>
      </div>
     
      <BriefGenerator />
    </div>
  )
}