"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import MemberCard from "@/components/MemberCard";
import TeamYearPicker from "@/components/TeamYearPicker";
import { sortYearsDesc } from "@/lib/years";
import {
  sortMembersBySeniorityAndName,
  sortTeamsForDisplay,
} from "@/lib/team-order";
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
  const years = useMemo(
    () => sortYearsDesc(teamData.members.map((m) => m.memberYear)),
    [teamData.members],
  );

  const latestYear = years[0] ?? new Date().getFullYear();
  const [activeYear, setActiveYear] = useState<number>(latestYear);

  const filteredMembers = teamData.members.filter((m) => m.memberYear === activeYear);

  const displayTeams = sortTeamsForDisplay(
    teamData.teams.filter((t) => t.year === activeYear),
  );

  const getTeamMembers = (teamId: string) => {
    const members = filteredMembers.filter((m) => m.teamId === teamId);
    if (teamId.startsWith("t_exec") || teamId.includes("mentor")) {
      return sortMembersBySeniorityAndName(members);
    }
    return [...members].sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <div className="min-h-screen pt-40 pb-20 bg-white dark:bg-citc-navy transition-colors duration-300">
      <div className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-citc-navy dark:text-white mb-4">
            Meet the Team
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Meet the people who run CITC at NCIT.
          </p>
        </div>

        <div id="team-roster" className="space-y-24 scroll-mt-32">
          {displayTeams.length === 0 ? (
            <p className="text-center text-slate-500 dark:text-slate-400 py-12">
              No team roster found for academic year {activeYear}.
            </p>
          ) : (
            displayTeams.map((team) => {
              const teamMembers = getTeamMembers(team.id);
              if (teamMembers.length === 0) return null;

              const isSmallTeam = teamMembers.length <= 4;

              return (
                <section key={team.id} id={team.id} className="scroll-mt-32">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                    <h2 className="text-2xl md:text-3xl font-bold text-citc-navy dark:text-white text-center px-4 shrink-0">
                      {team.name}
                    </h2>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                  </div>

                  <motion.div
                    variants={gridContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className={`grid gap-8 ${
                      isSmallTeam
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    }`}
                  >
                    {teamMembers.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        priority={team.id === "t_patron"}
                      />
                    ))}
                  </motion.div>
                </section>
              );
            })
          )}
        </div>

        <TeamYearPicker
          members={teamData.members}
          activeYear={activeYear}
          onSelectYear={setActiveYear}
        />
      </div>
    </div>
  );
}
