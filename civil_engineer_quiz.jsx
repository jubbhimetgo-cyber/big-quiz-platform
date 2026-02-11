import { useState, useEffect, useRef } from "react";

const ALL_QUESTIONS = [
  // Structural Engineering
  {
    subject: "Structural Engineering",
    icon: "🏛️",
    difficulty: "Medium",
    question: "What is the unit of Bending Moment?",
    options: ["Newton (N)", "Newton-meter (N·m)", "Pascal (Pa)", "Newton per meter (N/m)"],
    answer: 1,
    explanation: "Bending Moment = Force × Distance. So its unit is Newton-meter (N·m) or kN·m in practice."
  },
  {
    subject: "Structural Engineering",
    icon: "🏛️",
    difficulty: "Hard",
    question: "For a simply supported beam with a central point load W, the maximum bending moment is:",
    options: ["WL/4", "WL/8", "WL/2", "WL/6"],
    answer: 0,
    explanation: "For a simply supported beam with central point load W, Max BM = WL/4, occurring at the center of the span."
  },
  {
    subject: "Structural Engineering",
    icon: "🏛️",
    difficulty: "Easy",
    question: "Which stress develops when a beam is subjected to bending?",
    options: ["Shear stress only", "Normal (bending) stress only", "Both bending and shear stress", "Torsional stress"],
    answer: 2,
    explanation: "A beam under bending experiences both normal (bending) stress due to the moment and shear stress due to the transverse forces."
  },
  {
    subject: "Structural Engineering",
    icon: "🏛️",
    difficulty: "Hard",
    question: "The slenderness ratio of a column is defined as:",
    options: ["L/r", "L/d", "L²/r", "r/L"],
    answer: 0,
    explanation: "Slenderness Ratio = Effective Length (L) / Least Radius of Gyration (r). Higher slenderness = more susceptible to buckling."
  },

  // Soil Mechanics
  {
    subject: "Soil Mechanics",
    icon: "⛏️",
    difficulty: "Easy",
    question: "The liquid limit of soil is determined by which apparatus?",
    options: ["Proctor mold", "Casagrande apparatus", "Hydrometer", "Vicat needle"],
    answer: 1,
    explanation: "The Casagrande apparatus (also called the liquid limit device) is used to determine the Liquid Limit (LL) of soil."
  },
  {
    subject: "Soil Mechanics",
    icon: "⛏️",
    difficulty: "Medium",
    question: "The void ratio of soil is defined as:",
    options: ["Volume of voids / Total volume", "Volume of voids / Volume of solids", "Volume of air / Volume of voids", "Volume of water / Total volume"],
    answer: 1,
    explanation: "Void ratio (e) = Volume of voids (Vv) / Volume of solids (Vs). It can exceed 1, unlike porosity."
  },
  {
    subject: "Soil Mechanics",
    icon: "⛏️",
    difficulty: "Hard",
    question: "Terzaghi's bearing capacity equation for a strip footing on cohesive soil (φ=0) gives ultimate bearing capacity as:",
    options: ["5.14c + q", "5.7c + q", "6.28c", "cNc + qNq"],
    answer: 1,
    explanation: "For a strip footing on purely cohesive soil (φ=0): qu = 5.7c + q (where Nc=5.7 for strip footing, per Terzaghi's original values)."
  },
  {
    subject: "Soil Mechanics",
    icon: "⛏️",
    difficulty: "Medium",
    question: "Which type of soil has the highest permeability?",
    options: ["Clay", "Silt", "Sand", "Gravel"],
    answer: 3,
    explanation: "Gravel has the largest particle size and pore spaces, resulting in the highest permeability among common soils."
  },

  // Fluid Mechanics
  {
    subject: "Fluid Mechanics",
    icon: "💧",
    difficulty: "Easy",
    question: "Bernoulli's equation is applicable to flow that is:",
    options: ["Viscous, compressible, unsteady", "Inviscid, incompressible, steady", "Turbulent, compressible, steady", "Viscous, incompressible, unsteady"],
    answer: 1,
    explanation: "Bernoulli's equation assumes: inviscid (frictionless), incompressible, and steady flow along a streamline."
  },
  {
    subject: "Fluid Mechanics",
    icon: "💧",
    difficulty: "Medium",
    question: "The hydraulic gradient in pipe flow is the ratio of:",
    options: ["Velocity head to length", "Pressure head to velocity head", "Head loss to pipe length", "Flow rate to cross-section area"],
    answer: 2,
    explanation: "Hydraulic gradient (i) = Head loss (hf) / Pipe length (L). It represents energy lost per unit length of pipe."
  },
  {
    subject: "Fluid Mechanics",
    icon: "💧",
    difficulty: "Hard",
    question: "The Darcy-Weisbach equation for head loss in a pipe is:",
    options: ["hf = fLV²/2gD", "hf = fLV/2gD", "hf = fLV²/gD", "hf = fL/2gDV²"],
    answer: 0,
    explanation: "Darcy-Weisbach: hf = f·L·V²/(2·g·D), where f=friction factor, L=length, V=velocity, g=gravity, D=diameter."
  },

  // Transportation Engineering
  {
    subject: "Transportation",
    icon: "🛣️",
    difficulty: "Easy",
    question: "The California Bearing Ratio (CBR) test is used to evaluate:",
    options: ["Shear strength of concrete", "Bearing capacity of subgrade for pavement design", "Compressive strength of asphalt", "Settlement of foundations"],
    answer: 1,
    explanation: "CBR test measures the bearing capacity of subgrade soils and sub-base materials, used in flexible pavement thickness design."
  },
  {
    subject: "Transportation",
    icon: "🛣️",
    difficulty: "Medium",
    question: "The stopping sight distance (SSD) depends on:",
    options: ["Only vehicle speed", "Speed, reaction time, and braking distance", "Road width and vehicle type", "Grade and traffic volume only"],
    answer: 1,
    explanation: "SSD = Lag distance (speed × reaction time) + Braking distance. It depends on design speed, driver reaction time, and friction."
  },
  {
    subject: "Transportation",
    icon: "🛣️",
    difficulty: "Hard",
    question: "As per IRC, the ruling gradient for plains and rolling terrain is:",
    options: ["1 in 30", "1 in 20", "1 in 15", "1 in 12"],
    answer: 0,
    explanation: "IRC specifies ruling gradient of 1 in 30 (3.3%) for plain and rolling terrain. This is the desirable maximum for design."
  },

  // Concrete Technology
  {
    subject: "Concrete Technology",
    icon: "🧱",
    difficulty: "Easy",
    question: "The standard curing period for concrete is:",
    options: ["7 days", "14 days", "28 days", "56 days"],
    answer: 2,
    explanation: "Concrete is conventionally cured for 28 days, which is the standard period for achieving its design compressive strength."
  },
  {
    subject: "Concrete Technology",
    icon: "🧱",
    difficulty: "Medium",
    question: "Workability of concrete is most commonly measured by:",
    options: ["Compaction factor test", "Slump test", "Vee-Bee test", "Flow table test"],
    answer: 1,
    explanation: "The slump test is the most widely used field test for measuring workability (consistency) of fresh concrete."
  },
  {
    subject: "Concrete Technology",
    icon: "🧱",
    difficulty: "Hard",
    question: "Water-Cement ratio primarily affects which property of hardened concrete?",
    options: ["Unit weight", "Thermal expansion", "Compressive strength and durability", "Color and finish"],
    answer: 2,
    explanation: "Lower W/C ratio → higher strength and durability. Abrams' Law states: Strength = K1 / K2^(W/C), inversely proportional to W/C."
  },

  // Surveying
  {
    subject: "Surveying",
    icon: "📐",
    difficulty: "Easy",
    question: "A contour line connects points of:",
    options: ["Equal slope", "Equal elevation", "Equal depth below datum", "Equal horizontal distance"],
    answer: 1,
    explanation: "A contour line (or isohypse) connects all points on the ground surface having the same elevation above a datum."
  },
  {
    subject: "Surveying",
    icon: "📐",
    difficulty: "Medium",
    question: "The closing error in a closed traverse is:",
    options: ["The difference between the first and last bearing", "The vector sum of all latitudes and departures", "Total angular error in angles measured", "Difference between magnetic and true north"],
    answer: 1,
    explanation: "In a closed traverse, closing error = resultant of the algebraic sums of latitudes (ΣL) and departures (ΣD): e = √(ΣL² + ΣD²)."
  },
  {
    subject: "Surveying",
    icon: "📐",
    difficulty: "Hard",
    question: "In a total station, EDM stands for:",
    options: ["Electronic Distance Measurement", "Engineering Data Module", "Elevation and Datum Measurement", "Electronic Deflection Meter"],
    answer: 0,
    explanation: "EDM = Electronic Distance Measurement. Total stations use EDM technology (laser/infrared) to measure distances precisely."
  }
];

const SUBJECTS = ["All", ...Array.from(new Set(ALL_QUESTIONS.map(q => q.subject)))];
const TIMER_DURATION = 30;

export default function CivilQuiz() {
  const [screen, setScreen] = useState("home"); // home | quiz | results
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [timerActive, setTimerActive] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [hovered, setHovered] = useState(null);

  // Blueprint grid SVG bg
  const blueprintBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='60' height='60' fill='%23002244'/%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23003366' stroke-width='0.5'/%3E%3Cpath d='M 30 0 L 30 60 M 0 30 L 60 30' fill='none' stroke='%23003366' stroke-width='0.25'/%3E%3C/svg%3E")`;

  useEffect(() => {
    if (!timerActive || showExp || timedOut) return;
    if (timeLeft <= 0) {
      setTimedOut(true);
      setTimerActive(false);
      setShowExp(true);
      setStreak(0);
      setAnswers(a => [...a, { correct: false, timed: true }]);
      return;
    }
    const t = setTimeout(() => setTimeLeft(x => x - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, timerActive, showExp, timedOut]);

  const startQuiz = () => {
    const pool = selectedSubject === "All" ? ALL_QUESTIONS : ALL_QUESTIONS.filter(q => q.subject === selectedSubject);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 15);
    setQuestions(shuffled);
    setCurrent(0);
    setChosen(null);
    setShowExp(false);
    setTimedOut(false);
    setTimeLeft(TIMER_DURATION);
    setTimerActive(true);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setXp(0);
    setAnswers([]);
    setScreen("quiz");
  };

  const handleSelect = (idx) => {
    if (chosen !== null || timedOut) return;
    setChosen(idx);
    setTimerActive(false);
    setShowExp(true);
    const q = questions[current];
    const correct = idx === q.answer;
    if (correct) {
      const bonus = timeLeft > 20 ? 30 : timeLeft > 10 ? 20 : 10;
      const diffBonus = q.difficulty === "Hard" ? 15 : q.difficulty === "Medium" ? 10 : 5;
      setXp(x => x + bonus + diffBonus);
      setScore(s => s + 1);
      const ns = streak + 1;
      setStreak(ns);
      if (ns > bestStreak) setBestStreak(ns);
    } else {
      setStreak(0);
    }
    setAnswers(a => [...a, { correct, timed: false, subject: q.subject }]);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setScreen("results");
    } else {
      setCurrent(c => c + 1);
      setChosen(null);
      setShowExp(false);
      setTimedOut(false);
      setTimeLeft(TIMER_DURATION);
      setTimerActive(true);
    }
  };

  const q = questions[current];
  const progress = questions.length ? ((current) / questions.length) * 100 : 0;
  const timerPct = (timeLeft / TIMER_DURATION) * 100;
  const timerColor = timeLeft > 20 ? "#00d4aa" : timeLeft > 10 ? "#f59e0b" : "#ef4444";

  const grade = () => {
    const pct = score / questions.length;
    if (pct >= 0.9) return { label: "🏆 Chief Engineer", sub: "Outstanding performance!", color: "#ffd700" };
    if (pct >= 0.75) return { label: "🥇 Senior Engineer", sub: "Well done!", color: "#00d4aa" };
    if (pct >= 0.55) return { label: "📋 Site Engineer", sub: "Decent attempt.", color: "#60a5fa" };
    if (pct >= 0.4) return { label: "📐 Junior Engineer", sub: "Keep studying!", color: "#f59e0b" };
    return { label: "📚 Trainee", sub: "Review fundamentals.", color: "#f87171" };
  };

  const subjectAccuracy = () => {
    const map = {};
    answers.forEach((a, i) => {
      const subj = questions[i]?.subject || "Unknown";
      if (!map[subj]) map[subj] = { total: 0, correct: 0 };
      map[subj].total++;
      if (a.correct) map[subj].correct++;
    });
    return map;
  };

  const diffColor = d => d === "Easy" ? "#4ade80" : d === "Medium" ? "#f59e0b" : "#f87171";

  // ─────────────────────────────────────────────
  // HOME SCREEN
  // ─────────────────────────────────────────────
  if (screen === "home") {
    return (
      <div style={{
        minHeight: "100vh",
        background: blueprintBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        padding: "20px",
      }}>
        <style>{`
          @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
          @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
          @keyframes scanline { 0% { top: -10%; } 100% { top: 110%; } }
          .card-in { animation: fadeUp 0.6s ease forwards; }
          .subj-btn:hover { background: rgba(0,212,170,0.15) !important; border-color: #00d4aa !important; color: #00d4aa !important; }
          .start-btn:hover { background: linear-gradient(135deg, #00c49e, #0070cc) !important; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,212,170,0.4) !important; }
        `}</style>

        {/* Blueprint crosshairs decoration */}
        <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0, pointerEvents:"none", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"50%", left:0, right:0, height:"1px", background:"rgba(0,212,170,0.07)" }} />
          <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:"1px", background:"rgba(0,212,170,0.07)" }} />
        </div>

        <div className="card-in" style={{
          background: "rgba(0,20,60,0.92)",
          border: "1px solid rgba(0,212,170,0.3)",
          borderRadius: "4px",
          padding: "48px 40px",
          maxWidth: "620px",
          width: "100%",
          boxShadow: "0 0 60px rgba(0,212,170,0.12), inset 0 0 60px rgba(0,0,100,0.2)",
          position: "relative",
        }}>
          {/* Corner decorations */}
          {["topLeft","topRight","bottomLeft","bottomRight"].map((pos,i) => (
            <div key={i} style={{
              position:"absolute",
              [pos.includes("top")?"top":"bottom"]: "12px",
              [pos.includes("Left")?"left":"right"]: "12px",
              width:"20px", height:"20px",
              borderTop: pos.includes("top") ? "2px solid #00d4aa" : "none",
              borderBottom: pos.includes("bottom") ? "2px solid #00d4aa" : "none",
              borderLeft: pos.includes("Left") ? "2px solid #00d4aa" : "none",
              borderRight: pos.includes("Right") ? "2px solid #00d4aa" : "none",
            }} />
          ))}

          {/* Header */}
          <div style={{ textAlign:"center", marginBottom:"36px" }}>
            <div style={{ fontSize:"13px", letterSpacing:"6px", color:"#00d4aa", marginBottom:"10px", opacity:0.8 }}>
              MOCK EXAMINATION SYSTEM
            </div>
            <h1 style={{ fontSize:"36px", color:"#e8f4fd", margin:"0 0 6px", fontWeight:"normal", letterSpacing:"1px" }}>
              Civil Engineering
            </h1>
            <h2 style={{ fontSize:"20px", color:"#00d4aa", margin:"0 0 16px", fontWeight:"normal", letterSpacing:"3px" }}>
              QUIZ TERMINAL
            </h2>
            <div style={{ width:"60px", height:"2px", background:"linear-gradient(90deg,transparent,#00d4aa,transparent)", margin:"0 auto" }} />
          </div>

          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px", marginBottom:"32px" }}>
            {[
              { val: ALL_QUESTIONS.length, label: "Questions" },
              { val: SUBJECTS.length - 1, label: "Subjects" },
              { val: TIMER_DURATION + "s", label: "Per Question" }
            ].map((s,i) => (
              <div key={i} style={{
                background:"rgba(0,212,170,0.06)",
                border:"1px solid rgba(0,212,170,0.2)",
                borderRadius:"3px",
                padding:"14px",
                textAlign:"center",
              }}>
                <div style={{ fontSize:"24px", color:"#00d4aa", fontWeight:"bold" }}>{s.val}</div>
                <div style={{ fontSize:"11px", color:"#5b8aaa", letterSpacing:"1px", marginTop:"2px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Subject selector */}
          <div style={{ marginBottom:"28px" }}>
            <div style={{ fontSize:"11px", color:"#5b8aaa", letterSpacing:"3px", marginBottom:"12px" }}>
              SELECT SUBJECT MODULE
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
              {SUBJECTS.map(s => (
                <button key={s} className="subj-btn" onClick={() => setSelectedSubject(s)} style={{
                  padding:"7px 14px",
                  borderRadius:"3px",
                  border: `1px solid ${selectedSubject === s ? "#00d4aa" : "rgba(255,255,255,0.1)"}`,
                  background: selectedSubject === s ? "rgba(0,212,170,0.15)" : "rgba(255,255,255,0.03)",
                  color: selectedSubject === s ? "#00d4aa" : "#6b8aaa",
                  fontSize:"12px",
                  cursor:"pointer",
                  fontFamily:"inherit",
                  transition:"all 0.2s",
                  letterSpacing:"0.5px",
                }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Start button */}
          <button className="start-btn" onClick={startQuiz} style={{
            width:"100%",
            padding:"16px",
            background:"linear-gradient(135deg, #00b894, #0052cc)",
            border:"none",
            borderRadius:"3px",
            color:"#fff",
            fontSize:"15px",
            letterSpacing:"4px",
            cursor:"pointer",
            fontFamily:"'Georgia', serif",
            fontWeight:"bold",
            transition:"all 0.25s",
            boxShadow:"0 4px 24px rgba(0,212,170,0.25)",
          }}>
            BEGIN EXAMINATION
          </button>

          <div style={{ textAlign:"center", marginTop:"16px", fontSize:"11px", color:"rgba(91,138,170,0.6)", letterSpacing:"1px" }}>
            Questions drawn from Structures · Soil · Fluids · Transport · Concrete · Surveying
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // RESULTS SCREEN
  // ─────────────────────────────────────────────
  if (screen === "results") {
    const g = grade();
    const acc = subjectAccuracy();
    return (
      <div style={{
        minHeight:"100vh",
        background: blueprintBg,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        fontFamily:"'Georgia', serif",
        padding:"20px",
      }}>
        <style>{`
          @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
          .res-card { animation: fadeUp 0.5s ease; }
          .restart-btn:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(0,212,170,0.35) !important; }
        `}</style>

        <div className="res-card" style={{
          background:"rgba(0,20,60,0.93)",
          border:"1px solid rgba(0,212,170,0.3)",
          borderRadius:"4px",
          padding:"40px",
          maxWidth:"660px",
          width:"100%",
          boxShadow:"0 0 60px rgba(0,212,170,0.1)",
          position:"relative",
        }}>
          {["topLeft","topRight","bottomLeft","bottomRight"].map((pos,i) => (
            <div key={i} style={{
              position:"absolute",
              [pos.includes("top")?"top":"bottom"]: "12px",
              [pos.includes("Left")?"left":"right"]: "12px",
              width:"20px", height:"20px",
              borderTop: pos.includes("top") ? "2px solid #00d4aa" : "none",
              borderBottom: pos.includes("bottom") ? "2px solid #00d4aa" : "none",
              borderLeft: pos.includes("Left") ? "2px solid #00d4aa" : "none",
              borderRight: pos.includes("Right") ? "2px solid #00d4aa" : "none",
            }} />
          ))}

          {/* Score */}
          <div style={{ textAlign:"center", marginBottom:"30px" }}>
            <div style={{ fontSize:"12px", letterSpacing:"5px", color:"#5b8aaa", marginBottom:"12px" }}>EXAMINATION RESULT</div>
            <div style={{
              fontSize:"80px",
              fontWeight:"bold",
              lineHeight:1,
              background:`linear-gradient(135deg, ${g.color}, #60a5fa)`,
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
              marginBottom:"4px",
            }}>
              {score}/{questions.length}
            </div>
            <div style={{ fontSize:"22px", color: g.color, marginBottom:"4px" }}>{g.label}</div>
            <div style={{ fontSize:"13px", color:"#5b8aaa" }}>{g.sub}</div>
          </div>

          {/* Stats row */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px", marginBottom:"28px" }}>
            {[
              { val: Math.round((score/questions.length)*100)+"%", label:"Accuracy" },
              { val: bestStreak, label:"Best Streak" },
              { val: xp, label:"XP Earned" },
              { val: answers.filter(a=>a.timed).length, label:"Timed Out" },
            ].map((s,i) => (
              <div key={i} style={{
                background:"rgba(0,212,170,0.06)",
                border:"1px solid rgba(0,212,170,0.18)",
                borderRadius:"3px",
                padding:"12px",
                textAlign:"center",
              }}>
                <div style={{ fontSize:"22px", color:"#00d4aa", fontWeight:"bold" }}>{s.val}</div>
                <div style={{ fontSize:"10px", color:"#5b8aaa", letterSpacing:"1px", marginTop:"3px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Subject breakdown */}
          <div style={{ marginBottom:"28px" }}>
            <div style={{ fontSize:"11px", letterSpacing:"3px", color:"#5b8aaa", marginBottom:"12px" }}>SUBJECT ANALYSIS</div>
            {Object.entries(acc).map(([subj, data]) => (
              <div key={subj} style={{ marginBottom:"8px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                  <span style={{ fontSize:"12px", color:"#8aafc9" }}>{subj}</span>
                  <span style={{ fontSize:"12px", color:"#00d4aa" }}>{data.correct}/{data.total}</span>
                </div>
                <div style={{ height:"4px", background:"rgba(255,255,255,0.07)", borderRadius:"2px", overflow:"hidden" }}>
                  <div style={{
                    height:"100%",
                    width: `${(data.correct/data.total)*100}%`,
                    background: data.correct/data.total >= 0.7 ? "#00d4aa" : data.correct/data.total >= 0.5 ? "#f59e0b" : "#ef4444",
                    borderRadius:"2px",
                    transition:"width 1s ease",
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
            <button className="restart-btn" onClick={() => setScreen("home")} style={{
              padding:"14px",
              background:"rgba(0,212,170,0.1)",
              border:"1px solid rgba(0,212,170,0.3)",
              borderRadius:"3px",
              color:"#00d4aa",
              fontSize:"13px",
              letterSpacing:"2px",
              cursor:"pointer",
              fontFamily:"inherit",
              transition:"all 0.25s",
            }}>
              ← HOME
            </button>
            <button className="restart-btn" onClick={startQuiz} style={{
              padding:"14px",
              background:"linear-gradient(135deg,#00b894,#0052cc)",
              border:"none",
              borderRadius:"3px",
              color:"#fff",
              fontSize:"13px",
              letterSpacing:"2px",
              cursor:"pointer",
              fontFamily:"inherit",
              transition:"all 0.25s",
              boxShadow:"0 4px 24px rgba(0,212,170,0.25)",
            }}>
              RETRY ↺
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // QUIZ SCREEN
  // ─────────────────────────────────────────────
  return (
    <div style={{
      minHeight:"100vh",
      background: blueprintBg,
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      fontFamily:"'Georgia', serif",
      padding:"20px",
    }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes timerPulse { 0%,100%{opacity:1} 50%{opacity:0.7} }
        .q-in { animation: fadeUp 0.4s ease; }
        .opt-btn:hover { background: rgba(0,212,170,0.08) !important; border-color: rgba(0,212,170,0.4) !important; color: #e8f4fd !important; }
        .next-btn:hover { transform:translateY(-1px); box-shadow:0 8px 30px rgba(0,212,170,0.3) !important; }
      `}</style>

      <div className="q-in" style={{
        background:"rgba(0,18,54,0.95)",
        border:"1px solid rgba(0,212,170,0.25)",
        borderRadius:"4px",
        padding:"36px 40px",
        maxWidth:"700px",
        width:"100%",
        boxShadow:"0 0 60px rgba(0,0,100,0.4), 0 0 30px rgba(0,212,170,0.06)",
        position:"relative",
      }}>
        {/* Corner marks */}
        {["topLeft","topRight","bottomLeft","bottomRight"].map((pos,i) => (
          <div key={i} style={{
            position:"absolute",
            [pos.includes("top")?"top":"bottom"]: "10px",
            [pos.includes("Left")?"left":"right"]: "10px",
            width:"16px", height:"16px",
            borderTop: pos.includes("top") ? "1.5px solid rgba(0,212,170,0.5)" : "none",
            borderBottom: pos.includes("bottom") ? "1.5px solid rgba(0,212,170,0.5)" : "none",
            borderLeft: pos.includes("Left") ? "1.5px solid rgba(0,212,170,0.5)" : "none",
            borderRight: pos.includes("Right") ? "1.5px solid rgba(0,212,170,0.5)" : "none",
          }} />
        ))}

        {/* Top bar */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px", flexWrap:"wrap", gap:"8px" }}>
          <span style={{ fontSize:"11px", letterSpacing:"3px", color:"rgba(0,212,170,0.7)" }}>CIVIL ENG · MOCK TEST</span>
          <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
            {streak >= 2 && (
              <span style={{ fontSize:"12px", color:"#f59e0b", background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.3)", padding:"2px 10px", borderRadius:"2px" }}>
                🔥 {streak} streak
              </span>
            )}
            <span style={{ fontSize:"12px", color:"#00d4aa", background:"rgba(0,212,170,0.08)", border:"1px solid rgba(0,212,170,0.2)", padding:"2px 10px", borderRadius:"2px" }}>
              ⚡ {xp} XP
            </span>
            <span style={{ fontSize:"12px", color:"#5b8aaa" }}>
              {current + 1}/{questions.length}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div style={{ height:"3px", background:"rgba(255,255,255,0.06)", borderRadius:"2px", marginBottom:"20px", overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,#00d4aa,#0070cc)", borderRadius:"2px", transition:"width 0.4s" }} />
        </div>

        {/* Subject + difficulty + timer row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"18px" }}>
          <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
            <span style={{ fontSize:"18px" }}>{q.icon}</span>
            <span style={{ fontSize:"12px", color:"#5b8aaa", letterSpacing:"1px" }}>{q.subject}</span>
            <span style={{
              fontSize:"10px",
              padding:"2px 8px",
              borderRadius:"2px",
              border:`1px solid ${diffColor(q.difficulty)}44`,
              color: diffColor(q.difficulty),
              background: `${diffColor(q.difficulty)}11`,
            }}>{q.difficulty}</span>
          </div>

          {/* Circular-ish timer */}
          <div style={{ textAlign:"right" }}>
            <div style={{
              fontSize:"22px",
              fontWeight:"bold",
              color: timerColor,
              fontFamily:"'Courier New', monospace",
              lineHeight:1,
              animation: timeLeft <= 5 && !showExp ? "timerPulse 0.5s infinite" : "none",
            }}>
              {String(timeLeft).padStart(2,"0")}
            </div>
            <div style={{ fontSize:"9px", color:"#3a5a70", letterSpacing:"2px" }}>SEC</div>
            {/* Timer bar */}
            <div style={{ width:"60px", height:"3px", background:"rgba(255,255,255,0.08)", borderRadius:"2px", marginTop:"3px", overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${timerPct}%`, background:timerColor, borderRadius:"2px", transition:"width 1s linear, background 0.3s" }} />
            </div>
          </div>
        </div>

        {/* Question */}
        <div style={{
          fontSize:"17px",
          color:"#d0e8f8",
          marginBottom:"24px",
          lineHeight:1.7,
          borderLeft:"2px solid rgba(0,212,170,0.4)",
          paddingLeft:"16px",
        }}>
          {q.question}
        </div>

        {/* Options */}
        <div style={{ marginBottom: showExp ? "0" : "0" }}>
          {q.options.map((opt, idx) => {
            let border = "1px solid rgba(255,255,255,0.08)";
            let bg = "rgba(255,255,255,0.02)";
            let color = "#8aafc9";
            let prefix = String.fromCharCode(65 + idx);

            if (showExp) {
              if (idx === q.answer) { border = "1px solid #00d4aa"; bg = "rgba(0,212,170,0.1)"; color = "#00d4aa"; }
              else if (idx === chosen) { border = "1px solid #ef4444"; bg = "rgba(239,68,68,0.1)"; color = "#ef4444"; }
              else { color = "#3a5a70"; }
            }

            return (
              <button
                key={idx}
                className={!showExp && !timedOut ? "opt-btn" : ""}
                onClick={() => handleSelect(idx)}
                style={{
                  display:"block",
                  width:"100%",
                  textAlign:"left",
                  background: bg,
                  border,
                  borderRadius:"3px",
                  padding:"12px 16px",
                  marginBottom:"8px",
                  color,
                  fontSize:"14px",
                  cursor: chosen !== null || timedOut ? "default" : "pointer",
                  transition:"all 0.18s",
                  fontFamily:"'Georgia', serif",
                  lineHeight:1.5,
                }}
              >
                <span style={{ color: showExp && idx === q.answer ? "#00d4aa" : "#3a5a80", marginRight:"12px", fontFamily:"'Courier New',monospace", fontSize:"12px" }}>
                  [{prefix}]
                </span>
                {opt}
                {showExp && idx === q.answer && <span style={{ float:"right" }}>✓</span>}
                {showExp && idx === chosen && idx !== q.answer && <span style={{ float:"right" }}>✗</span>}
              </button>
            );
          })}
        </div>

        {/* Timed out notice */}
        {timedOut && (
          <div style={{
            background:"rgba(239,68,68,0.1)",
            border:"1px solid rgba(239,68,68,0.3)",
            borderRadius:"3px",
            padding:"10px 16px",
            color:"#fca5a5",
            fontSize:"13px",
            marginTop:"8px",
          }}>
            ⏰ Time expired — The correct answer was [{String.fromCharCode(65+q.answer)}] {q.options[q.answer]}
          </div>
        )}

        {/* Explanation */}
        {showExp && (
          <div style={{
            background:"rgba(0,70,130,0.2)",
            border:"1px solid rgba(96,165,250,0.2)",
            borderRadius:"3px",
            padding:"12px 16px",
            marginTop:"10px",
            color:"#7eb8d8",
            fontSize:"13px",
            lineHeight:1.6,
          }}>
            <span style={{ color:"#60a5fa", fontWeight:"bold" }}>▸ EXPLANATION: </span>
            {q.explanation}
          </div>
        )}

        {/* Next button */}
        {showExp && (
          <button className="next-btn" onClick={handleNext} style={{
            marginTop:"18px",
            width:"100%",
            padding:"14px",
            background:"linear-gradient(135deg,#00b894,#0052cc)",
            border:"none",
            borderRadius:"3px",
            color:"#fff",
            fontSize:"14px",
            letterSpacing:"3px",
            cursor:"pointer",
            fontFamily:"'Georgia',serif",
            fontWeight:"bold",
            transition:"all 0.2s",
            boxShadow:"0 4px 20px rgba(0,212,170,0.2)",
          }}>
            {current + 1 >= questions.length ? "VIEW RESULTS →" : "NEXT QUESTION →"}
          </button>
        )}
      </div>
    </div>
  );
}
