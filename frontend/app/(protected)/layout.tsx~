"use client";

import React, { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Bell, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NotificationsPanel } from "@/components/notifications-panel";

import "./protected.css";
import logo from "@/public/locker1-logo.svg";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b w-full">
        <div className="container mx-auto flex h-16 items-center px-4 max-w-8xl">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded">
                <Image
                  src={logo}
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <span className="text-xl font-semibold">Locker1</span>
            </Link>
            <nav className="flex items-center space-x-2">
              <Link href="/dashboard" className="font-medium nav-link">
                Principal
              </Link>
              <Link
                href="/dashboard/groups"
                className="text-muted-foreground nav-link"
              >
                Grupos
              </Link>
              <Link
                href="/dashboard/passwords"
                className="text-muted-foreground nav-link"
              >
                Claves
              </Link>
              <Link
                href="/dashboard/breached-keys"
                className="text-muted-foreground nav-link"
              >
                Claves comprometidas
              </Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notificaciones</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <NotificationsPanel />
              </PopoverContent>
            </Popover>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Image
                    src={
                      session?.user?.image ||
                      "https://randomuser.me/api/portraits/men/5.jpg"
                    }
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="sr-only">Perfil</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[240px]">
                <div className="flex items-center gap-2 p-2">
                  <div className="rounded-full overflow-hidden">
                    <Image
                      src={
                        session?.user?.image ||
                        "https://randomuser.me/api/portraits/men/5.jpg"
                      }
                      alt="Avatar"
                      width={40}
                      height={40}
                    />
                  </div>

                  <div className="flex flex-col">
                    {session ? (
                      <>
                        <span className="text-sm font-medium">
                          {session?.user?.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {session?.user?.email}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm font-medium">Juan Pérez</span>
                        <span className="text-xs text-muted-foreground">
                          juan.perez@example.com
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/configuracion" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
