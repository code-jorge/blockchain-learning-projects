import Link from "next/link";
import { ConnectWallet } from '@3rdweb/react'

 const Navbar = ()=> (
  <nav className="font-sans flex justify-between pt-4 pb-20 px-4 md:px-20 w-full h-10 ">
    <div className="flex gap-4 md:gap-10">
      <Link href="/">
        <a className="text-2xl no-underline text-white hover:text-yellow-400">
          Vibe check
        </a>
      </Link>
      <Link href="/lounge">
        <a className="text-2xl no-underline text-white hover:text-yellow-400">
          Lounge
        </a>
      </Link>
      <ConnectWallet />
    </div>
  </nav>
);

export default Navbar