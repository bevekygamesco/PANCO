'use client';
import { Fragment, useId } from 'react';

// Recovered from the original Figma SVG filter definitions in HOMEPAGE.rar.
const profiles = {
 'neon-outerwear.svg': {color:'#ff7a8e',blur:[2.9644,5.9288,20.7508,41.5016,71.1456,124.505]},
 'neon-tshirt.svg': {color:'#40723b',blur:[2.69249,5.38499,18.8475,37.6949,64.6199,113.085]},
 'neon-pants.svg': {color:'#c59247',blur:[2.62441,5.24883,18.3709,36.7418,62.9859,110.225]},
 'neon-sweater.svg': {color:'#286ac3',blur:[2.81263,5.62526,19.6884,39.3768,67.5032,118.131,42.55]},
 'neon-shoes.svg': {color:'#ab6cea',blur:[3.11006,6.22012,21.7704,43.5408,74.6414,125]},
} as const;
export default function NeonGlow({asset,width,height}:{asset:string;width:number;height:number}) {
 const id = `neon-${useId().replace(/[^a-zA-Z0-9_-]/g,'')}`;
 const profile = profiles[asset as keyof typeof profiles];
 if(!profile) return null;
 return <svg className="neon-vector-glow" viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false">
  <defs><filter id={id} x="-260" y="-260" width={width+520} height={height+520} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
   <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
   {profile.blur.map((radius,index)=><Fragment key={radius}>
    <feGaussianBlur in="hardAlpha" stdDeviation={radius} result={`blur${index}`}/>
    <feFlood floodColor={asset==='neon-sweater.svg'&&index===6?'#227dda':profile.color} result={`color${index}`}/>
    <feComposite in={`color${index}`} in2={`blur${index}`} operator="in" result={`glow${index}`}/>
   </Fragment>)}
   <feMerge>{profile.blur.map((radius,index)=><feMergeNode key={radius} in={`glow${index}`}/>)}</feMerge>
  </filter></defs>
  <image href={`/assets/${asset}`} width={width} height={height} filter={`url(#${id})`}/>
 </svg>;
}
