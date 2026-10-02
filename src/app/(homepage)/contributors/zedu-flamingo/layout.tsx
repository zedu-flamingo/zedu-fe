import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zedu Flamingo Contributors Board | Zedu",
  description:
    "Explore and submit contributions to the Zedu Flamingo developer community. Track contributors, Zedu usernames, and email addresses.",
  openGraph: {
    title: "Zedu Flamingo Contributors Board | Zedu",
    description:
      "Explore and submit contributions to the Zedu Flamingo developer community. Track contributors, Zedu usernames, and email addresses.",
    url: "/contributors/zedu-flamingo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zedu Flamingo Contributors Board | Zedu",
    description:
      "Explore and submit contributions to the Zedu Flamingo developer community.",
  },
  alternates: {
    canonical: "/contributors/zedu-flamingo",
  },
};

export default function ZeduFlamingoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
