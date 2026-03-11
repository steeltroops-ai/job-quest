import React, { useState, useRef, useEffect } from "react";
import { T } from "../../../shared/theme";
import { STATUS_CONFIG } from "../../../features/jobs/constants";

export function Pane({ children, style = {}, pad = "24px 26px", radius = 20 }: { children: React.ReactNode; style?: React.CSSProperties; pad?: string; radius?: number }) {
  return (
    <div className="pane" style={{ borderRadius: radius, padding: pad, ...style }}>
      <div className="pane-sheen" />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

export function Select({ value, onChange, options, style = {} }: { value: string; onChange: (val: string) => void; options: string[]; style?: React.CSSProperties }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const click = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    window.addEventListener("mousedown", click);
    return () => window.removeEventListener("mousedown", click);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", ...style }}>
      <div onClick={() => setOpen(!open)} style={{ ...inputStyles, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"} onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}>
        <span style={{ color: options.includes(value) ? T.text1 : T.text3, fontSize: 13, fontWeight: 500 }}>{value}</span>
        <span style={{ fontSize: 9, transform: open ? "rotate(180deg)" : "none", transition: "0.2s", color: T.text4 }}>▼</span>
      </div>
      {open && (
        <div className="pane pane-elevated" style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 1000, padding: 6, maxHeight: 260, overflowY: "auto", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(30px) saturate(200%)" }}>
          {options.map(o => (
            <div key={o} onClick={() => { onChange(o); setOpen(false); }} className="trow" style={{ padding: "10px 14px", fontSize: 13, borderRadius: 10, background: o === value ? "rgba(255,255,255,0.1)" : "transparent", color: o === value ? "#FFF" : T.text2, marginBottom: 2 }}>
              {o}
            </div>
          ))}
        </div>
      )}
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
  width: "100%", background: "rgba(20,20,25,0.45)", border: `1px solid rgba(255,255,255,0.12)`, 
  borderRadius: 12,
  padding: "11px 16px", color: T.text1, fontSize: 13, fontFamily: T.sans,
  outline: "none", boxSizing: "border-box" as const, transition: "all 0.2s ease",
  backdropFilter: "blur(10px)",
  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05)"
};

export const labelStyles = {
  fontSize: 9, fontWeight: 600, color: T.text3, letterSpacing: "0.09em",
  textTransform: "uppercase" as const, fontFamily: T.mono, display: "block", marginBottom: 5
};
