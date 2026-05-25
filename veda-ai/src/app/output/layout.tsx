import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generated Assignment - VedaAi",
};

export default function OutputLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
