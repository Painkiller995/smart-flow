import { auth } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';
import Editor from '../../_components/editor';

interface EditorPageProps {
  params: Promise<{ workflowId: string }>;
}

async function EditorPage({ params }: EditorPageProps) {
  const { workflowId } = await params;

  const { userId } = await auth();
  if (!userId) {
    return <div className="">unauthenticated</div>;
  }

  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId, userId },
  });

  if (!workflow) {
    return <div className="">Workflow not found</div>;
  }

  return <Editor workflow={workflow} />;
}

export default EditorPage;
