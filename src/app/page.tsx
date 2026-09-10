import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8">
      <h1>Home page</h1>
      <Link href="tickets" className="underline">
        Go to tickets
      </Link>
    </div>
  );
}
