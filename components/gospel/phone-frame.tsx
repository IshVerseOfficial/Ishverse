/**
 * Module: PhoneFrame
 * Context: See implementation_plan.md — gospel showcase. Wraps a real app
 * screenshot (1206×2622, from ishgospel-frontend/assets/AppScreenshots) in a
 * minimal CSS device frame. Uses design tokens so the frame adapts to theme.
 *
 * Exports:
 *   PhoneFrame — framed next/image screenshot
 */

import Image from "next/image";

export function PhoneFrame({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`w-[240px] rounded-[2.4rem] border border-divider bg-surface p-2 shadow-2xl sm:w-[280px] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={1206}
        height={2622}
        priority={priority}
        sizes="(max-width: 640px) 240px, 280px"
        className="h-auto w-full rounded-[1.9rem]"
      />
    </div>
  );
}
