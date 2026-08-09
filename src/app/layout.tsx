import type { Metadata } from "next";
import "./globals.css";
import { ClientBody } from "./ClientBody";

export const metadata: Metadata = {
  title: "Portfolio — System Core",
  description: "Personal portfolio in OS style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
