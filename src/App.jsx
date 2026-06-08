import { useState, useEffect, useCallback, useRef } from "react";

// ── Password Gate ─────────────────────────────────────────────────────────────
const CORRECT_PASSWORD = "Alien2005";
const AUTH_KEY = "adam_os_auth";

function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const attempt = () => {
    if (input === CORRECT_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{
      minHeight:"100vh", background:"#080e1a", display:"flex",
      alignItems:"center", justifyContent:"center", fontFamily:"'Inter',system-ui,sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap');
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::placeholder { color: #3a5470 !important; }
      `}</style>
      <div style={{
        animation:"fadeIn 0.5s ease",
        background:"#0c1526", border:"1px solid #1a2e4a", borderRadius:12,
        padding:"48px 44px", width:"100%", maxWidth:400, textAlign:"center",
        boxShadow:"0 24px 80px rgba(0,0,0,0.6)"
      }}>
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:8 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:"#4a9eed", boxShadow:"0 0 10px #4a9eed" }}/>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:16, fontWeight:700, color:"#ffffff", letterSpacing:"-0.01em" }}>LIFE OS</span>
        </div>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"#3a5470", letterSpacing:3, marginBottom:36 }}>ADAM · ADM4439 · PRIVATE</div>

        {/* Lock icon */}
        <div style={{ fontSize:36, marginBottom:24 }}>🔒</div>

        <div style={{ fontFamily:"Inter", fontSize:14, color:"#8baec9", marginBottom:28, lineHeight:1.5 }}>
          Enter your password to access the dashboard.
        </div>

        {/* Input */}
        <div style={{ animation: shake ? "shake 0.4s ease" : "none" }}>
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && attempt()}
            placeholder="Password"
            autoFocus
            style={{
              width:"100%", background:"#080e1a", border:`1px solid ${error?"#e05c5c":"#1a2e4a"}`,
              color:"#d4e8f7", fontFamily:"'JetBrains Mono',monospace", fontSize:14,
              padding:"12px 16px", borderRadius:6, outline:"none", marginBottom:12,
              textAlign:"center", letterSpacing:4, transition:"border 0.15s"
            }}
          />
          {error && (
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#e05c5c", marginBottom:12, letterSpacing:1 }}>
              INCORRECT PASSWORD
            </div>
          )}
          <button
            onClick={attempt}
            style={{
              width:"100%", background:"#d4e8f7", color:"#080e1a", border:"none",
              borderRadius:6, padding:"12px", fontFamily:"Inter", fontSize:12,
              fontWeight:700, letterSpacing:"0.05em", cursor:"pointer", transition:"background 0.15s"
            }}
            onMouseEnter={e => e.target.style.background="#ffffff"}
            onMouseLeave={e => e.target.style.background="#d4e8f7"}
          >
            UNLOCK
          </button>
        </div>

        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, color:"#253d58", marginTop:32, letterSpacing:2 }}>
          CASABLANCA · SHARJAH
        </div>
      </div>
    </div>
  );
}


const SK = "adam_os_v5";
const TODAY = new Date().toISOString().split("T")[0];

// ── Theme ─────────────────────────────────────────────────────────────────────
const DARK = {
  bg:"#080e1a", panel:"#0c1526", card:"#101c30", cardHov:"#132038",
  border:"#1a2e4a", borderHi:"#2a4a72",
  accent:"#e8f4fd", accentDim:"#8baec9", accentMut:"#3a5470",
  white:"#ffffff", offwhite:"#d4e8f7",
  gold:"#f0b429", red:"#e05c5c", green:"#4caf82", blue:"#4a9eed", purple:"#9c85d4",
  muted:"#253d58", mutedHi:"#2e4d6e", isDark:true,
};
const LIGHT = {
  bg:"#f0f4f8", panel:"#ffffff", card:"#ffffff", cardHov:"#f7fafc",
  border:"#dde6f0", borderHi:"#a0bcd4",
  accent:"#1a3a5c", accentDim:"#2d6a9f", accentMut:"#7a9ab8",
  white:"#1a2a3a", offwhite:"#1e3a5c",
  gold:"#b07800", red:"#c0392b", green:"#1e7a50", blue:"#1a6aaa", purple:"#6a3fa0",
  muted:"#e8eef4", mutedHi:"#d0dce8", isDark:false,
};

const F  = "'Inter','SF Pro Display',system-ui,sans-serif";
const FM = "'JetBrains Mono','Fira Code','Courier New',monospace";

function DEF() {
  return {
    trades:[], todos:{ Work:[], Study:[], SaaS:[], Personal:[] }, goals:[],
    routine:{
      morning:[
        {id:1,label:"Fajr prayer 🕌",done:false},{id:2,label:"Wake up on time",done:false},
        {id:3,label:"Gym / Workout",done:false},{id:4,label:"Cold shower",done:false},
        {id:5,label:"Breakfast",done:false},{id:6,label:"Read Quran 📖",done:false},
        {id:7,label:"Review markets",done:false},
      ],
      afternoon:[{id:8,label:"Dhuhr prayer 🕌",done:false},{id:9,label:"Asr prayer 🕌",done:false}],
      evening:[
        {id:10,label:"Maghrib prayer 🕌",done:false},{id:11,label:"Isha prayer 🕌",done:false},
        {id:12,label:"Study block",done:false},{id:13,label:"SaaS work session",done:false},
        {id:14,label:"Review open trades",done:false},{id:15,label:"Read a book 📚",done:false},
        {id:16,label:"Journal & reflect",done:false},{id:17,label:"Sleep on time",done:false},
      ],
    },
    sleep:{ target_bed:"23:30", target_wake:"06:30", logs:[] },
    gym:{ logs:[] }, weeklyReviews:[], studyLogs:[],
    kanban:{ "Backlog":[], "In Progress":[], "Testing":[], "Done":[] },
    certCountdowns:[
      {id:1,cert:"ISC2 CC",date:"",color:"#4caf82"},
      {id:2,cert:"CompTIA Security+",date:"",color:"#f0b429"},
      {id:3,cert:"CEH",date:"",color:"#e05c5c"},
    ],
    routineStreakData:{},
  };
}

function load() {
  try {
    const r=localStorage.getItem(SK); if(!r) return DEF();
    const p=JSON.parse(r); const d=DEF();
    return { ...d,...p,
      routine:{morning:p.routine?.morning||d.routine.morning,afternoon:p.routine?.afternoon||d.routine.afternoon,evening:p.routine?.evening||d.routine.evening},
      sleep:{...d.sleep,...p.sleep}, todos:{...d.todos,...p.todos},
      kanban:{...d.kanban,...p.kanban}, weeklyReviews:p.weeklyReviews||[],
      studyLogs:p.studyLogs||[], certCountdowns:p.certCountdowns||d.certCountdowns,
      routineStreakData:p.routineStreakData||{},
    };
  } catch { return DEF(); }
}
function persist(d) { try { localStorage.setItem(SK,JSON.stringify(d)); } catch {} }

// ── Prayer times calculation (simplified Karachi method) ──────────────────────
function calcPrayerTimes(date, lat, lng) {
  const rad = Math.PI/180, deg = 180/Math.PI;
  const JD = d => { const y=d.getFullYear(),m=d.getMonth()+1,day=d.getDate(); const A=Math.floor((14-m)/12),Y=y+4800-A,M=m+12*A-3; return day+Math.floor((153*M+2)/5)+365*Y+Math.floor(Y/4)-Math.floor(Y/100)+Math.floor(Y/400)-32045; };
  const jd = JD(date);
  const n = jd - 2451545.0 + 0.5;
  const L = (280.460 + 0.9856474*n) % 360;
  const g = (357.528 + 0.9856003*n) * rad;
  const lam = (L + 1.915*Math.sin(g) + 0.02*Math.sin(2*g)) * rad;
  const eps = (23.439 - 0.0000004*n) * rad;
  const RA = Math.atan2(Math.cos(eps)*Math.sin(lam), Math.cos(lam)) * deg;
  const decl = Math.asin(Math.sin(eps)*Math.sin(lam));
  const eqt = L - 90 - RA; // approx
  const timezone = lng/15;
  const transit = 12 - eqt/60 - (lng - timezone*15)/15;
  const cosHA = h => (Math.sin(h)-Math.sin(lat*rad)*Math.sin(decl))/(Math.cos(lat*rad)*Math.cos(decl));
  const HA = h => Math.acos(Math.max(-1,Math.min(1,cosHA(h)))) * deg / 15;
  const fajrAngle = -18*rad, ishaAngle = -17*rad;
  const asrFactor = 1;
  const asrAngle = Math.atan(1/(asrFactor+Math.tan(Math.abs(lat*rad-decl))));
  const fmt = t => { const h=Math.floor(t%24), m=Math.round((t%1)*60); return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}`; };
  return {
    Fajr:   fmt(transit - HA(fajrAngle)),
    Sunrise:fmt(transit - HA(-0.8333*rad)),
    Dhuhr:  fmt(transit),
    Asr:    fmt(transit + HA(asrAngle) * 15 / 15),
    Maghrib:fmt(transit + HA(-0.8333*rad)),
    Isha:   fmt(transit + HA(ishaAngle)),
  };
}

// ── Market sessions ───────────────────────────────────────────────────────────
const SESSIONS_DEF = [
  {name:"Sydney",  open:"22:00", close:"07:00", color:"#9c85d4", utc:true},
  {name:"Tokyo",   open:"00:00", close:"09:00", color:"#4a9eed", utc:true},
  {name:"London",  open:"08:00", close:"17:00", color:"#f0b429", utc:true},
  {name:"New York",open:"13:00", close:"22:00", color:"#4caf82", utc:true},
];

function getUTCMinutes() {
  const n = new Date();
  return n.getUTCHours()*60 + n.getUTCMinutes();
}
function isSessionOpen(open, close) {
  const now = getUTCMinutes();
  const o = parseInt(open.split(":")[0])*60+parseInt(open.split(":")[1]);
  const c = parseInt(close.split(":")[0])*60+parseInt(close.split(":")[1]);
  if (c > o) return now >= o && now < c;
  return now >= o || now < c;
}
function minsUntil(target) {
  const now = getUTCMinutes();
  const t = parseInt(target.split(":")[0])*60+parseInt(target.split(":")[1]);
  let diff = t - now; if(diff<0) diff+=1440;
  return diff;
}
function fmtDur(m) { const h=Math.floor(m/60),mn=m%60; return h>0?`${h}h ${mn}m`:`${mn}m`; }

// ── CSV export ────────────────────────────────────────────────────────────────
function exportCSV(trades) {
  const headers = ["Date","Pair","Direction","Entry","Stop Loss","Take Profit","P&L","R:R","Session","Status","Notes"];
  const rows = trades.map(t=>[t.date,t.pair,t.direction,t.entry,t.sl,t.tp,t.pnl,t.rr,t.session,t.status,`"${(t.notes||"").replace(/"/g,'""')}"`]);
  const csv = [headers,...rows].map(r=>r.join(",")).join("\n");
  const blob = new Blob([csv],{type:"text/csv"});
  const a = document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=`trades_${TODAY}.csv`; a.click();
}

// ── Streak calc ───────────────────────────────────────────────────────────────
function calcStreak(streakData) {
  if (!streakData) return 0;
  const dates = Object.keys(streakData).filter(d=>streakData[d]).sort((a,b)=>b.localeCompare(a));
  if (!dates.length) return 0;
  let streak=0, cur=new Date();
  for (const d of dates) {
    const diff = Math.round((new Date(cur.toISOString().split("T")[0]) - new Date(d)) / 86400000);
    if (diff <= 1) { streak++; cur = new Date(d); } else break;
  }
  return streak;
}

// ── Primitives ────────────────────────────────────────────────────────────────
function Divider({C,my=0}){ return <div style={{height:1,background:C.border,margin:`${my}px 0`}}/> }
function Label({C,children,style={}}){ return <div style={{fontFamily:FM,fontSize:9,letterSpacing:3,color:C.accentMut,fontWeight:500,textTransform:"uppercase",...style}}>{children}</div> }
function Val({children,size=24,color,C,mono=false,style={}}){ return <div style={{fontFamily:mono?FM:F,fontSize:size,fontWeight:700,color:color||(C?C.white:"#fff"),lineHeight:1.1,letterSpacing:mono?1:"-0.02em",...style}}>{children}</div> }
function Pill({children,color="#e8f4fd"}){ return <span style={{fontFamily:FM,fontSize:9,letterSpacing:2,padding:"3px 9px",borderRadius:2,background:`${color}22`,border:`1px solid ${color}44`,color,display:"inline-flex",alignItems:"center"}}>{children}</span> }
function Panel({C,children,style={},onClick}){ return <div onClick={onClick} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:6,...style}}>{children}</div> }
function PBar({pct,color,C,h=3}){ return <div style={{height:h,background:C.border,borderRadius:h,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(100,Math.max(0,pct))}%`,background:color||C.offwhite,borderRadius:h,transition:"width 0.4s ease"}}/></div> }
function PnlVal({val,C}){ const n=parseFloat(val)||0; return <span style={{color:n>0?C.green:n<0?C.red:C.accentMut,fontWeight:700,fontFamily:FM}}>{n===0?"—":`${n>0?"+":""}$${Math.abs(n).toFixed(2)}`}</span> }

function Inp({C,value,onChange,placeholder,width,type="text",style={},onKeyDown}){
  const [f,setF]=useState(false);
  return <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} type={type} onKeyDown={onKeyDown}
    onFocus={()=>setF(true)} onBlur={()=>setF(false)}
    style={{background:C.panel,border:`1px solid ${f?C.borderHi:C.border}`,color:C.offwhite,fontFamily:FM,fontSize:11,padding:"8px 12px",borderRadius:4,width:width||"auto",outline:"none",transition:"border 0.15s",...style}}/>;
}
function Sel({C,value,onChange,options,style={}}){
  return <select value={value} onChange={e=>onChange(e.target.value)}
    style={{background:C.panel,border:`1px solid ${C.border}`,color:C.offwhite,fontFamily:FM,fontSize:11,padding:"8px 10px",borderRadius:4,outline:"none",cursor:"pointer",...style}}>
    {options.map(o=><option key={o} style={{background:C.panel}}>{o}</option>)}
  </select>;
}
function Btn({C,children,onClick,variant="primary",sm=false,style={}}){
  const [h,setH]=useState(false);
  const base={cursor:"pointer",fontFamily:F,fontSize:sm?10:11,fontWeight:600,letterSpacing:"0.03em",borderRadius:4,border:"none",padding:sm?"6px 14px":"9px 22px",transition:"all 0.15s",display:"inline-flex",alignItems:"center",gap:6};
  const v={
    primary:{background:h?(C.isDark?"#d4e8f7":"#0d2a4a"):C.offwhite,color:C.isDark?C.bg:"#fff"},
    ghost:{background:h?C.mutedHi:"transparent",color:C.accentDim,border:`1px solid ${C.border}`},
    danger:{background:"transparent",color:C.red,border:`1px solid ${C.red}44`},
    green:{background:h?C.green+"dd":C.green+"22",color:C.green,border:`1px solid ${C.green}44`},
  };
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{...base,...v[variant],...style}}>{children}</button>;
}
function Check({C,done,onClick,size=16}){
  return <div onClick={onClick} style={{width:size,height:size,borderRadius:3,border:`1.5px solid ${done?C.offwhite:C.borderHi}`,background:done?C.offwhite:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"all 0.15s"}}>
    {done&&<svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke={C.isDark?C.bg:"#fff"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
  </div>;
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
const NAV=[
  {id:"OVERVIEW",label:"Overview"},
  {id:"TRADING",label:"Trading"},
  {id:"ANALYTICS",label:"Analytics"},
  {id:"TASKS",label:"Tasks"},
  {id:"GOALS",label:"Goals"},
  {id:"ROUTINE",label:"Routine"},
  {id:"BODY",label:"Body"},
  {id:"STUDY",label:"Study Roadmap"},
  {id:"SAAS",label:"SaaS Board"},
  {id:"WEEKLY",label:"Weekly Review"},
];

function Sidebar({C,tab,setTab,streak}){
  const [clock,setClock]=useState("");
  useEffect(()=>{ const t=()=>setClock(new Date().toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit"})); t(); const i=setInterval(t,1000); return()=>clearInterval(i); },[]);
  return (
    <div style={{width:210,background:C.panel,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",height:"100vh",position:"sticky",top:0,flexShrink:0,zIndex:10}}>
      <div style={{padding:"22px 20px 16px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:C.blue,boxShadow:`0 0 8px ${C.blue}88`}}/>
          <span style={{fontFamily:F,fontSize:14,fontWeight:700,color:C.white,letterSpacing:"-0.02em"}}>LIFE OS</span>
        </div>
        <div style={{fontFamily:FM,fontSize:9,color:C.accentMut,letterSpacing:2}}>ADAM · ADM4439</div>
      </div>
      <Divider C={C}/>
      <div style={{padding:"14px 20px"}}>
        <div style={{fontFamily:FM,fontSize:20,fontWeight:600,color:C.white,fontVariantNumeric:"tabular-nums"}}>{clock}</div>
        <div style={{fontFamily:FM,fontSize:9,color:C.accentMut,letterSpacing:2,marginTop:2}}>{new Date().toLocaleDateString("en-GB",{weekday:"short",day:"2-digit",month:"short",year:"numeric"}).toUpperCase()}</div>
        {streak>0&&<div style={{marginTop:8,display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:12}}>🔥</span><span style={{fontFamily:FM,fontSize:10,color:C.gold,fontWeight:700}}>{streak} day streak</span></div>}
      </div>
      <Divider C={C}/>
      <nav style={{flex:1,padding:"10px 10px",overflowY:"auto"}}>
        {NAV.map(n=>{ const active=tab===n.id; return <div key={n.id} onClick={()=>setTab(n.id)}
          style={{display:"flex",alignItems:"center",padding:"9px 12px",borderRadius:5,marginBottom:1,cursor:"pointer",background:active?C.card:"transparent",color:active?C.white:C.accentMut,transition:"all 0.12s",borderLeft:active?`2px solid ${C.offwhite}`:"2px solid transparent",fontSize:12,fontWeight:active?600:400,fontFamily:F,letterSpacing:"0.01em"}}
          onMouseEnter={e=>{if(!active){e.currentTarget.style.background=C.muted;e.currentTarget.style.color=C.accentDim;}}}
          onMouseLeave={e=>{if(!active){e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.accentMut;}}}>{n.label}</div>; })}
      </nav>
      <Divider C={C}/>
      <div style={{padding:"12px 20px"}}><div style={{fontFamily:FM,fontSize:8,color:C.accentMut,letterSpacing:2}}>CASABLANCA · SHARJAH</div></div>
    </div>
  );
}

// ── Prayer Times Widget ───────────────────────────────────────────────────────
function PrayerWidget({C}){
  const [loc,setLoc]=useState("Casablanca");
  const [times,setTimes]=useState(null);
  const [now,setNow]=useState(new Date());
  const coords={Casablanca:{lat:33.5731,lng:-7.5898},Sharjah:{lat:25.3463,lng:55.4209}};

  useEffect(()=>{ const i=setInterval(()=>setNow(new Date()),30000); return()=>clearInterval(i); },[]);
  useEffect(()=>{ const c=coords[loc]; setTimes(calcPrayerTimes(new Date(),c.lat,c.lng)); },[loc]);

  if(!times) return null;

  const PRAYERS=["Fajr","Sunrise","Dhuhr","Asr","Maghrib","Isha"];
  const nowStr=now.toTimeString().slice(0,5);
  const toMins=s=>{ const[h,m]=s.split(":").map(Number); return h*60+m; };
  const nowMins=toMins(nowStr);
  const upcoming=PRAYERS.filter(p=>p!=="Sunrise").find(p=>toMins(times[p])>nowMins);
  const nextPrayer=upcoming||"Fajr";
  const nextTime=times[nextPrayer];
  const diffMins=toMins(nextTime)>nowMins?toMins(nextTime)-nowMins:1440-(nowMins-toMins(nextTime));

  return (
    <Panel C={C} style={{padding:"18px 22px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <Label C={C}>Prayer Times 🕌</Label>
        <div style={{display:"flex",gap:4}}>
          {["Casablanca","Sharjah"].map(l=><button key={l} onClick={()=>setLoc(l)} style={{background:loc===l?C.offwhite:"transparent",border:`1px solid ${loc===l?C.offwhite:C.border}`,color:loc===l?C.bg:C.accentMut,borderRadius:3,padding:"3px 10px",fontFamily:FM,fontSize:9,cursor:"pointer"}}>{l}</button>)}
        </div>
      </div>
      <div style={{background:C.isDark?"#0a1828":C.muted,borderRadius:6,padding:"12px 16px",marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontFamily:F,fontSize:11,color:C.accentMut,marginBottom:2}}>Next Prayer</div><div style={{fontFamily:F,fontSize:16,fontWeight:700,color:C.gold}}>{nextPrayer} · {nextTime}</div></div>
        <div style={{textAlign:"right"}}><div style={{fontFamily:FM,fontSize:10,color:C.accentMut}}>in</div><div style={{fontFamily:FM,fontSize:18,fontWeight:700,color:C.gold}}>{fmtDur(diffMins)}</div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
        {PRAYERS.map(p=>{
          const isPast=toMins(times[p])<nowMins;
          const isNext=p===nextPrayer;
          return <div key={p} style={{background:isNext?`${C.gold}18`:C.isDark?"#0a1828":C.muted,border:`1px solid ${isNext?C.gold:C.border}`,borderRadius:4,padding:"8px 10px",textAlign:"center"}}>
            <div style={{fontFamily:FM,fontSize:8,color:isNext?C.gold:C.accentMut,letterSpacing:1,marginBottom:3}}>{p.toUpperCase()}</div>
            <div style={{fontFamily:FM,fontSize:12,fontWeight:700,color:isPast&&!isNext?C.accentMut:C.white}}>{times[p]}</div>
          </div>;
        })}
      </div>
    </Panel>
  );
}

// ── Market Sessions Clock ─────────────────────────────────────────────────────
function MarketClock({C}){
  const [now,setNow]=useState(new Date());
  useEffect(()=>{ const i=setInterval(()=>setNow(new Date()),1000); return()=>clearInterval(i); },[]);

  const utcH=now.getUTCHours().toString().padStart(2,"0");
  const utcM=now.getUTCMinutes().toString().padStart(2,"0");
  const utcS=now.getUTCSeconds().toString().padStart(2,"0");

  return (
    <Panel C={C} style={{padding:"18px 22px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <Label C={C}>Market Sessions</Label>
        <span style={{fontFamily:FM,fontSize:10,color:C.accentMut}}>UTC {utcH}:{utcM}:{utcS}</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {SESSIONS_DEF.map(s=>{
          const open=isSessionOpen(s.open,s.close);
          const minsLeft=open?minsUntil(s.close):minsUntil(s.open);
          const barPct=open?(1-(minsLeft/480))*100:(1-(minsLeft/480))*100;
          return (
            <div key={s.name} style={{background:open?`${s.color}12`:C.isDark?"#0a1828":C.muted,border:`1px solid ${open?s.color:C.border}`,borderRadius:5,padding:"10px 14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:open?s.color:C.accentMut,boxShadow:open?`0 0 6px ${s.color}`:undefined}}/>
                  <span style={{fontFamily:F,fontSize:12,fontWeight:600,color:open?C.white:C.accentMut}}>{s.name}</span>
                  <Pill color={open?s.color:C.accentMut}>{open?"OPEN":"CLOSED"}</Pill>
                </div>
                <span style={{fontFamily:FM,fontSize:10,color:C.accentMut}}>{s.open}–{s.close} UTC · {open?"closes in":"opens in"} {fmtDur(minsLeft)}</span>
              </div>
              <PBar C={C} pct={open?Math.max(5,(1-(minsLeft/480))*100):0} color={s.color} h={2}/>
            </div>
          );
        })}
      </div>
      <div style={{marginTop:12,display:"flex",gap:6,flexWrap:"wrap"}}>
        {["London+NY Overlap","Asian+London Overlap"].map(label=>{
          const londonOpen=isSessionOpen("08:00","17:00");
          const nyOpen=isSessionOpen("13:00","22:00");
          const asianOpen=isSessionOpen("00:00","09:00");
          const active=(label.includes("London+NY")&&londonOpen&&nyOpen)||(label.includes("Asian+London")&&asianOpen&&londonOpen);
          return <div key={label} style={{background:active?`${C.gold}18`:C.isDark?"#0a1828":C.muted,border:`1px solid ${active?C.gold:C.border}`,borderRadius:4,padding:"5px 12px",fontFamily:FM,fontSize:9,color:active?C.gold:C.accentMut}}>{label}: {active?"ACTIVE":"INACTIVE"}</div>;
        })}
      </div>
    </Panel>
  );
}

// ── Cert Countdown ────────────────────────────────────────────────────────────
function CertCountdown({C,data,setData}){
  const certs=data.certCountdowns||[];
  const updateDate=(id,date)=>setData(d=>({...d,certCountdowns:d.certCountdowns.map(c=>c.id===id?{...c,date}:c)}));
  const daysUntil=date=>{ if(!date) return null; const diff=Math.ceil((new Date(date)-new Date())/86400000); return diff; };
  return (
    <Panel C={C} style={{padding:"18px 22px"}}>
      <Label C={C} style={{marginBottom:14}}>Certification Countdowns</Label>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {certs.map(cert=>{
          const d=daysUntil(cert.date);
          const isSet=cert.date!=="";
          const isPast=d!==null&&d<0;
          const pct=isSet&&d!==null?Math.max(0,Math.min(100,(1-(d/180))*100)):0;
          return (
            <div key={cert.id} style={{background:C.isDark?"#0a1828":C.muted,border:`1px solid ${C.border}`,borderRadius:5,padding:"12px 14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <Pill color={cert.color}>{cert.cert}</Pill>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  {isSet&&<span style={{fontFamily:FM,fontSize:11,fontWeight:700,color:isPast?C.green:d<=30?C.red:d<=60?C.gold:C.white}}>{isPast?"✓ PASSED":`${d} days`}</span>}
                  <input type="date" value={cert.date} onChange={e=>updateDate(cert.id,e.target.value)}
                    style={{background:C.panel,border:`1px solid ${C.border}`,color:C.accentMut,fontFamily:FM,fontSize:9,padding:"3px 6px",borderRadius:3,outline:"none",cursor:"pointer"}}/>
                </div>
              </div>
              {isSet&&!isPast&&<PBar C={C} pct={pct} color={cert.color} h={3}/>}
              {!isSet&&<div style={{fontFamily:FM,fontSize:9,color:C.accentMut}}>Set your exam date →</div>}
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

// ── Pomodoro Timer ────────────────────────────────────────────────────────────
function Pomodoro({C}){
  const MODES={focus:{label:"Focus",mins:25,color:C.blue},short:{label:"Short Break",mins:5,color:C.green},long:{label:"Long Break",mins:15,color:C.purple}};
  const [mode,setMode]=useState("focus");
  const [secs,setSecs]=useState(25*60);
  const [running,setRunning]=useState(false);
  const [sessions,setSessions]=useState(0);
  const interval=useRef(null);

  useEffect(()=>{
    setSecs(MODES[mode].mins*60); setRunning(false); clearInterval(interval.current);
  },[mode]);

  useEffect(()=>{
    if(running){ interval.current=setInterval(()=>setSecs(s=>{ if(s<=1){ clearInterval(interval.current); setRunning(false); if(mode==="focus")setSessions(n=>n+1); return 0; } return s-1; }),1000); }
    else clearInterval(interval.current);
    return()=>clearInterval(interval.current);
  },[running]);

  const total=MODES[mode].mins*60;
  const pct=((total-secs)/total)*100;
  const m=Math.floor(secs/60).toString().padStart(2,"0");
  const s=(secs%60).toString().padStart(2,"0");
  const color=MODES[mode].color;

  const circumference=2*Math.PI*54;

  return (
    <Panel C={C} style={{padding:"22px 26px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <Label C={C}>Pomodoro Timer</Label>
        <span style={{fontFamily:FM,fontSize:10,color:C.accentMut}}>🍅 {sessions} sessions today</span>
      </div>
      {/* Mode buttons */}
      <div style={{display:"flex",gap:6,marginBottom:20}}>
        {Object.entries(MODES).map(([k,v])=><button key={k} onClick={()=>setMode(k)} style={{flex:1,background:mode===k?`${v.color}22`:"transparent",border:`1px solid ${mode===k?v.color:C.border}`,color:mode===k?v.color:C.accentMut,borderRadius:4,padding:"6px",fontFamily:FM,fontSize:9,letterSpacing:1,cursor:"pointer",transition:"all 0.15s"}}>{v.label.toUpperCase()}</button>)}
      </div>
      {/* Circle timer */}
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
        <svg width="140" height="140" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke={C.border} strokeWidth="6"/>
          <circle cx="60" cy="60" r="54" fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={circumference} strokeDashoffset={circumference*(1-pct/100)}
            strokeLinecap="round" transform="rotate(-90 60 60)" style={{transition:"stroke-dashoffset 0.5s"}}/>
          <text x="60" y="56" textAnchor="middle" fontFamily={FM} fontSize="22" fontWeight="700" fill={C.white}>{m}:{s}</text>
          <text x="60" y="74" textAnchor="middle" fontFamily={FM} fontSize="9" fill={C.accentMut} letterSpacing="2">{MODES[mode].label.toUpperCase()}</text>
        </svg>
        <div style={{display:"flex",gap:10}}>
          <Btn C={C} onClick={()=>setRunning(r=>!r)} variant="primary" style={{minWidth:90,justifyContent:"center"}}>{running?"⏸ Pause":"▶ Start"}</Btn>
          <Btn C={C} onClick={()=>{setSecs(MODES[mode].mins*60);setRunning(false);}} variant="ghost" sm>Reset</Btn>
        </div>
      </div>
    </Panel>
  );
}

// ── Monthly P&L ───────────────────────────────────────────────────────────────
function MonthlyPnL({C,trades}){
  const months={};
  trades.forEach(t=>{
    if(!t.pnl||!t.date) return;
    const m=t.date.slice(0,7);
    if(!months[m]) months[m]={pnl:0,trades:0,wins:0};
    months[m].pnl+=parseFloat(t.pnl)||0;
    months[m].trades++;
    if((parseFloat(t.pnl)||0)>0) months[m].wins++;
  });
  const sorted=Object.entries(months).sort((a,b)=>b[0].localeCompare(a[0])).slice(0,6);
  const maxAbs=Math.max(...sorted.map(([,v])=>Math.abs(v.pnl)),1);

  return (
    <Panel C={C} style={{padding:"18px 22px"}}>
      <Label C={C} style={{marginBottom:14}}>Monthly P&L Summary</Label>
      {sorted.length===0?<div style={{fontFamily:F,fontSize:12,color:C.accentMut}}>No trades logged yet.</div>
        :sorted.map(([month,v])=>{
          const d=new Date(month+"-01");
          const label=d.toLocaleDateString("en-GB",{month:"short",year:"numeric"});
          const wr=v.trades?Math.round(v.wins/v.trades*100):0;
          return (
            <div key={month} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                <span style={{fontFamily:FM,fontSize:11,fontWeight:600,color:C.white,width:72}}>{label}</span>
                <div style={{flex:1,margin:"0 12px",height:6,background:C.border,borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${(Math.abs(v.pnl)/maxAbs)*100}%`,background:v.pnl>=0?C.green:C.red,borderRadius:3}}/>
                </div>
                <span style={{fontFamily:FM,fontSize:11,fontWeight:700,color:v.pnl>=0?C.green:C.red,width:80,textAlign:"right"}}>{v.pnl>=0?"+":""}{v.pnl.toFixed(2)}</span>
                <span style={{fontFamily:FM,fontSize:9,color:C.accentMut,width:50,textAlign:"right"}}>{wr}% WR</span>
              </div>
            </div>
          );
        })}
    </Panel>
  );
}

// ── Overview ──────────────────────────────────────────────────────────────────
function Overview({C,data,setData}){
  const todayTrades=data.trades.filter(t=>t.date===TODAY);
  const todayPnl=todayTrades.reduce((s,t)=>s+(parseFloat(t.pnl)||0),0);
  const totalPnl=data.trades.reduce((s,t)=>s+(parseFloat(t.pnl)||0),0);
  const wins=data.trades.filter(t=>(parseFloat(t.pnl)||0)>0).length;
  const wr=data.trades.length?Math.round(wins/data.trades.length*100):0;
  const allRoutine=[...data.routine.morning,...(data.routine.afternoon||[]),...data.routine.evening];
  const doneRoutine=allRoutine.filter(r=>r.done).length;
  const streak=calcStreak(data.routineStreakData);

  const KPI=({label,value,sub,color,mono=false})=>(
    <Panel C={C} style={{padding:"18px 20px",flex:1}}>
      <Label C={C} style={{marginBottom:8}}>{label}</Label>
      <div style={{fontFamily:mono?FM:F,fontSize:26,fontWeight:700,color:color||C.white,lineHeight:1,letterSpacing:mono?1:"-0.02em"}}>{value}</div>
      {sub&&<div style={{fontFamily:FM,fontSize:9,color:C.accentMut,marginTop:5}}>{sub}</div>}
    </Panel>
  );

  const openTrades=data.trades.filter(t=>t.status==="OPEN");

  return (
    <div style={{padding:"28px 32px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:22}}>
        <div>
          <div style={{fontFamily:F,fontSize:20,fontWeight:700,color:C.white,marginBottom:3}}>Good {new Date().getHours()<12?"Morning":new Date().getHours()<18?"Afternoon":"Evening"}, Adam.</div>
          <div style={{fontFamily:F,fontSize:12,color:C.accentMut}}>Here's your full picture for today.</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {streak>0&&<div style={{background:`${C.gold}18`,border:`1px solid ${C.gold}44`,borderRadius:5,padding:"6px 14px",display:"flex",alignItems:"center",gap:6}}><span>🔥</span><span style={{fontFamily:FM,fontSize:11,fontWeight:700,color:C.gold}}>{streak} day streak</span></div>}
          <Pill color={C.blue}>{new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})}</Pill>
        </div>
      </div>

      <div style={{display:"flex",gap:10,marginBottom:14}}>
        <KPI label="Today P&L" value={`${todayPnl>=0?"+":"-"}$${Math.abs(todayPnl).toFixed(0)}`} sub={`${todayTrades.length} trades today`} color={todayPnl>0?C.green:todayPnl<0?C.red:C.white} mono/>
        <KPI label="Total P&L" value={`${totalPnl>=0?"+":"-"}$${Math.abs(totalPnl).toFixed(0)}`} sub={`${data.trades.length} total`} color={totalPnl>0?C.green:totalPnl<0?C.red:C.white} mono/>
        <KPI label="Win Rate" value={`${wr}%`} sub={`${wins}W · ${data.trades.length-wins}L`}/>
        <KPI label="Routine" value={`${doneRoutine}/${allRoutine.length}`} sub="completed today"/>
        <KPI label="Open Pos." value={openTrades.length} sub="active positions" color={openTrades.length>0?C.gold:C.white}/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <Panel C={C} style={{padding:"20px 22px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><Label C={C}>Open Positions</Label><Pill color={C.gold}>{openTrades.length} OPEN</Pill></div>
          {openTrades.length===0?<div style={{fontFamily:F,fontSize:12,color:C.accentMut}}>No open positions.</div>:openTrades.slice(0,5).map(t=>(
            <div key={t.id} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 0",borderBottom:`1px solid ${C.border}`}}>
              <div style={{width:3,height:26,borderRadius:2,background:t.direction==="LONG"?C.green:C.red,flexShrink:0}}/>
              <div style={{flex:1}}><div style={{fontFamily:FM,fontSize:12,fontWeight:700,color:C.white}}>{t.pair}</div><div style={{fontFamily:FM,fontSize:9,color:C.accentMut}}>Entry {t.entry||"—"}</div></div>
              <Pill color={t.direction==="LONG"?C.green:C.red}>{t.direction}</Pill>
            </div>
          ))}
        </Panel>
        <Panel C={C} style={{padding:"20px 22px"}}>
          <Label C={C} style={{marginBottom:16}}>Active Goals</Label>
          {data.goals.filter(g=>!g.done).length===0?<div style={{fontFamily:F,fontSize:12,color:C.accentMut}}>No active goals.</div>:data.goals.filter(g=>!g.done).slice(0,5).map(g=>(
            <div key={g.id} style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontFamily:F,fontSize:12,color:C.offwhite,fontWeight:500}}>{g.text}</span><span style={{fontFamily:FM,fontSize:10,color:C.accentDim}}>{g.progress||0}%</span></div>
              <PBar C={C} pct={g.progress||0}/>
            </div>
          ))}
        </Panel>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <PrayerWidget C={C}/>
        <MarketClock C={C}/>
      </div>
    </div>
  );
}

// ── Analytics ─────────────────────────────────────────────────────────────────
function Analytics({C,data}){
  const sorted=[...data.trades].filter(t=>t.pnl&&t.date).sort((a,b)=>a.date.localeCompare(b.date));
  let cum=0;
  const eq=sorted.map(t=>{ cum+=parseFloat(t.pnl)||0; return {date:t.date,cum:+cum.toFixed(2)}; });
  const W=700,H=200,P={t:16,r:16,b:32,l:56};
  const cw=W-P.l-P.r,ch=H-P.t-P.b;
  const vals=eq.map(p=>p.cum);
  const minV=vals.length?Math.min(...vals,0):0;
  const maxV=vals.length?Math.max(...vals,0.01):1;
  const rng=maxV-minV||1;
  const xS=i=>P.l+(i/(eq.length-1||1))*cw;
  const yS=v=>P.t+ch-(((v-minV)/rng)*ch);
  const pathD=eq.length<2?"":eq.map((p,i)=>`${i===0?"M":"L"}${xS(i).toFixed(1)},${yS(p.cum).toFixed(1)}`).join(" ");
  const areaD=eq.length<2?"":pathD+` L${xS(eq.length-1).toFixed(1)},${(P.t+ch).toFixed(1)} L${P.l},${(P.t+ch).toFixed(1)} Z`;
  const lastCum=eq.length?eq[eq.length-1].cum:0;
  const lc=lastCum>=0?C.green:C.red;
  const yTicks=Array.from({length:5},(_,i)=>{ const v=minV+(i/4)*rng; return {v,y:yS(v)}; });
  const calDays=[]; for(let i=69;i>=0;i--){ const d=new Date(); d.setDate(d.getDate()-i); calDays.push(d.toISOString().split("T")[0]); }
  const dayMap={};
  data.trades.forEach(t=>{ if(!t.pnl||!t.date) return; dayMap[t.date]=(dayMap[t.date]||0)+(parseFloat(t.pnl)||0); });
  const calColor=v=>{ if(v===undefined) return C.border; if(v>0) return `rgba(76,175,130,${Math.min(1,Math.abs(v)/200+0.25)})`; return `rgba(224,92,92,${Math.min(1,Math.abs(v)/200+0.25)})`; };
  const totalPnl=data.trades.reduce((s,t)=>s+(parseFloat(t.pnl)||0),0);
  const wins=data.trades.filter(t=>(parseFloat(t.pnl)||0)>0).length;
  const losses=data.trades.filter(t=>(parseFloat(t.pnl)||0)<0).length;
  const avgWin=wins?data.trades.filter(t=>(parseFloat(t.pnl)||0)>0).reduce((s,t)=>s+(parseFloat(t.pnl)||0),0)/wins:0;
  const avgLoss=losses?data.trades.filter(t=>(parseFloat(t.pnl)||0)<0).reduce((s,t)=>s+(parseFloat(t.pnl)||0),0)/losses:0;
  const bestDay=Object.entries(dayMap).sort((a,b)=>b[1]-a[1])[0];
  const worstDay=Object.entries(dayMap).sort((a,b)=>a[1]-b[1])[0];
  const pairMap={};
  data.trades.forEach(t=>{ if(!pairMap[t.pair]) pairMap[t.pair]={pnl:0,trades:0,wins:0}; pairMap[t.pair].pnl+=parseFloat(t.pnl)||0; pairMap[t.pair].trades++; if((parseFloat(t.pnl)||0)>0)pairMap[t.pair].wins++; });
  const pairs=Object.entries(pairMap).sort((a,b)=>b[1].pnl-a[1].pnl);

  return (
    <div style={{padding:"28px 32px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
        <div style={{fontFamily:F,fontSize:18,fontWeight:700,color:C.white}}>Analytics</div>
        <Btn C={C} variant="ghost" sm onClick={()=>exportCSV(data.trades)}>⬇ Export CSV</Btn>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:16}}>
        {[{label:"Total P&L",value:`${totalPnl>=0?"+":"-"}$${Math.abs(totalPnl).toFixed(2)}`,color:totalPnl>=0?C.green:C.red,mono:true},{label:"Avg Win",value:wins?`+$${avgWin.toFixed(2)}`:"—",color:C.green,mono:true},{label:"Avg Loss",value:losses?`-$${Math.abs(avgLoss).toFixed(2)}`:"—",color:C.red,mono:true},{label:"Best Day",value:bestDay?`+$${bestDay[1].toFixed(0)}`:"—",color:C.green,mono:true},{label:"Worst Day",value:worstDay&&worstDay[1]<0?`-$${Math.abs(worstDay[1]).toFixed(0)}`:"—",color:C.red,mono:true}].map(k=>(
          <Panel C={C} key={k.label} style={{padding:"14px 18px",flex:1}}><Label C={C} style={{marginBottom:6}}>{k.label}</Label><div style={{fontFamily:k.mono?FM:F,fontSize:18,fontWeight:700,color:k.color||C.white}}>{k.value}</div></Panel>
        ))}
      </div>
      <Panel C={C} style={{padding:"20px 24px",marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><Label C={C}>Equity Curve</Label><span style={{fontFamily:FM,fontSize:11,fontWeight:700,color:lastCum>=0?C.green:C.red}}>{lastCum>=0?"+":""}{lastCum.toFixed(2)}</span></div>
        {eq.length<2?<div style={{height:H,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F,fontSize:12,color:C.accentMut}}>Log at least 2 closed trades to see the curve.</div>
          :<svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{display:"block"}}>
            <defs><linearGradient id="eq" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={lc} stopOpacity="0.2"/><stop offset="100%" stopColor={lc} stopOpacity="0.02"/></linearGradient></defs>
            {yTicks.map((t,i)=><g key={i}><line x1={P.l} y1={t.y} x2={W-P.r} y2={t.y} stroke={C.border} strokeWidth="1"/><text x={P.l-6} y={t.y+4} textAnchor="end" fontFamily={FM} fontSize="9" fill={C.accentMut}>{t.v.toFixed(0)}</text></g>)}
            {minV<0&&maxV>0&&<line x1={P.l} y1={yS(0)} x2={W-P.r} y2={yS(0)} stroke={C.accentMut} strokeWidth="1" strokeDasharray="4,3"/>}
            <path d={areaD} fill="url(#eq)"/>
            <path d={pathD} fill="none" stroke={lc} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
            {eq.length>0&&<circle cx={xS(eq.length-1)} cy={yS(lastCum)} r="4" fill={lc} stroke={C.card} strokeWidth="2"/>}
          </svg>}
      </Panel>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
        <Panel C={C} style={{padding:"20px 24px"}}>
          <Label C={C} style={{marginBottom:14}}>Trade Calendar</Label>
          <div style={{display:"grid",gridTemplateColumns:"repeat(10,1fr)",gap:3}}>
            {calDays.map(day=><div key={day} title={`${day}${dayMap[day]!==undefined?` · ${dayMap[day]>=0?"+":""}$${dayMap[day].toFixed(2)}`:""}`} style={{aspectRatio:"1",borderRadius:2,background:calColor(dayMap[day]),border:`1px solid ${C.border}`,cursor:"default",transition:"transform 0.1s"}} onMouseOver={e=>e.currentTarget.style.transform="scale(1.4)"} onMouseOut={e=>e.currentTarget.style.transform="scale(1)"}/>)}
          </div>
          <div style={{display:"flex",gap:12,marginTop:10}}>
            {[{c:C.green,l:"Profit"},{c:C.red,l:"Loss"},{c:C.border,l:"No trade"}].map(x=><div key={x.l} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:1,background:x.c}}/><span style={{fontFamily:FM,fontSize:8,color:C.accentMut}}>{x.l}</span></div>)}
          </div>
        </Panel>
        <Panel C={C} style={{padding:"20px 24px"}}>
          <Label C={C} style={{marginBottom:14}}>Performance by Pair</Label>
          {pairs.length===0?<div style={{fontFamily:F,fontSize:12,color:C.accentMut}}>No closed trades yet.</div>:pairs.map(([pair,s])=>{
            const maxAbs=Math.max(...pairs.map(p=>Math.abs(p[1].pnl)),1);
            return <div key={pair} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:FM,fontSize:11,fontWeight:700,color:C.white,width:90}}>{pair}</span><span style={{fontFamily:FM,fontSize:10,color:s.pnl>=0?C.green:C.red,fontWeight:700}}>{s.pnl>=0?"+":""}{s.pnl.toFixed(2)}</span><span style={{fontFamily:FM,fontSize:9,color:C.accentMut}}>{s.trades?Math.round(s.wins/s.trades*100):0}% WR</span></div>
              <PBar C={C} pct={(Math.abs(s.pnl)/maxAbs)*100} color={s.pnl>=0?C.green:C.red} h={3}/>
            </div>;
          })}
        </Panel>
      </div>
      <MonthlyPnL C={C} trades={data.trades}/>
    </div>
  );
}

// ── Trading Journal ───────────────────────────────────────────────────────────
const PAIRS_=["XAU/USD","XAG/USD","EUR/USD","GBP/USD","NAS100","US30","GER30","BTC/USD"];
const ET={date:TODAY,pair:"XAU/USD",direction:"LONG",entry:"",sl:"",tp:"",pnl:"",rr:"",session:"London",status:"OPEN",notes:""};
function TradingJournal({C,data,setData}){
  const [form,setForm]=useState(ET);
  const [editId,setEditId]=useState(null);
  const [fpair,setFpair]=useState("ALL");
  const [fstat,setFstat]=useState("ALL");
  const s=(k,v)=>setForm(f=>({...f,[k]:v}));
  const trades=data.trades.filter(t=>(fpair==="ALL"||t.pair===fpair)&&(fstat==="ALL"||t.status===fstat));
  const pnlSum=trades.reduce((a,t)=>a+(parseFloat(t.pnl)||0),0);
  const wins=trades.filter(t=>(parseFloat(t.pnl)||0)>0).length;
  const wr=trades.length?Math.round(wins/trades.length*100):0;
  const avgRR=trades.filter(t=>t.rr).length?(trades.reduce((a,t)=>a+(parseFloat(t.rr)||0),0)/trades.filter(t=>t.rr).length).toFixed(2):"—";
  const submit=()=>{ if(!form.pair) return; if(editId!==null){setData(d=>({...d,trades:d.trades.map(t=>t.id===editId?{...form,id:editId}:t)}));setEditId(null);}else setData(d=>({...d,trades:[{...form,id:Date.now()},...d.trades]})); setForm(ET); };
  const edit=t=>{setForm({...t});setEditId(t.id);};
  const del=id=>setData(d=>({...d,trades:d.trades.filter(t=>t.id!==id)}));
  const FG=({label,children})=><div><Label C={C} style={{marginBottom:4}}>{label}</Label>{children}</div>;
  return (
    <div style={{padding:"28px 32px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{fontFamily:F,fontSize:18,fontWeight:700,color:C.white}}>Trading Journal</div>
        <Btn C={C} variant="ghost" sm onClick={()=>exportCSV(data.trades)}>⬇ Export CSV</Btn>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:20}}>
        {[{label:"P&L",value:`${pnlSum>=0?"+":"-"}$${Math.abs(pnlSum).toFixed(2)}`,color:pnlSum>0?C.green:pnlSum<0?C.red:C.white,mono:true},{label:"Trades",value:trades.length},{label:"Win Rate",value:`${wr}%`,sub:`${wins}W · ${trades.length-wins}L`},{label:"Avg R:R",value:avgRR==="—"?avgRR:`1:${avgRR}`,mono:true},{label:"Open",value:data.trades.filter(t=>t.status==="OPEN").length,color:C.gold}].map(k=>(
          <Panel C={C} key={k.label} style={{padding:"14px 18px",flex:1}}><Label C={C} style={{marginBottom:6}}>{k.label}</Label><div style={{fontFamily:k.mono?FM:F,fontSize:20,fontWeight:700,color:k.color||C.white}}>{k.value}</div>{k.sub&&<div style={{fontFamily:FM,fontSize:9,color:C.accentMut,marginTop:3}}>{k.sub}</div>}</Panel>
        ))}
      </div>
      <Panel C={C} style={{padding:"20px 24px",marginBottom:18,borderColor:editId?C.borderHi:C.border}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><Label C={C} style={{color:editId?C.offwhite:C.accentMut}}>{editId?"✎ Editing":"+ Log New Trade"}</Label>{editId&&<Btn C={C} variant="ghost" sm onClick={()=>{setEditId(null);setForm(ET);}}>Cancel</Btn>}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:10,alignItems:"flex-end"}}>
          <FG label="Date"><Inp C={C} value={form.date} onChange={v=>s("date",v)} width={108}/></FG>
          <FG label="Pair"><Sel C={C} value={form.pair} onChange={v=>s("pair",v)} options={PAIRS_}/></FG>
          <FG label="Dir"><Sel C={C} value={form.direction} onChange={v=>s("direction",v)} options={["LONG","SHORT"]} style={{color:form.direction==="LONG"?C.green:C.red}}/></FG>
          <FG label="Entry"><Inp C={C} value={form.entry} onChange={v=>s("entry",v)} placeholder="0.00" width={86}/></FG>
          <FG label="S/L"><Inp C={C} value={form.sl} onChange={v=>s("sl",v)} placeholder="0.00" width={86}/></FG>
          <FG label="T/P"><Inp C={C} value={form.tp} onChange={v=>s("tp",v)} placeholder="0.00" width={86}/></FG>
          <FG label="P&L $"><Inp C={C} value={form.pnl} onChange={v=>s("pnl",v)} placeholder="+/–" width={78}/></FG>
          <FG label="R:R"><Inp C={C} value={form.rr} onChange={v=>s("rr",v)} placeholder="2.5" width={62}/></FG>
          <FG label="Session"><Sel C={C} value={form.session} onChange={v=>s("session",v)} options={["London","New York","Asian","Overlap"]}/></FG>
          <FG label="Status"><Sel C={C} value={form.status} onChange={v=>s("status",v)} options={["OPEN","CLOSED","STOPPED"]}/></FG>
          <FG label="Notes"><Inp C={C} value={form.notes} onChange={v=>s("notes",v)} placeholder="Setup, confluences…" style={{width:200}}/></FG>
          <Btn C={C} onClick={submit} style={{marginTop:14}}>{editId?"Update":"Log Trade"}</Btn>
        </div>
      </Panel>
      <div style={{display:"flex",gap:5,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
        {["ALL",...PAIRS_].map(f=><button key={f} onClick={()=>setFpair(f)} style={{background:fpair===f?C.offwhite:"transparent",border:`1px solid ${fpair===f?C.offwhite:C.border}`,color:fpair===f?C.bg:C.accentMut,borderRadius:3,padding:"3px 9px",fontFamily:FM,fontSize:9,letterSpacing:1,cursor:"pointer",transition:"all 0.12s"}}>{f}</button>)}
        <div style={{width:1,height:14,background:C.border,margin:"0 3px"}}/>
        {["ALL","OPEN","CLOSED","STOPPED"].map(f=><button key={f} onClick={()=>setFstat(f)} style={{background:fstat===f?C.offwhite:"transparent",border:`1px solid ${fstat===f?C.offwhite:C.border}`,color:fstat===f?C.bg:C.accentMut,borderRadius:3,padding:"3px 9px",fontFamily:FM,fontSize:9,letterSpacing:1,cursor:"pointer",transition:"all 0.12s"}}>{f}</button>)}
      </div>
      <Panel C={C} style={{overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{borderBottom:`1px solid ${C.border}`,background:C.panel}}>{["Date","Pair","Dir","Entry","S/L","T/P","P&L","R:R","Session","Status","Notes",""].map(h=><th key={h} style={{padding:"10px 12px",fontFamily:FM,fontSize:9,color:C.accentMut,letterSpacing:2,fontWeight:500,textAlign:"left",whiteSpace:"nowrap"}}>{h.toUpperCase()}</th>)}</tr></thead>
            <tbody>
              {trades.length===0&&<tr><td colSpan={12} style={{padding:"32px",textAlign:"center",fontFamily:F,fontSize:12,color:C.accentMut}}>No trades yet.</td></tr>}
              {trades.map(t=><tr key={t.id} style={{borderBottom:`1px solid ${C.border}`,transition:"background 0.1s"}} onMouseEnter={e=>e.currentTarget.style.background=C.panel} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <td style={{padding:"11px 12px",fontFamily:FM,fontSize:10,color:C.accentMut}}>{t.date}</td>
                <td style={{padding:"11px 12px",fontFamily:FM,fontSize:12,fontWeight:700,color:C.white}}>{t.pair}</td>
                <td style={{padding:"11px 12px"}}><Pill color={t.direction==="LONG"?C.green:C.red}>{t.direction}</Pill></td>
                <td style={{padding:"11px 12px",fontFamily:FM,fontSize:11,color:C.offwhite}}>{t.entry||"—"}</td>
                <td style={{padding:"11px 12px",fontFamily:FM,fontSize:11,color:C.red}}>{t.sl||"—"}</td>
                <td style={{padding:"11px 12px",fontFamily:FM,fontSize:11,color:C.blue}}>{t.tp||"—"}</td>
                <td style={{padding:"11px 12px"}}><PnlVal val={t.pnl} C={C}/></td>
                <td style={{padding:"11px 12px",fontFamily:FM,fontSize:11,color:C.accentDim}}>{t.rr?`1:${t.rr}`:"—"}</td>
                <td style={{padding:"11px 12px",fontFamily:FM,fontSize:10,color:C.accentMut}}>{t.session}</td>
                <td style={{padding:"11px 12px"}}><Pill color={t.status==="OPEN"?C.gold:t.status==="CLOSED"?C.accentMut:C.red}>{t.status}</Pill></td>
                <td style={{padding:"11px 12px",fontFamily:F,fontSize:11,color:C.accentMut,maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.notes}</td>
                <td style={{padding:"11px 12px"}}><div style={{display:"flex",gap:8}}><span onClick={()=>edit(t)} style={{cursor:"pointer",fontFamily:FM,fontSize:11,color:C.accentMut}}>✎</span><span onClick={()=>del(t.id)} style={{cursor:"pointer",fontFamily:FM,fontSize:11,color:C.accentMut}}>✕</span></div></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

// ── Tasks ─────────────────────────────────────────────────────────────────────
function Tasks({C,data,setData}){
  const toggle=(list,id)=>setData(d=>({...d,todos:{...d.todos,[list]:d.todos[list].map(t=>t.id===id?{...t,done:!t.done}:t)}}));
  const add=(list,text)=>setData(d=>({...d,todos:{...d.todos,[list]:[...d.todos[list],{id:Date.now(),text,done:false}]}}));
  const del=(list,id)=>setData(d=>({...d,todos:{...d.todos,[list]:d.todos[list].filter(t=>t.id!==id)}}));
  const LP=({name})=>{ const [inp,setInp]=useState(""); const items=data.todos[name]||[]; const done=items.filter(i=>i.done).length;
    return <Panel C={C} style={{padding:"20px 22px"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontFamily:F,fontSize:13,fontWeight:600,color:C.white}}>{name}</span><span style={{fontFamily:FM,fontSize:10,color:done===items.length&&items.length>0?C.green:C.accentMut}}>{done}/{items.length}</span></div><PBar C={C} pct={items.length?Math.round(done/items.length*100):0} h={2}/><div style={{marginTop:14}}>{items.map(item=><div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.border}`}}><Check C={C} done={item.done} onClick={()=>toggle(name,item.id)}/><span style={{flex:1,fontFamily:F,fontSize:12,color:item.done?C.accentMut:C.offwhite,textDecoration:item.done?"line-through":"none"}}>{item.text}</span><span onClick={()=>del(name,item.id)} style={{cursor:"pointer",fontSize:10,color:C.accentMut}}>✕</span></div>)}{items.length===0&&<div style={{fontFamily:F,fontSize:11,color:C.accentMut,padding:"6px 0"}}>Empty.</div>}</div><div style={{display:"flex",gap:8,marginTop:12}}><Inp C={C} value={inp} onChange={setInp} placeholder="New task…" style={{flex:1}} onKeyDown={e=>{if(e.key==="Enter"&&inp.trim()){add(name,inp.trim());setInp("");}}}/><Btn C={C} sm onClick={()=>{if(inp.trim()){add(name,inp.trim());setInp("");}}}>Add</Btn></div></Panel>; };
  return <div style={{padding:"28px 32px"}}><div style={{fontFamily:F,fontSize:18,fontWeight:700,color:C.white,marginBottom:20}}>Task Lists</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{Object.keys(data.todos).map(n=><LP key={n} name={n}/>)}</div></div>;
}

// ── Goals ─────────────────────────────────────────────────────────────────────
const CATS_=["Financial","Business","Study","Health","Trading","Personal"];
const CAtc={ Financial:DARK.gold,Business:DARK.blue,Study:DARK.green,Health:"#e07a5f",Trading:DARK.offwhite,Personal:DARK.purple };
function Goals({C,data,setData}){
  const [text,setText]=useState(""); const [cat,setCat]=useState("Financial");
  const add=()=>{ if(!text.trim()) return; setData(d=>({...d,goals:[...d.goals,{id:Date.now(),text:text.trim(),category:cat,progress:0,done:false}]})); setText(""); };
  const setP=(id,v)=>setData(d=>({...d,goals:d.goals.map(g=>g.id===id?{...g,progress:v}:g)}));
  const toggle=id=>setData(d=>({...d,goals:d.goals.map(g=>g.id===id?{...g,done:!g.done}:g)}));
  const del=id=>setData(d=>({...d,goals:d.goals.filter(g=>g.id!==id)}));
  return (
    <div style={{padding:"28px 32px"}}>
      <div style={{fontFamily:F,fontSize:18,fontWeight:700,color:C.white,marginBottom:20}}>Goals & Objectives</div>
      <Panel C={C} style={{padding:"18px 22px",marginBottom:20}}>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"flex-end"}}>
          <div style={{flex:"1 1 260px"}}><Label C={C} style={{marginBottom:4}}>Goal</Label><Inp C={C} value={text} onChange={setText} placeholder="Define your objective…" style={{width:"100%"}} onKeyDown={e=>e.key==="Enter"&&add()}/></div>
          <div><Label C={C} style={{marginBottom:4}}>Category</Label><Sel C={C} value={cat} onChange={setCat} options={CATS_}/></div>
          <Btn C={C} onClick={add}>Add Goal</Btn>
        </div>
      </Panel>
      <Label C={C} style={{marginBottom:10}}>Active — {data.goals.filter(g=>!g.done).length}</Label>
      {data.goals.filter(g=>!g.done).map(g=><Panel C={C} key={g.id} style={{padding:"16px 20px",marginBottom:8}}><div style={{display:"flex",alignItems:"center",gap:12}}><Check C={C} done={false} onClick={()=>toggle(g.id)} size={18}/><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><span style={{fontFamily:F,fontSize:12,fontWeight:500,color:C.white}}>{g.text}</span><Pill color={CAtc[g.category]||C.accent}>{g.category}</Pill></div><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{flex:1}}><PBar C={C} pct={g.progress||0} h={4}/></div><input type="range" min={0} max={100} value={g.progress||0} onChange={e=>setP(g.id,+e.target.value)} style={{width:80,accentColor:C.offwhite,cursor:"pointer"}}/><span style={{fontFamily:FM,fontSize:10,color:C.accentDim,width:32,textAlign:"right"}}>{g.progress||0}%</span></div></div><span onClick={()=>del(g.id)} style={{cursor:"pointer",fontSize:11,color:C.accentMut}}>✕</span></div></Panel>)}
      {data.goals.filter(g=>g.done).length>0&&<><Label C={C} style={{margin:"18px 0 10px"}}>Completed</Label>{data.goals.filter(g=>g.done).map(g=><Panel C={C} key={g.id} style={{padding:"12px 20px",marginBottom:6,opacity:.4}}><div style={{display:"flex",alignItems:"center",gap:12}}><Check C={C} done onClick={()=>toggle(g.id)} size={18}/><span style={{fontFamily:F,fontSize:12,color:C.accentMut,textDecoration:"line-through",flex:1}}>{g.text}</span><span onClick={()=>del(g.id)} style={{cursor:"pointer",fontSize:11,color:C.accentMut}}>✕</span></div></Panel>)}</>}
    </div>
  );
}

// ── Routine ───────────────────────────────────────────────────────────────────
function Routine({C,data,setData}){
  const toggle=(block,id)=>setData(d=>({...d,routine:{...d.routine,[block]:d.routine[block].map(r=>r.id===id?{...r,done:!r.done}:r)}}));
  const allBlocks=[...data.routine.morning,...(data.routine.afternoon||[]),...data.routine.evening];
  const allDone=allBlocks.every(r=>r.done);

  // Auto-record streak when all done
  useEffect(()=>{
    if(allDone&&allBlocks.length>0){
      setData(d=>({ ...d, routineStreakData:{ ...d.routineStreakData, [TODAY]:true } }));
    }
  },[allDone]);

  const reset=()=>setData(d=>({...d,routine:{morning:d.routine.morning.map(r=>({...r,done:false})),afternoon:(d.routine.afternoon||[]).map(r=>({...r,done:false})),evening:d.routine.evening.map(r=>({...r,done:false}))}}));
  const Block=({title,block,accent})=>{
    const items=data.routine[block]||[]; const done=items.filter(r=>r.done).length; const pct=items.length?Math.round(done/items.length*100):0;
    return <Panel C={C} style={{flex:1}}>
      <div style={{padding:"16px 20px 12px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontFamily:F,fontSize:13,fontWeight:600,color:C.white}}>{title}</span><span style={{fontFamily:FM,fontSize:10,color:pct===100?(accent||C.green):C.accentMut}}>{done}/{items.length}</span></div>
        <PBar C={C} pct={pct} color={pct===100?(accent||C.green):C.offwhite}/>
      </div>
      {items.map(r=><div key={r.id} onClick={()=>toggle(block,r.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 20px",cursor:"pointer",borderBottom:`1px solid ${C.border}`,borderLeft:`3px solid ${r.done?(accent||C.offwhite):"transparent"}`,transition:"all 0.12s"}} onMouseEnter={e=>e.currentTarget.style.background=C.panel} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><Check C={C} done={r.done} onClick={()=>{}}/><span style={{fontFamily:F,fontSize:12,fontWeight:r.done?400:500,color:r.done?C.accentMut:C.offwhite,textDecoration:r.done?"line-through":"none"}}>{r.label}</span></div>)}
    </Panel>;
  };
  const streak=calcStreak(data.routineStreakData);
  const done=allBlocks.filter(r=>r.done).length;
  return (
    <div style={{padding:"28px 32px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:20}}>
        <div style={{fontFamily:F,fontSize:18,fontWeight:700,color:C.white}}>Daily Routine</div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          {streak>0&&<div style={{display:"flex",alignItems:"center",gap:5,background:`${C.gold}18`,border:`1px solid ${C.gold}44`,borderRadius:4,padding:"5px 12px"}}><span>🔥</span><span style={{fontFamily:FM,fontSize:11,fontWeight:700,color:C.gold}}>{streak} day streak</span></div>}
          <span style={{fontFamily:FM,fontSize:10,color:C.accentMut}}>{done}/{allBlocks.length} done</span>
          <Btn C={C} variant="ghost" sm onClick={reset}>Reset Day</Btn>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
        <Block title="🌅 Morning" block="morning" accent={C.gold}/>
        <Block title="🕌 Prayers" block="afternoon" accent={C.purple}/>
        <Block title="🌙 Evening" block="evening" accent={C.blue}/>
      </div>
    </div>
  );
}

// ── Body ──────────────────────────────────────────────────────────────────────
function Body({C,data,setData}){
  const [sf,setSf]=useState({date:TODAY,bed:"",wake:"",quality:"Good"});
  const [gf,setGf]=useState({date:TODAY,type:"Weights",duration:"",notes:""});
  const logSleep=()=>{ if(!sf.bed||!sf.wake) return; setData(d=>({...d,sleep:{...d.sleep,logs:[{...sf,id:Date.now()},...d.sleep.logs]}})); setSf({date:TODAY,bed:"",wake:"",quality:"Good"}); };
  const logGym=()=>{ setData(d=>({...d,gym:{logs:[{...gf,id:Date.now()},...d.gym.logs]}})); setGf({date:TODAY,type:"Weights",duration:"",notes:""}); };
  const updS=(k,v)=>setData(d=>({...d,sleep:{...d.sleep,[k]:v}}));
  const delSleep=id=>setData(d=>({...d,sleep:{...d.sleep,logs:d.sleep.logs.filter(l=>l.id!==id)}}));
  const delGym=id=>setData(d=>({...d,gym:{logs:d.gym.logs.filter(l=>l.id!==id)}}));
  const hrs=l=>{ if(!l.bed||!l.wake) return null; let h=(new Date(`2000-01-01T${l.wake}`)-new Date(`2000-01-01T${l.bed}`))/3600000; if(h<0)h+=24; return h.toFixed(1); };
  const gymStreak=(()=>{ const dates=[...new Set(data.gym.logs.map(l=>l.date))].sort((a,b)=>b.localeCompare(a)); let s=0,p=null; for(const d of dates){if(!p){s=1;p=d;continue;} const diff=Math.round((new Date(p)-new Date(d))/86400000); if(diff===1){s++;p=d;}else break;} return s; })();
  const QC={Poor:C.red,Okay:C.gold,Good:C.green,Great:C.green};
  const TI=({value,onChange})=><input type="time" value={value} onChange={e=>onChange(e.target.value)} style={{background:C.panel,border:`1px solid ${C.border}`,color:C.white,fontFamily:FM,fontSize:18,fontWeight:600,padding:"8px 12px",borderRadius:4,outline:"none",width:130}}/>;
  return (
    <div style={{padding:"28px 32px"}}>
      <div style={{fontFamily:F,fontSize:18,fontWeight:700,color:C.white,marginBottom:20}}>Body Tracking</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Panel C={C} style={{padding:"20px 22px"}}><Label C={C} style={{marginBottom:14}}>Sleep Targets</Label><div style={{display:"flex",gap:18}}><div><Label C={C} style={{marginBottom:5}}>Bedtime</Label><TI value={data.sleep.target_bed} onChange={v=>updS("target_bed",v)}/></div><div><Label C={C} style={{marginBottom:5}}>Wake Up</Label><TI value={data.sleep.target_wake} onChange={v=>updS("target_wake",v)}/></div></div></Panel>
          <Panel C={C} style={{padding:"20px 22px",flex:1}}><Label C={C} style={{marginBottom:12}}>Log Sleep</Label><div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}><Inp C={C} value={sf.date} onChange={v=>setSf(f=>({...f,date:v}))} width={106}/><input type="time" value={sf.bed} onChange={e=>setSf(f=>({...f,bed:e.target.value}))} style={{background:C.panel,border:`1px solid ${C.border}`,color:C.offwhite,fontFamily:FM,fontSize:11,padding:"8px 10px",borderRadius:4,outline:"none"}}/><input type="time" value={sf.wake} onChange={e=>setSf(f=>({...f,wake:e.target.value}))} style={{background:C.panel,border:`1px solid ${C.border}`,color:C.offwhite,fontFamily:FM,fontSize:11,padding:"8px 10px",borderRadius:4,outline:"none"}}/><Sel C={C} value={sf.quality} onChange={v=>setSf(f=>({...f,quality:v}))} options={["Poor","Okay","Good","Great"]}/><Btn C={C} sm onClick={logSleep}>Log</Btn></div>
            {data.sleep.logs.length===0&&<div style={{fontFamily:F,fontSize:12,color:C.accentMut}}>No logs yet.</div>}
            {data.sleep.logs.slice(0,7).map(l=><div key={l.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.border}`}}><span style={{fontFamily:FM,fontSize:10,color:C.accentMut,width:88,flexShrink:0}}>{l.date}</span><span style={{fontFamily:FM,fontSize:10,color:C.offwhite}}>{l.bed}→{l.wake}</span><span style={{fontFamily:FM,fontSize:11,fontWeight:700,color:C.white,marginLeft:"auto"}}>{hrs(l)}h</span><Pill color={QC[l.quality]||C.accent}>{l.quality}</Pill><span onClick={()=>delSleep(l.id)} style={{cursor:"pointer",fontSize:10,color:C.accentMut}}>✕</span></div>)}
          </Panel>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{display:"flex",gap:12}}>
            <Panel C={C} style={{padding:"16px 20px",flex:1}}><Label C={C} style={{marginBottom:6}}>Gym Streak</Label><div style={{fontFamily:FM,fontSize:30,fontWeight:700,color:C.white}}>{gymStreak}<span style={{fontSize:13,color:C.accentMut,fontWeight:400}}> days</span></div></Panel>
            <Panel C={C} style={{padding:"16px 20px",flex:1}}><Label C={C} style={{marginBottom:6}}>Sessions</Label><div style={{fontFamily:FM,fontSize:30,fontWeight:700,color:C.white}}>{data.gym.logs.length}</div></Panel>
          </div>
          <Panel C={C} style={{padding:"20px 22px",flex:1}}><Label C={C} style={{marginBottom:12}}>Log Workout</Label><div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}><Inp C={C} value={gf.date} onChange={v=>setGf(f=>({...f,date:v}))} width={106}/><Sel C={C} value={gf.type} onChange={v=>setGf(f=>({...f,type:v}))} options={["Weights","Cardio","HIIT","Boxing","Mobility","Run","Rest Day"]}/><Inp C={C} value={gf.duration} onChange={v=>setGf(f=>({...f,duration:v}))} placeholder="Minutes" width={86}/><Inp C={C} value={gf.notes} onChange={v=>setGf(f=>({...f,notes:v}))} placeholder="Notes…" style={{flex:1,minWidth:100}}/><Btn C={C} sm onClick={logGym}>Log</Btn></div>
            {data.gym.logs.length===0&&<div style={{fontFamily:F,fontSize:12,color:C.accentMut}}>No workouts yet.</div>}
            {data.gym.logs.slice(0,8).map(l=><div key={l.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.border}`}}><span style={{fontFamily:FM,fontSize:10,color:C.accentMut,width:88,flexShrink:0}}>{l.date}</span><Pill color={l.type==="Rest Day"?C.accentMut:C.blue}>{l.type}</Pill>{l.duration&&<span style={{fontFamily:FM,fontSize:10,color:C.accentDim}}>{l.duration}m</span>}<span style={{fontFamily:F,fontSize:11,color:C.accentMut,marginLeft:"auto",maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.notes}</span><span onClick={()=>delGym(l.id)} style={{cursor:"pointer",fontSize:10,color:C.accentMut}}>✕</span></div>)}
          </Panel>
        </div>
      </div>
    </div>
  );
}

// ── Study Roadmap ─────────────────────────────────────────────────────────────
const ROADMAP=[
  {phase:"Now",title:"Networking Foundation",duration:"2–3 Weeks",status:"current",color:"#4a9eed",icon:"🌐",desc:"Security certifications assume deep networking knowledge. Weak fundamentals will slow you down on both Security+ and CEH.",tasks:[{id:"n1",label:"Download Cisco Packet Tracer (free)"},{id:"n2",label:"Complete IP addressing & subnetting labs"},{id:"n3",label:"Practice VLANs, DNS, DHCP, basic routing"},{id:"n4",label:"Watch Jeremy's IT Lab on YouTube (CCNA basics)"},{id:"n5",label:"Set up complete LinkedIn profile today"},{id:"n6",label:"Follow Attijariwafa Bank on LinkedIn"},{id:"n7",label:"Connect with Devoteam / Inetum / PwC Morocco recruiters"}]},
  {phase:"Now → Y2",title:"ISC2 CC — Certified in Cybersecurity",duration:"4–6 Weeks",status:"upcoming",color:"#4caf82",icon:"🛡️",desc:"100% FREE cert. Same concepts as Security+, warms you up and gives an ISC2 badge on LinkedIn immediately.",tasks:[{id:"i1",label:"Register on ISC2 website for free course"},{id:"i2",label:"Complete security principles module"},{id:"i3",label:"Complete network security module"},{id:"i4",label:"Complete access controls & incident response"},{id:"i5",label:"Book and pass ISC2 CC exam (FREE)"},{id:"i6",label:"Add ISC2 CC badge to LinkedIn same day"}]},
  {phase:"Year 2",title:"CompTIA Security+",duration:"2–3 Months",status:"upcoming",color:"#f0b429",icon:"🔐",desc:"Core professional cert. Easier after ISC2 CC. ~$400 via Pearson VUE — ask Britts about voucher partnerships. Test center in Casablanca.",tasks:[{id:"s1",label:"Start Professor Messer free YouTube course"},{id:"s2",label:"Buy Jason Dion practice exams on Udemy"},{id:"s3",label:"Use ExamCompass for free daily practice questions"},{id:"s4",label:"Score 85%+ on practice exams consistently"},{id:"s5",label:"Book exam via Pearson VUE"},{id:"s6",label:"Pass Security+ before end of Year 2"},{id:"s7",label:"Apply for summer internship (Feb/Mar — apply early!)"}]},
  {phase:"Summer Y2",title:"First Internship — Casablanca",duration:"1–2 Months",status:"upcoming",color:"#9c85d4",icon:"🏢",desc:"Apply February/March. Lead with Security+ and ISC2 CC. Moroccan companies fill slots early.",tasks:[{id:"int1",label:"Apply to Attijariwafa Bank IT/Security dept"},{id:"int2",label:"Apply to Devoteam Morocco"},{id:"int3",label:"Apply to Inetum Maroc"},{id:"int4",label:"Apply to CIH Bank"},{id:"int5",label:"Apply to PwC Morocco (cybersecurity audit team)"},{id:"int6",label:"Secure internship placement"},{id:"int7",label:"Complete internship + get recommendation letter"}]},
  {phase:"Year 3",title:"CEH — Certified Ethical Hacker",duration:"3–4 Months",status:"upcoming",color:"#e05c5c",icon:"⚔️",desc:"Explicitly required by Moroccan financial sector. Shows offensive mindset. EC-Council test center available in Casablanca (~$500).",tasks:[{id:"c1",label:"Start TryHackMe 'Jr Penetration Tester' path"},{id:"c2",label:"Study Matt Walker CEH book or EC-Council material"},{id:"c3",label:"Complete TryHackMe path alongside study"},{id:"c4",label:"Start HackTheBox (once comfortable)"},{id:"c5",label:"Learn Splunk basics (banks run this in SOCs)"},{id:"c6",label:"Learn IBM QRadar basics"},{id:"c7",label:"Book CEH at Casablanca test center"},{id:"c8",label:"Pass CEH — 6 months before graduation"},{id:"c9",label:"Apply for second internship — aim at Attijariwafa directly"}]},
  {phase:"Graduation",title:"Apply — Attijariwafa Bank SOC",duration:"Target Entry Role",status:"goal",color:"#f0b429",icon:"🏦",desc:"Analyste SOC / Ingénieur Sécurité SI Junior — Casablanca. 3 certs + 2 internships + real lab experience.",tasks:[{id:"g1",label:"CV updated: all 3 certs + 2 internships + labs"},{id:"g2",label:"Apply via Attijariwafa e-recruitment portal"},{id:"g3",label:"Apply via ReKrute.com"},{id:"g4",label:"Apply via LinkedIn (connections from Year 1 pay off now)"},{id:"g5",label:"Prepare SOC analyst interview (SIEM, IR, threats)"}]},
];

function StudyRoadmap({C,data,setData}){
  const [expanded,setExpanded]=useState(ROADMAP[0].phase);
  const logs=data.studyLogs||[];
  const toggleTask=id=>{ const exists=logs.find(l=>l.id===id); if(exists) setData(d=>({...d,studyLogs:d.studyLogs.filter(l=>l.id!==id)})); else setData(d=>({...d,studyLogs:[...d.studyLogs,{id,completedAt:TODAY}]})); };
  const isDone=id=>!!logs.find(l=>l.id===id);
  const totalTasks=ROADMAP.reduce((s,p)=>s+p.tasks.length,0);
  const doneTasks=ROADMAP.reduce((s,p)=>s+p.tasks.filter(t=>isDone(t.id)).length,0);
  const pct=Math.round(doneTasks/totalTasks*100);
  return (
    <div style={{padding:"28px 32px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:8}}>
        <div><div style={{fontFamily:F,fontSize:18,fontWeight:700,color:C.white,marginBottom:3}}>Cybersecurity Career Roadmap</div><div style={{fontFamily:F,fontSize:12,color:C.accentMut}}>Target: Attijariwafa Bank · SOC Analyst · Casablanca</div></div>
        <div style={{textAlign:"right"}}><div style={{fontFamily:FM,fontSize:22,fontWeight:700,color:C.green}}>{pct}%</div><div style={{fontFamily:FM,fontSize:9,color:C.accentMut}}>{doneTasks}/{totalTasks} tasks</div></div>
      </div>
      <PBar C={C} pct={pct} color={C.green} h={5} />
      <div style={{marginBottom:20}}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        <CertCountdown C={C} data={data} setData={setData}/>
        <Pomodoro C={C}/>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {ROADMAP.map(phase=>{
          const pd=phase.tasks.filter(t=>isDone(t.id)).length,pt=phase.tasks.length,pp=Math.round(pd/pt*100),open=expanded===phase.phase,allDone=pp===100,eff=allDone?"done":phase.status;
          const SC={current:C.blue,upcoming:C.accentMut,goal:C.gold,done:C.green};
          const SL={current:"IN PROGRESS",upcoming:"UPCOMING",goal:"TARGET",done:"COMPLETED"};
          return <Panel C={C} key={phase.phase} style={{overflow:"hidden",borderColor:open?C.borderHi:C.border}}>
            <div onClick={()=>setExpanded(open?null:phase.phase)} style={{padding:"16px 22px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,transition:"background 0.12s"}} onMouseEnter={e=>e.currentTarget.style.background=C.panel} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{width:34,height:34,borderRadius:"50%",border:`2px solid ${allDone?C.green:phase.color}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:allDone?`${C.green}22`:`${phase.color}11`}}><span style={{fontSize:15}}>{allDone?"✓":phase.icon}</span></div>
              <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontFamily:F,fontSize:13,fontWeight:600,color:C.white}}>{phase.title}</span><Pill color={SC[eff]}>{SL[eff]}</Pill><span style={{fontFamily:FM,fontSize:9,color:C.accentMut}}>{phase.duration}</span></div><PBar C={C} pct={pp} color={allDone?C.green:phase.color} h={3}/></div>
              <div style={{textAlign:"right",flexShrink:0}}><div style={{fontFamily:FM,fontSize:13,fontWeight:700,color:allDone?C.green:phase.color}}>{pd}/{pt}</div><div style={{fontFamily:FM,fontSize:8,color:C.accentMut,marginTop:2}}>{open?"▲":"▼"}</div></div>
            </div>
            {open&&<div style={{borderTop:`1px solid ${C.border}`}}>
              <div style={{padding:"12px 22px 8px",background:C.isDark?"#0a1828":C.muted}}><div style={{fontFamily:F,fontSize:12,color:C.accentDim,lineHeight:1.6}}>{phase.desc}</div></div>
              {phase.tasks.map(task=><div key={task.id} onClick={()=>toggleTask(task.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 22px",cursor:"pointer",borderBottom:`1px solid ${C.border}`,borderLeft:`3px solid ${isDone(task.id)?phase.color:"transparent"}`,transition:"all 0.12s"}} onMouseEnter={e=>e.currentTarget.style.background=C.panel} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><Check C={C} done={isDone(task.id)} onClick={()=>{}} size={15}/><span style={{fontFamily:F,fontSize:12,color:isDone(task.id)?C.accentMut:C.offwhite,textDecoration:isDone(task.id)?"line-through":"none",flex:1}}>{task.label}</span>{isDone(task.id)&&<span style={{fontFamily:FM,fontSize:9,color:C.accentMut}}>{logs.find(l=>l.id===task.id)?.completedAt}</span>}</div>)}
            </div>}
          </Panel>;
        })}
      </div>
      <Panel C={C} style={{padding:"18px 22px",marginTop:14}}>
        <Label C={C} style={{marginBottom:10}}>Post-Graduation Path</Label>
        <div style={{display:"flex",gap:10}}>
          {[{cert:"OSCP",desc:"Elite pentesting cert. Opens senior roles.",req:"1–2 yrs exp",color:C.red},{cert:"CISSP",desc:"Gold standard for management roles.",req:"5 yrs exp",color:C.gold}].map(c=><div key={c.cert} style={{flex:1,background:C.isDark?"#0a1828":C.muted,border:`1px solid ${C.border}`,borderRadius:4,padding:"12px 16px"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}><Pill color={c.color}>{c.cert}</Pill><span style={{fontFamily:FM,fontSize:9,color:C.accentMut}}>{c.req}</span></div><div style={{fontFamily:F,fontSize:12,color:C.accentDim}}>{c.desc}</div></div>)}
        </div>
      </Panel>
    </div>
  );
}

// ── SaaS Kanban ───────────────────────────────────────────────────────────────
const KCOLS=["Backlog","In Progress","Testing","Done"];
const KCOLORS={"Backlog":DARK.accentMut,"In Progress":DARK.blue,"Testing":DARK.gold,"Done":DARK.green};
const KPRIO=["Low","Medium","High","Critical"];
const KPRIOC={"Low":DARK.accentMut,"Medium":DARK.blue,"High":DARK.gold,"Critical":DARK.red};
const KTAGS=["Frontend","Backend","API","DB","Auth","WhatsApp","Meta","Deploy","Design","Docs"];
function SaasBoard({C,data,setData}){
  const [adding,setAdding]=useState(null);
  const [form,setForm]=useState({title:"",desc:"",priority:"Medium",tag:""});
  const [drag,setDrag]=useState(null);
  const [dragOver,setDragOver]=useState(null);
  const addCard=col=>{ if(!form.title.trim()) return; setData(d=>({...d,kanban:{...d.kanban,[col]:[...d.kanban[col],{id:Date.now(),title:form.title.trim(),desc:form.desc.trim(),priority:form.priority,tag:form.tag,created:TODAY}]}})); setForm({title:"",desc:"",priority:"Medium",tag:""}); setAdding(null); };
  const delCard=(col,id)=>setData(d=>({...d,kanban:{...d.kanban,[col]:d.kanban[col].filter(c=>c.id!==id)}}));
  const moveCard=(fc,id,tc)=>{ if(fc===tc) return; const card=data.kanban[fc].find(c=>c.id===id); if(!card) return; setData(d=>({...d,kanban:{...d.kanban,[fc]:d.kanban[fc].filter(c=>c.id!==id),[tc]:[...d.kanban[tc],card]}})); };
  const total=KCOLS.reduce((s,c)=>s+(data.kanban[c]||[]).length,0);
  const done=(data.kanban["Done"]||[]).length;
  return (
    <div style={{padding:"28px 32px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:20}}>
        <div><div style={{fontFamily:F,fontSize:18,fontWeight:700,color:C.white,marginBottom:3}}>WhatsApp SaaS — Product Board</div><div style={{fontFamily:F,fontSize:12,color:C.accentMut}}>Track features, fixes and milestones for your SaaS build.</div></div>
        <div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontFamily:FM,fontSize:10,color:C.accentMut}}>{done}/{total} shipped</span><div style={{width:120}}><PBar C={C} pct={total?Math.round(done/total*100):0} color={C.green} h={5}/></div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,alignItems:"start"}}>
        {KCOLS.map(col=>{ const cards=data.kanban[col]||[]; const isOver=dragOver===col;
          return <div key={col} onDragOver={e=>{e.preventDefault();setDragOver(col);}} onDragLeave={()=>setDragOver(null)} onDrop={e=>{e.preventDefault();if(drag)moveCard(drag.col,drag.id,col);setDrag(null);setDragOver(null);}} style={{background:isOver?C.cardHov:C.card,border:`1px solid ${isOver?C.borderHi:C.border}`,borderRadius:6,minHeight:180,transition:"all 0.15s"}}>
            <div style={{padding:"12px 14px 10px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:7,height:7,borderRadius:"50%",background:KCOLORS[col]}}/><span style={{fontFamily:F,fontSize:12,fontWeight:600,color:C.white}}>{col}</span></div>
              <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontFamily:FM,fontSize:10,color:C.accentMut}}>{cards.length}</span><span onClick={()=>setAdding(adding===col?null:col)} style={{cursor:"pointer",fontSize:14,color:C.accentMut,lineHeight:1}}>+</span></div>
            </div>
            {adding===col&&<div style={{padding:"10px 12px",borderBottom:`1px solid ${C.border}`,background:C.panel}}>
              <Inp C={C} value={form.title} onChange={v=>setForm(f=>({...f,title:v}))} placeholder="Task title…" style={{width:"100%",marginBottom:6}} onKeyDown={e=>e.key==="Enter"&&addCard(col)}/>
              <Inp C={C} value={form.desc} onChange={v=>setForm(f=>({...f,desc:v}))} placeholder="Description…" style={{width:"100%",marginBottom:6}}/>
              <div style={{display:"flex",gap:5,marginBottom:6}}><Sel C={C} value={form.priority} onChange={v=>setForm(f=>({...f,priority:v}))} options={KPRIO} style={{flex:1}}/><Sel C={C} value={form.tag} onChange={v=>setForm(f=>({...f,tag:v}))} options={["",...KTAGS]} style={{flex:1}}/></div>
              <div style={{display:"flex",gap:5}}><Btn C={C} sm onClick={()=>addCard(col)} style={{flex:1,justifyContent:"center"}}>Add</Btn><Btn C={C} sm variant="ghost" onClick={()=>setAdding(null)}>✕</Btn></div>
            </div>}
            <div style={{padding:"6px"}}>
              {cards.length===0&&!adding&&<div style={{padding:"14px 8px",fontFamily:F,fontSize:11,color:C.accentMut,textAlign:"center"}}>Drop cards here</div>}
              {cards.map(card=><div key={card.id} draggable onDragStart={()=>setDrag({col,id:card.id})} onDragEnd={()=>{setDrag(null);setDragOver(null);}} style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:"10px 12px",marginBottom:7,cursor:"grab",transition:"box-shadow 0.15s",userSelect:"none"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.3)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:card.desc?6:0}}><span style={{fontFamily:F,fontSize:12,fontWeight:500,color:C.white,flex:1,lineHeight:1.4}}>{card.title}</span><span onClick={()=>delCard(col,card.id)} style={{cursor:"pointer",fontSize:10,color:C.accentMut,marginLeft:6,flexShrink:0}}>✕</span></div>
                {card.desc&&<div style={{fontFamily:F,fontSize:11,color:C.accentMut,marginBottom:7,lineHeight:1.4}}>{card.desc}</div>}
                <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}><Pill color={KPRIOC[card.priority]||C.accent}>{card.priority}</Pill>{card.tag&&<Pill color={C.blue}>{card.tag}</Pill>}<span style={{fontFamily:FM,fontSize:8,color:C.accentMut,marginLeft:"auto"}}>{card.created}</span></div>
                <div style={{display:"flex",gap:3,marginTop:7,flexWrap:"wrap"}}>{KCOLS.filter(c=>c!==col).map(c=><button key={c} onClick={()=>moveCard(col,card.id,c)} style={{background:"transparent",border:`1px solid ${C.border}`,color:C.accentMut,borderRadius:3,padding:"2px 6px",fontFamily:FM,fontSize:8,cursor:"pointer"}}>→{c}</button>)}</div>
              </div>)}
            </div>
          </div>; })}
      </div>
    </div>
  );
}

// ── Weekly Review ─────────────────────────────────────────────────────────────
const WQ=[
  {id:"wins",label:"Biggest wins this week",placeholder:"Trades closed in profit, tasks completed, progress made…",rows:3},
  {id:"losses",label:"What went wrong / to improve",placeholder:"Missed setups, bad habits, unfinished work…",rows:3},
  {id:"trading",label:"Trading reflection — key lessons",placeholder:"Setups that worked, mistakes, market observations…",rows:3},
  {id:"saas",label:"SaaS progress",placeholder:"Features shipped, outreach done, decisions made…",rows:3},
  {id:"focus",label:"Top 3 priorities for next week",placeholder:"1. \n2. \n3. ",rows:4,full:true},
  {id:"score",label:"Week rating (1–10)",placeholder:"8",rows:1},
];
function WeeklyReview({C,data,setData}){
  const getWeek=()=>{ const d=new Date(); const diff=d.getDate()-d.getDay()+(d.getDay()===0?-6:1); return new Date(d.setDate(diff)).toISOString().split("T")[0]; };
  const wk=getWeek();
  const existing=data.weeklyReviews.find(r=>r.week===wk)||{week:wk};
  const [form,setForm]=useState(existing);
  useEffect(()=>{ const e=data.weeklyReviews.find(r=>r.week===wk)||{week:wk}; setForm(e); },[wk]);
  const save=()=>setData(d=>({...d,weeklyReviews:[...d.weeklyReviews.filter(r=>r.week!==wk),{...form,week:wk,savedAt:new Date().toISOString()}]}));
  const past=data.weeklyReviews.filter(r=>r.week!==wk).sort((a,b)=>b.week.localeCompare(a.week));
  const TA=({id,rows,placeholder,full})=><div style={{gridColumn:full?"1/3":undefined}}><Label C={C} style={{marginBottom:5}}>{WQ.find(q=>q.id===id)?.label}</Label><textarea value={form[id]||""} onChange={e=>setForm(f=>({...f,[id]:e.target.value}))} placeholder={placeholder} rows={rows} style={{width:"100%",background:C.panel,border:`1px solid ${C.border}`,color:C.offwhite,fontFamily:F,fontSize:12,padding:"9px 12px",borderRadius:4,outline:"none",resize:"vertical",lineHeight:1.6,transition:"border 0.15s"}} onFocus={e=>e.target.style.border=`1px solid ${C.borderHi}`} onBlur={e=>e.target.style.border=`1px solid ${C.border}`}/></div>;
  return (
    <div style={{padding:"28px 32px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:22}}>
        <div><div style={{fontFamily:F,fontSize:18,fontWeight:700,color:C.white,marginBottom:3}}>Weekly Review</div><div style={{fontFamily:F,fontSize:12,color:C.accentMut}}>Week of {new Date(wk).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</div></div>
        <Btn C={C} onClick={save}>Save Review</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
        {WQ.map(q=><TA key={q.id} id={q.id} rows={q.rows} placeholder={q.placeholder} full={q.full}/>)}
      </div>
      {past.length>0&&<><Label C={C} style={{marginBottom:12}}>Past Reviews</Label>{past.slice(0,5).map(r=><Panel C={C} key={r.week} style={{padding:"12px 20px",marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:F,fontSize:13,fontWeight:500,color:C.white}}>Week of {new Date(r.week).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</span><div style={{display:"flex",gap:10,alignItems:"center"}}>{r.score&&<Pill color={parseInt(r.score)>=7?C.green:parseInt(r.score)>=5?C.gold:C.red}>{r.score}/10</Pill>}<span style={{fontFamily:FM,fontSize:9,color:C.accentMut}}>{r.savedAt?new Date(r.savedAt).toLocaleDateString("en-GB"):""}</span></div></div>{r.focus&&<div style={{fontFamily:F,fontSize:11,color:C.accentMut,marginTop:5,whiteSpace:"pre-line",lineHeight:1.5}}>{r.focus}</div>}</Panel>)}</>}
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
function Dashboard(){
  const [data,setRaw]=useState(load);
  const [tab,setTab]=useState("OVERVIEW");
  const [darkMode,setDarkMode]=useState(true);
  const C=darkMode?DARK:LIGHT;
  const streak=calcStreak(data.routineStreakData);

  const setData=useCallback(upd=>{ setRaw(prev=>{ const next=typeof upd==="function"?upd(prev):upd; persist(next); return next; }); },[]);

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.offwhite,fontFamily:F,transition:"background 0.3s, color 0.3s"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:${C.bg};}
        ::-webkit-scrollbar-thumb{background:${C.border};border-radius:2px;}
        select option{background:${C.panel};}
        textarea{scrollbar-width:thin;font-family:${F};}
        input[type=range]{accent-color:${C.offwhite};cursor:pointer;}
        input[type=time]::-webkit-calendar-picker-indicator{filter:${darkMode?"invert(.5)":"invert(.3)"};cursor:pointer;}
        input[type=date]::-webkit-calendar-picker-indicator{filter:${darkMode?"invert(.5)":"invert(.3)"};cursor:pointer;}
        button:active{transform:scale(0.97);}
        ::placeholder{color:${C.accentMut}!important;}
      `}</style>
      {/* Theme toggle */}
      <button onClick={()=>setDarkMode(d=>!d)} style={{position:"fixed",top:14,right:18,zIndex:100,background:C.card,border:`1px solid ${C.border}`,borderRadius:6,padding:"6px 12px",cursor:"pointer",fontFamily:FM,fontSize:11,color:C.accentDim,display:"flex",alignItems:"center",gap:6}}>
        {darkMode?"☀️ Light":"🌙 Dark"}
      </button>
      <div style={{display:"flex",height:"100vh"}}>
        <Sidebar C={C} tab={tab} setTab={setTab} streak={streak}/>
        <main style={{flex:1,overflowY:"auto"}}>
          {tab==="OVERVIEW"  &&<Overview C={C} data={data} setData={setData}/>}
          {tab==="TRADING"   &&<TradingJournal C={C} data={data} setData={setData}/>}
          {tab==="ANALYTICS" &&<Analytics C={C} data={data}/>}
          {tab==="TASKS"     &&<Tasks C={C} data={data} setData={setData}/>}
          {tab==="GOALS"     &&<Goals C={C} data={data} setData={setData}/>}
          {tab==="ROUTINE"   &&<Routine C={C} data={data} setData={setData}/>}
          {tab==="BODY"      &&<Body C={C} data={data} setData={setData}/>}
          {tab==="STUDY"     &&<StudyRoadmap C={C} data={data} setData={setData}/>}
          {tab==="SAAS"      &&<SaasBoard C={C} data={data} setData={setData}/>}
          {tab==="WEEKLY"    &&<WeeklyReview C={C} data={data} setData={setData}/>}
        </main>
      </div>
    </div>
  );
}

export default function App(){
  const [unlocked, setUnlocked] = useState(!!sessionStorage.getItem("adam_os_auth"));
  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  return <Dashboard />;
}
