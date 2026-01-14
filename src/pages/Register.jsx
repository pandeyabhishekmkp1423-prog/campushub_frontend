export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-600 to-teal-600">
      <form className="bg-white p-10 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Student Registration
        </h2>

        <input className="w-full mb-4 px-4 py-3 border rounded-lg" placeholder="Full Name" />
        <input className="w-full mb-4 px-4 py-3 border rounded-lg" placeholder="Email" />
        <input type="password" className="w-full mb-6 px-4 py-3 border rounded-lg" placeholder="Password" />

        <button className="w-full bg-violet-600 text-white py-3 rounded-lg font-semibold hover:bg-violet-700">
          Create Account
        </button>
      </form>
    </div>
  );
}
