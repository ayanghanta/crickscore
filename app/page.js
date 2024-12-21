import Link from "next/link";

function page() {
  return (
    <div>
      <h1>Your cricket score board</h1>
      <Link href="/teams">Let&apos;s go</Link>
    </div>
  );
}

export default page;
