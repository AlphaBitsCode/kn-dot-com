
import React, { useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const KentNguyenContact: React.FC = () => {
  useEffect(() => {
    document.title = "Contact | Kent Nguyen";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Get in Touch
          </h1>

          <div className="space-y-6">
            {/* Telegram */}
            <a
              href="https://t.me/kentnguyen"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full h-auto py-6 px-8 justify-start text-left hover:bg-highlight/10 hover:border-highlight"
              >
                <MessageCircle className="mr-4 h-6 w-6 text-highlight" />
                <div className="flex-1">
                  <div className="font-semibold text-lg">Telegram</div>
                  <div className="text-gray-600 dark:text-gray-400">@kentnguyen</div>
                </div>
              </Button>
            </a>

            {/* Mobile / WhatsApp */}
            <a
              href="https://wa.me/84868000317"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full h-auto py-6 px-8 justify-start text-left hover:bg-highlight/10 hover:border-highlight"
              >
                <Phone className="mr-4 h-6 w-6 text-highlight" />
                <div className="flex-1">
                  <div className="font-semibold text-lg">Mobile / WhatsApp</div>
                  <div className="text-gray-600 dark:text-gray-400">+84 868 000 317</div>
                </div>
              </Button>
            </a>

            {/* Email */}
            <a
              href="mailto:kent@alphabits.team"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full h-auto py-6 px-8 justify-start text-left hover:bg-highlight/10 hover:border-highlight"
              >
                <Mail className="mr-4 h-6 w-6 text-highlight" />
                <div className="flex-1">
                  <div className="font-semibold text-lg">Email</div>
                  <div className="text-gray-600 dark:text-gray-400">kent@alphabits.team</div>
                </div>
              </Button>
            </a>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Or connect with me on
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="https://blog.kentnguyen.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-highlight hover:underline"
              >
                Blog
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="https://www.linkedin.com/in/kentnguyen/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-highlight hover:underline"
              >
                LinkedIn
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="https://github.com/kentnguyen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-highlight hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KentNguyenContact;
