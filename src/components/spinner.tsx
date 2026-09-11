import { LucideLoaderCircle } from "lucide-react";

function Spinner() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center self-center">
      <LucideLoaderCircle className="text-primary size-12 animate-spin" />
    </div>
  );
}

export default Spinner;
