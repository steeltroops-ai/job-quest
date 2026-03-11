"use client";
import React from "react";
import { TrackerTable } from "@/features/jobs/components/TrackerTable";
import { JobForm } from "@/features/jobs/components/JobForm";
import { StatsView } from "@/features/jobs/components/StatsView";
import { GoalsView } from "@/features/jobs/components/GoalsView";
import { useJobStorage } from "@/features/jobs/hooks/useJobStorage";
import { Pane, StatBlock, Label, StatusDot } from "@/shared/components/ui";
import { STATUSES } from "@/features/jobs/constants";
import { T, GlobalStyles } from "@/shared/theme";
import { JobApplication } from "@/features/jobs/types";
import { 
  daysAgo, 
  isStale,
  weekOf
} from "@/features/jobs/utils";

export default function JobTracker() {
  const { apps, goal, loading, addOrUpdateApp, deleteApp, updateAppStatus, updateGoal } = useJobStorage();
  
  const [showForm, setShowForm] = React.useState(false);
  const [editApp, setEditApp] = React.useState<JobApplication | null>(null);
  const [tab, setTab] = React.useState<"tracker" | "kanban" | "stats" | "goals">("tracker");

  const today = new Date().toISOString().slice(0, 10);
  const thisWk = weekOf(today);
  const wkApps = apps.filter(a => weekOf(a.date) === thisWk && a.status !== "Wishlist").length;

  const staleApps = apps.filter(isStale);
  const dueSoon = apps.filter(a => a.deadline && a.deadline >= today && a.deadline <= new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10) && !["Rejected", "Ghosted", "Offer"].includes(a.status));
  const followUpDue = apps.filter(a => a.followUp && a.followUp <= today && !["Rejected", "Ghosted", "Offer"].includes(a.status));

  const total = apps.length;
  const submitted = apps.filter(a => a.status !== "Wishlist").length;
  const active = apps.filter(a => ["Applied", "OA / Test", "Interview"].includes(a.status)).length;
  const interviews = apps.filter(a => ["Interview", "Offer"].includes(a.status)).length;
  const offers = apps.filter(a => a.status === "Offer").length;
  const iRate = submitted > 0 ? ((apps.filter(a => ["OA / Test", "Interview", "Offer"].includes(a.status)).length / submitted) * 100).toFixed(0) : 0;
  const oRate = interviews > 0 ? ((offers / interviews) * 100).toFixed(0) : 0;

  const exportCSV = () => {
    const h = ["Company", "Role", "Location", "Region", "Type", "Status", "Round", "Priority", "Date", "Deadline", "Follow-Up", "Salary", "Contact", "Link", "Resume", "Cover Letter", "Source", "Tags", "Notes"];
    const rows = apps.map(a => [a.company, a.role, a.location, a.region, a.type, a.status, a.round, a.priority, a.date, a.deadline, a.followUp, a.salary, a.contact, a.link, a.resume, a.coverLetter, a.source, a.tags, a.notes].map(v => `"${v || ""}"`).join(","));
    const blob = new Blob([[h.join(","), ...rows].join("\n")], { type: "text/csv" });
    Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "applications.csv" }).click();
  };

  const TABS: [typeof tab, string][] = [["tracker", "Tracker"], ["kanban", "Kanban"], ["stats", "Stats"], ["goals", "Goals"]];

  if (loading) return <div style={{ minHeight: "100vh", background: T.bg }} />;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: T.sans, color: T.text1, boxSizing: "border-box" }}>
      <style>{GlobalStyles}</style>

      <div className="root-bg" style={{ minHeight: "100vh", padding: "24px 20px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: T.text1, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 4 }}>
                Applications
              </h1>
              <p style={{ fontSize: 11, color: T.text4, fontFamily: T.mono }}>
                {total} tracked &middot; {active} active {staleApps.length > 0 ? `· ${staleApps.length} stale` : ""}
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button className="btn-ghost" onClick={exportCSV}>Export CSV</button>
              <button className="btn-primary" onClick={() => { setEditApp(null); setShowForm(true); }}>
                + New Application
              </button>
            </div>
          </div>

          {(dueSoon.length > 0 || followUpDue.length > 0 || staleApps.length > 0) && (
            <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
              {dueSoon.length > 0 && (
                <Pane style={{ flex: 1, minWidth: 200, borderLeft: `3px solid ${T.orange}` }} pad="12px 16px">
                  <div style={{ fontSize: 10, fontWeight: 700, color: T.orange, fontFamily: T.mono, letterSpacing: "0.08em", marginBottom: 5 }}>DEADLINE WITHIN 7 DAYS</div>
                  {dueSoon.map(a => <div key={a.id} style={{ fontSize: 11, color: T.text2 }}>{a.company} &mdash; {a.deadline}</div>)}
                </Pane>
              )}
              {followUpDue.length > 0 && (
                <Pane style={{ flex: 1, minWidth: 200, borderLeft: `3px solid ${T.blue}` }} pad="12px 16px">
                  <div style={{ fontSize: 10, fontWeight: 700, color: T.blue, fontFamily: T.mono, letterSpacing: "0.08em", marginBottom: 5 }}>FOLLOW-UP DUE</div>
                  {followUpDue.map(a => <div key={a.id} style={{ fontSize: 11, color: T.text2 }}>{a.company} &middot; {a.role}</div>)}
                </Pane>
              )}
              {staleApps.length > 0 && (
                <Pane style={{ flex: 1, minWidth: 200, borderLeft: `3px solid rgba(245,245,247,0.18)` }} pad="12px 16px">
                  <div style={{ fontSize: 10, fontWeight: 700, color: T.text3, fontFamily: T.mono, letterSpacing: "0.08em", marginBottom: 5 }}>NO UPDATE IN 14+ DAYS</div>
                  {staleApps.map(a => <div key={a.id} style={{ fontSize: 11, color: T.text3 }}>{a.company} &middot; {daysAgo(a.date)}d ago</div>)}
                </Pane>
              )}
            </div>
          )}

          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            <StatBlock label="Total" value={total} />
            <StatBlock label="Active" value={active} color={T.blue} accent={T.blue} />
            <StatBlock label="Interviews" value={interviews} color={T.orange} accent={T.orange} />
            <StatBlock label="Offers" value={offers} color={T.green} accent={T.green} />
            <StatBlock label="Interview Rate" value={`${iRate}%`} color={T.text2} sub={`${submitted} submitted`} />
            <StatBlock label="Offer Rate" value={`${oRate}%`} color={T.text2} sub="from interviews" />
            
            <Pane style={{ flex: 1, minWidth: 100 }} pad="16px 18px">
              <Label>This Week</Label>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: wkApps >= goal ? T.green : T.text1, fontFamily: T.mono, lineHeight: 1 }}>{wkApps}</span>
                <span style={{ fontSize: 11, color: T.text4, fontFamily: T.mono }}>/ {goal} goal</span>
                <input type="number" min={1} max={99} value={goal}
                  onChange={e => updateGoal(+e.target.value)}
                  style={{ marginLeft: "auto", width: 38, background: "transparent", color:T.text1, border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 5, padding: "3px 6px", fontSize: 11, textAlign: "center" }} />
              </div>
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 3, height: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.min(100, (wkApps / goal) * 100)}%`, background: wkApps >= goal ? T.green : "rgba(245,245,247,0.4)", borderRadius: 3, transition: "width 0.5s cubic-bezier(0.34,1.56,0.64,1)" }} />
              </div>
            </Pane>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div className="seg">
              {TABS.map(([v, l]) => (
                <button key={v} className={`seg-tab${tab === v ? " on" : ""}`} onClick={() => setTab(v)}>{l}</button>
              ))}
            </div>
          </div>

          {tab === "tracker" && (
            <TrackerTable
               apps={apps}
               onDelete={deleteApp}
               onUpdateStatus={updateAppStatus}
               onEdit={(app) => {
                 setEditApp(app);
                 setShowForm(true);
               }}
            />
          )}

          {tab === "kanban" && (
            <div style={{ overflowX: "auto", paddingBottom: 8 }}>
              <div style={{ display: "flex", gap: 10, minWidth: 860 }}>
                {STATUSES.filter(s => s !== "Wishlist").map((col: string) => {
                  const colApps = apps.filter(a => a.status === col);
                  return (
                    <div key={col} style={{ flex: 1, minWidth: 130 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: "0 2px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <StatusDot status={col} size={6} />
                          <span style={{ fontSize: 11, fontWeight: 600, color: T.text2, letterSpacing: "0.01em" }}>{col}</span>
                        </div>
                        <span style={{ fontSize: 10, fontFamily: T.mono, color: T.text4 }}>{colApps.length}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {colApps.map(app => (
                          <Pane key={app.id} style={{ cursor: "pointer" }} pad="13px 14px" radius={10}>
                            <div className="kb-card" onClick={() => { setTab("tracker"); }}>
                              <div style={{ fontWeight: 700, fontSize: 12, color: T.text1, marginBottom: 4, lineHeight: 1.3 }}>{app.company}</div>
                              <div style={{ fontSize: 11, color: T.text3, marginBottom: 8, lineHeight: 1.4 }}>{app.role}</div>
                              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                                {app.region && app.region !== "Any" && <span style={{ fontSize: 9, color: T.text4, fontFamily: T.mono }}>{app.region}</span>}
                                {app.resume && <span style={{ fontSize: 9, color: T.blue, fontFamily: T.mono }}>· {app.resume}</span>}
                              </div>
                              {app.deadline && <div style={{ fontSize: 9, color: T.orange, fontFamily: T.mono, marginTop: 6 }}>Due {app.deadline}</div>}
                            </div>
                          </Pane>
                        ))}
                        {colApps.length === 0 && (
                          <div style={{ padding: "18px 10px", textAlign: "center", color: T.text4, fontSize: 11, border: "1px dashed rgba(255,255,255,0.05)", borderRadius: 10 }}>—</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "stats" && (
            <StatsView 
              apps={apps}
              submitted={submitted}
              interviews={interviews}
              offers={offers}
              total={total}
              iRate={iRate}
              oRate={oRate}
            />
          )}

          {tab === "goals" && (
            <GoalsView 
              submitted={submitted}
              goal={goal}
              wkApps={wkApps}
            />
          )}
        </div>
      </div>

      {showForm && (
        <JobForm
           initialData={editApp}
           onCancel={() => setShowForm(false)}
           onSave={(data) => {
             addOrUpdateApp(data);
             setShowForm(false);
           }}
        />
      )}
    </div>
  );
}