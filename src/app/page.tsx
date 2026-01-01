import { LogoutButton } from "@/app/logout";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

export default async function Page() {
  await requireAuth();

  const data = await caller.getUsers();

  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center gap-4 p-4">
      Protected server component
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <LogoutButton />
    </div>
  );
}
