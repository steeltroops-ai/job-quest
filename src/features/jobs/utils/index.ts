import { JobApplication } from "../types";

export const daysAgo = (d?: string | null): number | null => {
  if (!d) return null;
  return Math.floor((Date.now() - new Date(d).getTime()) / 86400000);
};

export const isStale = (a: JobApplication): boolean => {
  const days = daysAgo(a.date);
  return !["Rejected","Ghosted","Offer","Wishlist"].includes(a.status) && (days !== null && days > 14);
};

export const weekOf = (d: string): string => {
  const dt = new Date(d);
  dt.setDate(dt.getDate() - dt.getDay());
  return dt.toISOString().slice(0,10);
};
