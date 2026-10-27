import type { Role } from "../../types/user";

;
type NavItem = {
    to: string
    label: string
    roles: Role[]
};

export const navLinks: NavItem[] = [
    { to: "/", label: "דף הבית", roles: ["GUEST", "CUSTOMER", "ADMIN"] },
    { to: "/register", label: "הרשמה", roles: ["GUEST"] },
    { to: "/login", label: "התחברות", roles: ["GUEST"] },
    { to: "/my-bookings", label: "ההזמנות שלי", roles: ["CUSTOMER"] },
    { to: "/admin/rooms", label: "ניהול חדרים", roles: ["ADMIN"] },
    { to: "/admin/bookings", label: "ניהול הזמנות", roles: ["ADMIN"] },
    { to: "/admin/rooms/new", label: "הוספת חדר חדש", roles: ["ADMIN"] },
]