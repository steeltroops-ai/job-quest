import React from "react";
import { T } from "../../../shared/theme";
import { STATUS_CONFIG } from "../../../features/jobs/constants";

export function Pane({ children, style = {}, pad = "20px 22px", radius = 14 }: { children: React.ReactNode; style?: React.CSSProperties; pad?: string; radius?: number }) {
  return (
    <div className="pane" style={{ borderRadius: radius, padding: pad, ...style }}>
      <div className="pane-sheen" style={{ borderRadius: radius }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

export function StatusDot({ status, size = 7 }: { status: string; size?: number }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Applied"];
  return (
    <span style={{
      display: "inline-block", width: size, height: size, borderRadius: "50%",
      background: cfg.dot, flexShrink: 0,
      boxShadow: `0 0 ${size * 1.2}px ${cfg.dot}`
    }} />
  );
}

export function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Applied"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 9px", borderRadius: 20,
      background: `${cfg.c}14`, border: `1px solid ${cfg.c}38`,
      color: cfg.c, fontSize: 10, fontWeight: 600,
      fontFamily: T.mono, letterSpacing: "0.05em", whiteSpace: "nowrap"
    }}>
      <StatusDot status={status} size={5} />
      {status}
    </span>
  );
}

export function Label({ children, style = {}, className = "" }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={className} style={{
      fontSize: 10, fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
      color: T.text3, fontFamily: T.mono, marginBottom: 6, ...style
    }}>
      {children}
    </div>
  );
}

export function MetaVal({ label, value, color = T.text2 }: { label: string; value?: string | null; color?: string }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Label>{label}</Label>
      <span style={{ fontSize: 12, color, fontFamily: label === "Job URL" ? T.mono : T.sans }}>{value}</span>
    </div>
  );
}

export function StatBlock({ label, value, sub, color = T.text1, accent }: { label: string; value: string | number; sub?: string; color?: string; accent?: string }) {
  return (
    <Pane style={{ flex: 1, minWidth: 90 }} pad="16px 18px">
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color, fontFamily: T.mono, lineHeight: 1, letterSpacing: "-0.02em" }}>
          {value}
        </div>
        <Label style={{ marginBottom: 0 }}>{label}</Label>
        {sub && <div style={{ fontSize: 9, color: T.text4, fontFamily: T.mono }}>{sub}</div>}
      </div>
      {accent && <div style={{ position: "absolute", top: 0, right: 0, width: 3, height: "40%", background: accent, borderRadius: "0 14px 0 3px", opacity: 0.6 }} />}
    </Pane>
  );
}

export const inputStyles = {
  width: "100%", background: T.g3, border: `1px solid ${T.rim}`, borderRadius: 8,
  padding: "9px 12px", color: T.text1, fontSize: 12, fontFamily: T.sans,
  outline: "none", boxSizing: "border-box" as const, transition: "border-color 0.15s, background 0.15s"
};

export const labelStyles = {
  fontSize: 9, fontWeight: 600, color: T.text3, letterSpacing: "0.09em",
  textTransform: "uppercase" as const, fontFamily: T.mono, display: "block", marginBottom: 5
};
