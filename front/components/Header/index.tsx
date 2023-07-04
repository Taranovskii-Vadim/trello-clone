import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Header = (): JSX.Element => (
  <header className="px-6 md:px-4 py-4 md:py-2 flex flex-col md:flex-row items-center p-5">
    <Image
      width={200}
      height={200}
      alt="trello logo"
      src="https://links.papareact.com/c2cdd5"
      className="w-40 pb-10 md:pb-0 object-contain"
    />
    <div className="flex items-center space-x-5 flex-1 justify-end w-full">
      <form className="flex items-center bg-white px-4 rounded-md shadow-md flex-1 md:flex-initial">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input type="text" placeholder="Search..." className="p-2 flex-1" />
        <button type="submit" hidden></button>
      </form>
      <Image
        width={40}
        height={40}
        alt="user avatar"
        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      />
    </div>
  </header>
);

export default Header;
