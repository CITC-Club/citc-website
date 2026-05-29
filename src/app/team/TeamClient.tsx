"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MemberCard from "@/components/MemberCard";
import type { TeamData } from "@/types";

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

interface TeamClientProps {
  teamData: TeamData;
}

export default function TeamClient({ teamData }: TeamClientProps) {
  const [activeYear, setActiveYear] = useState<number | null>(null);

  const years = [...new Set(teamData.members.map((m) => m.memberYear))].sort((a, b) => b - a);

  const filteredMembers = activeYear
    ? teamData.members.filter((m) => m.memberYear === activeYear)
    : teamData.members;

  const getTeamMembers = (teamId: string) =>
    filteredMembers
      .filter((m) => m.teamId === teamId)
      .sort((a, b) => {
        if (a.collegeYear && b.collegeYear) {
          if (b.collegeYear !== a.collegeYear) return b.collegeYear - a.collegeYear;
        }
        return a.name.localeCompare(b.name);
      });

  const groupByYear = (members: typeof teamData.members) => {
    const grouped: Record<number, typeof teamData.members> = {};
    members.forEach((member) => {
      if (member.collegeYear) {
        if (!grouped[member.collegeYear]) grouped[member.collegeYear] = [];
        grouped[member.collegeYear].push(member);
      }
    });
    return grouped;
  };

  return (
    <div className="min-h-screen pt-40 pb-20 bg-white dark:bg-[#0f172a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 dark:from-white dark:via-cyan-100 dark:to-cyan-200 mb-6">
            Meet the Team
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
            The passionate individuals behind CITC who work tirelessly to bring you the best tech events and workshops.
          </p>
        </div>

        {years.length > 1 && (
          <div className="flex justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveYear(null)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!activeYear ? "bg-cyan-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
            >
              All Years
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeYear === year ? "bg-cyan-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
              >
                {year}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-24">
          {teamData.teams.map((team) => {
            const teamMembers = getTeamMembers(team.id);
            if (teamMembers.length === 0) return null;

            const isSmallTeam = teamMembers.length <= 4;
            const isExecutiveTeam = team.id === "t_exec_2025";
            const groupedMembers = isExecutiveTeam ? groupByYear(teamMembers) : null;

            return (
              <section key={team.id} id={team.id} className="scroll-mt-28">
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-cyan-500/30" />
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center min-w-max px-4">
                    {team.name}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 via-cyan-500/30 to-transparent" />
                </div>

                {isExecutiveTeam && groupedMembers ? (
                  <div className="space-y-16">
                    {[4, 3, 2, 1].map((year) => {
                      const yearMembers = groupedMembers[year];
                      if (!yearMembers || yearMembers.length === 0) return null;

                      return (
                        <div key={year}>
                          <h3 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-6 text-center">
                            <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                              Year {year}
                            </span>
                          </h3>
                          <motion.div
                            variants={gridContainerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                          >
                            {yearMembers.map((member) => (
                              <MemberCard key={member.id} member={member} />
                            ))}
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <motion.div
                    variants={gridContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className={`grid gap-8 ${isSmallTeam ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}
                  >
                    {teamMembers.map((member) => (
                      <MemberCard key={member.id} member={member} priority={team.id === "t_patron"} />
                    ))}
                  </motion.div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
