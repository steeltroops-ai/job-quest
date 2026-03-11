"use client";
import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { T } from "@/shared/theme";
import { JobApplication } from "@/features/jobs/types";
import { weekOf } from "@/features/jobs/utils";
import { STATUSES, STATUS_CONFIG } from "@/features/jobs/constants";
import { Pane, Label, StatusDot } from "@/shared/components/ui";

interface StatsViewProps {
  apps: JobApplication[];
  submitted: number;
  interviews: number;
  offers: number;
  total: number;
  iRate: number | string;
  oRate: number | string;
}

export function StatsView({ apps, submitted, interviews, offers, total, iRate, oRate }: StatsViewProps) {
  const weeklyChart = useMemo(() => {
    const map: Record<string, number> = {};
    apps.filter(a => a.status !== "Wishlist").forEach(a => { const w = weekOf(a.date); map[w] = (map[w]||0)+1; });
    return Object.entries(map).sort(([a],[b])=>a.localeCompare(b)).slice(-8).map(([w,c])=>({w:w.slice(5),c}));
  }, [apps]);

  const regionChart = useMemo(() => {
    const map: Record<string, number> = {};
    apps.filter(a=>a.status!=="Wishlist").forEach(a => { const r=a.region||"Any"; map[r]=(map[r]||0)+1; });
    return Object.entries(map).map(([n,v])=>({n,v})).sort((a,b)=>b.v-a.v);
  }, [apps]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {/* Funnel */}
        <Pane style={{ flex: 1, minWidth: 260 }} pad="22px 24px">
          <Label style={{ marginBottom: 16 }}>Conversion Funnel</Label>
          {[
            { name: "Submitted", val: submitted, color: T.text2 },
            { name: "OA / Test", val: apps.filter(a => ["OA / Test", "Interview", "Offer"].includes(a.status)).length, color: T.purple },
            { name: "Interview", val: interviews, color: T.orange },
            { name: "Offer", val: offers, color: T.green },
          ].map(({ name, val, color }) => (
            <div key={name} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: T.text2 }}>{name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color, fontFamily: T.mono }}>{val}</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${submitted > 0 ? (val / submitted) * 100 : 0}%`, background: color, opacity: 0.75, borderRadius: 2, transition: "width 0.7s cubic-bezier(0.34,1.56,0.64,1)" }} />
              </div>
            </div>
          ))}
          <div className="div-line" style={{ margin: "16px 0" }} />
          <div style={{ display: "flex", gap: 20 }}>
            <div><div style={{ fontSize: 20, fontWeight: 800, fontFamily: T.mono, color: T.orange }}>{iRate}%</div><Label style={{ marginBottom: 0 }}>Interview rate</Label></div>
            <div><div style={{ fontSize: 20, fontWeight: 800, fontFamily: T.mono, color: T.green }}>{oRate}%</div><Label style={{ marginBottom: 0 }}>Offer rate</Label></div>
          </div>
        </Pane>

        {/* Status breakdown */}
        <Pane style={{ flex: 1, minWidth: 220 }} pad="22px 24px">
          <Label style={{ marginBottom: 16 }}>By Status</Label>
          {STATUSES.map(s => {
            const cnt = apps.filter(a => a.status === s).length;
            const cfg = STATUS_CONFIG[s];
            if (!cnt || !cfg) return null;
            return (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <StatusDot status={s} size={6} />
                <span style={{ flex: 1, fontSize: 11, color: T.text2 }}>{s}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: cfg.c, fontFamily: T.mono, minWidth: 16 }}>{cnt}</span>
                <div style={{ width: 48, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${total > 0 ? (cnt / total) * 100 : 0}%`, background: cfg.c, opacity: 0.65, borderRadius: 2 }} />
                </div>
              </div>
            );
          })}
        </Pane>

        {/* Region */}
        <Pane style={{ flex: 1, minWidth: 180 }} pad="22px 24px">
          <Label style={{ marginBottom: 16 }}>By Region</Label>
          {regionChart.length === 0 ? <div style={{ fontSize: 11, color: T.text4 }}>No data yet</div>
            : regionChart.map(({ n, v }) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ flex: 1, fontSize: 11, color: T.text2 }}>{n}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.text1, fontFamily: T.mono }}>{v}</span>
                <div style={{ width: 48, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${submitted > 0 ? (v / submitted) * 100 : 0}%`, background: "rgba(245,245,247,0.35)", borderRadius: 2 }} />
                </div>
              </div>
            ))}
        </Pane>
      </div>

      <Pane pad="22px 24px">
        <Label style={{ marginBottom: 18 }}>Weekly Velocity</Label>
        {weeklyChart.length === 0 ? (
          <div style={{ fontSize: 12, color: T.text4, padding: "20px 0" }}>Start applying to see your velocity here</div>
        ) : (
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={weeklyChart} barSize={16}>
              <XAxis dataKey="w" tick={{ fill: "rgba(245,245,247,0.25)", fontSize: 9, fontFamily: T.mono }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(245,245,247,0.25)", fontSize: 9, fontFamily: T.mono }} axisLine={false} tickLine={false} width={16} />
              <Tooltip contentStyle={{ background: "#111116", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontFamily: T.mono, fontSize: 11, color: T.text1 }} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="c" fill="rgba(245,245,247,0.30)" radius={[3, 3, 0, 0]}>
                {weeklyChart.map((e, i) => (
                  <rect key={i} fill={i === weeklyChart.length - 1 ? "rgba(245,245,247,0.55)" : "rgba(245,245,247,0.22)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </Pane>
    </div>
  );
}
