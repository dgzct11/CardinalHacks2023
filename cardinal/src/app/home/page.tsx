// page.tsx

import Head from 'next/head';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>AI Medication Assistant</title>
      </Head>

      {/* Navbar */}
      <nav className="bg-gray-900 p-4 flex justify-between items-center">
        <span className="text-2xl text-white font-bold">Cardinal</span>
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
      <div id="about" className="p-8 bg-white">
        <h2 className="text-3xl font-bold mb-4 text-center">About Our App</h2>
        <p className="text-gray-600 text-lg text-center">Leveraging the capabilities of artificial intelligence, our app proactively identifies potential medication errors, ensuring the safety and well-being of patients everywhere.</p>
      </div>

      {/* Key Features/Benefits */}
      <div className="flex justify-around p-8 bg-gray-100">
        {/* Feature 1 */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full mb-4"></div>
          <h3 className="text-xl font-bold mb-2">Real-time Analysis</h3>
          <p className="text-center">Instantly evaluates prescriptions for potential errors.</p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full mb-4"></div>
          <h3 className="text-xl font-bold mb-2">Data-Driven Insights</h3>
          <p className="text-center">Empowers healthcare professionals with actionable insights.</p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full mb-4"></div>
          <h3 className="text-xl font-bold mb-2">Enhanced Safety</h3>
          <p className="text-center">Minimizes risks and improves patient safety standards.</p>
        </div>
      </div>

      {/* Call-To-Action (CTA) */}
      <div className="bg-gray-900 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Future of Patient Care</h2>
        <p className="text-xl mb-8">Get started with our app today and witness the change.</p>
        <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full transition duration-300">Get Started</button>
      </div>
    </div>
  );
}

export default HomePage;
