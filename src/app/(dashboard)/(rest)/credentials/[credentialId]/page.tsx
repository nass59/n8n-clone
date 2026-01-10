import { requireAuth } from "@/lib/auth-utils";

type PageProps = {
  params: Promise<{
    credentialId: string;
  }>;
};

export default async function page({ params }: PageProps) {
  await requireAuth();

  const { credentialId } = await params;

  return <div>Credential Id: {credentialId}</div>;
}
