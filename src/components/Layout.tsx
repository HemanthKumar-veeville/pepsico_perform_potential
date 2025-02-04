import * as React from "react";
import { cn } from "@/lib/utils";

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Layout({ children, className, ...props }: LayoutProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[430px] min-h-screen bg-background shadow-xl overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
