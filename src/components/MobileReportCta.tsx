"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileReportCta() {
  const pathname = usePathname();
  if (pathname === "/signalement") return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-gradient-to-t from-ecume via-ecume/95 to-transparent pointer-events-none">
      <Link
        href="/signalement"
        className="pointer-events-auto block text-center px-4 py-3.5 rounded-full bg-laterite text-white font-semibold shadow-lg shadow-laterite/30"
      >
        Faire un signalement
      </Link>
    </div>
  );
}
