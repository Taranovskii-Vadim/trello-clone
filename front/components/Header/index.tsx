import Image from "next/image";

const Header = () => {
  return (
    <header className="px-6 md:px-3 py-3 md:py-1 flex justify-between items-center">
      <Image
        width={200}
        height={200}
        alt="trello logo"
        src="https://links.papareact.com/c2cdd5"
        className="w-40 object-contain"
      />
    </header>
  );
};

export default Header;
