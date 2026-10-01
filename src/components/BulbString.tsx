import React, { useEffect, useRef } from 'react';
import { soundSys } from '../utils/audioSynthesis';

interface P { x: number; y: number; px: number; py: number; pinned: boolean }

const SEG = 20; // rope segment length in px
const BULB_EVERY = 3;

// A sagging string of market bulbs, simulated as a verlet rope the pointer can push.
export const BulbString: React.FC<{ className?: string }> = ({ className = '' }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0, visible = true;
    let pts: P[] = [];
    const pointer = { x: -999, y: -999, vx: 0, vy: 0 };
    const start = performance.now();
    let lit = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Hooks along the top, one pole per ~650px so wide screens get more festoons, not deeper ones
      const spans = Math.max(2, Math.round(w / 650));
      const anchors = Array.from({ length: spans + 1 }, (_, i) => ({
        x: i === 0 ? -10 : i === spans ? w + 10 : (w * i) / spans,
        y: i % 2 ? 10 : 22,
      }));
      pts = [];
      for (let a = 0; a < anchors.length - 1; a++) {
        const A = anchors[a], B = anchors[a + 1];
        const dist = Math.hypot(B.x - A.x, B.y - A.y);
        // Rope length sets the settled sag (parabola: L ≈ d + 8S²/3d), so cap S, not the slack ratio
        const S = Math.min(h - 120, dist * 0.14);
        const len = dist + (8 * S * S) / (3 * dist);
        const n = Math.max(4, Math.round(len / SEG));
        for (let i = a === 0 ? 0 : 1; i <= n; i++) {
          const t = i / n;
          const x = A.x + (B.x - A.x) * t;
          const y = A.y + (B.y - A.y) * t + Math.sin(Math.PI * t) * S;
          pts.push({ x, y, px: x, py: y, pinned: i === 0 || i === n });
        }
      }
    };

    const rest: number[] = [];
    const measure = () => {
      rest.length = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        rest.push(Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y));
      }
    };

    const step = () => {
      for (const p of pts) {
        if (p.pinned) continue;
        const vx = (p.x - p.px) * 0.985;
        const vy = (p.y - p.py) * 0.985;
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy + 0.18;
        const dx = p.x - pointer.x, dy = p.y - pointer.y;
        const d = Math.hypot(dx, dy);
        if (d < 70 && d > 0.01) {
          const f = (70 - d) / 70;
          p.x += (dx / d) * f * 2.2 + pointer.vx * 0.06 * f;
          p.y += (dy / d) * f * 2.2 + pointer.vy * 0.06 * f;
        }
      }
      for (let k = 0; k < 6; k++) {
        for (let i = 0; i < pts.length - 1; i++) {
          const a = pts[i], b = pts[i + 1];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.001;
          const diff = (d - rest[i]) / d / 2;
          if (!a.pinned) { a.x += dx * diff; a.y += dy * diff; }
          if (!b.pinned) { b.x -= dx * diff; b.y -= dy * diff; }
        }
      }
      pointer.vx *= 0.8;
      pointer.vy *= 0.8;
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = '#4a4032';
      ctx.beginPath();
      pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.stroke();

      const bulbs = Math.floor(pts.length / BULB_EVERY);
      const target = still ? bulbs : Math.floor(((now - start - 400) / 1900) * bulbs);
      if (target > lit && lit < bulbs) {
        lit = Math.min(bulbs, target);
        soundSys.playTick(0.8 + (lit % 5) * 0.08);
      }

      for (let b = 0; b < bulbs; b++) {
        const i = b * BULB_EVERY + 1;
        const p = pts[i];
        const q = pts[i + 1] || p;
        const ang = Math.atan2(q.y - p.y, q.x - p.x) * 0.25;
        const on = b < lit;
        const flick = on && !still ? 0.9 + 0.1 * Math.sin(now / 90 + b * 7.3) : 1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(ang);
        if (on) {
          const g = ctx.createRadialGradient(0, 14, 0, 0, 14, 46);
          g.addColorStop(0, `rgba(247,179,43,${0.42 * flick})`);
          g.addColorStop(1, 'rgba(247,179,43,0)');
          ctx.fillStyle = g;
          ctx.fillRect(-46, -32, 92, 92);
        }
        ctx.fillStyle = '#2a251d';
        ctx.fillRect(-3, 0, 6, 6);
        ctx.beginPath();
        ctx.ellipse(0, 13, 6, 8, 0, 0, Math.PI * 2);
        ctx.fillStyle = on ? (b % 4 === 0 ? '#ffe08f' : '#ffd46b') : '#3b3326';
        ctx.fill();
        if (on) {
          ctx.beginPath();
          ctx.ellipse(-2, 10, 1.8, 2.8, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#fff8e3';
          ctx.fill();
        }
        ctx.restore();
      }
    };

    const loop = (now: number) => {
      if (visible) {
        step();
        draw(now);
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (pointer.x > -900) { pointer.vx = x - pointer.x; pointer.vy = y - pointer.y; }
      pointer.x = x;
      pointer.y = y;
    };
    const onLeave = () => { pointer.x = pointer.y = -999; };
    const onResize = () => { build(); measure(); if (still) draw(performance.now()); };

    build();
    measure();
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    window.addEventListener('resize', onResize);

    if (still) {
      draw(performance.now());
    } else {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none block w-full ${className}`} />;
};
