import { BadgeInfoIcon, BotIcon, ChartAreaIcon, GemIcon, Layers2Icon, ShieldCheckIcon } from "lucide-react";

export const signInRoute = '/sign-in'

export const routes = [
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
        href: "analytics",
        label: "Analytics",
        icon: ChartAreaIcon,
    },
    {
        href: "billing",
        label: "Billing",
        icon: GemIcon
    },
    {
        href: "about",
        label: "About",
        icon: BadgeInfoIcon
    }
] 