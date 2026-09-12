import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type CardCompactProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

function CardCompact({
  title,
  description,
  content,
  footer,
  className,
}: CardCompactProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && (
        <CardFooter className="flex justify-between">{footer}</CardFooter>
      )}
    </Card>
  );
}

export default CardCompact;
