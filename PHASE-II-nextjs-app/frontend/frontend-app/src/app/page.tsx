'use client';
import Link from "next/link";
import { useState } from "react";
import ResponsiveAgentChat from "@/components/AgentChat/ResponsiveAgentChat";
import { MessageSquare } from "lucide-react";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center md:text-justify">
          {/* Text */}
          <div>
            <span className="inline-block mb-4 rounded-full bg-blue-100 text-blue-600 px-4 py-1 text-sm font-medium">
              🚀 Simple • Fast • Reliable
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
              Organize Your Tasks <br />
              <span className="text-blue-600">Without Stress</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8">
              A modern todo app to help you stay focused, productive, and in
              control of your daily tasks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/todos"
                className="bg-blue-600 text-white px-7 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition-all hover:scale-105 shadow-md text-center"
              >
                Get Started
              </Link>

              <Link
                href="/about"
                className="px-7 py-3 rounded-xl text-lg font-medium border border-gray-300 text-gray-700 hover:bg-white transition text-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Visual Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Why You’ll Love It
            </h3>

            <ul className="space-y-4">
              {[
                "Create & manage todos easily",
                "Mark tasks complete or pending",
                "Edit tasks anytime",
                "Delete what you don’t need",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-blue-700 text-xl">✔️</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto mt-20 md:mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Core Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Fast & Simple",
                desc: "Minimal UI focused on productivity.",
              },
              {
                title: "Clean Design",
                desc: "No clutter, only what you need.",
              },
              {
                title: "Reliable",
                desc: "Your tasks are always saved safely.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-110 z-50"
        aria-label="Open agent chat"
      >
        <MessageSquare size={24} />
      </button>

      <ResponsiveAgentChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </main>
  );
}
