"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { LogoutButton } from "@/app/logout";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";

export default function Page() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("AI job queued");
      },
    })
  );

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Workflow creation triggered");
      },
    })
  );

  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center gap-4 p-4">
      Protected server component
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button
        disabled={testAi.isPending}
        onClick={() => testAi.mutate()}
        type="button"
      >
        Test AI
      </Button>
      <Button
        disabled={create.isPending}
        onClick={() => create.mutate()}
        type="button"
      >
        Create Workflow
      </Button>
      <LogoutButton />
    </div>
  );
}
