
export default function PricingCard({ title, price, features }) {

  return (
    <div className="mt-15 h-150 w-75 mx-auto px-4 bg-gray-100 rounded-lg shadow-md">
      <div className="-mx-4 bg-gray-500 px-4 py-2 rounded-t mb-6">
        <h2 className="pt-5 text-2xl font-bold mb-4">{title}</h2>
      </div>
      <div className="py-3 w-full h-15">
        <p className="text-lg text-gray-700 mb-6">
          {price}
        </p>
        <hr className="border-t-2 border-black my-4"></hr>
        <p className="text-lg text-gray-700 mb-6">
          {features}
        </p>
        <hr className="border-t-2 border-black my-4"></hr>
      </div>
      

        
    </div>
  );

}