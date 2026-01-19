type PageProps = {
  params: Promise<{
    credentialId: string;
  }>;
};

export default async function page({ params }: PageProps) {
  const { credentialId } = await params;

  return <div>Credential Id: {credentialId}</div>;
}
