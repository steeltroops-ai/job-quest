import { T } from "../../../shared/theme";

export const STATUS_CONFIG: Record<string, { c: string; dot: string }> = {
  "Wishlist":  { c: "rgba(245,245,247,0.42)", dot: "rgba(245,245,247,0.28)" },
  "Applied":   { c: T.blue,   dot: T.blue   },
  "OA / Test": { c: T.purple, dot: T.purple },
  "Interview": { c: T.orange, dot: T.orange },
  "Offer":     { c: T.green,  dot: T.green  },
  "Rejected":  { c: T.red,    dot: T.red    },
  "Ghosted":   { c: "rgba(245,245,247,0.22)", dot: "rgba(245,245,247,0.15)" },
};

export const STATUSES   = Object.keys(STATUS_CONFIG);
export const ROUNDS     = ["","HR Screen","Round 1","Round 2","Round 3","Final Round","Technical","System Design","Offer Negotiation"];
export const TYPES      = ["Full-time","Part-time","Internship","Research","Contract","Fellowship","PhD","Masters"];
export const REGIONS    = ["Any","India","Japan","Singapore","Europe","USA","China","Remote"];
export const PRIORITIES = ["High","Medium","Low"];
export const SOURCES    = ["","LinkedIn","Company Site","Referral","GitHub Jobs","Wellfound","Handshake","Twitter / X","Indeed","Other"];
export const RESUMES    = ["","Fullstack","Fullstack (Copy)","ML","Robotics","Custom"];
export const CL_OPTS    = ["","None","Generic","Customized","Tailored"];

// We will export a factory function instead of a single object reference to ensure immutability
export function createEmptyApplication() {
  return {
    id: 0,
    company: "", role: "", location: "", region: "Any", type: "Full-time",
    status: "Applied", round: "", date: new Date().toISOString().slice(0,10),
    deadline: "", followUp: "", link: "", salary: "", contact: "", notes: "",
    priority: "Medium", resume: "", coverLetter: "", source: "", tags: ""
  };
}
