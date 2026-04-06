import { createFileRoute } from "@tanstack/react-router";
import { mockDashboardData } from "#/data/dashboard";
import { HeroCard } from "#/components/dashboard/HeroCard";
import { JournalList } from "#/components/dashboard/JournalList";
import { ModuleMap } from "#/components/dashboard/ModuleMap";
import { NextModuleCard } from "#/components/dashboard/NextModuleCard";
import { useSuspenseQuery } from "@tanstack/react-query"


export const Route = createFileRoute('/_app/dashboard')({
    loader: async ({ context: { queryClient } }) => {
        await queryClient.ensureQueryData({
            queryKey: ['dashboard'],
            queryFn: () => mockDashboardData,
        })
    },
    component: Dashboard,
});


function Dashboard() {
    const { data } = useSuspenseQuery({
        queryKey: ['dashboard'],
        queryFn: () => mockDashboardData,
    });
    const { user, journal, modules, nextModule } = data;
    return (
        <div className="page-wrap py-8 space-y-6">
            <HeroCard name={user.name} goal={user.goal} />
            <JournalList journalEntries={journal} />
            <ModuleMap modules={modules} />
            <NextModuleCard nextModule={nextModule} />
        </div>
    );
}