import { BirthForm } from "@/components/BirthForm";
import { LastHint } from "@/components/LastHint";

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-10">
      <LastHint />
      <BirthForm />
    </main>
  );
}