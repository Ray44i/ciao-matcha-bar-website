import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api.js";
import { Section, Button, Eyebrow } from "../components/ui.jsx";

function WaveRule({ className = "" }) {
  return (
    <svg
      viewBox="0 0 240 16"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0,8 Q20,0 40,8 T80,8 T120,8 T160,8 T200,8 T240,8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api
      .get(`/blog/${id}`)
      .then(setPost)
      .catch(() => setPost(null));
  }, [id]);

  if (!post) {
    return (
      <Section className="py-24">
        <div className="mx-auto max-w-md rounded-[32px] bg-white/80 border border-forest/10 p-10 text-center shadow-xl">
          <div className="mx-auto w-12 h-12 rounded-full border-4 border-pink-200 border-t-forest animate-spin" />

          <p className="mt-5 font-display font-bold text-forest">
            Brewing your article...
          </p>

          <p className="mt-2 text-sm text-forest/50">
            Please wait while we prepare your matcha journal.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
        .font-accent { font-family: 'Fraunces', serif; }
      `}</style>

      {/* HERO */}
      <div className="relative overflow-hidden rounded-[36px] bg-ciao-gradient-soft border border-white/50 shadow-xl p-8 md:p-14">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-200/40 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest/60 hover:text-forest transition-colors"
          >
            ← Back to blog
          </Link>

          <div className="mt-8">
            <Eyebrow>Ciao Matcha Journal</Eyebrow>
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-forest mt-3 leading-[1.05]">
            {post.title}
          </h1>

          <WaveRule className="w-24 h-4 mt-5 text-clay/70" />

          <p className="mt-5 text-forest/70 max-w-2xl text-lg">
            Stories, rituals, flavors, and slow moments from Ciao Matcha Bar.
          </p>
        </div>
      </div>

      {/* COVER */}
      <div className="mt-10 relative rounded-[36px] overflow-hidden shadow-2xl border border-white/50 bg-[#fff3f8]">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-200/40 rounded-full blur-3xl" />

        <div className="relative z-10 aspect-[16/7] flex items-center justify-center">
          <div className="text-center">
            <div className="text-7xl md:text-8xl">🍵</div>

            <p className="mt-4 font-accent italic text-2xl md:text-3xl text-forest">
              Ciao Matcha Stories
            </p>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20" />
      </div>

      {/* ARTICLE */}
      <article className="max-w-3xl mx-auto mt-14">
        <div className="rounded-[32px] bg-white/90 border border-forest/10 p-8 md:p-12 shadow-xl">
          <p className="text-forest/80 text-lg leading-9 whitespace-pre-line">
            {post.content}
          </p>
        </div>

        {/* QUOTE */}
        <div className="relative mt-10 rounded-[32px] bg-ciao-gradient-soft border border-white/50 p-8 md:p-10 shadow-xl overflow-hidden">
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-pink-200/40 rounded-full blur-3xl" />

          <span className="font-accent italic text-6xl text-clay/40 leading-none">
            &ldquo;
          </span>

          <p className="font-accent italic text-xl md:text-2xl text-forest leading-snug mt-2 relative z-10">
            Matcha isn&apos;t just something you drink. It&apos;s something you
            slow down for.
          </p>

          <p className="mt-5 text-sm text-forest/50 relative z-10">
            — Ciao Matcha Bar
          </p>

          <WaveRule className="w-16 h-3 mt-4 text-clay/50 relative z-10" />
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-[32px] bg-forest text-white p-8 md:p-10 shadow-xl text-center">
          <h2 className="font-display font-extrabold text-3xl">
            Ready for your matcha moment?
          </h2>

          <p className="mt-3 text-white/70 max-w-xl mx-auto">
            Explore our menu or keep reading more stories from the Ciao Matcha
            journal.
          </p>

          <div className="mt-7 flex flex-wrap gap-4 justify-center">
            <Button as={Link} to="/menu">
              Explore Menu
            </Button>

            <Button as={Link} to="/blog" variant="secondary">
              View all articles
            </Button>
          </div>
        </div>
      </article>
    </Section>
  );
}