
import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const KentNguyenContact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.title = "Contact | Kent Nguyen";
    // Trigger animation on mount
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const contactItems = [
    {
      title: "Telegram",
      value: "@kentnguyen",
      href: "https://t.me/kentnguyen",
      delay: 0,
    },
    {
      title: "Mobile / WhatsApp",
      value: "+84 868 000 317",
      href: "https://wa.me/84868000317",
      delay: 100,
    },
    {
      title: "Email",
      value: "kent@alphabits.team",
      href: "mailto:kent@alphabits.team",
      delay: 200,
    },
  ];

  const connectItems = [
    { name: "Alpha Bits", href: "https://alphabits.team/?utm_source=kentnguyen&utm_medium=website&utm_content=contact_page&utm_campaign=personal_portfolio", delay: 300 },
    { name: "Blog", href: "https://blog.kentnguyen.com/", delay: 350 },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/konductor/", delay: 400 },
    { name: "GitHub", href: "https://github.com/kentnguyen", delay: 450 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
            }}
          >
            Get in Touch
          </h1>

          {contactItems.map((item) => (
            <section
              key={item.title}
              className="mb-12 transition-all duration-600 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                transitionDelay: `${item.delay}ms`,
              }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                {item.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                <a
                  href={item.href}
                  target={item.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={item.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="text-highlight hover:underline inline-block transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  {item.value}
                </a>
              </p>
            </section>
          ))}

          <section
            className="transition-all duration-600 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
              transitionDelay: '300ms',
            }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Connect
            </h2>
            {connectItems.map((item) => (
              <p
                key={item.name}
                className="text-xl text-gray-600 dark:text-gray-400 mb-2 transition-all duration-500 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: `${item.delay}ms`,
                }}
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-highlight hover:underline inline-block transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  {item.name}
                </a>
              </p>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KentNguyenContact;
