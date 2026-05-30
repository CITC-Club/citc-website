import Link from "next/link";
import { ArrowLeft, Mail, Globe } from "lucide-react";
import { Github, Linkedin, Instagram, Facebook } from "@/components/Icons";
import MediaImage from "@/components/MediaImage";
import { getMemberPhotoUrl } from "@/lib/media";
import { memberProfilePath } from "@/lib/member-slug";
import { absoluteUrl } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/site-config";
import type { Member, Team } from "@/types";

function normalizeSocialUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

interface MemberProfileProps {
  member: Member;
  team: Team | null;
}

export default function MemberProfile({ member, team }: MemberProfileProps) {
  const photoUrl = getMemberPhotoUrl(member);
  const profileUrl = absoluteUrl(memberProfilePath(member));
  const roleLine =
    member.title ||
    member.department ||
    (member.collegeYear
      ? `Year ${member.collegeYear} · ${member.type}`
      : member.type);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    email: member.email,
    jobTitle: member.type,
    url: profileUrl,
    image: photoUrl ? absoluteUrl(photoUrl.split("?")[0] ?? photoUrl) : undefined,
    affiliation: {
      "@type": "Organization",
      name: SITE_CONFIG.fullName,
      url: SITE_CONFIG.url,
    },
    ...(team
      ? {
          memberOf: {
            "@type": "OrganizationRole",
            roleName: team.name,
          },
        }
      : {}),
  };

  return (
    <article className="min-h-screen pt-32 pb-20 bg-white dark:bg-citc-navy transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="site-container max-w-4xl">
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-slate-500 dark:text-slate-400">
            <li>
              <Link href="/team" className="hover:text-citc-blue transition-colors">
                Team
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href={`/team/${member.memberYear}`}
                className="hover:text-citc-blue transition-colors"
              >
                {member.memberYear}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-citc-navy dark:text-white font-medium truncate max-w-[200px] sm:max-w-none">
              {member.name}
            </li>
          </ol>
        </nav>

        <Link
          href={`/team/${member.memberYear}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-citc-blue mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {member.memberYear} team
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 items-start">
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg bg-slate-100 dark:bg-slate-800 aspect-[3/4] max-w-sm mx-auto md:mx-0 w-full">
            {photoUrl ? (
              <MediaImage
                src={photoUrl}
                alt={member.name}
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-lg">
                No photo
              </div>
            )}
          </div>

          <div className="space-y-6">
            <header>
              <p className="text-sm font-semibold uppercase tracking-wider text-citc-blue mb-2">
                {team?.name ?? "CITC"} · {member.memberYear}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-citc-navy dark:text-white">
                {member.name}
              </h1>
              <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                {roleLine}
              </p>
            </header>

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-citc-blue text-white text-sm font-semibold hover:bg-citc-blue/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
              {member.socials?.website && (
                <a
                  href={normalizeSocialUrl(member.socials.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-citc-blue transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Website
                </a>
              )}
            </div>

            {(member.socials?.github ||
              member.socials?.linkedin ||
              member.socials?.instagram ||
              member.socials?.facebook) && (
              <div>
                <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Connect
                </h2>
                <div className="flex flex-wrap gap-3">
                  {member.socials.github && (
                    <a
                      href={normalizeSocialUrl(member.socials.github)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-citc-blue text-slate-700 dark:text-slate-200 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={normalizeSocialUrl(member.socials.linkedin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-citc-blue text-slate-700 dark:text-slate-200 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a
                      href={normalizeSocialUrl(member.socials.instagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-citc-blue text-slate-700 dark:text-slate-200 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {member.socials.facebook && (
                    <a
                      href={normalizeSocialUrl(member.socials.facebook)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-citc-blue text-slate-700 dark:text-slate-200 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
