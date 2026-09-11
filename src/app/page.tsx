import Heading from "@/components/heading";
import { Routes } from "@/constants/routes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Home" description="Your home place to start" />

      <Link href={Routes.tickets} className="underline">
        Go to tickets
      </Link>
    </div>
  );
}
