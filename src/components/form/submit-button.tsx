import { cn } from "cn";
import { LucideLoaderCircle } from "lucide-react";
import { cloneElement } from "react";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  pending: boolean;
  label?: string;
  icon?: React.ReactElement<{ className: string }>;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
};

const SubmitButton = ({
  pending,
  label,
  icon,
  disabled,
  variant = "default",
  size = "default",
}: SubmitButtonProps) => {
  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size={size}
    >
      {pending && (
        <LucideLoaderCircle
          className={cn("h-4 w-4 animate-spin", { "mr-2": !!label })}
        />
      )}

      {label}

      {pending ? null : icon ? (
        <span className={cn({ "ml-2": !!label })}>
          {cloneElement(icon, { className: "w-4 h-4" })}
        </span>
      ) : null}
    </Button>
  );
};

export { SubmitButton };
