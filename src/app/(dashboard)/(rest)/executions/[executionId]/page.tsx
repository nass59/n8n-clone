type PageProps = {
  params: Promise<{
    executionId: string;
  }>;
};

export default async function page({ params }: PageProps) {
  const { executionId } = await params;

  return <div>Execution Id: {executionId}</div>;
}
