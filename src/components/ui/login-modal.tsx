// src/components/ui/login-modal.tsx
import React, { useState } from "react";
import { auth } from "@/firebase/firebase";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // optional for email signup
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // Manual signup
  const handleEmailSignup = async () => {
    if (!name || !email || !password) {
      toast({ title: "Error", description: "Please fill in all fields" });
      return;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      toast({ title: "Signup successful", description: `Welcome, ${name}!` });
      onClose();
    } catch (error) {
      toast({ title: "Signup failed", description: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  // Google signup
  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({ title: "Welcome!", description: "Signed in with Google" });
      onClose();
    } catch (error) {
      toast({ title: "Google sign-in failed", description: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Get Started</h2>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Manual Signup */}
        <button
          onClick={handleEmailSignup}
          disabled={loading}
          className="bg-eco-primary text-white w-full p-2 rounded mb-3 hover:bg-eco-primary-dark"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {/* Divider */}
        <div className="text-center text-gray-500 my-2">OR</div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="border border-gray-300 w-full p-2 rounded flex items-center justify-center hover:bg-gray-100"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
          Sign up with Google
        </button>

        {/* Close */}
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 text-sm hover:underline w-full text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
