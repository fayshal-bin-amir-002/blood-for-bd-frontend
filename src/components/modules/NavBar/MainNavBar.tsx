"use client";
import Container from "@/components/shared/Container";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { navItems } from "@/constants";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { UserAvatar } from "./UserAvatar";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MainNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  return (
    <Container>
      <div className="relative w-full h-16">
        <Navbar>
          {/* Desktop Navigation */}
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center gap-4">
              {!!user ? (
                <UserAvatar />
              ) : (
                <NavbarButton
                  variant="primary"
                  onClick={() => {
                    router.push("/auth");
                  }}
                >
                  Login
                </NavbarButton>
              )}
            </div>
          </NavBody>

          {/* Mobile Navigation */}
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => {
                setIsMobileMenuOpen(false);
              }}
            >
              {navItems.map((item, idx) => (
                <Link
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </Link>
              ))}
              {user?.isDonor && (
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">Profile</span>
                </Link>
              )}
              {user?.role === "ADMIN" && (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">Dashboard</span>
                </Link>
              )}
              <div className="flex w-full flex-col gap-4">
                {!!user ? (
                  <UserAvatar />
                ) : (
                  <NavbarButton
                    onClick={() => {
                      router.push("/auth");
                      setIsMobileMenuOpen(false);
                    }}
                    variant="primary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>
                )}
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div>
    </Container>
  );
};

export default MainNavBar;
