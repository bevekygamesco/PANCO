/** Finite strips start staggered, cross the viewport, then leave completely. */
export function lookbookOffsets(viewport: number, trackWidth: number, visibleSpan: number, progress: number) {
 const p = Math.max(0,Math.min(1,progress));
 const distance = viewport + trackWidth - visibleSpan + 32;
 return {top:visibleSpan-trackWidth+p*distance,bottom:viewport-visibleSpan-p*distance,distance};
}
