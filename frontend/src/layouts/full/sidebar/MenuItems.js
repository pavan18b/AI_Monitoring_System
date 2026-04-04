import {
  IconLayoutDashboard,
  IconTypography,
  IconCopy,
  IconMoodHappy,
  IconUserPlus,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },

  {
    navlabel: true,
    subheader: "Student",
  },
  {
    id: uniqueId(),
    title: "Exams",
    icon: IconTypography,
    href: "/exam",
  },

  // 🔥 FIX HERE
  {
    id: uniqueId(),
    title: "Result",
    icon: IconCopy,
    href: "/result", // ✅ MUST MATCH ROUTER
  },

  {
    navlabel: true,
    subheader: "Teacher",
  },
  {
    id: uniqueId(),
    title: "Create Exam",
    icon: IconMoodHappy,
    href: "/create-exam",
  },
  {
    id: uniqueId(),
    title: "Exam Logs",
    icon: IconUserPlus,
    href: "/exam-logs",
  },
];

export default Menuitems;