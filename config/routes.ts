import { BadgeInfoIcon, BotIcon, ChartAreaIcon, CoinsIcon, HomeIcon, Layers2Icon, ShieldCheckIcon } from "lucide-react";

export const signInRoute = '/sign-in'

export const routes = [
    {
        href: "",
        label: "Home",
        icon: HomeIcon,
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
        href: "analytics",
        label: "Analytics",
        icon: ChartAreaIcon,
    },
    {
        href: "billing",
        label: "Billing",
        icon: CoinsIcon
    },
    {
        href: "about",
        label: "About",
        icon: BadgeInfoIcon
    }
] 