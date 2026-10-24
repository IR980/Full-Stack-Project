import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {loading, handleLogin} = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const nevigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin({email, password})
    nevigate('/')
    // Add your login API integration here
  }

  if(loading){
    return (<main><h1>Loading...</h1></main>)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-100 via-white to-purple-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/60 bg-white p-8 shadow-2xl sm:p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-lg shadow-indigo-200">
            L
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <a
                href="/forgot-password"
                className="text-sm font-medium text-indigo-600 transition hover:text-indigo-800"
              >
                Forgot password?
              </a>
            </div>

            <div className="relative">
              <input  
                onChange={(e) => {setPassword(e.target.value)}}
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-20 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 text-sm font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-indigo-600"
            />

            <label
              htmlFor="remember"
              className="cursor-pointer text-sm text-gray-600"
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className=" cursor-pointer w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 active:translate-y-0"
          >
            Sign In →
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a
            href="/register"
            className="font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            Create account
          </a>
        </p>
      </div>
    </main>
  )
}

export default Login