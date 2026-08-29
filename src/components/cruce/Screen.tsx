import type { ReactNode } from "react";

export function Screen({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-5 pb-28 pt-10">
      {title ? <h1 className="text-eyebrow mb-8 text-center">{title}</h1> : null}
      <div className={className}>{children}</div>
    </main>
  );
}
