import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ThemeSection = () => {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const orbitSvgRef = useRef(null);
  const pathFullRef = useRef(null);
  const pathTrailRef = useRef(null);
  const rocketRef = useRef(null);
  const exhaustRef = useRef(null);
  const atmoRef = useRef(null);
  const cloudsRef = useRef(null);
  const earthZoomRef = useRef(null);
  const secLabelRef = useRef(null);
  const pdotsRef = useRef(null);
  const nebulaRef = useRef(null);
  const stickyRef = useRef(null);
  const spaceSectionRef = useRef(null);

  const panelRefs = {
    mercury: useRef(null),
    venus: useRef(null),
    earth: useRef(null),
    mars: useRef(null),
  };

  const planetRefs = {
    mercury: useRef(null),
    venus: useRef(null),
    earth: useRef(null),
    mars: useRef(null),
  };

  const ringRefs = {
    mercury: useRef(null),
    venus: useRef(null),
    earth: useRef(null),
    mars: useRef(null),
  };

  const dotRefs = useRef([]);

  const WP = useMemo(
    () => [
      { p: 0.0, x: -7, y: 50 },
      { p: 0.055, x: 5, y: 49 },
      { p: 0.12, x: 11, y: 45 },
      { p: 0.185, x: 17, y: 42 },
      { p: 0.255, x: 22, y: 46 },
      { p: 0.32, x: 29, y: 52 },
      { p: 0.38, x: 37, y: 57 },
      { p: 0.455, x: 44, y: 51 },
      { p: 0.53, x: 51, y: 44 },
      { p: 0.61, x: 58, y: 40 },
      { p: 0.68, x: 65, y: 45 },
      { p: 0.745, x: 72, y: 50 },
      { p: 0.81, x: 80, y: 53 },
      { p: 0.87, x: 88, y: 47 },
      { p: 0.93, x: 95, y: 44 },
    ],
    []
  );

  const EVENTS = useMemo(
    () => ({
      mercury: { arrive: 0.185, panelIn: 0.205, panelOut: 0.355 },
      venus: { arrive: 0.38, panelIn: 0.4, panelOut: 0.545 },
      earth: { arrive: 0.61, panelIn: 0.63, panelOut: 0.765 },
      mars: { arrive: 0.81, panelIn: 0.83, panelOut: 0.93 },
    }),
    []
  );

  useEffect(() => {
    const styleId = 'hackathon-tracks-react-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Exo+2:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--cyan:#00d4ff;--blue:#0060e0;--deep:#020818;--font-h:'Orbitron','Courier New',monospace;--font-b:'Exo 2',sans-serif}
        html{scroll-behavior:auto}
        body{background:var(--deep);color:#fff;font-family:var(--font-b);overflow-x:hidden}
        .htr-root{background:var(--deep);color:#fff;font-family:var(--font-b);overflow-x:hidden}
        .sec-label{position:absolute;top:5%;left:50%;transform:translateX(-50%);z-index:30;text-align:center;pointer-events:none;width:100%}
        .sec-label h1{font-family:var(--font-h);font-size:clamp(1.2rem,3.5vw,3.5rem);font-weight:900;background:linear-gradient(135deg,#fff 20%,var(--cyan) 60%,var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:.32em;line-height:1.2;margin-left:.18em}
        .sec-label p{font-family:var(--font-b);font-size:clamp(.9rem,1.5vw,1.25rem);color:rgba(180,220,255,.6);margin-top:1.2rem;font-weight:300;letter-spacing:.08em}
        #space-section-react{position:relative;height:500vh}
        .sticky{position:sticky;top:0;height:100vh;width:100%;overflow:hidden;background:var(--deep)}
        #starfield-react{position:absolute;inset:0;width:100%;height:100%;z-index:0}
        .nebula{position:absolute;inset:0;z-index:1;pointer-events:none}
        .nb{position:absolute;border-radius:50%;filter:blur(90px);mix-blend-mode:screen}
        .nb1{width:55vw;height:45vh;left:-8%;top:-5%;background:radial-gradient(ellipse,rgba(70,10,180,.35),transparent 70%)}
        .nb2{width:45vw;height:55vh;right:0;top:15%;background:radial-gradient(ellipse,rgba(0,50,190,.28),transparent 70%)}
        .nb3{width:65vw;height:40vh;left:15%;bottom:-10%;background:radial-gradient(ellipse,rgba(15,0,90,.4),transparent 70%)}
        .nb4{width:32vw;height:38vh;left:42%;top:8%;background:radial-gradient(ellipse,rgba(0,110,210,.22),transparent 70%)}
        .orbit-svg{position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none}

        .planet{position:absolute;border-radius:50%;transform:translate(-50%,-50%);z-index:5;transition:filter .6s ease}
        .planet::after{content:'';position:absolute;inset:-4px;border-radius:50%;box-shadow:0 0 0 0 transparent;transition:box-shadow .8s ease}
        .planet.lit::after{box-shadow:0 0 35px 12px rgba(255,255,255,.18)}
        @keyframes flt1{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-13px)}}
        @keyframes flt2{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-9px)}}
        @keyframes flt3{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-11px)}}
        @keyframes flt4{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-8px)}}
        .pl-mercury{width:70px;height:70px;left:17%;top:42%;background:radial-gradient(circle at 36% 34%,#cebca8,#8a7060,#3a2a22);box-shadow:0 0 22px 6px rgba(190,160,140,.2),inset -10px -10px 20px rgba(0,0,0,.5);animation:flt1 6.2s ease-in-out infinite}
        .pl-venus{width:90px;height:90px;left:37%;top:57%;background:radial-gradient(circle at 34% 33%,#f5e490,#d4900a,#7a4005);box-shadow:0 0 28px 8px rgba(240,180,30,.22),inset -12px -12px 24px rgba(0,0,0,.45);animation:flt2 7.4s ease-in-out infinite 1.1s}
        .pl-earth{width:112px;height:112px;left:58%;top:40%;background:radial-gradient(circle at 34% 32%,#7dd4f0,#2e7d32 42%,#1565c0 72%,#0d3a6e);box-shadow:0 0 38px 14px rgba(80,180,240,.28),inset -15px -15px 30px rgba(0,0,0,.4);animation:flt3 8.1s ease-in-out infinite .5s}
        .pl-mars{width:84px;height:84px;left:80%;top:53%;background:radial-gradient(circle at 36% 34%,#e87050,#b03020,#4d1010);box-shadow:0 0 28px 9px rgba(200,70,40,.22),inset -12px -12px 24px rgba(0,0,0,.5);animation:flt4 6.6s ease-in-out infinite 2.2s}
        .planet-name{position:absolute;top:calc(100% + 10px);left:50%;transform:translateX(-50%);font-family:var(--font-h);font-size:.52rem;letter-spacing:.22em;color:rgba(180,220,255,.5);white-space:nowrap;pointer-events:none}
        @keyframes ring-out{0%{transform:translate(-50%,-50%) scale(1);opacity:.9}100%{transform:translate(-50%,-50%) scale(2.2);opacity:0}}
        .pulse-ring{position:absolute;border-radius:50%;border:1.5px solid rgba(0,212,255,.5);transform:translate(-50%,-50%);pointer-events:none;z-index:4;opacity:0}
        .pulse-ring.fire{animation:ring-out 1.2s ease-out forwards}
        .rocket-wrap{position:absolute;left:0;top:0;z-index:15;pointer-events:none}
        .rocket-wrap svg{width:90px;height:auto;filter:drop-shadow(0 0 6px rgba(0,200,255,.55));display:block}
        .exhaust{position:absolute;right:calc(100% - 8px);top:50%;transform:translateY(-50%);pointer-events:none;overflow:visible;width:1px;height:1px}
        @keyframes ex{0%{transform:translateX(0) scale(1);opacity:.9}100%{transform:translateX(-70px) scale(0);opacity:0}}
        .ep{position:absolute;border-radius:50%;animation:ex linear infinite}
        .track-panel{position:absolute;z-index:20;width:270px;background:rgba(4,12,38,.78);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);border:1px solid rgba(0,180,255,.18);border-radius:14px;padding:1.4rem;opacity:0;transform:translateY(18px) scale(.96);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1);pointer-events:none;box-shadow:0 4px 40px rgba(0,80,200,.12),inset 0 1px 0 rgba(255,255,255,.05)}
        .track-panel::before{content:'';position:absolute;inset:0;border-radius:14px;background:radial-gradient(ellipse at 50% -5%,rgba(0,200,255,.07),transparent 60%);pointer-events:none}
        .pn-mercury{left:calc(17% + 54px);top:16%}
        .pn-venus{left:calc(37% - 300px);top:36%}
        .pn-earth{left:calc(58% + 66px);top:14%}
        .pn-mars{left:calc(80% - 300px);top:26%}
        .pn-tag{font-family:var(--font-h);font-size:.5rem;letter-spacing:.28em;color:rgba(0,212,255,.65);margin-bottom:.35rem}
        .pn-icon{font-size:1.6rem;margin-bottom:.5rem;line-height:1}
        .pn-track{font-family:var(--font-h);font-size:clamp(.85rem,1.4vw,1.1rem);font-weight:700;color:#fff;line-height:1.2;margin-bottom:.7rem}
        .pn-div{height:1px;background:linear-gradient(90deg,transparent,rgba(0,212,255,.35),transparent);margin-bottom:.7rem}
        .pn-desc{font-family:var(--font-b);font-size:.8rem;color:rgba(170,210,255,.72);line-height:1.65;font-weight:300}
        .earth-zoom{position:absolute;width:112px;height:112px;border-radius:50%;background:radial-gradient(circle at 34% 32%,#7dd4f0,#2e7d32 42%,#1565c0 72%,#0d3a6e);box-shadow:0 0 50px 20px rgba(80,180,240,.4);z-index:25;opacity:0;pointer-events:none;transform-origin:center center}
        .atmo{position:absolute;inset:0;z-index:26;background:radial-gradient(ellipse at 50% 100%,#1e5799 0%,#1565c0 40%,#0a3a6e 100%);opacity:0;pointer-events:none}
        .clouds{position:absolute;inset:0;z-index:28;opacity:0;pointer-events:none;overflow:hidden}
        .cl-row{position:absolute;top:0;left:0;right:0;height:220px}
        .cl{position:absolute;background:rgba(255,255,255,.88);border-radius:80px;filter:blur(4px)}
        .cl::before,.cl::after{content:'';position:absolute;background:inherit;border-radius:80px}
        .cl1{width:220px;height:65px;left:-3%;top:18px}.cl1::before{width:110px;height:88px;top:-32px;left:32px;border-radius:50%}.cl1::after{width:88px;height:68px;top:-22px;right:28px;border-radius:50%}
        .cl2{width:300px;height:72px;right:-2%;top:6px}.cl2::before{width:130px;height:96px;top:-38px;left:44px;border-radius:50%}.cl2::after{width:105px;height:75px;top:-28px;right:52px;border-radius:50%}
        .cl3{width:170px;height:54px;left:18%;top:42px}.cl3::before{width:84px;height:72px;top:-26px;left:26px;border-radius:50%}
        .cl4{width:240px;height:68px;left:46%;top:10px}.cl4::before{width:118px;height:90px;top:-34px;left:36px;border-radius:50%}.cl4::after{width:95px;height:68px;top:-22px;right:42px;border-radius:50%}
        .cl5{width:190px;height:58px;right:12%;top:50px}.cl5::before{width:96px;height:78px;top:-30px;left:28px;border-radius:50%}
        @keyframes cdrift{0%{transform:translateX(0)}100%{transform:translateX(22px)}}
        @keyframes cdrift2{0%{transform:translateX(0)}100%{transform:translateX(-18px)}}
        .cl1{animation:cdrift 9s ease-in-out infinite alternate}.cl2{animation:cdrift2 11s ease-in-out infinite alternate}.cl3{animation:cdrift 13s ease-in-out infinite alternate 1.5s}.cl4{animation:cdrift2 8s ease-in-out infinite alternate .8s}.cl5{animation:cdrift 10s ease-in-out infinite alternate 2.5s}
        .pdots{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);display:flex;gap:14px;align-items:center;z-index:30;opacity:0;transition:opacity .5s ease}
        .pdots.show{opacity:1}
        .pd{width:7px;height:7px;border-radius:50%;border:1px solid rgba(0,212,255,.35);background:transparent;transition:all .45s ease;position:relative;cursor:default}
        .pd.visited{background:rgba(0,212,255,.4);border-color:rgba(0,212,255,.6);box-shadow:0 0 6px rgba(0,212,255,.4)}
        .pd.active{background:rgba(0,212,255,.9);border-color:var(--cyan);box-shadow:0 0 14px rgba(0,212,255,.8);transform:scale(1.5)}
        .pd-lbl{position:absolute;bottom:calc(100% + 7px);left:50%;transform:translateX(-50%);font-family:var(--font-h);font-size:.45rem;letter-spacing:.15em;color:rgba(0,212,255,.55);white-space:nowrap;opacity:0;transition:opacity .3s ease;pointer-events:none}
        .pd.active .pd-lbl{opacity:1}

        @media(max-width:768px){.pl-mercury{width:52px;height:52px;left:14%;top:35%}.pl-venus{width:68px;height:68px;left:35%;top:55%}.pl-earth{width:82px;height:82px;left:62%;top:38%}.pl-mars{width:62px;height:62px;left:83%;top:52%}.rocket-wrap svg{width:62px}.track-panel{width:210px;padding:1rem}.pn-mercury{left:calc(14% + 38px);top:8%}.pn-venus{left:calc(35% - 230px);top:33%}.pn-earth{left:calc(62% + 48px);top:10%}.pn-mars{left:calc(83% - 230px);top:24%}.pn-track{font-size:.85rem}.pn-desc{font-size:.72rem}}
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let stars = [];
    let shootingStars = [];
    let frame = 0;
    let animId = 0;
    let orbitPoints = [];

    const ZOOM_START = 0.93;
    const ZOOM_END = 1.0;
    const SVG_W = 1000;
    const SVG_H = 600;

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const invLerp = (a, b, v) => clamp((v - a) / (b - a), 0, 1);
    const smooth = (t) => t * t * (3 - 2 * t);
    const smooth2 = (t) => t * t * t * (t * (t * 6 - 15) + 10);

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildStars();
      buildOrbitPaths();
      positionEarthZoom();
    }

    function buildStars() {
      stars = [];
      const n = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 1800), 500);
      for (let i = 0; i < n; i += 1) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.4 + 0.15,
          a: Math.random() * 0.85 + 0.15,
          sp: Math.random() * 0.018 + 0.004,
          ph: Math.random() * Math.PI * 2,
        });
      }
    }

    function maybeShootingStar() {
      if (Math.random() < 0.003 && shootingStars.length < 3) {
        const y = Math.random() * canvas.height * 0.6;
        shootingStars.push({
          x: Math.random() * canvas.width * 0.5,
          y,
          vx: 8 + Math.random() * 6,
          vy: 2 + Math.random() * 3,
          life: 1,
        });
      }
    }

    function drawCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame += 1;

      stars.forEach((s) => {
        const twk = Math.sin(frame * s.sp + s.ph) * 0.28 + 0.72;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a * twk})`;
        ctx.fill();
      });

      for (let i = 0; i < stars.length; i += 18) {
        const s = stars[i];
        if (!s) continue;
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 8);
        g.addColorStop(0, `rgba(180,220,255,${s.a * 0.35})`);
        g.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 8, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      maybeShootingStar();
      shootingStars = shootingStars.filter((ss) => {
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life -= 0.025;
        if (ss.life <= 0) return false;
        const g2 = ctx.createLinearGradient(ss.x - ss.vx * 8, ss.y - ss.vy * 8, ss.x, ss.y);
        g2.addColorStop(0, 'transparent');
        g2.addColorStop(1, `rgba(200,240,255,${ss.life * 0.9})`);
        ctx.beginPath();
        ctx.moveTo(ss.x - ss.vx * 8, ss.y - ss.vy * 8);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = g2;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        return true;
      });
    }

    function animCanvas() {
      drawCanvas();
      animId = requestAnimationFrame(animCanvas);
    }

    const EXHAUST_COLORS = [
      'rgba(255,110,0,.85)',
      'rgba(255,190,40,.75)',
      'rgba(0,200,255,.55)',
      'rgba(255,255,220,.45)',
      'rgba(255,70,20,.7)',
    ];

    if (exhaustRef.current && exhaustRef.current.childElementCount === 0) {
      for (let i = 0; i < 14; i += 1) {
        const p = document.createElement('div');
        const sz = Math.random() * 9 + 3;
        const dur = (0.35 + Math.random() * 0.45).toFixed(2);
        const del = (Math.random() * 0.7).toFixed(2);
        const col = EXHAUST_COLORS[Math.floor(Math.random() * EXHAUST_COLORS.length)];
        p.className = 'ep';
        p.style.cssText = `width:${sz}px;height:${sz}px;background:${col};left:0;top:${(Math.random()-0.5)*24}px;animation-duration:${dur}s;animation-delay:${del}s;filter:blur(${(Math.random()*2).toFixed(1)}px);`;
        exhaustRef.current.appendChild(p);
      }
    }

    function crPoint(p0, p1, p2, p3, t) {
      const t2 = t * t;
      const t3 = t2 * t;
      return {
        x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      };
    }

    function crTangent(p0, p1, p2, p3, t) {
      const t2 = t * t;
      return {
        x: 0.5 * ((-p0.x + p2.x) + 2 * (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t + 3 * (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t2),
        y: 0.5 * ((-p0.y + p2.y) + 2 * (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t + 3 * (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t2),
      };
    }

    function getRocketState(progress) {
      const N = WP.length;
      progress = clamp(progress, 0, WP[N - 1].p);
      let seg = N - 2;
      for (let k = 0; k < N - 1; k += 1) {
        if (progress <= WP[k + 1].p) {
          seg = k;
          break;
        }
      }
      const t = invLerp(WP[seg].p, WP[seg + 1].p, progress);
      const i0 = Math.max(0, seg - 1);
      const i1 = seg;
      const i2 = Math.min(N - 1, seg + 1);
      const i3 = Math.min(N - 1, seg + 2);
      const pos = crPoint(WP[i0], WP[i1], WP[i2], WP[i3], t);
      const tang = crTangent(WP[i0], WP[i1], WP[i2], WP[i3], t);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      return {
        x: (pos.x / 100) * vw,
        y: (pos.y / 100) * vh,
        angle: (Math.atan2(tang.y, tang.x) * 180) / Math.PI,
      };
    }

    function buildOrbitPaths() {
      if (!pathFullRef.current || !pathTrailRef.current || !orbitSvgRef.current) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      orbitSvgRef.current.setAttribute('viewBox', `0 0 ${SVG_W} ${SVG_H}`);
      const pts = [];
      const STEPS = 200;
      for (let i = 0; i <= STEPS; i += 1) {
        const prog = (i / STEPS) * WP[WP.length - 1].p;
        const st = getRocketState(prog);
        pts.push({ x: (st.x / vw) * SVG_W, y: (st.y / vh) * SVG_H });
      }
      orbitPoints = pts;
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i += 1) d += ` L ${pts[i].x} ${pts[i].y}`;
      pathFullRef.current.setAttribute('d', d);
      pathTrailRef.current.setAttribute('d', '');
    }

    function updateTrailPath(progress) {
      if (!orbitPoints.length || !pathTrailRef.current) return;
      const frac = progress / WP[WP.length - 1].p;
      const end = Math.floor(clamp(frac, 0, 1) * (orbitPoints.length - 1));
      if (end < 1) {
        pathTrailRef.current.setAttribute('d', '');
        return;
      }
      let d = `M ${orbitPoints[0].x} ${orbitPoints[0].y}`;
      for (let i = 1; i <= end; i += 1) d += ` L ${orbitPoints[i].x} ${orbitPoints[i].y}`;
      pathTrailRef.current.setAttribute('d', d);
    }

    function positionEarthZoom() {
      if (!earthZoomRef.current) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cx = 0.58 * vw;
      const cy = 0.4 * vh;
      earthZoomRef.current.style.left = `${cx - 56}px`;
      earthZoomRef.current.style.top = `${cy - 56}px`;
    }

    gsap.set(rocketRef.current, {
      x: -120,
      y: window.innerHeight * 0.5 - 22,
      rotation: 0,
      opacity: 0,
    });

    function panelAlpha(progress, pIn, pOut) {
      const FI = 0.025;
      const FO = 0.025;
      if (progress < pIn) return 0;
      if (progress < pIn + FI) return smooth(invLerp(pIn, pIn + FI, progress));
      if (progress < pOut - FO) return 1;
      if (progress < pOut) return 1 - smooth(invLerp(pOut - FO, pOut, progress));
      return 0;
    }

    const ringFired = { mercury: false, venus: false, earth: false, mars: false };

    function tryFireRing(name, progress) {
      const arr = EVENTS[name].arrive;
      if (!ringFired[name] && progress >= arr && progress < arr + 0.05) {
        ringFired[name] = true;
        const r = ringRefs[name].current;
        if (r) {
          r.classList.remove('fire');
          void r.offsetWidth;
          r.classList.add('fire');
          setTimeout(() => r.classList.remove('fire'), 1400);
        }
      }
      if (progress < arr - 0.02) ringFired[name] = false;
    }

    function updateScene(progress) {
      if (secLabelRef.current) {
        secLabelRef.current.style.opacity = String(Math.max(0, 1 - smooth(invLerp(0, 0.12, progress))));
        if (progress > 0.01) {
          secLabelRef.current.style.transform = `translateX(-50%) translateY(${-progress * 200}px)`;
        } else {
          secLabelRef.current.style.transform = `translateX(-50%)`;
        }
      }

      if (progress < ZOOM_START) {
        const st = getRocketState(progress);
        const enterAlpha = smooth(invLerp(0.01, 0.055, progress));
        const exitAlpha = 1 - smooth(invLerp(0.88, ZOOM_START, progress));
        gsap.set(rocketRef.current, {
          x: st.x - 45,
          y: st.y - 22,
          rotation: st.angle,
          opacity: Math.min(enterAlpha, exitAlpha),
        });
      } else {
        gsap.set(rocketRef.current, { opacity: 0 });
      }

      updateTrailPath(progress);

      const planetOrder = ['mercury', 'venus', 'earth', 'mars'];
      let activeIdx = -1;

      planetOrder.forEach((name, idx) => {
        const ev = EVENTS[name];
        const alpha = panelAlpha(progress, ev.panelIn, ev.panelOut);
        const panelEl = panelRefs[name].current;
        const planetEl = planetRefs[name].current;
        if (panelEl) {
          panelEl.style.opacity = String(alpha);
          panelEl.style.transform = `translateY(${(1 - alpha) * 16}px) scale(${0.97 + alpha * 0.03})`;
        }
        if (planetEl) {
          if (alpha > 0.15) {
            planetEl.classList.add('lit');
            activeIdx = idx;
          } else {
            planetEl.classList.remove('lit');
          }
        }
        tryFireRing(name, progress);
      });

      if (pdotsRef.current) {
        pdotsRef.current.classList.toggle('show', progress > 0.18);
      }

      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        dot.classList.remove('active', 'visited');
        const name = planetOrder[i];
        if (progress >= EVENTS[name].arrive) {
          if (i < activeIdx) dot.classList.add('visited');
          else if (i === activeIdx) dot.classList.add('active');
          else dot.classList.add('visited');
        }
        if (i === activeIdx) {
          dot.classList.remove('visited');
          dot.classList.add('active');
        }
      });

      if (progress >= ZOOM_START) {
        const zp = smooth2(invLerp(ZOOM_START, ZOOM_END, progress));
        const maxS = (Math.max(window.innerWidth, window.innerHeight) / 52) * 1.8;
        const scale = 1 + (maxS - 1) * zp;
        if (earthZoomRef.current) {
          earthZoomRef.current.style.opacity = String(smooth(invLerp(ZOOM_START, ZOOM_START + 0.01, progress)));
          earthZoomRef.current.style.transform = `scale(${scale})`;
        }
        if (atmoRef.current) atmoRef.current.style.opacity = String(smooth(zp) * 0.95);
        if (cloudsRef.current) cloudsRef.current.style.opacity = String(Math.max(0, (zp - 0.55) / 0.45));
        canvas.style.opacity = String(Math.max(0.04, 1 - zp));
        if (nebulaRef.current) nebulaRef.current.style.opacity = String(Math.max(0, 1 - zp * 2));
      } else {
        if (earthZoomRef.current) earthZoomRef.current.style.opacity = '0';
        if (atmoRef.current) atmoRef.current.style.opacity = '0';
        if (cloudsRef.current) cloudsRef.current.style.opacity = '0';
        canvas.style.opacity = '1';
        if (nebulaRef.current) nebulaRef.current.style.opacity = '1';
      }
    }

    resizeCanvas();
    animCanvas();
    updateScene(0);

    const onResize = () => resizeCanvas();
    window.addEventListener('resize', onResize);

    const trigger = ScrollTrigger.create({
      trigger: spaceSectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      onUpdate: (self) => updateScene(self.progress),
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      trigger.kill();
      ScrollTrigger.refresh();
    };
  }, [EVENTS, WP]);

  return (
    <section id="theme">
      <div className="htr-root" ref={rootRef}>


        <div id="space-section-react" ref={spaceSectionRef}>
          <div className="sticky" ref={stickyRef}>
            <canvas id="starfield-react" ref={canvasRef} />

            <div className="nebula" ref={nebulaRef}>
              <div className="nb nb1" />
              <div className="nb nb2" />
              <div className="nb nb3" />
              <div className="nb nb4" />
            </div>

            <svg className="orbit-svg" ref={orbitSvgRef} preserveAspectRatio="none">
              <defs>
                <filter id="glow-filter-react">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                ref={pathFullRef}
                fill="none"
                stroke="rgba(0,180,255,.08)"
                strokeWidth="1.5"
                strokeDasharray="8 14"
              />
              <path
                ref={pathTrailRef}
                fill="none"
                stroke="rgba(0,220,255,.35)"
                strokeWidth="1.5"
                filter="url(#glow-filter-react)"
                strokeLinecap="round"
              />
            </svg>

            <div className="sec-label" ref={secLabelRef}>
              <h1>
                HACKATHON
                <br />
                TRACKS
              </h1>
              <p>Chart your course through the cosmos</p>
            </div>

            <div className="planet pl-mercury" ref={planetRefs.mercury}>
              <span className="planet-name">MERCURY</span>
            </div>
            <div className="planet pl-venus" ref={planetRefs.venus}>
              <span className="planet-name">VENUS</span>
            </div>
            <div className="planet pl-earth" ref={planetRefs.earth}>
              <span className="planet-name">EARTH</span>
            </div>
            <div className="planet pl-mars" ref={planetRefs.mars}>
              <span className="planet-name">MARS</span>
            </div>

            <div className="pulse-ring" ref={ringRefs.mercury} style={{ width: 70, height: 70, left: '17%', top: '42%', borderColor: 'rgba(200,160,130,.6)' }} />
            <div className="pulse-ring" ref={ringRefs.venus} style={{ width: 90, height: 90, left: '37%', top: '57%', borderColor: 'rgba(240,180,30,.6)' }} />
            <div className="pulse-ring" ref={ringRefs.earth} style={{ width: 112, height: 112, left: '58%', top: '40%', borderColor: 'rgba(80,180,255,.6)' }} />
            <div className="pulse-ring" ref={ringRefs.mars} style={{ width: 84, height: 84, left: '80%', top: '53%', borderColor: 'rgba(200,70,40,.6)' }} />

            <div className="rocket-wrap" ref={rocketRef}>
              <div className="exhaust" ref={exhaustRef} />
              <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="bg-react" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6a9abe" />
                    <stop offset="30%" stopColor="#c0dcf4" />
                    <stop offset="65%" stopColor="#e6f2ff" />
                    <stop offset="100%" stopColor="#88aeca" />
                  </linearGradient>
                  <linearGradient id="ng-react" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b82030" />
                    <stop offset="100%" stopColor="#ff3a4e" />
                  </linearGradient>
                  <radialGradient id="wg-react" cx="38%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#aaecff" />
                    <stop offset="55%" stopColor="#0090cc" />
                    <stop offset="100%" stopColor="#001a33" />
                  </radialGradient>
                  <filter id="rktGlow-react">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="b" />
                    <feComposite in="SourceGraphic" in2="b" operator="over" />
                  </filter>
                </defs>
                <rect x="6" y="21" width="18" height="18" rx="2" fill="#14263a" />
                <rect x="3" y="23" width="10" height="14" rx="1" fill="#0a1a28" />
                <rect x="3" y="26" width="10" height="8" rx="1" fill="#081420" opacity=".6" />
                <rect x="21" y="15" width="68" height="30" rx="4" fill="url(#bg-react)" filter="url(#rktGlow-react)" />
                <path d="M89 15 L116 30 L89 45 Z" fill="url(#ng-react)" />
                <rect x="21" y="27" width="68" height="6" fill="rgba(0,0,0,.09)" />
                <circle cx="68" cy="30" r="9.5" fill="url(#wg-react)" stroke="rgba(0,200,255,.45)" strokeWidth="1.5" />
                <ellipse cx="64" cy="26.5" rx="4" ry="2.5" fill="rgba(220,248,255,.28)" />
                <path d="M33 15 L26 2 L48 15 Z" fill="#1462a0" opacity=".92" />
                <path d="M33 45 L26 58 L48 45 Z" fill="#1462a0" opacity=".92" />
                <rect x="50" y="15" width="3" height="30" fill="rgba(0,200,255,.22)" />
                <circle cx="30" cy="30" r="2" fill="rgba(140,190,230,.25)" />
                <circle cx="81" cy="30" r="2" fill="rgba(140,190,230,.25)" />
              </svg>
            </div>

            <div className="track-panel pn-mercury" ref={panelRefs.mercury}>
              <div className="pn-icon">⚕️</div>
              <div className="pn-tag">Mercury</div>
              <div className="pn-track">Healthcare</div>
              <div className="pn-div" />
              <div className="pn-desc">Build solutions that improve patient care, medical access, health data systems, wellness tools, or healthcare technology.</div>
            </div>

            <div className="track-panel pn-venus" ref={panelRefs.venus}>
              <div className="pn-icon">💼</div>
              <div className="pn-tag">Venus</div>
              <div className="pn-track">Business &amp; Expertise</div>
              <div className="pn-div" />
              <div className="pn-desc">Build solutions for entrepreneurship, finance, productivity, operations, strategy, collaboration, or professional growth.</div>
            </div>

            <div className="track-panel pn-earth" ref={panelRefs.earth}>
              <div className="pn-icon">🌱</div>
              <div className="pn-tag">Earth</div>
              <div className="pn-track">Sustainability</div>
              <div className="pn-div" />
              <div className="pn-desc">Build solutions that address climate, clean energy, environmental impact, smart cities, conservation, or sustainable living.</div>
            </div>

            <div className="track-panel pn-mars" ref={panelRefs.mars}>
              <div className="pn-icon">🎓</div>
              <div className="pn-tag">Mars</div>
              <div className="pn-track">Education</div>
              <div className="pn-div" />
              <div className="pn-desc">Build solutions for students, teachers, learning platforms, accessibility, skill-building, academic support, or the future of education.</div>
            </div>

            <div className="earth-zoom" ref={earthZoomRef} />
            <div className="atmo" ref={atmoRef} />

            <div className="clouds" ref={cloudsRef}>
              <div className="cl-row">
                <div className="cl cl1" />
                <div className="cl cl2" />
                <div className="cl cl3" />
                <div className="cl cl4" />
                <div className="cl cl5" />
              </div>
            </div>

            <div className="pdots" ref={pdotsRef}>
              {['HEALTHCARE', 'BUSINESS', 'SUSTAIN', 'EDUCATION'].map((label, i) => (
                <div
                  key={label}
                  className="pd"
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                >
                  <span className="pd-lbl">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default ThemeSection;