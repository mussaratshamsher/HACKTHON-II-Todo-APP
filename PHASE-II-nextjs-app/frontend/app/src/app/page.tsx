"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="text-center animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">
        Welcome to TodoMaster
      </h1>
      <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
        The ultimate solution for organizing your tasks and boosting your
        productivity. Get started now and take control of your day.
      </p>
      <Link href="/todos">
        <Button size="lg">Get Started</Button>
      </Link>
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-primary mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-secondary rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-primary-foreground">
              Easy to Use
            </h3>
            <p className="text-foreground/70">
              A simple and intuitive interface to manage your tasks.
            </p>
          </div>
          <div className="p-6 bg-secondary rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-primary-foreground">
              Professional Design
            </h3>
            <p className="text-foreground/70">
              A clean and modern design to keep you focused.
            </p>
          </div>
          <div className="p-6 bg-secondary rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-primary-foreground">
              Fast and Reliable
            </h3>
            <p className="text-foreground/70">
              Built with Next.js for a fast and reliable experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}