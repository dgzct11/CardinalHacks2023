// page.tsx

import Head from 'next/head';
import Link from 'next/link';
import { FaClock, FaChartBar, FaShieldAlt } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="font-sans bg-gray-100">
      <Head>
        <title>AI Medication Assistant</title>
      </Head>

      {/* Navbar */}
      <nav className="bg-white p-4 flex justify-between items-center shadow-md">
        <span className="text-2xl text-black font-bold">Cardinal</span>
        <Link href="/api/auth/login">
        <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition duration-300">Login</button>
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="bg-gray-900 h-screen flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold mb-4">Revolutionizing Patient Care</h1>
        <p className="text-xl mb-8">Reducing medication errors with the power of AI.</p>
        <a href="#about" className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full transition duration-300">Learn More</a>
      </div>

      {/* Brief Introduction */}
      <div id="about" className="p-8 bg-white text-gray-600">
        <h2 className="text-3xl font-bold mt-4 mb-4 text-center">About Our App</h2>
        <p className="text-xl text-lg text-center mb-4 max-w-2xl mx-auto">Leveraging the capabilities of artificial intelligence, our app proactively identifies potential medication errors, ensuring the safety and well-being of patients everywhere.</p>
      </div>

      {/* Key Features/Benefits */}
      <div className="flex justify-around p-8 bg-blue-300">
        {/* Feature 1 */}
        <div className="flex flex-col items-center mt- 4 mb-4 space-y-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full mb-4 flex items-center justify-center">
            <FaClock size={32} className="text-white"/>
          </div>
          <h3 className="text-xl font-bold">Real-time Analysis</h3>
          <p className="text-center">Instantly evaluates prescriptions<br/> for potential errors.</p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center mb-4 space-y-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full mb-4 flex items-center justify-center">
            <FaChartBar size={32} className="text-white"/>
          </div>
          <h3 className="text-xl font-bold">Data-Driven Insights</h3>
          <p className="text-center">Empowers healthcare professionals<br/> with actionable insights.</p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center mb-4 space-y-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full mb-4 flex items-center justify-center">
            <FaShieldAlt size={32} className="text-white"/>
          </div>
          <h3 className="text-xl font-bold">Enhanced Safety</h3>
          <p className="text-center">Minimizes risks and improves<br/> patient safety standards.</p>
        </div>
      </div>

      {/* Call-To-Action (CTA) */}
      <div className="bg-gray-900 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Future of Patient Care</h2>
        <p className="text-xl mb-8">Get started with our app today and witness the change.</p>
        <button className="bg-transparent border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-full transition duration-300 hover:bg-blue-500 hover:text-white">Get Started</button>
      </div>
    </div>
  );
}

export default HomePage;
