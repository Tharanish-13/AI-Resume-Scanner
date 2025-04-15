import { useState } from "react";
import { useRouter } from "next/router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json(); // ✅ Only call once

    if (!response.ok) {
      throw new Error(result.detail || result.error || "Failed to register");
    }
      console.log("Signup successful:", result);
      alert("Signup successful!");
      // After successful signup response
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">Sign Up</h2>
      <form onSubmit={handleSignUp} className="signin-form">
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUp;
