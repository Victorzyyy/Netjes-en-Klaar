import Image from "next/image";

export function TeamShowcaseImage() {
  return (
    <section className="fresh-shell relative z-10 py-10 md:py-16">
      <div className="premium-panel overflow-hidden rounded-[2rem] p-2 md:rounded-[2.75rem] md:p-3">
        <div className="relative min-h-[24rem] overflow-hidden rounded-[1.55rem] md:min-h-[34rem] md:rounded-[2.15rem] lg:min-h-[40rem]">
          <Image
            src="/images/cleaning-team-showcase.png"
            alt="Vriendelijk schoonmaakteam met professionele schoonmaakmiddelen"
            fill
            sizes="(max-width: 768px) 100vw, 86rem"
            className="object-cover object-center"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fresh-ink/18 via-transparent to-white/8" />
        </div>
      </div>
    </section>
  );
}
