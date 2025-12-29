import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

export default async function Page() {
  const users = await prisma.user.findMany();

  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center">
      <Button size="lg" variant="default">
        hello world
        {JSON.stringify(users)}
      </Button>
    </div>
  );
}
