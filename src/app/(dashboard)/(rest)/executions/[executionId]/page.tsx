import { requireAuth } from "@/lib/auth-utils";

type PageProps = {
  params: Promise<{
    executionId: string;
  }>;
};

export default async function page({ params }: PageProps) {
  await requireAuth();

  const { executionId } = await params;

  return <div>Execution Id: {executionId}</div>;
}
