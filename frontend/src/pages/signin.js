import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError("");

    try {
      console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/login`, {
        email,
        password,
      });

      const data = response.data;

      if (!data.token || !data.user) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: data.user.id, // Ensure the ID is stored as a string
        name: data.user.name,
        email: data.user.email,
      }));
      localStorage.setItem("user_id", data.user._id);
      router.push('/');
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="signin-container">
      <h1 className="signin-title">Sign In</h1>
      {error && <p className="signin-error">{error}</p>}
      <form onSubmit={handleSignIn} className="signin-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <p className="register-link">
        Don&rsquo;t have an account? <Link href="/signup">Register</Link>
      </p>
    </div>
  );
}
