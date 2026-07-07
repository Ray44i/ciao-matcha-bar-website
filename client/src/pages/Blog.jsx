import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import { Section, Eyebrow } from "../components/ui.jsx";

const blogImages = ["/images/pp1.jpg", "/images/pp2.jpg", "/images/pp3.jpg"];

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

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/blog").then(setPosts);
  }, []);

  return (
    <Section>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
        .font-accent { font-family: 'Fraunces', serif; }
      `}</style>

      <div className="relative overflow-hidden rounded-[36px] bg-ciao-gradient-soft border border-white/50 shadow-xl p-8 md:p-14">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-200/40 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <Eyebrow>Blog</Eyebrow>

          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-forest leading-[1.05]">
            From our{" "}
            <span className="font-accent italic font-medium">journal.</span>
          </h1>

          <WaveRule className="w-24 h-4 mt-5 text-clay/70" />

          <p className="mt-5 text-forest/70 max-w-2xl text-lg">
            Stories, rituals, flavor notes and little moments from Ciao Matcha
            Bar.
          </p>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-8">
        {posts.map((p, index) => (
          <Link
            key={p.id}
            to={`/blog/${p.id}`}
            className="group rounded-[32px] bg-white/90 border border-forest/10 overflow-hidden flex flex-col shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            <div className="aspect-[4/3] overflow-hidden bg-pink-50 relative">
              <img
                src={blogImages[index] || "/images/pp1.jpg"}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />

              <div className="absolute top-4 left-4 bg-white/85 backdrop-blur-md rounded-full px-3 py-1 border border-white/50 shadow-sm">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-forest/60">
                  Journal
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-display font-bold text-xl text-forest leading-tight">
                {p.title}
              </h3>

              <p className="text-sm text-forest/60 mt-3 leading-relaxed flex-grow">
                {p.excerpt}
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest group-hover:gap-3 transition-all">
                Read more →
              </span>
            </div>
          </Link>
        ))}

        {posts.length === 0 && (
          <div className="col-span-full rounded-[32px] bg-white/80 border border-forest/10 p-12 text-center shadow-xl">
            <p className="font-display font-bold text-2xl text-forest">
              No articles yet.
            </p>
            <p className="mt-2 text-forest/50">
              Our matcha journal is still steeping.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}