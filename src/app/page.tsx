"use client";

import useScreenSize from '@/hooks/useScreenSize';
import MobileView from '@/app/components/MobileView';
import DesktopView from '@/app/components/DesktopView';

export default function Home() {

  const screenSize = useScreenSize();

  switch (screenSize) {
    case "mobile":
    case "tablet":
      return (
        <MobileView />
      );
    case "desktop":
      return (
        <DesktopView />
      );
    default:
      return (
        <div>
        </div>
      );
  }
}
