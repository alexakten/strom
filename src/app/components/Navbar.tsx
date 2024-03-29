import Link from "next/link";

interface NavbarProps {
  onThemeToggle: () => void;
  theme: string;
}

const Navbar: React.FC<NavbarProps> = ({ onThemeToggle, theme }) => {
  return (
    <nav className="flex justify-between items-center relative">
      <Link href={"/"}>
        <h2 className="text-2xl tracking-[-0.5px] font-medium">mendly</h2>
      </Link>

      {/* <div className="font-medium absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> */}
      <button className="font-medium" type="button" onClick={onThemeToggle}>
        {theme === "light" ? "◖ dark" : "● light"}
      </button>
    </nav>
  );
};

export default Navbar;
