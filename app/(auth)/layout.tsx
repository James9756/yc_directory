import { Suspense } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
      {children}
    </Suspense>
  );
}
