"use client";
import React, { useState, useEffect } from "react";
import { JobApplication } from "../types";
import { T } from "../../../shared/theme";
import { STATUSES, ROUNDS, TYPES, REGIONS, PRIORITIES, SOURCES, RESUMES, CL_OPTS, createEmptyApplication } from "../constants";
import { inputStyles, labelStyles } from "../../../shared/components/ui";

interface JobFormProps {
  initialData: JobApplication | null;
  onSave: (app: JobApplication) => void;
  onCancel: () => void;
}

export function JobForm({ initialData, onSave, onCancel }: JobFormProps) {
  const [form, setForm] = useState<JobApplication>(createEmptyApplication() as JobApplication);

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData });
    } else {
      setForm(createEmptyApplication() as JobApplication);
    }
  }, [initialData]);

  const f = (k: keyof JobApplication, v: string) => setForm(p => ({ ...p, [k]: v }));
  const submit = () => onSave(form);

  const inp = inputStyles;
  const lbl = labelStyles;

  return (
    <div onClick={onCancel} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} className="pane pane-elevated" style={{ width: "min(620px,100%)", maxHeight: "92vh", overflowY: "auto", borderRadius: 18, padding: 0 }}>
        <div className="pane-sheen" style={{ borderRadius: 18 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 26px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: T.text1, letterSpacing: "-0.02em" }}>
              {initialData ? "Edit Application" : "New Application"}
            </h2>
            <button onClick={onCancel} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, width: 30, height: 30, color: T.text3, fontSize: 16, cursor: "pointer", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>
          <div style={{ padding: "22px 26px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {(Object.entries({ company: "Company *", role: "Role / Position *" }) as [keyof JobApplication, string][]).map(([k, l]) => (
                <div key={k}><label style={lbl}>{l}</label><input type="text" value={(form[k] as any) ?? ""} onChange={e => f(k, e.target.value)} style={inp} /></div>
              ))}
              <div><label style={lbl}>Location</label><input placeholder="Tokyo, Japan" value={form.location ?? ""} onChange={e => f("location", e.target.value)} style={inp} /></div>
              <div><label style={lbl}>Region</label><select value={form.region} onChange={e => f("region", e.target.value)} style={inp}>{REGIONS.map(r => <option key={r}>{r}</option>)}</select></div>
              <div><label style={lbl}>Job Type</label><select value={form.type} onChange={e => f("type", e.target.value)} style={inp}>{TYPES.map(t => <option key={t}>{t}</option>)}</select></div>
              <div><label style={lbl}>Status</label><select value={form.status} onChange={e => f("status", e.target.value)} style={inp}>{STATUSES.map(s => <option key={s}>{s}</option>)}</select></div>
              <div><label style={lbl}>Interview Round</label><select value={form.round ?? ""} onChange={e => f("round", e.target.value)} style={inp}>{ROUNDS.map(r => <option key={r} value={r ?? ""}>{r || "— none —"}</option>)}</select></div>
              <div><label style={lbl}>Priority</label><select value={form.priority} onChange={e => f("priority", e.target.value)} style={inp}>{PRIORITIES.map(p => <option key={p}>{p}</option>)}</select></div>
              <div><label style={lbl}>Resume Version</label><select value={form.resume ?? ""} onChange={e => f("resume", e.target.value)} style={inp}>{RESUMES.map(r => <option key={r} value={r ?? ""}>{r || "— not set —"}</option>)}</select></div>
              <div><label style={lbl}>Cover Letter</label><select value={form.coverLetter ?? ""} onChange={e => f("coverLetter", e.target.value)} style={inp}>{CL_OPTS.map(c => <option key={c} value={c ?? ""}>{c || "— not set —"}</option>)}</select></div>
              <div><label style={lbl}>Date Applied</label><input type="date" value={form.date} onChange={e => f("date", e.target.value)} style={inp} /></div>
              <div><label style={lbl}>Application Deadline</label><input type="date" value={form.deadline ?? ""} onChange={e => f("deadline", e.target.value)} style={inp} /></div>
              <div><label style={lbl}>Follow-Up Date</label><input type="date" value={form.followUp ?? ""} onChange={e => f("followUp", e.target.value)} style={inp} /></div>
              <div><label style={lbl}>Salary / Range</label><input placeholder="¥8M / $120k" value={form.salary ?? ""} onChange={e => f("salary", e.target.value)} style={inp} /></div>
              <div><label style={lbl}>Contact / Recruiter</label><input placeholder="Name, email or LinkedIn" value={form.contact ?? ""} onChange={e => f("contact", e.target.value)} style={inp} /></div>
              <div><label style={lbl}>Source</label><select value={form.source ?? ""} onChange={e => f("source", e.target.value)} style={inp}>{SOURCES.map(s => <option key={s} value={s ?? ""}>{s || "— not set —"}</option>)}</select></div>
              <div style={{ gridColumn: "1/-1" }}><label style={lbl}>Job URL</label><input type="url" value={form.link ?? ""} onChange={e => f("link", e.target.value)} style={inp} /></div>
              <div style={{ gridColumn: "1/-1" }}><label style={lbl}>Required Skill Tags (comma-separated)</label><input placeholder="ROS2, Python, SLAM, Next.js..." value={form.tags ?? ""} onChange={e => f("tags", e.target.value)} style={inp} /></div>
              <div style={{ gridColumn: "1/-1" }}><label style={lbl}>Notes</label><textarea value={form.notes ?? ""} onChange={e => f("notes", e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} /></div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 20, justifyContent: "flex-end" }}>
              <button className="btn-ghost" onClick={onCancel}>Cancel</button>
              <button className="btn-primary" onClick={submit}>{initialData ? "Save Changes" : "Add Application"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
