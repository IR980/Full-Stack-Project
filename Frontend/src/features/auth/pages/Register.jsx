import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {loading, handleRegister} = useAuth()
  const nevigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const confirmPassword = formData.get('confirmPassword')

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    await handleRegister({username, email, password})
    nevigate('/')
  }

  if(loading){
    return (
      <main><h1>Register pafhe</h1></main>
    )
  } 


  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-100 via-white to-purple-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/60 bg-white p-8 shadow-2xl sm:p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-lg shadow-indigo-200">
            R
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Join us today! Enter your details below.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Username
            </label>

            <input
              onChange={(e) => {setUsername(e.target.value)}}
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              autoComplete="username"
              minLength={3}
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>

            <input
              onChange={(e) => {setEmail(e.target.value)}}
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                onChange={(e) => {setPassword(e.target.value)}}
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Create a strong password"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-20 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <p className="mt-1.5 text-xs text-gray-500">
              Use at least 8 characters.
            </p>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-20 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute inset-y-0 right-3 text-sm font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                aria-label={
                  showConfirmPassword ? 'Hide password' : 'Show password'
                }
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 active:translate-y-0"
          >
            Create Account →
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a
            href="/login"
            className="font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            Sign in
          </a>
        </p>
      </div>
    </main>
  )
}

export default Register