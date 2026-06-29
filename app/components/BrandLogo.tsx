import Image from "next/image";

type BrandLogoProps = {
  variant?: "header" | "footer";
};

export function BrandLogo({ variant = "header" }: BrandLogoProps) {
  return (
    <span className={`brand-logo brand-logo--${variant}`}>
      <Image
        className="brand-logo__image"
        src="/images/desmos-auto-logo.png"
        alt="Десмос Авто"
        width={2327}
        height={891}
        sizes="(min-width: 640px) 184px, 36vw"
        priority={variant === "header"}
      />
    </span>
  );
}
