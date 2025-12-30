import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { Client } from "@/app/client";
import { Button } from "@/components/ui/button";
import { getQueryClient, trpc } from "@/trpc/server";

export default async function Page() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center">
      <Button size="lg" variant="default">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div>Loading...</div>}>
            <Client />
          </Suspense>
        </HydrationBoundary>
      </Button>
    </div>
  );
}
