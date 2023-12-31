"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type ReactNode, useMemo } from "react";

import { type AppRouter } from "@/server/api/root";
import { getUrl, transformer } from "./shared";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const api = createTRPCReact<AppRouter>();

type TRPCReactProviderProps = {
  children: ReactNode;
  cookies: string;
};

export function TRPCReactProvider(props: Readonly<TRPCReactProviderProps>) {
  const queryClient = useMemo(() => () => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    }
  }), []);
  const trpcClient = useMemo(() => () =>
    api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: getUrl(),
          headers() {
            return {
              cookie: props.cookies,
              "x-trpc-source": "react",
            };
          },
        }),
      ],
    }), []);

  return (
    <QueryClientProvider client={queryClient()}>
      <api.Provider client={trpcClient()} queryClient={queryClient()}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {props.children}
          <Toaster />
        </ThemeProvider>
      </api.Provider>
    </QueryClientProvider>
  );
}
