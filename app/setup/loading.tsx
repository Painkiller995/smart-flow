import Logo from '@/components/logo';
import { Separator } from '@/components/ui/separator';
import { Loader2Icon } from 'lucide-react';

const LoadingPage = async () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <Logo iconSize={50} fontSize="text-3xl" />
      <Separator className="max-w-xs" />
      <div className="flex items-center justify-center gap-2">
        <Loader2Icon size={16} className="animate-spin stroke-primary" />
        <p className="text-muted-foreground">Setting up your account</p>
      </div>
    </div>
  );
};

export default LoadingPage;
