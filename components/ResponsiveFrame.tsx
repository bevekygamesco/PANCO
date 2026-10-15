'use client';
import { useEffect, useRef, useState } from 'react';
/** Grow the straight spans of form.svg while retaining corner control points. */
export default function ResponsiveFrame() {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 1511, h: 747 });
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const compact = size.w > 450 && size.h / size.w > .65;
  const frameScale = compact ? .58 : 1;
  const w = size.w / frameScale, h = size.h / frameScale;
  const a = w * (compact ? .29 : 492.108 / 1511), b = w * (680.885 / 1511), c = w * (1068.83 / 1511), d = w * (1260.88 / 1511);
  const s = Math.min(1, w / 1000);
  const x = (o: number, v: number) => o + v * s;
  const y = (v: number) => .5 + (v - .5) * s;
  const cut = Math.min(96.33, w * .16);
  const path = `M38.5 .5 H${a}
    C${x(a,14.334)} .5 ${x(a,28.461)} ${y(3.9237)} ${x(a,41.204)} ${y(10.4861)}
    L${x(b,-45.783)} ${y(62.9043)} C${x(b,-31.623)} ${y(70.1959)} ${x(b,-15.927)} ${y(74)} ${b} ${y(74)} H${c}
    C${x(c,15.5)} ${y(74)} ${x(c,30.79)} ${y(70.3969)} ${x(c,44.66)} ${y(63.4753)}
    L${x(d,-40.19)} ${y(9.97228)} C${x(d,-27.71)} ${y(3.74276)} ${x(d,-13.95)} .5 ${d} .5
    H${w-57.23} C${w-39.82} .5 ${w-25.72} 14.6067 ${w-25.72} 32.0082
    C${w-25.72} 41.4932 ${w-21.44} 50.4737 ${w-14.08} 56.4568
    L${w-13.11} 57.25 C${w-5.13} 63.735 ${w-.5} 73.4686 ${w-.5} 83.7493
    V${h-175.881} C${w-.5} ${h-166.016} ${w-4.34} ${h-156.537} ${w-11.2} ${h-149.449}
    L${w-cut+10.2} ${h-72.051} C${w-cut+3.34} ${h-64.963} ${w-cut-.5} ${h-55.484} ${w-cut-.5} ${h-45.619}
    V${h-38.5} C${w-cut-.5} ${h-17.5132} ${w-cut-17.5132} ${h-.5} ${w-cut-38.5} ${h-.5}
    H38.5 C17.5132 ${h-.5} .5 ${h-17.5132} .5 ${h-38.5} V38.5 C.5 17.5132 17.5132 .5 38.5 .5 Z`;
  return <svg ref={ref} className="responsive-frame" aria-hidden="true"><defs><linearGradient id="frame-fill" x1="0" y1="0" x2="75.0675%" y2="0"><stop stopColor="#E6E2E4"/><stop offset="1" stopColor="#F9F6F8"/></linearGradient></defs><path d={path} transform={`scale(${frameScale})`} fill="url(#frame-fill)" stroke="#D2D2D2"/></svg>;
}
