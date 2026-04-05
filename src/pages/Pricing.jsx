import PricingCard from '../components/PricingCard'

export default function Pricing() {
  return (
    <div className="pt-20 text-center">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard
          title="Free Plan"
          price="Free"
          features="Access to basic legal research tools, 10 document analysis credits per month, and community support."
        />

        <PricingCard
          title="Basic Plan"
          price="$9.99/month"
          features="Access to basic legal research tools, 100 document analysis credits per month, and email support."
        />

        <PricingCard
          title="Pro Plan"
          price="$29.99/month"
          features="Includes all Basic features plus 500 document analysis credits per month, priority email support, and access to advanced analytics tools."
        />
      </div>
      <hr className=" mt-5 border-t-4 border-dashed border-black" />
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold mb-4">Compare Plans</h2>
        <p className="text-lg text-gray-700 mb-6">
          Choose the plan that best fits your needs. Whether you're a student, legal professional, or researcher, we have a plan for you.
        </p>
        <table className="bg-white w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Feature</th>
              <th className="border border-gray-300 px-4 py-2">Free Plan</th>
              <th className="border border-gray-300 px-4 py-2">Basic Plan</th>
              <th className="border border-gray-300 px-4 py-2">Pro Plan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Document Analysis Credits</td>
              <td className="border border-gray-300 px-4 py-2">10/month</td>
              <td className="border border-gray-300 px-4 py-2">100/month</td>
              <td className="border border-gray-300 px-4 py-2">500/month</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Support</td>
              <td className="border border-gray-300 px-4 py-2">Community Support</td>
              <td className="border border-gray-300 px-4 py-2">Email Support</td>
              <td className="border border-gray-300 px-4 py-2">Priority Email Support</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Advanced Analytics Tools</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">Yes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

