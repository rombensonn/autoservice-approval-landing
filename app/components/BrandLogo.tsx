import Image from "next/image";
import brandLogo from "../../public/images/desmos-auto-logo.png";

type BrandLogoProps = {
  variant?: "header" | "footer";
};

export function BrandLogo({ variant = "header" }: BrandLogoProps) {
  return (
    <span className={`brand-logo brand-logo--${variant}`}>
      <Image
        className="brand-logo__image"
        src={brandLogo}
        alt="Десмос Авто"
        sizes="(min-width: 640px) 184px, 36vw"
        priority={variant === "header"}
      />
    </span>
  );
}
