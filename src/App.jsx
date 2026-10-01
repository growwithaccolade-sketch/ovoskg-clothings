import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Instagram,
  Menu, MessageCircle, Ruler, Search, ShoppingBag, Sparkles, UserRound,
  X, MapPin, Play, ShieldCheck, Clock3, Scissors, Heart, Layers3, PackageCheck
} from 'lucide-react'
import { categories, journey, pieces, statusSteps } from './data'

const phone = '2347070489393'
const wa = (message='Hello OVOSKG, I would like to make an enquiry.') =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

const fade = {
  hidden:{ opacity:0, y:28 },
  show:{ opacity:1, y:0, transition:{ duration:.72, ease:[.22,1,.36,1] } }
}

function ScrollToTop(){
  const { pathname } = useLocation()
  useEffect(()=>window.scrollTo({top:0,behavior:'instant'}),[pathname])
  return null
}

function Logo({light=false}) {
  return (
    <Link to="/" aria-label="OVOSKG home" className="inline-flex items-center">
      <img src="/ovoskg-logo.webp" alt="OVOSKG Clothings" className={`h-12 w-auto object-contain ${light?'brightness-0 invert':''}`} />
    </Link>
  )
}

function Announcement(){
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-6 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[.16em] sm:px-7">
        <span>Bespoke suits · luxury kaftans · custom made</span>
        <span className="hidden md:inline">BN 3795532 · +234 707 048 9393</span>
      </div>
    </div>
  )
}

function Header(){
  const [open,setOpen]=useState(false)
  const [briefOpen,setBriefOpen]=useState(false)
  const [count,setCount]=useState(0)
  useEffect(()=>{
    const read=()=>setCount(JSON.parse(localStorage.getItem('ovoskg_shortlist')||'[]').length)
    read()
    window.addEventListener('ovoskg-shortlist',read)
    return()=>window.removeEventListener('ovoskg-shortlist',read)
  },[])
  const nav=[
    ['Shop','/shop'],['Bespoke','/bespoke'],['Measurements','/measurements'],
    ['Track order','/track'],['Story','/about'],['Company','/company']
  ]
  return (
    <>
      <Announcement/>
      <header className="glass sticky top-0 z-50 border-b border-black/10">
        <div className="mx-auto flex h-[76px] max-w-[1480px] items-center justify-between px-4 sm:px-7">
          <Logo/>
          <nav className="hidden items-center gap-7 xl:flex">
            {nav.map(([label,path])=><NavLink key={path} to={path} className={({isActive})=>`line-link text-[12px] font-semibold uppercase tracking-[.11em] ${isActive?'text-bronze':'text-ink/75'}`}>{label}</NavLink>)}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={()=>setBriefOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-full border border-black/10 hover:border-black/30" aria-label="Open shortlist">
              <ShoppingBag size={17}/>{count>0&&<span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-bronze px-1 text-[10px] font-bold text-white">{count}</span>}
            </button>
            <Link to="/track" className="hidden rounded-full bg-ink px-5 py-3 text-[11px] font-bold uppercase tracking-[.1em] text-white sm:inline-flex">Track order</Link>
            <button onClick={()=>setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full border border-black/10 xl:hidden" aria-label="Menu">{open?<X size={19}/>:<Menu size={20}/>}</button>
          </div>
        </div>
        <AnimatePresence>
          {open&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden border-t border-black/10 xl:hidden">
            <div className="grid gap-1 px-5 py-5">
              {nav.map(([label,path])=><Link onClick={()=>setOpen(false)} key={path} to={path} className="border-b border-black/10 py-4 font-display text-3xl">{label}</Link>)}
            </div>
          </motion.div>}
        </AnimatePresence>
      </header>
      <ShortlistDrawer open={briefOpen} onClose={()=>setBriefOpen(false)} />
    </>
  )
}

function ShortlistDrawer({open,onClose}){
  const navigate=useNavigate()
  const [items,setItems]=useState([])
  useEffect(()=>{if(open)setItems(JSON.parse(localStorage.getItem('ovoskg_shortlist')||'[]'))},[open])
  const remove=id=>{
    const next=items.filter(x=>x.id!==id)
    localStorage.setItem('ovoskg_shortlist',JSON.stringify(next))
    setItems(next);window.dispatchEvent(new Event('ovoskg-shortlist'))
  }
  return <AnimatePresence>
    {open&&<>
      <motion.button aria-label="Close shortlist" onClick={onClose} className="fixed inset-0 z-[80] bg-black/55" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/>
      <motion.aside className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col bg-bone shadow-2xl" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',stiffness:260,damping:30}}>
        <div className="flex items-center justify-between border-b border-black/10 p-6"><div><div className="text-[10px] font-bold uppercase tracking-[.18em] text-bronze">Your selections</div><h3 className="font-display text-4xl">Style shortlist</h3></div><button onClick={onClose}><X/></button></div>
        <div className="flex-1 space-y-3 overflow-auto p-6">
          {!items.length&&<div className="grid h-full place-items-center text-center"><div><Heart className="mx-auto mb-4 text-bronze"/><p className="font-display text-3xl">No pieces shortlisted yet.</p><p className="mt-2 text-sm text-black/55">Save styles from the shop, then use them as references for your bespoke brief.</p></div></div>}
          {items.map(item=><div key={item.id} className="flex gap-4 border border-black/10 bg-white p-3"><img src={item.image} alt="" className="h-24 w-20 object-cover"/><div className="flex-1"><div className="text-[10px] uppercase tracking-widest text-bronze">{item.category}</div><div className="mt-1 font-display text-2xl leading-none">{item.name}</div><button className="mt-3 text-xs underline" onClick={()=>remove(item.id)}>Remove</button></div></div>)}
        </div>
        <div className="border-t border-black/10 p-6"><button disabled={!items.length} onClick={()=>{onClose();navigate('/bespoke')}} className="w-full rounded-full bg-ink px-5 py-4 text-xs font-bold uppercase tracking-[.12em] text-white disabled:opacity-30">Build bespoke brief</button></div>
      </motion.aside>
    </>}
  </AnimatePresence>
}

function SectionLabel({children,light=false}){return <div className={`text-[10px] font-bold uppercase tracking-[.2em] ${light?'text-white/55':'text-bronze'}`}>{children}</div>}

function Button({to,children,light=false,className=''}) {
  return <Link to={to} className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[11px] font-bold uppercase tracking-[.12em] transition hover:-translate-y-0.5 ${light?'bg-white text-ink':'bg-ink text-white'} ${className}`}>{children}<ArrowRight size={14} className="transition group-hover:translate-x-1"/></Link>
}

function Home(){
  const {scrollY}=useScroll()
  const y=useTransform(scrollY,[0,900],[0,90])
  return <>
    <section className="relative min-h-[860px] overflow-hidden bg-ink text-white">
      <motion.img style={{y,scale:1.06}} src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2200&q=92" alt="Tailored suit editorial" className="absolute inset-0 h-full w-full object-cover opacity-55"/>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,4,4,.96)_0%,rgba(4,4,4,.62)_45%,rgba(4,4,4,.18)_100%)]"/>
      <div className="noise absolute inset-0 opacity-20"/>
      <div className="relative mx-auto flex min-h-[860px] max-w-[1480px] items-end px-4 pb-16 pt-24 sm:px-7 lg:pb-24">
        <motion.div initial="hidden" animate="show" variants={fade} className="max-w-5xl">
          <SectionLabel light>OVOSKG Clothings · Bespoke house</SectionLabel>
          <h1 className="display-tight mt-5 max-w-5xl font-display text-[clamp(4.4rem,10.5vw,10.7rem)] font-medium leading-[.72]">Presence,<br/><span className="italic text-[#c8a16f]">tailored.</span></h1>
          <div className="mt-10 grid max-w-3xl gap-7 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-xl text-base leading-7 text-white/70 sm:text-lg">Custom suits for men and women, luxury men’s kaftans and considered clothing built around the person wearing it.</p>
            <div className="flex flex-wrap gap-3"><Button to="/bespoke" light>Start a commission</Button><Link to="/shop" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[.12em]">Explore work <ArrowUpRight size={14}/></Link></div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 right-0 hidden w-[340px] border-l border-t border-white/15 bg-black/30 p-7 backdrop-blur lg:block"><div className="flex items-center gap-3"><ShieldCheck className="text-[#c8a16f]" size={22}/><div><b className="text-sm">Built around the full experience</b><p className="mt-1 text-xs leading-5 text-white/50">Measurements, fitting, production updates, payment and order tracking.</p></div></div></div>
    </section>

    <section className="border-b border-black/10 bg-bone py-5">
      <div className="scrollbar-hide flex overflow-hidden">
        <motion.div animate={{x:['0%','-50%']}} transition={{duration:28,repeat:Infinity,ease:'linear'}} className="flex shrink-0 whitespace-nowrap">
          {Array(2).fill(['MEN’S BESPOKE','WOMEN’S BESPOKE','LUXURY KAFTAN','CUSTOM MADE','VIRTUAL MEASUREMENTS','TRACK YOUR ORDER']).flat().map((x,i)=><span key={i} className="flex items-center gap-7 px-7 text-[11px] font-bold tracking-[.14em]"><Sparkles size={12} className="text-bronze"/>{x}</span>)}
        </motion.div>
      </div>
    </section>

    <section className="mx-auto max-w-[1480px] px-4 py-24 sm:px-7 lg:py-36">
      <motion.div initial="hidden" whileInView="show" viewport={{once:true,amount:.2}} variants={fade} className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div><SectionLabel>The house</SectionLabel><h2 className="display-tight mt-3 font-display text-6xl leading-[.9] sm:text-8xl">Not off the rack.<br/><span className="italic">Built around you.</span></h2></div>
        <div className="lg:pl-20"><p className="max-w-xl text-base leading-7 text-black/60">OVOSKG is designed as a service business first. The digital experience should make it easier to choose a direction, submit measurements, book a fitting, approve your order and see exactly where production stands.</p><div className="mt-7 flex gap-6 text-[11px] font-bold uppercase tracking-[.12em]"><span>BN 3795532</span><span>Ife, Nigeria</span></div></div>
      </motion.div>
      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {categories.map((c,i)=><motion.article key={c.id} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}} className="group relative min-h-[620px] overflow-hidden bg-ink">
          <img src={c.image} alt={c.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"/>
          <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9"><SectionLabel light>{c.eyebrow}</SectionLabel><h3 className="mt-3 font-display text-5xl leading-none">{c.title}</h3><p className="mt-4 max-w-sm text-sm leading-6 text-white/65">{c.description}</p><Link to="/bespoke" className="mt-7 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.12em]">Commission yours <ArrowUpRight size={14}/></Link></div>
        </motion.article>)}
      </div>
    </section>

    <section className="bg-ink py-24 text-white lg:py-36">
      <div className="mx-auto grid max-w-[1480px] gap-14 px-4 sm:px-7 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div className="relative min-h-[620px] overflow-hidden"><img src="https://images.unsplash.com/photo-1555069519-127aadedf1ee?auto=format&fit=crop&w=1600&q=90" alt="Tailoring process" className="absolute inset-0 h-full w-full object-cover opacity-85"/><div className="absolute left-5 top-5 bg-bone px-4 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-ink">Craft in progress</div></div>
        <div className="lg:pl-10"><SectionLabel light>The bespoke system</SectionLabel><h2 className="display-tight mt-4 font-display text-6xl leading-[.9] sm:text-8xl">From first idea<br/>to final fit.</h2><p className="mt-8 max-w-xl text-base leading-7 text-white/60">Start remotely or in the boutique. Save measurements, upload references, choose a fitting method and keep the order history tied to your customer profile.</p>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {[
              ['01','Define the piece','Suit, kaftan, occasion or custom commission.'],
              ['02','Confirm fit','Virtual measurement profile or physical fitting.'],
              ['03','Approve details','Fabric direction, finishing, timeline and quote.'],
              ['04','Follow production','Track each stage until collection or delivery.']
            ].map(x=><div key={x[0]} className="grid grid-cols-[50px_1fr] gap-5 py-5"><span className="font-display text-2xl text-[#c8a16f]">{x[0]}</span><div><b className="text-sm">{x[1]}</b><p className="mt-1 text-xs leading-5 text-white/45">{x[2]}</p></div></div>)}
          </div>
          <Button to="/bespoke" light className="mt-8">Build your brief</Button>
        </div>
      </div>
    </section>

    <FounderStoryPreview/>
    <LookbookPreview/>

    <section className="bg-bronze py-24 text-white">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-7">
        <SectionLabel light>Ready when you are</SectionLabel>
        <h2 className="display-tight mt-5 max-w-5xl font-display text-6xl leading-[.86] sm:text-8xl lg:text-9xl">A better custom clothing experience starts before the first stitch.</h2>
        <div className="mt-10 flex flex-wrap gap-3"><Button to="/bespoke" light>Start your commission</Button><a href={wa()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[.12em]">WhatsApp <MessageCircle size={14}/></a></div>
      </div>
    </section>
  </>
}

function FounderStoryPreview(){
  return <section className="luxury-grid bg-oat py-24 lg:py-32"><div className="mx-auto grid max-w-[1480px] gap-12 px-4 sm:px-7 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
    <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={fade}><SectionLabel>Founder story</SectionLabel><h2 className="display-tight mt-4 font-display text-6xl leading-[.9] sm:text-8xl">“I did not build a fashion brand. I built a system that delivers quality.”</h2><p className="mt-8 max-w-xl text-sm leading-7 text-black/60">Founder and Creative Director Okunola Victor Ogunmola describes a path from helping with clothing adjustments in 2017 to formally establishing OVOSKG Clothing in January 2023 and delivering hundreds of custom pieces.</p><Link to="/about" className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.12em]">Read the journey <ArrowRight size={14}/></Link></motion.div>
    <div className="grid gap-4 sm:grid-cols-2"><div className="relative min-h-[560px] overflow-hidden"><img src="https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1400&q=88" alt="Fashion entrepreneur portrait editorial" className="absolute inset-0 h-full w-full object-cover"/></div><div className="flex flex-col gap-4"><div className="relative min-h-[270px] overflow-hidden"><img src="https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1200&q=88" alt="Tailoring detail" className="absolute inset-0 h-full w-full object-cover"/></div><div className="flex min-h-[270px] flex-col justify-between bg-ink p-7 text-white"><div className="text-[10px] uppercase tracking-[.17em] text-white/45">Verified public milestone</div><div><div className="font-display text-7xl text-[#c8a16f]">800+</div><p className="mt-2 text-sm leading-6 text-white/55">custom pieces reported by the founder across the first three years after formal establishment.</p></div></div></div></div>
  </div></section>
}

function LookbookPreview(){
  const imgs=[
    'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1200&q=88',
    'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=88',
    'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=1200&q=88',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=88'
  ]
  return <section className="bg-bone py-24 lg:py-32"><div className="mx-auto max-w-[1480px] px-4 sm:px-7"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><SectionLabel>Lookbook direction</SectionLabel><h2 className="display-tight mt-3 font-display text-6xl sm:text-8xl">The work should lead.</h2></div><a href="https://www.instagram.com/ovoskg_clothings/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.12em]">View @ovoskg_clothings <Instagram size={14}/></a></div>
    <p className="mt-5 max-w-xl text-xs leading-5 text-black/45">Current editorial photography is used only as visual scaffolding. The layout is ready for OVOSKG’s own Instagram, Facebook and campaign images as soon as the media files or direct post assets are available.</p>
    <div className="mt-12 grid auto-rows-[280px] grid-cols-2 gap-3 lg:grid-cols-4 lg:auto-rows-[420px]">{imgs.map((img,i)=><motion.figure initial={{opacity:0,scale:.98}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*.05}} key={img} className={`overflow-hidden ${i===0?'col-span-2 row-span-2 lg:col-span-2':''}`}><img src={img} alt="Editorial tailoring reference" className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"/></motion.figure>)}</div></div></section>
}

function Shop(){
  const [filter,setFilter]=useState('All')
  const [query,setQuery]=useState('')
  const filters=['All','Suits','Women','Kaftan','Occasion']
  const visible=useMemo(()=>pieces.filter(p=>(filter==='All'||p.category===filter)&&p.name.toLowerCase().includes(query.toLowerCase())),[filter,query])
  return <PageShell eyebrow="OVOSKG shop" title="Browse the direction. Build the final piece." intro="The catalogue is designed for discovery without inventing prices. Bespoke pricing is confirmed after the design brief, measurements and finishing choices are clear.">
    <div className="mb-10 flex flex-col gap-4 border-y border-black/10 py-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="scrollbar-hide flex gap-2 overflow-x-auto">{filters.map(f=><button key={f} onClick={()=>setFilter(f)} className={`whitespace-nowrap rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[.12em] ${filter===f?'bg-ink text-white':'border border-black/10'}`}>{f}</button>)}</div>
      <label className="flex items-center gap-2 border-b border-black/20 pb-2 text-sm"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search styles" className="w-full bg-transparent outline-none lg:w-56"/></label>
    </div>
    <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{visible.map((p,i)=><ProductCard key={p.id} piece={p} index={i}/>)}</div>
  </PageShell>
}

function ProductCard({piece,index}){
  const [saved,setSaved]=useState(()=>JSON.parse(localStorage.getItem('ovoskg_shortlist')||'[]').some(x=>x.id===piece.id))
  const toggle=()=>{
    let list=JSON.parse(localStorage.getItem('ovoskg_shortlist')||'[]')
    list=saved?list.filter(x=>x.id!==piece.id):[...list,piece]
    localStorage.setItem('ovoskg_shortlist',JSON.stringify(list));setSaved(!saved);window.dispatchEvent(new Event('ovoskg-shortlist'))
  }
  return <motion.article initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:index*.05}} className="group">
    <div className="relative aspect-[4/5] overflow-hidden bg-oat"><img src={piece.image} alt={piece.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"/><button onClick={toggle} className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full backdrop-blur ${saved?'bg-ink text-white':'bg-white/80 text-ink'}`} aria-label="Save style"><Heart size={17} fill={saved?'currentColor':'none'}/></button><div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-2 text-[9px] font-bold uppercase tracking-[.12em]">Made to order</div></div>
    <div className="flex items-start justify-between gap-4 pt-4"><div><div className="text-[9px] font-bold uppercase tracking-[.16em] text-bronze">{piece.category}</div><h3 className="mt-1 font-display text-3xl leading-none">{piece.name}</h3><p className="mt-2 text-xs text-black/50">{piece.type}</p></div><Link to="/bespoke" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/15 transition hover:bg-ink hover:text-white"><ArrowUpRight size={16}/></Link></div>
  </motion.article>
}

function Bespoke(){
  const [step,setStep]=useState(0)
  const [form,setForm]=useState({piece:'Men’s bespoke suit',occasion:'',colour:'',fabric:'',measure:'Virtual measurements',deadline:'',notes:''})
  const update=(k,v)=>setForm({...form,[k]:v})
  const steps=['Piece','Direction','Fit','Review']
  return <PageShell eyebrow="Bespoke studio" title="Build the brief before the first stitch." intro="A guided commission flow keeps the design conversation focused. Nothing is charged here until OVOSKG confirms scope, fit requirements, fabric and delivery timing.">
    <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
      <aside><div className="sticky top-32 space-y-3">{steps.map((s,i)=><button key={s} onClick={()=>setStep(i)} className={`flex w-full items-center justify-between border-b py-4 text-left ${i===step?'border-ink':'border-black/10'}`}><span className="font-display text-2xl">{String(i+1).padStart(2,'0')} · {s}</span>{i<step&&<Check size={16} className="text-bronze"/>}</button>)}</div></aside>
      <div className="min-h-[560px] bg-white p-6 shadow-luxury sm:p-10">
        {step===0&&<WizardStep title="What are we making?"><Choice options={['Men’s bespoke suit','Women’s bespoke suit','Luxury men’s kaftan','Other custom commission']} value={form.piece} onChange={v=>update('piece',v)}/></WizardStep>}
        {step===1&&<WizardStep title="Set the direction"><div className="grid gap-4 sm:grid-cols-2"><Field label="Occasion"><input value={form.occasion} onChange={e=>update('occasion',e.target.value)} placeholder="Wedding, work, event..." /></Field><Field label="Colour direction"><input value={form.colour} onChange={e=>update('colour',e.target.value)} placeholder="Navy, black, cream..." /></Field><Field label="Fabric direction"><input value={form.fabric} onChange={e=>update('fabric',e.target.value)} placeholder="Wool, textured, lightweight..." /></Field><Field label="Target date"><input value={form.deadline} onChange={e=>update('deadline',e.target.value)} type="date"/></Field></div></WizardStep>}
        {step===2&&<WizardStep title="How should we confirm fit?"><Choice options={['Virtual measurements','Use saved measurement profile','Book a physical fitting']} value={form.measure} onChange={v=>update('measure',v)}/><div className="mt-7"><Field label="Anything else about fit or finishing?"><textarea rows="5" value={form.notes} onChange={e=>update('notes',e.target.value)} placeholder="Fit preference, lapel direction, initials, reference notes..." /></Field></div></WizardStep>}
        {step===3&&<WizardStep title="Your commission brief"><div className="divide-y divide-black/10 border-y border-black/10">{Object.entries(form).map(([k,v])=><div key={k} className="grid grid-cols-[120px_1fr] gap-4 py-4 text-sm"><span className="capitalize text-black/45">{k}</span><b>{v||'Not specified'}</b></div>)}</div><a href={wa(`Hello OVOSKG, I want to start a bespoke order. Piece: ${form.piece}. Occasion: ${form.occasion||'not specified'}. Colour: ${form.colour||'not specified'}. Fabric: ${form.fabric||'not specified'}. Fit: ${form.measure}. Deadline: ${form.deadline||'not specified'}. Notes: ${form.notes||'none'}.`)} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-[11px] font-bold uppercase tracking-[.12em] text-white">Send brief to OVOSKG <MessageCircle size={15}/></a><p className="mt-4 text-xs leading-5 text-black/45">Paypoint checkout should be connected only after OVOSKG provides its merchant credentials and payment configuration. No payment details are hardcoded into the frontend.</p></WizardStep>}
        <div className="mt-10 flex justify-between"><button disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest disabled:opacity-20"><ArrowLeft size={14}/> Back</button>{step<3&&<button onClick={()=>setStep(s=>Math.min(3,s+1))} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-bold uppercase tracking-widest text-white">Continue <ArrowRight size={14}/></button>}</div>
      </div>
    </div>
  </PageShell>
}

function WizardStep({title,children}){return <motion.div key={title} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}><SectionLabel>Commission builder</SectionLabel><h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">{title}</h2><div className="mt-8">{children}</div></motion.div>}
function Choice({options,value,onChange}){return <div className="grid gap-3 sm:grid-cols-2">{options.map(o=><button onClick={()=>onChange(o)} key={o} className={`flex min-h-28 items-end justify-between border p-5 text-left transition ${value===o?'border-ink bg-ink text-white':'border-black/15 hover:border-black/40'}`}><span className="font-display text-2xl leading-none">{o}</span>{value===o&&<Check size={18}/>}</button>)}</div>}
function Field({label,children}){return <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-black/50">{label}<div className="text-sm font-normal normal-case tracking-normal [&_input]:w-full [&_input]:border-b [&_input]:border-black/20 [&_input]:bg-transparent [&_input]:py-3 [&_input]:outline-none [&_textarea]:w-full [&_textarea]:border [&_textarea]:border-black/15 [&_textarea]:bg-transparent [&_textarea]:p-4 [&_textarea]:outline-none">{children}</div></label>}

function Measurements(){
  const fields=['Neck','Chest / bust','Shoulder','Sleeve','Waist','Hip / seat','Thigh','Trouser length','Inseam','Height']
  const [values,setValues]=useState(()=>JSON.parse(localStorage.getItem('ovoskg_measurements')||'{}'))
  const [saved,setSaved]=useState(false)
  const save=()=>{localStorage.setItem('ovoskg_measurements',JSON.stringify(values));setSaved(true);setTimeout(()=>setSaved(false),2400)}
  return <PageShell eyebrow="Virtual fitting room" title="Measure carefully. Save once. Reuse later." intro="Virtual measurements are useful when a boutique visit is not practical. The final production version should securely attach this profile to the customer account instead of leaving it in the browser.">
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="relative min-h-[620px] overflow-hidden bg-ink text-white"><img src="https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1500&q=90" alt="Measurement instruction visual" className="absolute inset-0 h-full w-full object-cover opacity-45"/><div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10"/><div className="absolute inset-x-0 bottom-0 p-8"><button className="grid h-16 w-16 place-items-center rounded-full border border-white/40 backdrop-blur"><Play fill="white" size={20}/></button><h2 className="mt-6 max-w-xl font-display text-5xl leading-none">Founder measurement video slot</h2><p className="mt-4 max-w-md text-sm leading-6 text-white/60">Add Victor’s own instructional video here so every customer follows the same measuring method.</p></div></div>
      <div className="bg-white p-6 sm:p-9"><div className="flex items-center gap-3 border-b border-black/10 pb-5"><Ruler className="text-bronze"/><div><b>Measurement profile</b><p className="text-xs text-black/45">Use inches unless the final admin changes the unit.</p></div></div><div className="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-2">{fields.map(f=><Field key={f} label={f}><input inputMode="decimal" value={values[f]||''} onChange={e=>setValues({...values,[f]:e.target.value})} placeholder="0.0"/></Field>)}</div><button onClick={save} className="mt-8 w-full rounded-full bg-ink px-5 py-4 text-[11px] font-bold uppercase tracking-[.12em] text-white">{saved?'Saved on this device':'Save measurement profile'}</button><div className="mt-5 flex items-start gap-3 bg-oat p-4 text-xs leading-5 text-black/55"><ShieldCheck className="mt-0.5 shrink-0 text-bronze" size={18}/><span>For launch, move measurements to an authenticated database with encryption, access controls and audit logging because body measurements are personal customer data.</span></div></div>
    </div>
  </PageShell>
}

function Track(){
  const [id,setId]=useState('')
  const [result,setResult]=useState(null)
  const run=()=>setResult(id.trim().toUpperCase()==='OVS-DEMO-001'?4:-1)
  return <PageShell eyebrow="Customer portal" title="Track the work, not just the delivery." intro="Bespoke customers should be able to see production progress without repeatedly messaging the workshop.">
    <div className="mx-auto max-w-4xl bg-white p-6 shadow-luxury sm:p-10">
      <div className="flex flex-col gap-3 sm:flex-row"><input value={id} onChange={e=>setId(e.target.value)} onKeyDown={e=>e.key==='Enter'&&run()} placeholder="Enter order ID, e.g. OVS-DEMO-001" className="min-h-14 flex-1 border border-black/15 px-5 outline-none focus:border-ink"/><button onClick={run} className="rounded-full bg-ink px-8 py-4 text-[11px] font-bold uppercase tracking-[.12em] text-white">Track order</button></div>
      <p className="mt-3 text-xs text-black/40">Use OVS-DEMO-001 to preview the interface.</p>
      <AnimatePresence mode="wait">{result!==null&&<motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="mt-10">
        {result===-1?<div className="border border-black/10 bg-oat p-6"><b>Order not found in the prototype.</b><p className="mt-2 text-sm text-black/55">Production will query the secure OVOSKG order database.</p></div>:<>
          <div className="flex flex-col justify-between gap-3 border-b border-black/10 pb-6 sm:flex-row"><div><SectionLabel>OVS-DEMO-001</SectionLabel><h2 className="mt-2 font-display text-5xl">Finishing & quality control</h2></div><div className="inline-flex items-center gap-2 text-sm text-bronze"><Clock3 size={16}/> Updated today</div></div>
          <div className="mt-8 grid gap-3">{statusSteps.map((s,i)=><div key={s} className="grid grid-cols-[34px_1fr_auto] items-center gap-4"><div className={`grid h-8 w-8 place-items-center rounded-full border ${i<=result?'border-bronze bg-bronze text-white':'border-black/15 text-black/30'}`}>{i<result?<Check size={15}/>:i+1}</div><div className={`border-b py-4 text-sm ${i<=result?'border-black/15 font-semibold':'border-black/10 text-black/35'}`}>{s}</div><span className="text-[9px] font-bold uppercase tracking-[.12em] text-black/35">{i<result?'Complete':i===result?'Current':''}</span></div>)}</div>
        </>}
      </motion.div>}</AnimatePresence>
    </div>
  </PageShell>
}

function About(){
  return <PageShell eyebrow="The journey" title="Quality did not start with a logo." intro="The founder’s public account of OVOSKG is unusually useful because it explains the operating idea behind the company: structure, finishing, consistency and respect for delivery.">
    <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
      <div className="relative min-h-[640px] overflow-hidden"><img src="https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1600&q=90" alt="Creative director editorial portrait reference" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-7 pt-24 text-white"><SectionLabel light>Founder & Creative Director</SectionLabel><div className="mt-2 font-display text-4xl">Okunola Victor Ogunmola</div><p className="mt-2 text-xs text-white/55">Portrait shown is editorial scaffolding. Replace with the founder’s approved OVOSKG/LinkedIn/Instagram image before launch.</p></div></div>
      <div>{journey.map((j,i)=><motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} key={j.year} className="grid grid-cols-[90px_1fr] gap-5 border-t border-black/10 py-8 sm:grid-cols-[150px_1fr]"><div className="font-display text-2xl text-bronze">{j.year}</div><div><h3 className="font-display text-4xl">{j.title}</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-black/55">{j.text}</p></div></motion.div>)}
        <a href="https://ng.linkedin.com/in/okunola-ogunmola" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[.12em]">Founder public profile <ArrowUpRight size={14}/></a>
      </div>
    </div>
  </PageShell>
}

function Company(){
  const departments=[
    ['Creative Direction','Founder-led design standards, product direction and client experience.'],
    ['Production','Pattern, cutting, construction, finishing and quality control.'],
    ['Customer Experience','Consultations, fittings, order updates, delivery and aftercare.']
  ]
  return <PageShell eyebrow="Company" title="A fashion company needs an operating system." intro="This section intentionally explains the company, not a vague brand personality. Leadership cards are structured so personnel can change without redesigning the page.">
    <div className="grid gap-4 lg:grid-cols-3">{departments.map(([title,text],i)=><motion.article initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} key={title} className="min-h-72 border border-black/10 bg-white p-7"><div className="font-display text-5xl text-bronze">{String(i+1).padStart(2,'0')}</div><h3 className="mt-12 font-display text-4xl">{title}</h3><p className="mt-4 text-sm leading-6 text-black/55">{text}</p></motion.article>)}</div>
    <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{['Founder / Creative Director','Head of Production','Customer Experience Lead'].map((role,i)=><article key={role} className="overflow-hidden bg-ink text-white"><div className="grid aspect-[4/3] place-items-center bg-[linear-gradient(135deg,#2a2723,#111)]"><UserRound size={54} strokeWidth={1} className="text-white/20"/></div><div className="p-6"><div className="font-display text-3xl">{role}</div><p className="mt-2 text-xs leading-5 text-white/45">Name, photo, role description and status should be editable from CMS/admin so staff changes do not require code changes.</p></div></article>)}</div>
    <div className="mt-20 bg-ink p-8 text-white sm:p-12"><div className="grid gap-10 lg:grid-cols-2"><div><SectionLabel light>Company strategy</SectionLabel><h2 className="display-tight mt-3 font-display text-6xl">Structure should be visible to the customer.</h2></div><div className="grid gap-3 sm:grid-cols-2">{[
      [PackageCheck,'Reliable delivery','Clear timelines, status updates and handoff.'],
      [Scissors,'Craft standards','Repeatable production and finishing checks.'],
      [Layers3,'Physical + digital','Boutique fitting with remote customer tools.'],
      [Heart,'Retention','Saved measurements and order history improve repeat orders.']
    ].map(([Icon,title,text])=><div key={title} className="border border-white/10 p-5"><Icon className="text-[#c8a16f]" size={20}/><b className="mt-6 block text-sm">{title}</b><p className="mt-2 text-xs leading-5 text-white/45">{text}</p></div>)}</div></div></div>
  </PageShell>
}

function PageShell({eyebrow,title,intro,children}){
  return <main><section className="bg-ink py-20 text-white sm:py-28"><div className="mx-auto max-w-[1480px] px-4 sm:px-7"><SectionLabel light>{eyebrow}</SectionLabel><h1 className="display-tight mt-5 max-w-6xl font-display text-6xl leading-[.84] sm:text-8xl lg:text-9xl">{title}</h1><p className="mt-8 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">{intro}</p></div></section><section className="mx-auto max-w-[1480px] px-4 py-20 sm:px-7 sm:py-28">{children}</section></main>
}

function Footer(){
  return <footer className="bg-[#050505] text-white"><div className="mx-auto max-w-[1480px] px-4 py-16 sm:px-7"><div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)]"><div><Logo light/><p className="mt-6 max-w-sm text-sm leading-7 text-white/45">Bespoke suits for men and women, luxury men’s kaftans and custom made clothing. Built around fit, finishing and a reliable client experience.</p><div className="mt-6 text-xs leading-6 text-white/45">BN 3795532<br/>+234 707 048 9393</div></div>{[
    ['Explore',[['Shop','/shop'],['Bespoke','/bespoke'],['Measurements','/measurements']]],
    ['Customer',[['Track order','/track'],['Company','/company'],['Our story','/about']]],
    ['Social',[['Instagram','https://www.instagram.com/ovoskg_clothings/'],['TikTok','https://www.tiktok.com/@ovoskg_clothings'],['WhatsApp',wa()]]]
  ].map(([h,links])=><div key={h}><div className="text-[10px] font-bold uppercase tracking-[.16em] text-white/35">{h}</div><div className="mt-4 grid gap-3">{links.map(([l,u])=>u.startsWith('http')?<a key={l} href={u} target="_blank" rel="noreferrer" className="text-sm text-white/70 hover:text-white">{l}</a>:<Link key={l} to={u} className="text-sm text-white/70 hover:text-white">{l}</Link>)}</div></div>)}</div><div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[.12em] text-white/30 sm:flex-row"><span>© 2026 OVOSKG Clothings</span><span>Privacy · Terms · Delivery · Returns</span></div></div></footer>
}

function FloatingActions(){
  return <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2"><a href={wa()} target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg" aria-label="WhatsApp"><MessageCircle size={19}/></a><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-lg" aria-label="Back to top"><ArrowRight size={17} className="-rotate-90"/></button></div>
}

export default function App(){
  return <div className="min-h-screen bg-bone text-ink"><ScrollToTop/><Header/><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/shop" element={<Shop/>}/>
    <Route path="/bespoke" element={<Bespoke/>}/>
    <Route path="/measurements" element={<Measurements/>}/>
    <Route path="/track" element={<Track/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/company" element={<Company/>}/>
    <Route path="*" element={<Home/>}/>
  </Routes><Footer/><FloatingActions/></div>
}
