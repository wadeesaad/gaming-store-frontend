
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post(
        "/Auth/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "username",
        response.data.username
      );

      navigate("/dashboard");
    } catch (error) {
      setError(
        "Invalid username or password"
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Gaming Store
        </h1>

        <h2 className="text-xl text-white text-center mb-6">
          Login
        </h2>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label className="block text-gray-300 mb-2">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-lg transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;

