import type { GuideKind } from '@/lib/guide-presentation'

/** Decorative, lightweight maths artwork: no remote images or layout shift. */
export default function GuideArtwork({ kind = 'study' }: { kind?: GuideKind }) {
  return <div className={`guide-art guide-art--${kind}`} aria-hidden="true">
    <svg viewBox="0 0 480 300" fill="none" focusable="false">
      <circle cx="440" cy="25" r="118" fill="currentColor" opacity=".07" />
      <circle cx="30" cy="292" r="95" fill="currentColor" opacity=".06" />
      <path d="M36 45h22m-11-11v22M405 245h22m-11-11v22" stroke="currentColor" strokeWidth="3" opacity=".35" />
      <circle cx="401" cy="87" r="5" fill="currentColor" opacity=".4" />
      {kind === 'geometry' ? <>
        <circle cx="301" cy="123" r="71" fill="white" fillOpacity=".65" stroke="currentColor" strokeWidth="3" />
        <path d="m90 228 103-150 116 150H90Z" fill="currentColor" fillOpacity=".13" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="M193 78v150M179 228v-14h14" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
        <circle cx="193" cy="78" r="6" fill="currentColor" /><circle cx="90" cy="228" r="6" fill="currentColor" />
        <text x="313" y="239" fontSize="22" fill="currentColor" fontFamily="Georgia, serif">a² + b² = c²</text>
      </> : kind === 'algebra' ? <>
        <rect x="70" y="59" width="294" height="184" rx="22" fill="white" fillOpacity=".85" transform="rotate(-5 217 151)" />
        <text x="109" y="132" fontSize="39" fill="currentColor" fontFamily="Georgia, serif">x² + 6x + 9</text>
        <path d="M113 156h219" stroke="currentColor" strokeOpacity=".2" strokeWidth="2" />
        <text x="127" y="204" fontSize="37" fill="currentColor" fontFamily="Georgia, serif">= (x + 3)²</text>
        <circle cx="368" cy="218" r="30" fill="currentColor" /><path d="m355 218 9 9 18-19" stroke="white" strokeWidth="4" strokeLinecap="round" />
      </> : kind === 'data' ? <>
        <rect x="81" y="49" width="314" height="204" rx="22" fill="white" fillOpacity=".8" />
        <path d="M120 91h238M120 135h238M120 179h238" stroke="currentColor" strokeOpacity=".12" strokeWidth="2" />
        <rect x="132" y="159" width="39" height="60" rx="7" fill="currentColor" fillOpacity=".35" />
        <rect x="193" y="127" width="39" height="92" rx="7" fill="currentColor" fillOpacity=".55" />
        <rect x="254" y="100" width="39" height="119" rx="7" fill="currentColor" fillOpacity=".7" />
        <rect x="315" y="75" width="39" height="144" rx="7" fill="currentColor" />
        <path d="M119 74v149h244" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </> : kind === 'formula' ? <>
        <rect x="88" y="49" width="301" height="198" rx="20" fill="white" fillOpacity=".85" transform="rotate(4 238 149)" />
        <text x="125" y="116" fill="currentColor" fontSize="30" fontFamily="Georgia, serif">Area of a circle</text>
        <text x="151" y="186" fill="currentColor" fontSize="51" fontFamily="Georgia, serif">A = πr²</text>
        <path d="M137 211h193" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeOpacity=".2" />
      </> : <>
        <rect x="131" y="43" width="215" height="222" rx="19" fill="currentColor" fillOpacity=".12" transform="rotate(8 238 154)" />
        <rect x="113" y="31" width="215" height="222" rx="19" fill="white" fillOpacity=".92" transform="rotate(-5 220 142)" />
        <rect x="140" y="63" width="116" height="12" rx="6" fill="currentColor" fillOpacity=".65" />
        {[106,151,196].map((y,i)=><g key={y}><rect x="143" y={y} width="23" height="23" rx="7" fill="currentColor" fillOpacity={i===2 ? '.13' : '.9'} />{i<2&&<path d={`m149 ${y+11} 4 4 8-8`} stroke="white" strokeWidth="2.5" strokeLinecap="round" />}<path d={`M181 ${y+7}h96M181 ${y+19}h65`} stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeOpacity=".2" /></g>)}
        <g transform="rotate(27 355 163)"><rect x="344" y="77" width="22" height="147" rx="7" fill="currentColor" /><path d="m344 223 11 27 11-27" fill="#e9b987" /><path d="m351 241 4 9 4-9" fill="currentColor" /></g>
        {kind==='exam'&&<><circle cx="99" cy="212" r="34" fill="currentColor" /><path d="M99 192v21l13 8" stroke="white" strokeWidth="3" strokeLinecap="round" /></>}
      </>}
    </svg>
  </div>
}
