import { BadgeInfoIcon, BotIcon, ChartAreaIcon, GemIcon, Layers2Icon, ShieldCheckIcon } from "lucide-react";

export const signInRoute = '/sign-in'

export const routes = [
    {
        href: "analytics",
        label: "Analytics",
        icon: ChartAreaIcon,
    },
    {
        href: "workflows",
        label: "Workflows",
        icon: Layers2Icon,
    },
    {
        href: "ai-agents",
        label: "AI agents",
        icon: BotIcon
    },
    {
        href: "secrets",
        label: "Secrets",
        icon: ShieldCheckIcon
    },
    {
        href: "credits",
        label: "Credits",
        icon: GemIcon
    },
    {
        href: "about",
        label: "About",
        icon: BadgeInfoIcon
    }
]