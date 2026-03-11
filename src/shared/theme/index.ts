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
  
  .root-bg { 
    background-color: #050507;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M 80 0 L 0 0 0 80' fill='none' stroke='white' stroke-opacity='0.02' stroke-width='0.5'/%3E%3C/svg%3E");
    background-position: center center;
    position: relative;
    z-index: 1;
  }
  
  .moving-lattice {
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cpath d='M0 400 L400 0' stroke='white' stroke-opacity='0.02' stroke-width='0.5'/%3E%3Cpath d='M0 0 L400 400' stroke='white' stroke-opacity='0.02' stroke-width='0.5'/%3E%3C/svg%3E");
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
    animation: lattice-move 120s linear infinite;
  }
  
  @keyframes lattice-move {
    from { background-position: 0 0; }
    to { background-position: 400px 400px; }
  }

  .topo-overlay {
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800'%3E%3Cpath d='M0 400 C 200 300 400 500 800 400' fill='none' stroke='white' stroke-opacity='0.04' stroke-width='1.5'/%3E%3Cpath d='M0 600 C 300 500 500 700 800 600' fill='none' stroke='white' stroke-opacity='0.02' stroke-width='1'/%3E%3Cpath d='M0 200 C 100 100 600 300 800 200' fill='none' stroke='white' stroke-opacity='0.02' stroke-width='1'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1;
    animation: topo-sway 25s ease-in-out infinite alternate;
  }

  @keyframes topo-sway {
    from { transform: scale(1) translateX(-20px); }
    to { transform: scale(1.1) translateX(20px); }
  }
  
  .pane { 
    position: relative; 
    isolation: isolate; 
    background: rgba(18, 18, 20, 0.5); 
    backdrop-filter: blur(16px) saturate(140%); 
    -webkit-backdrop-filter: blur(16px) saturate(140%); 
    border: 1px solid rgba(255,255,255,0.06); 
    box-shadow: 0 4px 20px rgba(0,0,0,0.3); 
    border-radius: 12px;
    overflow: hidden; 
  }
  .pane-sheen { 
    position: absolute; inset: 0; pointer-events: none;
    background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 60%);
  }
  
  .pane-elevated { 
    background: rgba(30,30,35,0.6)!important; 
    box-shadow: 0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)!important; 
  }
  
  select {
    display: none; /* We use custom Select component */
  }
  
  .trow { transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1); cursor:pointer; border-radius:14px; }
  .trow:hover { 
    background: rgba(255,255,255,0.065)!important; 
    transform: scale(1.005);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.08);
  }
  
  .seg { 
    display:inline-flex; align-items:center; gap:2px; padding:4px; 
    background:rgba(20,20,25,0.4); 
    backdrop-filter:blur(30px) saturate(200%); -webkit-backdrop-filter:blur(30px); 
    border:1px solid rgba(255,255,255,0.08); 
    border-top-color: rgba(255,255,255,0.15);
    border-radius:14px; 
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
  }
  .seg-tab { 
    padding:8px 18px; border-radius:10px; border:1px solid transparent; 
    font-size:12px; font-weight:600; font-family:'Plus Jakarta Sans',system-ui,sans-serif; 
    color:rgba(255,255,255,0.5); cursor:pointer; transition:all 0.25s; background:transparent; line-height:1; 
  }
  .seg-tab:hover { color:rgba(255,255,255,0.85); background: rgba(255,255,255,0.04); }
  .seg-tab.on { 
    background:rgba(255,255,255,0.15); border-color:rgba(255,255,255,0.2); border-top-color:rgba(255,255,255,0.3);
    color:#FFF; box-shadow: 0 4px 12px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.3); 
  }
  
  .fpill { 
    padding:6px 14px; border-radius:24px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; 
    letter-spacing:0.04em; cursor:pointer; transition:all 0.2s cubic-bezier(0.2,0.8,0.2,1); 
    background:rgba(20,20,25,0.3); backdrop-filter:blur(10px);
    border:1px solid rgba(255,255,255,0.08); border-top-color:rgba(255,255,255,0.15);
    color:rgba(255,255,255,0.4); box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .fpill:hover { border-color:rgba(255,255,255,0.18); color:rgba(255,255,255,0.75); transform: translateY(-1px); }
  .fpill.on { border-color:rgba(255,255,255,0.25); border-top-color:rgba(255,255,255,0.4); color:#FFF; background:rgba(255,255,255,0.12); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
  
  .btn-ghost { 
    background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; 
    padding:9px 18px; color:rgba(255,255,255,0.6); font-size:12px; font-family:'Plus Jakarta Sans',system-ui,sans-serif; 
    font-weight:600; cursor:pointer; transition:all 0.15s ease; 
  }
  .btn-ghost:hover { background:rgba(255,255,255,0.08); border-color:rgba(255,255,255,0.12); color:#FFF; }
  
  .btn-primary { 
    background:#2C2C2E; border:1px solid rgba(255,255,255,0.1);
    border-radius:10px; padding:10px 22px; color:#FFF; font-size:12px; font-family:'Plus Jakarta Sans',system-ui,sans-serif; 
    font-weight:600; cursor:pointer; transition:all 0.15s ease; 
    box-shadow: 0 4px 12px rgba(0,0,0,0.2); 
  }
  .btn-primary:hover { 
    background:#3A3A3C; border-color:rgba(255,255,255,0.2);
  }
  .btn-primary:active { transform:scale(0.97); }
  
  .kb-card { transition:transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease; cursor:pointer; background: rgba(28,28,30,0.4); border-radius:10px; border:1px solid rgba(255,255,255,0.05); }
  .kb-card:hover { transform:translateY(-2px); background: rgba(44,44,46,0.6); box-shadow: 0 8px 24px rgba(0,0,0,0.4)!important; border-color:rgba(255,255,255,0.1); }
  
  .div-line { height:1px; background:rgba(255,255,255,0.08); margin:0; }
  
  .sq-btn { border:1px solid rgba(255,255,255,0.08); border-radius:6px; padding:4px 10px; font-size:10px; font-family:'JetBrains Mono',monospace; font-weight:600; letter-spacing:0.04em; cursor:pointer; transition:all 0.15s ease; background:rgba(255,255,255,0.03); color:rgba(255,255,255,0.4); }
  .sq-btn:hover { border-color:rgba(255,255,255,0.2); color:rgba(255,255,255,0.8); background:rgba(255,255,255,0.08); }

  .main-container { width: 100%; max-width: 1600px; margin: 0 auto; transition: max-width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); }
  
  .trow-grid { display: grid; grid-template-columns: 2fr 1.5fr minmax(75px, 0.8fr) minmax(75px, 0.8fr) minmax(100px, 1fr) 130px; gap: 8px; align-items: center; }

  @media(max-width: 1440px) {
    .main-container { max-width: 95%; }
  }
  @media(max-width: 1120px) {
    .trow-grid { grid-template-columns: 1.5fr 1fr 75px 75px 100px 120px; }
  }
  @media(max-width: 860px) {
    .hide-md { display: none!important; }
    .trow-grid { grid-template-columns: 1.4fr 1fr 80px 120px; }
  }
  @media(max-width: 640px) {
    .hide-sm { display: none!important; }
    .trow-grid { grid-template-columns: 1.2fr 110px; gap: 6px; }
  }
`;
