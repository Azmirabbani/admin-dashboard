import Image from "next/image";

type PupukLogoProps = {
  className?: string;
};

const PupukLogo = ({ className }: PupukLogoProps) => (
  <Image
    src="/Logo_kujang.jpg"
    alt="Pupuk Kujang"
    width={32}
    height={32}
    className={className} // Ini akan menerima className dari luar
    style={{ objectFit: "contain" }}
  />
);

export default PupukLogo;
