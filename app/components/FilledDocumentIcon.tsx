import type { SVGProps } from "react";

type FilledDocumentIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function FilledDocumentIcon({
  size = 18,
  ...props
}: FilledDocumentIconProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.75 2.75h7.1c.53 0 1.04.21 1.41.59l3.4 3.4c.38.37.59.88.59 1.41v11.1c0 1.1-.9 2-2 2H6.75c-1.1 0-2-.9-2-2V4.75c0-1.1.9-2 2-2Z"
        fill="currentColor"
      />
      <path
        d="M14 3.15v3.7c0 .63.52 1.15 1.15 1.15h3.7"
        fill="var(--button-primary-bg)"
        opacity="0.62"
      />
      <path
        d="M8.25 12h7.5M8.25 15.25h7.5M8.25 18.5h4.75"
        stroke="var(--button-primary-bg)"
        strokeLinecap="round"
        strokeWidth="1.45"
      />
    </svg>
  );
}
