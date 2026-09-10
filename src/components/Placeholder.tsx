import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<{ className: string }>;
  button?: React.ReactNode;
};

function Placeholder({
  label,
  icon = <LucideMessageSquareWarning />,
  button = null,
}: PlaceholderProps) {
  return (
    <div className="flex-1 flex flex-col gap-y-2 self-center justify-center items-center">
      {cloneElement(icon, { className: "size-18" })}
      <h2 className="text-lg font-medium">{label}</h2>
      {button}
    </div>
  );
}

export default Placeholder;
