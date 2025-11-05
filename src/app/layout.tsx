import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import ClientLayout from "./ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = { 
  title: "DevHood | A Modern Developer Community & Blog",
  description: "DevHood is more than a blog; it's a thriving community built by and for modern developers. We provide a platform to share in-depth technical articles, join discussions on the latest tools, and get real help with code and career hurdles. Whether you're writing your first tutorial or debugging a complex issue, you belong here."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta
        name="google-site-verification"
        content="GtUYzNGn6qXubpI9IO1jZ9u3qb6vk71Z6PQ3rHLvBr0"
      />
      <meta
        name="description"
        content="A website for posting blogs and articles, a community for developers and tech people, a simple free blog app for posting articles relating to tech, and connect with other developers, designers, digital marketers etc. Improve your work today by working with other smart developers."
      />
      <meta
        name="keywords"
        content="Developers, techies, tech people, articles, blogs, communitiy, developer communities"
      />
      <meta name="robots" content="noindex,nofollow" />
      <meta name="googlebot" content="notranslate" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>
          <main>{children}</main>
        </ClientLayout>
      </body>
    </html>
  );
}
