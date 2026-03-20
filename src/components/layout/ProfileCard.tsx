import Image from "next/image";
import { avatar, bio, location, nickname, website } from "@/data/site";

export default function ProfileCard() {
  return (
    <section className="rounded-md border border-stone-200 bg-white px-5 py-5">
      <div className="flex items-start gap-4">
        <Image
          src={avatar}
          alt={nickname}
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-full border border-stone-200 object-cover bg-stone-100"
        />

        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-stone-800">{nickname}</h2>
          <p className="mt-1 text-sm text-stone-500">{location}</p>
          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-sm text-emerald-700 hover:text-emerald-800"
          >
            {website}
          </a>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-stone-600">{bio}</p>
    </section>
  );
}