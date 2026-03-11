"use client";
import React, { useState, useMemo } from "react";
import { JobApplication, SortByOptions } from "@/features/jobs/types";
import { daysAgo, isStale } from "@/features/jobs/utils";
import { STATUSES, REGIONS, STATUS_CONFIG, createEmptyApplication } from "@/features/jobs/constants";
import { T } from "@/shared/theme";
import { Pane, StatusBadge, Label, MetaVal, inputStyles, Select } from "@/shared/components/ui";

interface TrackerTableProps {
  apps: JobApplication[];
  onUpdateStatus: (id: number, status: string) => void;
  onEdit: (app: JobApplication) => void;
  onDelete: (id: number) => void;
  onUpdateFull?: (app: JobApplication) => void;
}

export function TrackerTable({ apps, onUpdateStatus, onEdit, onDelete, onUpdateFull }: TrackerTableProps) {
  const [search, setSearch] = useState("");
  const [regionF, setRegionF] = useState("Any");
  const [sortBy, setSortBy] = useState<SortByOptions>("date");
  const [statusF, setStatusF] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);

  // Quick Add State
  const [quickAdd, setQuickAdd] = useState({ company: "", role: "", status: "Applied" });

  const inp = { ...inputStyles, padding: "8px 14px", fontSize: 13, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" };

  const cellInput = {
    background: "transparent", border: "none", color: "inherit", 
    fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", 
    outline: "none", width: "100%", padding: "2px 0", cursor: "text"
  };

  const filtered = useMemo(() => apps
    .filter(a => statusF === "All" || a.status === statusF)
    .filter(a => regionF === "Any" || a.region === regionF)
    .filter(a => !search || [a.company, a.role, a.tags].join(" ").toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === "date" ? new Date(b.date).getTime() - new Date(a.date).getTime() : a.company.localeCompare(b.company)),
  [apps, statusF, regionF, search, sortBy]);

  const handleQuickAdd = () => {
    if (!quickAdd.company.trim() || !quickAdd.role.trim() || !onUpdateFull) return;
    const newApp = { ...createEmptyApplication(), company: quickAdd.company, role: quickAdd.role, status: quickAdd.status, date: new Date().toISOString().slice(0, 10) } as JobApplication;
    onUpdateFull(newApp);
    setQuickAdd({ company: "", role: "", status: "Applied" });
  };

  const handleInlineChange = (app: JobApplication, field: keyof JobApplication, value: string) => {
    if (!onUpdateFull) return;
    onUpdateFull({ ...app, [field]: value });
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <input placeholder="Search company, role, tag..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ ...inp, flex: 1, minWidth: 180 }} />
        <Select value={regionF} onChange={val => setRegionF(val)} options={REGIONS} style={{ width: 140 }} />
        <Select value={sortBy} onChange={val => setSortBy(val as SortByOptions)} options={["date", "company"]} style={{ width: 140 }} />
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 16 }}>
        {["All", ...STATUSES].map(s => {
          const cfg = STATUS_CONFIG[s];
          return (
            <button key={s} className={`fpill${statusF === s ? " on" : ""}`} onClick={() => setStatusF(s)}
              style={statusF === s && s !== "All" && cfg ? { borderColor: `${cfg.c}55`, color: cfg.c, background: `${cfg.c}12` } : {}}>
              {s}
            </button>
          );
        })}
      </div>

      <Pane pad="0" style={{ overflow: "visible" }}>
        <div className="trow-grid" style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {["Company", "Role", "Region", "Age", "Resume", "Status"].map((h, i) => (
            <Label key={h} style={{ marginBottom: 0, ...(i > 1 && i < 4 ? { display: "none" } : i === 2 || i === 3 ? {} : {}) }} className={i === 2 || i === 3 ? "hide-sm" : ""}>{h}</Label>
          ))}
        </div>
        
        {/* Quick Add Row */}
        <div className="trow-grid" style={{ padding: "8px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}>
          <div><input placeholder="New Company..." value={quickAdd.company} onChange={e => setQuickAdd(p => ({...p, company: e.target.value}))} onKeyDown={e => e.key === "Enter" && handleQuickAdd()} style={{ ...cellInput, fontSize: 13, fontWeight: 700, color: T.text1 }} /></div>
          <div><input placeholder="Role..." value={quickAdd.role} onChange={e => setQuickAdd(p => ({...p, role: e.target.value}))} onKeyDown={e => e.key === "Enter" && handleQuickAdd()} style={{ ...cellInput, fontSize: 12, color: T.text2 }} /></div>
          <div className="hide-sm" style={{ fontSize: 10, color: T.text4, fontFamily: T.mono }}>—</div>
          <div className="hide-sm" style={{ fontSize: 10, color: T.text4, fontFamily: T.mono }}>0d</div>
          <div style={{ fontSize: 10, color: T.text4, fontFamily: T.mono }}>—</div>
          <Select value={quickAdd.status} onChange={val => { setQuickAdd(p => ({...p, status: val})); setTimeout(handleQuickAdd, 50); }} options={STATUSES} style={{ height: "100%", padding: 0 }} />
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: "60px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.15 }}>○</div>
            <div style={{ fontSize: 12, color: T.text4 }}>No applications match this filter</div>
          </div>
        ) : (
          filtered.map((app, idx) => {
            const days = daysAgo(app.date);
            const stale = isStale(app);
            const open = expanded === app.id;
            return (
              <div key={app.id}>
                <div className="trow trow-grid" style={{ padding: "13px 18px", background: stale ? "rgba(255,59,48,0.03)" : "transparent" }}>
                  <div style={{ overflow: "hidden", display: "flex", gap: 6, alignItems: "center" }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: "rgba(255,255,255,0.2)", cursor: "pointer", flexShrink: 0 }} onClick={() => setExpanded(open ? null : app.id)} />
                    <input value={app.company} onChange={e => handleInlineChange(app, "company", e.target.value)} style={{ ...cellInput, fontWeight: 700, fontSize: 13, color: T.text1 }} />
                    {stale && <span style={{ fontSize: 9, color: T.red, fontFamily: T.mono, fontWeight: 700 }}>STALE</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input value={app.role} onChange={e => handleInlineChange(app, "role", e.target.value)} style={{ ...cellInput, fontSize: 12, color: T.text2 }} />
                  </div>
                  <div className="hide-sm" style={{ fontSize: 10, color: T.text4, fontFamily: T.mono }}>{app.region || "—"}</div>
                  <div className="hide-sm" style={{ fontSize: 10, fontFamily: T.mono, color: days != null && days > 30 ? T.red : days != null && days > 14 ? "rgba(255,159,10,0.8)" : T.text4 }}>{days != null ? `${days}d` : "—"}</div>
                  <div style={{ fontSize: 10, color: T.blue, fontFamily: T.mono, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{app.resume || "—"}</div>
                  <Select value={app.status} onChange={val => onUpdateStatus(app.id, val)} options={STATUSES} style={{ fontSize: 10, fontWeight: 600, fontFamily: T.mono }} />
                </div>

                {open && (
                  <div style={{ padding: "16px 20px 20px", background: "rgba(255,255,255,0.018)", borderTop: "1px solid rgba(255,255,255,0.055)", borderBottom: idx < filtered.length - 1 ? "1px solid rgba(255,255,255,0.055)" : "none" }}>
                    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                      <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 12 }}>
                        {app.tags && (
                          <div>
                            <Label>Tags</Label>
                            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                              {app.tags.split(",").map(t => t.trim()).filter(Boolean).map(t => (
                                <span key={t} style={{ fontSize: 10, padding: "2px 9px", borderRadius: 20, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: T.text2, fontFamily: T.mono }}>{t}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                          <MetaVal label="Deadline" value={app.deadline} color={T.orange} />
                          <MetaVal label="Follow-Up" value={app.followUp} color={T.blue} />
                          <MetaVal label="Salary" value={app.salary} color={T.green} />
                          <MetaVal label="Cover Letter" value={app.coverLetter} color={T.text2} />
                          <MetaVal label="Source" value={app.source} color={T.text2} />
                          <MetaVal label="Contact" value={app.contact} color={T.purple} />
                        </div>
                        {app.link && (
                          <div>
                            <Label>Job URL</Label>
                            <a href={app.link} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: T.blue, fontFamily: T.mono, wordBreak: "break-all" }}>{app.link}</a>
                          </div>
                        )}
                        {app.notes && <div><Label>Notes</Label><p style={{ fontSize: 12, color: T.text2, lineHeight: 1.7 }}>{app.notes}</p></div>}
                      </div>
                      <div style={{ minWidth: 180 }}>
                        <Label>Update Status</Label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
                          {STATUSES.map(s => {
                            const cfg = STATUS_CONFIG[s];
                            return (
                            <button key={s} className="sq-btn" onClick={e => { e.stopPropagation(); onUpdateStatus(app.id, s); }}
                              style={app.status === s && cfg ? { borderColor: `${cfg.c}55`, color: cfg.c, background: `${cfg.c}12` } : {}}>
                              {s}
                            </button>
                          )})}
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="btn-ghost" style={{ fontSize: 11 }} onClick={e => { e.stopPropagation(); onEdit(app); }}>Advanced Edit</button>
                          <button onClick={e => { e.stopPropagation(); onDelete(app.id); }} style={{ background: "transparent", border: `1px solid rgba(255,59,48,0.22)`, borderRadius: 8, padding: "7px 14px", color: T.red, fontSize: 11, cursor: "pointer", fontFamily: T.sans, fontWeight: 600 }}>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {idx < filtered.length - 1 && !open && <div className="div-line" />}
              </div>
            );
          })
        )}
      </Pane>
    </div>
  );
}
