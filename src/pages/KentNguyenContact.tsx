
import React, { useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const KentNguyenContact: React.FC = () => {
  useEffect(() => {
    document.title = "Contact | Kent Nguyen";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white">
            Get in Touch
          </h1>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Telegram
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              <a
                href="https://t.me/kentnguyen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-highlight hover:underline"
              >
                @kentnguyen
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Mobile / WhatsApp
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              <a
                href="https://wa.me/84868000317"
                target="_blank"
                rel="noopener noreferrer"
                className="text-highlight hover:underline"
              >
                +84 868 000 317
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Email
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              <a
                href="mailto:kent@alphabits.team"
                className="text-highlight hover:underline"
              >
                kent@alphabits.team
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Connect
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              <a
                href="https://alphabits.team/?utm_source=kentnguyen&utm_medium=website&utm_content=contact_page&utm_campaign=personal_portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-highlight hover:underline"
              >
                Alpha Bits
              </a>
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              <a
                href="https://blog.kentnguyen.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-highlight hover:underline"
              >
                Blog
              </a>
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              <a
                href="https://www.linkedin.com/in/konductor/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-highlight hover:underline"
              >
                LinkedIn
              </a>
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              <a
                href="https://github.com/kentnguyen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-highlight hover:underline"
              >
                GitHub
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KentNguyenContact;
