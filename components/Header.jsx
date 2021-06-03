import Image from "next/image";

import {
  BellIcon,
  UserGroupIcon,
  HomeIcon,
  ViewGridIcon,
  ChatIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import {
  SearchIcon,
  FlagIcon,
  PlayIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderItem from "./HeaderItem";
import { signOut, useSession } from "next-auth/client";

const Header = () => {
  const [session] = useSession();

  return (
    <div className="sticky top-0 flex z-50 bg-white items-center p-3 lg:px-5 shadow-md">
      {/* left */}

      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />

        <div className=" flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="hidden md:inline-flex flex-shrink ml-2 items-center bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>

      {/* mid */}

      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-1">
          <HeaderItem active Icon={HomeIcon} />
          <HeaderItem Icon={FlagIcon} />
          <HeaderItem Icon={PlayIcon} />
          <HeaderItem Icon={ShoppingCartIcon} />
          <HeaderItem Icon={UserGroupIcon} />
        </div>
      </div>

      {/* right */}
      <div className="flex space-x-2 items-center justify-end">
        <Image
          src={session.user.image}
          onClick={signOut}
          className="rounded-full cursor-pointer"
          width={40}
          height={40}
          layout="fixed"
        />

        <p className="pr-3 whitespace-nowrap font-semibold">{session.user.name}</p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  );
};

export default Header;
