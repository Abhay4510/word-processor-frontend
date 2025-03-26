import { Link, useNavigate } from "react-router-dom"
import Header from "../components/Layout/Header"
import { useAuth } from "../hooks/useAuth"

const Home = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleGetStartedClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard")
    } else {
      navigate("/login")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              WordDrive: Your Personal Letter Companion
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Effortlessly create, manage, and save your letters directly to Google Drive.
              Write with confidence, organize with ease.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleGetStartedClick}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
              >
                Get Started
              </button>
              <a
                href="#features"
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/292119189/original/d18697dd52760012261d8c10237813afa5fd4d68/edit-create-design-format-and-type-microsoft-word-documents.jpg"
              alt="WordDrive Dashboard"
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>

        <section id="features" className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Features That Empower Your Writing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="text-4xl text-blue-600 mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-3">Seamless Writing</h3>
              <p className="text-gray-600">
                Intuitive text editor with powerful toolbar for formatting and styling your letters.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="text-4xl text-green-600 mb-4">☁️</div>
              <h3 className="text-xl font-semibold mb-3">Google Drive Integration</h3>
              <p className="text-gray-600">
                Automatically save and sync your letters directly to your Google Drive.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <div className="text-4xl text-purple-600 mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Easy Management</h3>
              <p className="text-gray-600">
                Track, organize, and manage all your letters from a single, intuitive dashboard.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Writing Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have simplified their letter writing and
            organization with WordDrive. Start your journey today!
          </p>
          <button
            onClick={handleGetStartedClick}
            className="px-10 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            Sign Up Now
          </button>
        </section>
      </div>
    </div>
  )
}

export default Home