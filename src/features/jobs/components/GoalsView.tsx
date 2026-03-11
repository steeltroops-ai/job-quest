import React from "react";
import { T } from "@/shared/theme";
import { Pane, Label } from "@/shared/components/ui";

interface GoalsViewProps {
  submitted: number;
  goal: number;
  wkApps: number;
}

export function GoalsView({ submitted, goal, wkApps }: GoalsViewProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Pane pad="24px 26px">
        <Label style={{ marginBottom: 20 }}>90-Day Execution Plan</Label>
        {[
          { text: "Mass apply to Japan / Singapore / Europe / India Tier-1 roles", done: submitted >= 20, note: `${submitted} submitted so far, target 20+` },
          { text: "HuggingFace profile + MediLens models upload", done: false, note: "AI visibility -- boosts ML resume credibility" },
          { text: "ORCID iD + Google Scholar setup", done: false, note: "30 minutes, lifetime research signal" },
          { text: "Build SLAM or RL-robotics project", done: false, note: "Top technical gap -- Robotics resume" },
          { text: "Product Hunt launch -- blackhole-simulation", done: false, note: "Visibility + inbound, Feb 2026 release" },
          { text: `Hit weekly application goal: ${goal} per week`, done: wkApps >= goal, note: `This week: ${wkApps} submitted` },
          { text: "Fix all 4 resumes (see audit below)", done: false, note: "Week 1 priority" },
          { text: "JLPT N3 study plan started", done: false, note: "N3 is Japan industry minimum -- N5 is not enough" },
        ].map(({ text, done, note }, i) => (
          <div key={i} style={{ display: "flex", gap: 14, padding: "13px 0", borderBottom: i < 7 ? "1px solid rgba(255,255,255,0.045)" : "none" }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${done ? "rgba(52,199,89,0.7)" : "rgba(255,255,255,0.14)"}`, flexShrink: 0, marginTop: 1, background: done ? "rgba(52,199,89,0.12)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {done && <span style={{ fontSize: 11, color: T.green, fontWeight: 900, lineHeight: 1 }}>✓</span>}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: done ? T.text3 : T.text1, textDecoration: done ? "line-through" : "none", marginBottom: 3 }}>{text}</div>
              <div style={{ fontSize: 10, color: T.text4, fontFamily: T.mono }}>{note}</div>
            </div>
          </div>
        ))}
      </Pane>

      <Pane pad="24px 26px">
        <Label style={{ marginBottom: 20 }}>Resume Audit</Label>
        {[
          { f: "All 4", sev: "critical", issue: "blackhole-simulation missing -- most technically impressive project" },
          { f: "All 4", sev: "critical", issue: "MediLens accuracy numbers absent (CardioPredict 99.8%, ChestXplorer 97.8%)" },
          { f: "All 4", sev: "critical", issue: `Japanese labeled "Conversational" -- N5 is beginner, not conversational` },
          { f: "Fullstack Copy", sev: "critical", issue: `Typo: "Aapplied numerical methods" in OrbitX bullet` },
          { f: "ML Resume", sev: "critical", issue: `Typo: "ML Framewroks" in skills section header` },
          { f: "All 4", sev: "high", issue: "No summary / headline section -- expected for international applications" },
          { f: "All 4", sev: "high", issue: "Bento link is dead -- replace with own.page/steeltroops" },
          { f: "ML Resume", sev: "high", issue: "Weights & Biases listed but flagged as skill gap -- verify or remove" },
          { f: "Robotics", sev: "high", issue: "House Price Prediction is filler -- replace with ros2-robot-stack or DebrisGuard" },
          { f: "All 4", sev: "medium", issue: "DroidRobotics: says 20+ students, should be 50+ mentored" },
          { f: "Fullstack + ML", sev: "medium", issue: "NeuraForge missing from both resumes" },
          { f: "All 4", sev: "medium", issue: "Employment gap Nov 2025 -- Mar 2026 unaddressed" },
          { f: "All 4", sev: "medium", issue: "OrbitX dates inconsistent across resumes -- standardize to Jun--Oct 2023" },
        ].map(({ f, sev, issue }, i) => {
          const sc = sev === "critical" ? T.red : sev === "high" ? T.orange : T.text3;
          return (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < 12 ? "1px solid rgba(255,255,255,0.035)" : "none", alignItems: "flex-start" }}>
              <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 20, border: `1px solid ${sc}33`, background: `${sc}10`, color: sc, fontFamily: T.mono, fontWeight: 700, letterSpacing: "0.05em", flexShrink: 0, marginTop: 1 }}>{sev}</span>
              <div>
                <div style={{ fontSize: 9, color: T.blue, fontFamily: T.mono, marginBottom: 3 }}>{f}</div>
                <div style={{ fontSize: 12, color: T.text2 }}>{issue}</div>
              </div>
            </div>
          );
        })}
      </Pane>
    </div>
  );
}
