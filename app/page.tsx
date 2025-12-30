"use client";

import TerminalManager from "@/components/terminal/TerminalManager";
import DesktopLayout from "@/components/desktop/DesktopLayout";

export default function Home() {
  return (
    <DesktopLayout>
      <TerminalManager />
    </DesktopLayout>
  );
}
