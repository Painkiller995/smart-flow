import { LucideIcon } from 'lucide-react';

import ReactCountupWrapper from '@/components/react-countup-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

const StatsCard = (props: StatsCardProps) => {
  return (
    <Card className="relative h-full overflow-hidden">
      <CardHeader className="flex pb-2">
        <CardTitle>{props.title}</CardTitle>
        <props.icon
          className="absolute -bottom-4 -right-8 stroke-primary text-muted-foreground opacity-10"
          size={120}
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">
          <ReactCountupWrapper value={props.value}></ReactCountupWrapper>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
