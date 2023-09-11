import {
  OrganizationSwitcher,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";
export const TopBar = () => {
  return (
    <nav className="topbar">
      <Link className="flex items-center gap-4" href="/">
        <Image src={"/assets/logo.svg"} alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src={"/assets/logout.svg"}
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <div className="flex cursor-pointer gap-4 p-4">
                <Image
                  src={"/assets/login.svg"}
                  alt="logout"
                  width={24}
                  height={24}
                />
                <p className="text-light-2 max-lg:hidden">Login</p>
              </div>
            </SignInButton>
          </SignedOut>
        </div>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
};
