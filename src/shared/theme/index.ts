export const T = {
  bg:        "#09090B",
  g1:        "rgba(255,255,255,0.058)",
  g2:        "rgba(255,255,255,0.088)",
  g3:        "rgba(255,255,255,0.035)",
  rim:       "rgba(255,255,255,0.13)",
  rimHover:  "rgba(255,255,255,0.22)",
  specular:  "rgba(255,255,255,0.21)",
  text1:     "#F5F5F7",
  text2:     "rgba(245,245,247,0.60)",
  text3:     "rgba(245,245,247,0.36)",
  text4:     "rgba(245,245,247,0.20)",
  blue:   "#007AFF",
  purple: "#BF5AF2",
  orange: "#FF9F0A",
  green:  "#34C759",
  red:    "#FF3B30",
  teal:   "#32ADE6",
  mono:   "'JetBrains Mono','Fira Code',monospace",
  sans:   "'Plus Jakarta Sans',system-ui,sans-serif",
};

export const GlobalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
  * { box-sizing:border-box; margin:0; padding:0; }
  ::-webkit-scrollbar { width:4px; height:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.08); border-radius:2px; }
  input,select,textarea { color-scheme:dark; }
  input:focus,select:focus,textarea:focus { border-color:rgba(255,255,255,0.28)!important; background:rgba(255,255,255,0.055)!important; }
  
  .root-bg { background: radial-gradient(ellipse 70% 50% at 20% 30%, rgba(255,248,240,0.028) 0%, transparent 100%), radial-gradient(ellipse 55% 70% at 80% 70%, rgba(240,240,255,0.020) 0%, transparent 100%), radial-gradient(ellipse 35% 35% at 55% 15%, rgba(255,255,255,0.012) 0%, transparent 100%), #09090B; }
  
  .pane { position: relative; isolation: isolate; background: rgba(255,255,255,0.058); backdrop-filter: blur(28px) saturate(200%) brightness(107%); -webkit-backdrop-filter: blur(28px) saturate(200%) brightness(107%); border: 1px solid rgba(255,255,255,0.115); box-shadow: inset 0 1.5px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.04), inset 1px 0 0 rgba(255,255,255,0.06), 0 20px 56px rgba(0,0,0,0.42), 0 4px 14px rgba(0,0,0,0.22); overflow: hidden; }
  .pane-sheen { position: absolute; top:0; left:0; right:0; bottom:0; background: linear-gradient(155deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.035) 35%, transparent 65%); pointer-events: none; }
  .pane::after { content:''; position:absolute; inset:0; border-radius:inherit; background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.06) 100%); pointer-events:none; }
  .pane-elevated { background: rgba(255,255,255,0.088)!important; box-shadow: inset 0 1.5px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(255,255,255,0.05), 0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.3)!important; }
  
  .trow { transition: background 0.1s; cursor:pointer; border-radius:8px; }
  .trow:hover { background: rgba(255,255,255,0.035)!important; }
  
  .seg { display:inline-flex; align-items:center; gap:2px; padding:3px; background:rgba(255,255,255,0.055); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.1); border-radius:11px; }
  .seg-tab { padding:7px 16px; border-radius:8px; border:1px solid transparent; font-size:12px; font-weight:600; font-family:'Plus Jakarta Sans',system-ui,sans-serif; color:rgba(245,245,247,0.45); cursor:pointer; transition:all 0.18s; background:transparent; line-height:1; }
  .seg-tab:hover { color:rgba(245,245,247,0.75); }
  .seg-tab.on { background:rgba(255,255,255,0.12); border-color:rgba(255,255,255,0.18); color:#F5F5F7; box-shadow:inset 0 1px 0 rgba(255,255,255,0.22), 0 2px 10px rgba(0,0,0,0.25); }
  
  .fpill { padding:5px 12px; border-radius:20px; font-size:10px; font-weight:600; font-family:'JetBrains Mono',monospace; letter-spacing:0.04em; cursor:pointer; transition:all 0.15s; background:transparent; border:1px solid rgba(255,255,255,0.07); color:rgba(245,245,247,0.35); }
  .fpill:hover { border-color:rgba(255,255,255,0.14); color:rgba(245,245,247,0.6); }
  .fpill.on { border-color:rgba(255,255,255,0.22); color:#F5F5F7; background:rgba(255,255,255,0.08); }
  
  .btn-ghost { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:8px 15px; color:rgba(245,245,247,0.55); font-size:11px; font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-weight:600; cursor:pointer; transition:all 0.15s; }
  .btn-ghost:hover { background:rgba(255,255,255,0.09); border-color:rgba(255,255,255,0.18); color:#F5F5F7; }
  .btn-primary { background:rgba(255,255,255,0.10); border:1px solid rgba(255,255,255,0.22); border-radius:9px; padding:9px 20px; color:#F5F5F7; font-size:12px; font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-weight:700; cursor:pointer; transition:all 0.15s; box-shadow:inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 10px rgba(0,0,0,0.2); letter-spacing:0.02em; }
  .btn-primary:hover { background:rgba(255,255,255,0.16); border-color:rgba(255,255,255,0.32); box-shadow:inset 0 1px 0 rgba(255,255,255,0.32), 0 4px 16px rgba(0,0,0,0.28); }
  .btn-primary:active { transform:scale(0.98); }
  
  .kb-card { transition:transform 0.15s, box-shadow 0.15s; cursor:pointer; }
  .kb-card:hover { transform:translateY(-2px); box-shadow:inset 0 1.5px 0 rgba(255,255,255,0.28), 0 24px 60px rgba(0,0,0,0.5)!important; }
  
  .div-line { height:1px; background:rgba(255,255,255,0.055); margin:0; }
  
  .sq-btn { border:1px solid rgba(255,255,255,0.07); border-radius:5px; padding:3px 9px; font-size:9px; font-family:'JetBrains Mono',monospace; font-weight:600; letter-spacing:0.04em; cursor:pointer; transition:all 0.12s; background:transparent; color:rgba(245,245,247,0.3); }
  .sq-btn:hover { border-color:rgba(255,255,255,0.14); color:rgba(245,245,247,0.6); }
  
  @media(max-width:640px) { .hide-sm{display:none!important} .grid-r{grid-template-columns:1.2fr 90px 100px!important} }
`;
