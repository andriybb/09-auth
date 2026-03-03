"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession, logout } from "@/lib/api/clientApi";
import useAuthStore from "@/lib/store/authStore";

const PRIVATE_PREFIXES = ["/profile", "/notes"];

function isPrivatePath(path: string): boolean {
  return PRIVATE_PREFIXES.some((prefix) => path.startsWith(prefix));
}

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [checking, setChecking] = useState(true);
  const { setUser, clearIsAuthenticated, isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function verifySession() {
      setChecking(true);
      try {
        const user = await checkSession();
        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
          if (isPrivatePath(pathname)) {
            await logout().catch(() => {});
            router.replace("/sign-in");
            return;
          }
        }
      } catch {
        clearIsAuthenticated();
        if (isPrivatePath(pathname)) {
          router.replace("/sign-in");
          return;
        }
      } finally {
        setChecking(false);
      }
    }

    verifySession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (checking && isPrivatePath(pathname)) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <span>Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated && isPrivatePath(pathname)) {
    return null;
  }

  return <>{children}</>;
}