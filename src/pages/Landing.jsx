import { FaCreditCard, FaMagic, FaShoppingCart, FaMobileAlt, FaLink, FaIdCard, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Landing() {
  const steps = [
    { id: 1, title: "Design Your Card", icon: <FaMagic />, description: "Choose a plain color, select a predefined design, or upload your own." },
    { id: 2, title: "Select Response Type", icon: <FaLink />, description: "Choose between VCard, link list, shop information, or resume." },
    { id: 3, title: "Payment & Delivery", icon: <FaShoppingCart />, description: "Secure payment and fast delivery to your address." }
  ];
  
  return (
    <div className="bg-white min-h-screen text-gray-800 p-6 flex flex-col items-center">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Create & Share Your NFC Business Card Instantly!
        </h2>
        <p className="mt-4 text-gray-600">
          Tapster makes it easy to design and share your digital business card with a single tap.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white font-medium px-6 py-3 rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-gray-200 text-blue-600 font-medium px-6 py-3 rounded hover:bg-gray-300"
          >
            Register
          </Link>
        </div>
      </main>
      
      {/* Header */}
      <h1 className="text-3xl font-bold mt-6 text-blue-600">Welcome to Tapster</h1>
      <p className="text-lg mt-2 text-center text-gray-600">Create your NFC-powered digital business card in minutes.</p>
      
      {/* Steps */}
      <div className="mt-10 w-full max-w-md">
        {steps.map((step) => (
          <div key={step.id} className="p-4 mb-4 rounded-lg shadow-md bg-gray-100">
            <div className="flex items-center">
              <div className="text-2xl text-blue-600 mr-4">{step.icon}</div>
              <div>
                <h2 className="text-xl font-semibold">{step.title}</h2>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* CTA */}
      <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-md hover:bg-blue-700">
        Get Your NFC Card Now
      </button>
      
      {/* How it Works */}
      <div className="mt-10 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600">How It Works</h2>
        <p className="text-center mt-2 text-gray-600">Tapster uses NFC technology to store your details, making sharing effortless.</p>
        <div className="flex flex-wrap justify-center mt-6 space-x-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md w-32 mb-4 text-center">
            <FaIdCard className="text-3xl text-blue-600 mx-auto" />
            <p className="mt-2 text-sm text-gray-600">NFC Business Card</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md w-32 mb-4 text-center">
            <FaUser className="text-3xl text-blue-600 mx-auto" />
            <p className="mt-2 text-sm text-gray-600">Share Instantly</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md w-32 mb-4 text-center">
            <FaMobileAlt className="text-3xl text-blue-600 mx-auto" />
            <p className="mt-2 text-sm text-gray-600">Tap & Connect</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 w-full bg-gray-100 py-6 text-center">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} Tapster. All Rights Reserved.</p>
        <div className="mt-2 text-sm text-gray-500">
          <Link to="/privacy" className="hover:underline mx-2">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline mx-2">Terms of Service</Link>
          <Link to="/contact" className="hover:underline mx-2">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
}
