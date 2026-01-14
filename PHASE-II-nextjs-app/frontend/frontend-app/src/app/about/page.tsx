// src/app/about/page.tsx
import Link from 'next/link';
import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 text-center mb-12">
          About Our Intelligent To-Do Application
        </h1>

        {/* Intro Section */}
        <section className="bg-gray-100 md:bg-white shadow-md rounded-lg p-5 md:p-20 mb-12 text-center">
          <p className="text-sm md:text-xl text-gray-700 leading-relaxed">
            Welcome to the next generation of productivity tools. Our To-Do application integrates seamlessly
            into your workflow, helping you achieve goals with unprecedented efficiency.
          </p>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-xl md:text-4xl font-bold text-gray-900 text-center mb-10">
            How It Works: Streamlined Productivity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-lg: md:text-2xl font-semibold mb-2 text-gray-800">
                Effortless Task Management
              </h3>
              <p className="text-gray-600">
                Create, organize, and prioritize tasks with an intuitive interface. Set due dates, add
                descriptions, and categorize responsibilities with ease.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-lg md:text-2xl font-semibold mb-2 text-gray-800">
                Seamless Cross-Platform Access
              </h3>
              <p className="text-gray-600">
                Access your To-Do lists from desktop, tablet, or mobile. Your tasks stay synced in real-time,
                keeping you productive wherever you are.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-lg md:text-2xl font-semibold mb-2 text-gray-800">
                AI-Powered Assistance
              </h3>
              <p className="text-gray-600">
                Use natural language commands to create, modify, and prioritize tasks. Your AI agent learns
                from you, offering smarter suggestions over time.
              </p>
            </div>
          </div>
        </section>

        {/* Daily Life Benefits */}
        <section className="md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-10">
            Elevate Your Every Day
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="text-lg md:text-2xl font-semibold mb-2 text-gray-800">Reduce Mental Load</h3>
              <p className="text-gray-600">
                Offload your tasks to free up cognitive resources for creative thinking and problem-solving.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-lg md:text-2xl font-semibold mb-2 text-gray-800">Boost Productivity</h3>
              <p className="text-gray-600">
                Spend less time organizing and more time accomplishing, increasing efficiency daily.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
              <div className="text-5xl mb-4">📂</div>
              <h3 className="text-lg md:text-2xl font-semibold mb-2 text-gray-800">Enhance Organization</h3>
              <p className="text-gray-600">
                Track commitments, deadlines, and goals seamlessly for a perfectly organized life.
              </p>
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="text-center py-12">
          <p className="text-sm md:text-xl text-gray-700 mb-6">
            Embrace a smarter way to manage your life. Start using our AI-powered To-Do app today.
          </p>
          <Link
                href="/"
                className="bg-blue-600 text-white px-7 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition-all hover:scale-105 shadow-md text-center"
              >
                Get Started
              </Link>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
