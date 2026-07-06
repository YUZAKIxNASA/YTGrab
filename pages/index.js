import Head from "next/head";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home({ theme, onToggleTheme }) {
  return (
    <>
      <Head>
        <title>YTGrab — Download videos quickly</title>
        <meta name="description" content="YTGrab — fast, privacy-friendly media grabber" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <Layout theme={theme} onToggleTheme={onToggleTheme}>
        <main className="min-h-screen">
          <Hero />
          <section id="features" className="py-20">
            <Features />
          </section>
          <section id="faq" className="py-20">
            <FAQ />
          </section>
          <section id="about" className="py-20">
            <About />
          </section>
          <section id="contact" className="py-20">
            <Contact />
          </section>
        </main>
      </Layout>
    </>
  );
}
