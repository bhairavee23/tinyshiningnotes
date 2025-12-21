import { getDramas } from "@/lib/getDramas";

export default function Home() {
  const dramas = getDramas();

  return (
    <div className="min-h-screen py-12 px-4">
      <main className="mx-auto max-w-2xl">
        <header className="mb-12">
          <h1 className="text-3xl font-semibold mb-2">
            Tiny Shining Notes
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            A collection of drama thoughts and reflections
          </p>
        </header>

        <ul className="space-y-6">
          {dramas.map((drama, index) => (
            <li key={index} className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-6">
              <h2 className="text-lg font-medium mb-1">
                {drama.title}
              </h2>
              <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                <span>{drama.year}</span>
                <span className="flex gap-2">
                  {drama.vibes.map((vibe, vibeIndex) => (
                    <span key={vibeIndex} className="text-zinc-400 dark:text-zinc-500">
                      {vibe}
                    </span>
                  ))}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
