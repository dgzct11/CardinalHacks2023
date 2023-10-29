import Head from 'next/head'

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Head>
        <title>My Medical App</title>
        <meta name="description" content="Manage your medical history and medication" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl mb-4 font-semibold text-gray-700">Welcome to My Medical App</h1>
        <p className="text-gray-600 mb-6">Your one-stop solution for medical history and medication management.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200">
          Login
        </button>
      </div>
    </div>
  )
}
