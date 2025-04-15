import React from "react";
import { Hero } from "../components/Hero";
import { Steps } from "../components/Steps";
import { Features } from "../components/Features";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="home-container">
    <Header /> 
      <Hero />
      <Steps />
      <Features />
    <Footer />
    </main>
  );
}
