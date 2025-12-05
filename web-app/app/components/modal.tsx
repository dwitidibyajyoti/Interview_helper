// components/modal.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Modal() {
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setMessage("Submitting...");

    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, price, currency }),
      });

      if (res.ok) {
        setMessage("Thank you! You're now on the early-access list.");
        setEmail("");
        setPrice("");
        setCurrency("USD");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    router.push("/");
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 animate-fadeIn"
      onClick={handleClose}
    >
      <div 
        className="bg-[#0d1117] border border-white/10 rounded-xl w-full max-w-md p-6 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Join the Early Access List
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-300 block mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#00ff9d] focus:border-transparent"
              placeholder="you@example.com"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 block mb-1">
              What pricing feels fair to you? (in {currency})
            </label>
            <div className="flex gap-2">
              <span className="flex items-center px-3 py-2 bg-black/40 border border-white/10 border-r-0 rounded-l-md text-gray-400">
                {currency === "USD" && "$"}
                {currency === "EUR" && "€"}
                {currency === "GBP" && "£"}
                {currency === "INR" && "₹"}
                {currency === "JPY" && "¥"}
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="flex-1 px-3 py-2 rounded-r-md bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#00ff9d] focus:border-transparent"
                placeholder="19.99"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300 block mb-1">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#00ff9d] focus:border-transparent"
              disabled={isSubmitting}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#00ff9d] text-black font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-sm text-center ${
            message.includes("Thank you") 
              ? "text-[#00ff9d]" 
              : "text-gray-300"
          }`}>
            {message}
          </p>
        )}

        <p className="mt-4 text-xs text-gray-500 text-center">
          We'll notify you when Early Access begins. No spam, ever.
        </p>
      </div>
    </div>
  );
}