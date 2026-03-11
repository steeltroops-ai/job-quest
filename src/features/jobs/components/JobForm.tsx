"use client";
import React, { useState, useEffect } from "react";
import { JobApplication } from "../types";
import { T } from "../../../shared/theme";
import { STATUSES, ROUNDS, TYPES, REGIONS, PRIORITIES, SOURCES, RESUMES, CL_OPTS, createEmptyApplication } from "../constants";
import { inputStyles, labelStyles, Select } from "../../../shared/components/ui";

interface JobFormProps {
  initialData: JobApplication | null;
  onSave: (app: JobApplication) => void;
  onCancel: () => void;
}

export function JobForm({ initialData, onSave, onCancel }: JobFormProps) {
  const [form, setForm] = useState<JobApplication>(createEmptyApplication() as JobApplication);
  const [showAll, setShowAll] = useState(!!initialData);

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData });
    } else {
      const empty = createEmptyApplication() as JobApplication;
      setForm({ ...empty, date: new Date().toISOString().slice(0, 10) });
    }
  }, [initialData]);

  const f = (k: keyof JobApplication, v: string) => setForm(p => ({ ...p, [k]: v }));
  const submit = () => onSave(form);

  const inp = inputStyles;
  const lbl = labelStyles;

  return (
    <div onClick={onCancel} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, backdropFilter: "blur(40px) saturate(180%)", WebkitBackdropFilter: "blur(40px) saturate(180%)", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} className="pane pane-elevated" style={{ width: "min(620px,100%)", maxHeight: "92vh", overflowY: "auto", padding: 0 }}>
        <div className="pane-sheen" />
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
              <div><label style={lbl}>Job URL</label><input type="url" value={form.link ?? ""} onChange={e => f("link", e.target.value)} style={inp} /></div>
              <div><label style={lbl}>Status</label><Select value={form.status} onChange={val => f("status", val)} options={STATUSES} /></div>
              <div><label style={lbl}>Date Applied</label><input type="date" value={form.date} onChange={e => f("date", e.target.value)} style={inp} /></div>

              {showAll ? (
                <>
                  <div style={{ gridColumn: "1/-1", height: 1, background: "rgba(255,255,255,0.06)", margin: "10px 0" }} />
                  <div><label style={lbl}>Location</label><input placeholder="Tokyo, Japan" value={form.location ?? ""} onChange={e => f("location", e.target.value)} style={inp} /></div>
                  <div><label style={lbl}>Region</label><Select value={form.region} onChange={val => f("region", val)} options={REGIONS} /></div>
                  <div><label style={lbl}>Job Type</label><Select value={form.type} onChange={val => f("type", val)} options={TYPES} /></div>
                  <div><label style={lbl}>Interview Round</label><Select value={form.round ?? ""} onChange={val => f("round", val)} options={ROUNDS.map(r => r || "")} /></div>
                  <div><label style={lbl}>Priority</label><Select value={form.priority} onChange={val => f("priority", val)} options={PRIORITIES} /></div>
                  <div><label style={lbl}>Resume Version</label><Select value={form.resume ?? ""} onChange={val => f("resume", val)} options={RESUMES.map(r => r || "")} /></div>
                  <div><label style={lbl}>Cover Letter</label><Select value={form.coverLetter ?? ""} onChange={val => f("coverLetter", val)} options={CL_OPTS.map(c => c || "")} /></div>
                  <div><label style={lbl}>Application Deadline</label><input type="date" value={form.deadline ?? ""} onChange={e => f("deadline", e.target.value)} style={inp} /></div>
                  <div><label style={lbl}>Follow-Up Date</label><input type="date" value={form.followUp ?? ""} onChange={e => f("followUp", e.target.value)} style={inp} /></div>
                  <div><label style={lbl}>Salary / Range</label><input placeholder="¥8M / $120k" value={form.salary ?? ""} onChange={e => f("salary", e.target.value)} style={inp} /></div>
                  <div><label style={lbl}>Contact / Recruiter</label><input placeholder="Name, email or LinkedIn" value={form.contact ?? ""} onChange={e => f("contact", e.target.value)} style={inp} /></div>
                  <div><label style={lbl}>Source</label><Select value={form.source ?? ""} onChange={val => f("source", val)} options={SOURCES.map(s => s || "")} /></div>
                  <div style={{ gridColumn: "1/-1" }}><label style={lbl}>Required Skill Tags (comma-separated)</label><input placeholder="ROS2, Python, SLAM, Next.js..." value={form.tags ?? ""} onChange={e => f("tags", e.target.value)} style={inp} /></div>
                  <div style={{ gridColumn: "1/-1" }}><label style={lbl}>Notes</label><textarea value={form.notes ?? ""} onChange={e => f("notes", e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} /></div>
                </>
              ) : (
                <div style={{ gridColumn: "1/-1", textAlign: "center", marginTop: 10 }}>
                  <button className="btn-ghost" style={{ fontSize: 11 }} onClick={() => setShowAll(true)}>Show Advanced Fields</button>
                </div>
              )}
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
