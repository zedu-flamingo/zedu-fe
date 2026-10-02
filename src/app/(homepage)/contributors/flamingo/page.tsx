"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ZeduFlamingoBoardPage from "../zedu-flamingo/page";

export default function FlamingoRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/contributors/zedu-flamingo");
  }, [router]);

  return <ZeduFlamingoBoardPage />;
}
