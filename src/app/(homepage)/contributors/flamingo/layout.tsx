import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flamingo Contributors Board | Zedu",
  description:
    "Explore and submit contributions to the Zedu Flamingo developer community. Track contributors, Zedu usernames, and linked GitHub repositories.",
  openGraph: {
    title: "Flamingo Contributors Board | Zedu",
    description:
      "Explore and submit contributions to the Zedu Flamingo developer community. Track contributors, Zedu usernames, and linked GitHub repositories.",
    url: "/contributors/flamingo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flamingo Contributors Board | Zedu",
    description:
      "Explore and submit contributions to the Zedu Flamingo developer community.",
  },
  alternates: {
    canonical: "/contributors/flamingo",
  },
};

export default function FlamingoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
