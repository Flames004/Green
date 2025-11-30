import { ArrowRight } from 'lucide-react'

const Login = () => {
  return (
     <main className=" bg-sage-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-8">
            <h1 className="text-2xl font-semibold text-sage-900 mb-2 text-center">Create Account</h1>
            <p className="text-center text-sage-700 mb-8 text-sm">Join Greenland and start shopping plants & pots</p>

            <form className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-sage-900">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <input
                    id="phone"
                    type="number"
                    placeholder="+91 0000000000"
                    className="flex-1 px-4 py-3 rounded-lg border border-sage-200 bg-sage-50 text-sage-900 placeholder-sage-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition disabled:opacity-60"
                    required
                  />
                  <button
                    type="button"
                    className="px-2 lg:px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition disabled:opacity-60 whitespace-nowrap"
                  >
                    OTP
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="otp" className="block text-sm font-medium text-sage-900">
                  OTP Code
                </label>
                <input
                  id="otp"
                  type="number"
                  placeholder="000000"
                  className="w-full px-4 py-3 rounded-lg border border-sage-200 bg-sage-50 text-sage-900 placeholder-sage-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition text-center text-2xl tracking-widest font-mono disabled:opacity-60"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-70"
              >
                Login

                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-sage-700 mt-6">
            By signing up, you agree to our Terms & Conditions and Privacy Policy
          </p>
        </div>
      </main>
  )
}

export default Login