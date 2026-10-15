import type { CSSProperties } from 'react';
type Name = 'arrow' | 'search' | 'heart' | 'bag' | 'close' | 'snow' | 'check';
export default function Icon({ name, className = '', style }: { name: Name; className?: string; style?: CSSProperties }) {
 const paths: Record<Name, React.ReactNode> = {
 arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
 search: <><circle cx="10.5" cy="10.5" r="7.7"/><path d="m16.3 16.3 5 5"/></>,
 heart: <path d="M20.8 4.6c-2.6-2.6-6.6-1.6-8.8 1-2.2-2.6-6.2-3.6-8.8-1C.8 7 .9 10.6 3.5 13.1L12 21l8.5-7.9C23.1 10.6 23.2 7 20.8 4.6Z"/>,
 bag: <><path d="M4.4 7.5h15.2l1 14H3.4l1-14Z"/><path d="M8 9V5a4 4 0 0 1 8 0v4"/></>,
 close: <path d="m6 6 12 12M6 18 18 6"/>,
 snow: <><path d="M12 1v22M2.5 6.5l19 11M2.5 17.5l19-11M8 3l4 4 4-4M8 21l4-4 4 4M3 10l5-1-1-5M21 14l-5 1 1 5M7 20l1-5-5-1M17 4l-1 5 5 1"/></>,
 check: <path d="m5 12 5 5L20 6"/>,
 };
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">{paths[name]}</svg>;
}
