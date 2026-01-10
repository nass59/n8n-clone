import { requireAuth } from "@/lib/auth-utils";

type PageProps = {
  params: Promise<{
    workflowId: string;
  }>;
};

export default async function page({ params }: PageProps) {
  await requireAuth();

  const { workflowId } = await params;

  return <div>Workflow Id: {workflowId}</div>;
}
