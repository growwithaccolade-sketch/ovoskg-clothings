import {useEffect,useMemo,useState} from 'react'
import {AnimatePresence,motion,useScroll,useTransform} from 'framer-motion'
import {Link,NavLink,Route,Routes,useLocation,useNavigate,useParams} from 'react-router-dom'
import {
  ArrowLeft,ArrowRight,ArrowUpRight,CalendarDays,Check,ChevronDown,Clock3,
  Compass,Heart,Instagram,Layers3,Mail,MapPin,Menu,MessageCircle,Minus,
  PackageCheck,Phone,Play,Plus,Ruler,Search,ShieldCheck,ShoppingBag,
  SlidersHorizontal,Sparkles,Scissors,UserRound,X
} from 'lucide-react'
import {collections,faqs,journey,lookbook,navItems,pieces,statusSteps} from './data'

const PHONE='2347070489393'
const wa=(message='Hello OVOSKG, I would like to make an enquiry.')=>`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
const instagram='https://www.instagram.com/ovoskg_clothings/'
const tiktok='https://www.tiktok.com/@ovoskg_clothings'

const pageTitles={
  '/':'OVOSKG Clothings | Bespoke Suits and Luxury Kaftans',
  '/collections':'Collections | OVOSKG Clothings',
  '/shop':'Shop Direction | OVOSKG Clothings',
  '/lookbook':'Lookbook | OVOSKG Clothings',
  '/bespoke':'Bespoke Studio | OVOSKG Clothings',
  '/measurements':'Virtual Measurements | OVOSKG Clothings',
  '/track':'Track Order | OVOSKG Clothings',
  '/about':'Our Story | OVOSKG Clothings',
  '/company':'Company | OVOSKG Clothings',
  '/contact':'Contact | OVOSKG Clothings'
}

const reveal={
  hidden:{opacity:0,y:30},
  show:{opacity:1,y:0,transition:{duration:.72,ease:[.22,1,.36,1]}}
}

function AppMeta(){
  const {pathname}=useLocation()
  useEffect(()=>{
    if(pathname.startsWith('/collections/')){
      const id=pathname.split('/')[2]
      const collection=collections.find(item=>item.id===id)
      document.title=collection?`${collection.title} | OVOSKG Clothings`:pageTitles['/collections']
    }else{
      document.title=pageTitles[pathname]||pageTitles['/']
    }
    window.scrollTo({top:0,behavior:'instant'})
  },[pathname])
  return null
}

function ScrollProgress(){
  const {scrollYProgress}=useScroll()
  return <motion.div className="fixed left-0 top-0 z-[120] h-[2px] origin-left bg-bronze" style={{scaleX:scrollYProgress,width:'100%'}}/>
}

function Logo({light=false}){
  return <Link to="/" aria-label="OVOSKG homepage" className="inline-flex items-center"><img src="/ovoskg-logo.webp" alt="OVOSKG Clothings" className={`h-11 w-auto object-contain sm:h-12 ${light?'brightness-0 invert':''}`}/></Link>
}

function Announcement(){
  return <div className="bg-ink text-white"><div className="mx-auto flex max-w-[1540px] items-center justify-between gap-5 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[.18em] sm:px-7"><span>Bespoke suits · Luxury kaftans</span><span className="hidden sm:inline">Ife fittings · Remote orders · Track production</span></div></div>
}

function Header(){
  const [menu,setMenu]=useState(false)
  const [shortlist,setShortlist]=useState(false)
  const [count,setCount]=useState(0)
  useEffect(()=>{
    const read=()=>setCount(JSON.parse(localStorage.getItem('ovoskg_shortlist')||'[]').length)
    read()
    window.addEventListener('ovoskg-shortlist',read)
    return()=>window.removeEventListener('ovoskg-shortlist',read)
  },[])
  useEffect(()=>{
    document.body.classList.toggle('menu-open',menu)
    return()=>document.body.classList.remove('menu-open')
  },[menu])
  return <>
    <Announcement/>
    <header className="glass sticky top-0 z-50 border-b border-black/10">
      <div className="mx-auto flex h-[76px] max-w-[1540px] items-center gap-5 px-4 sm:px-7">
        <Logo/>
        <nav className="ml-auto hidden items-center gap-5 2xl:flex">
          {navItems.map(([label,path])=><NavLink key={path} to={path} className={({isActive})=>`line-link text-[10px] font-bold uppercase tracking-[.13em] ${isActive?'active text-bronze':'text-ink/68 hover:text-ink'}`}>{label}</NavLink>)}
        </nav>
        <div className="ml-auto flex items-center gap-2 2xl:ml-3">
          <button onClick={()=>setShortlist(true)} aria-label="Open style shortlist" className="focus-ring relative grid h-10 w-10 place-items-center rounded-full border border-black/12 transition hover:border-black/40"><ShoppingBag size={17}/>{count>0&&<span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-bronze px-1 text-[9px] font-bold text-white">{count}</span>}</button>
          <Link to="/bespoke" className="hidden rounded-full bg-ink px-5 py-3 text-[10px] font-bold uppercase tracking-[.13em] text-white md:inline-flex">Start bespoke</Link>
          <button onClick={()=>setMenu(true)} aria-label="Open navigation" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-black/12 2xl:hidden"><Menu size={19}/></button>
        </div>
      </div>
    </header>
    <AnimatePresence>{menu&&<MenuOverlay close={()=>setMenu(false)}/>}</AnimatePresence>
    <ShortlistDrawer open={shortlist} close={()=>setShortlist(false)}/>
  </>
}

function MenuOverlay({close}){
  return <>
    <motion.button aria-label="Close menu" onClick={close} className="fixed inset-0 z-[80] bg-black/65" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/>
    <motion.aside initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',stiffness:250,damping:30}} className="fixed right-0 top-0 z-[90] flex h-dvh w-full max-w-xl flex-col bg-bone">
      <div className="flex items-center justify-between border-b border-black/10 p-5 sm:p-7"><Logo/><button onClick={close} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full border border-black/15"><X size={19}/></button></div>
      <nav className="flex-1 overflow-auto px-5 py-4 sm:px-7">
        {navItems.map(([label,path],i)=><Link key={path} to={path} onClick={close} className="group flex items-center justify-between border-b border-black/10 py-4 sm:py-5"><span className="font-display text-4xl leading-none sm:text-5xl">{label}</span><span className="flex items-center gap-3"><span className="hidden text-[9px] font-bold uppercase tracking-[.16em] text-black/35 sm:inline">{String(i+1).padStart(2,'0')}</span><ArrowUpRight size={17} className="transition group-hover:translate-x-1 group-hover:-translate-y-1"/></span></Link>)}
        <Link to="/company" onClick={close} className="group flex items-center justify-between border-b border-black/10 py-4 sm:py-5"><span className="font-display text-4xl leading-none sm:text-5xl">Company</span><ArrowUpRight size={17}/></Link>
      </nav>
      <div className="grid grid-cols-2 gap-px bg-black/10 border-t border-black/10"><a href={wa()} target="_blank" rel="noreferrer" className="bg-bone p-5 text-xs font-bold uppercase tracking-[.12em]">WhatsApp</a><a href={instagram} target="_blank" rel="noreferrer" className="bg-bone p-5 text-xs font-bold uppercase tracking-[.12em]">Instagram</a></div>
    </motion.aside>
  </>
}

function ShortlistDrawer({open,close}){
  const navigate=useNavigate()
  const [items,setItems]=useState([])
  useEffect(()=>{if(open)setItems(JSON.parse(localStorage.getItem('ovoskg_shortlist')||'[]'))},[open])
  const remove=id=>{
    const next=items.filter(x=>x.id!==id)
    localStorage.setItem('ovoskg_shortlist',JSON.stringify(next))
    setItems(next)
    window.dispatchEvent(new Event('ovoskg-shortlist'))
  }
  return <AnimatePresence>{open&&<>
    <motion.button aria-label="Close shortlist" onClick={close} className="fixed inset-0 z-[80] bg-black/60" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/>
    <motion.aside initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',stiffness:260,damping:30}} className="fixed right-0 top-0 z-[90] flex h-dvh w-full max-w-md flex-col bg-bone">
      <div className="flex items-center justify-between border-b border-black/10 p-6"><div><Kicker>Your selections</Kicker><h3 className="mt-1 font-display text-4xl">Style shortlist</h3></div><button onClick={close}><X/></button></div>
      <div className="flex-1 space-y-3 overflow-auto p-6">
        {!items.length&&<div className="grid h-full place-items-center text-center"><div><Heart className="mx-auto text-bronze"/><h4 className="mt-4 font-display text-4xl">Save what feels right.</h4><p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-black/50">Shortlist styles from Shop, then bring them into your bespoke brief.</p></div></div>}
        {items.map(item=><div key={item.id} className="flex gap-4 border border-black/10 bg-white p-3"><img src={item.image} alt="" className="h-28 w-24 object-cover"/><div className="flex-1"><div className="text-[9px] font-bold uppercase tracking-[.16em] text-bronze">{item.category}</div><div className="mt-1 font-display text-2xl leading-none">{item.name}</div><button onClick={()=>remove(item.id)} className="mt-4 text-[10px] font-bold uppercase tracking-wider text-black/45 underline">Remove</button></div></div>)}
      </div>
      <div className="border-t border-black/10 p-6"><button disabled={!items.length} onClick={()=>{close();navigate('/bespoke')}} className="w-full rounded-full bg-ink px-6 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-white disabled:opacity-30">Use shortlist in bespoke brief</button></div>
    </motion.aside>
  </>}</AnimatePresence>
}

function MobileConversionBar(){
  return <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-[1.25fr_.75fr] gap-2 rounded-2xl border border-white/20 bg-ink/95 p-2 text-white shadow-2xl backdrop-blur md:hidden"><Link to="/bespoke" className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-ink">Start bespoke <ArrowRight size={13}/></Link><a href={wa()} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-3 text-[10px] font-bold uppercase tracking-[.12em]"><MessageCircle size={14}/> Chat</a></div>
}

function Kicker({children,light=false}){return <div className={`text-[9px] font-bold uppercase tracking-[.21em] ${light?'text-white/50':'text-bronze'}`}>{children}</div>}
function PrimaryLink({to,children,light=false,className=''}){return <Link to={to} className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.13em] transition duration-300 hover:-translate-y-0.5 ${light?'bg-white text-ink':'bg-ink text-white'} ${className}`}>{children}<ArrowRight size={14} className="transition group-hover:translate-x-1"/></Link>}
function TextLink({to,children,light=false}){return <Link to={to} className={`group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] ${light?'text-white':'text-ink'}`}>{children}<ArrowUpRight size={14} className="transition group-hover:translate-x-1 group-hover:-translate-y-1"/></Link>}

function RouteFrame({children}){
  const {pathname}=useLocation()
  return <AnimatePresence mode="wait"><motion.div key={pathname} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.24}}>{children}</motion.div></AnimatePresence>
}

function HomePage(){
  const {scrollY}=useScroll()
  const imageY=useTransform(scrollY,[0,850],[0,28])
  return <main>
    <section className="cloth-deep relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(154,113,70,.14),transparent_28%)]"/>
      <div className="noise absolute inset-0 opacity-[.045]"/>
      <div className="relative mx-auto grid min-h-[780px] max-w-[1540px] px-4 sm:px-7 lg:h-[calc(100svh-104px)] lg:min-h-[720px] lg:grid-cols-[.86fr_1.14fr]">
        <div className="relative z-10 flex flex-col justify-between py-10 sm:py-14 lg:pr-14 lg:py-16">
          <div className="flex items-center gap-5"><Kicker light>OVOSKG Clothings</Kicker><div className="h-px w-12 bg-white/18"/></div>
          <div className="py-10 sm:py-12 lg:py-4">
            <div className="mb-5 text-[9px] font-bold uppercase tracking-[.15em] text-[#cba474]">Bespoke for men and women</div>
            <h1 className="display-tight max-w-[780px] font-display text-[clamp(4.3rem,8.8vw,9.4rem)] font-medium leading-[.76]">Made for your body.<br/><span className="italic text-[#cba474]">Finished for the occasion.</span></h1>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/62 sm:text-base">Bespoke suits and luxury kaftans for weddings, work and important days. Choose a direction. We handle fit, fabric and finishing.</p>
            <div className="mt-7 flex flex-wrap gap-3"><PrimaryLink to="/bespoke" light>Start bespoke</PrimaryLink><Link to="/lookbook" className="inline-flex items-center gap-2 rounded-full border border-white/24 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.13em]">Explore looks <ArrowUpRight size={14}/></Link></div>
          </div>
          <div className="grid grid-cols-3 gap-px border-y border-white/10 bg-white/10">
            {[['Made','to measure'],['Remote','fit checked'],['Track','production']].map(([big,small])=><div key={big} className="bg-ink/92 px-3 py-4 sm:p-4"><div className="font-display text-2xl text-[#cba474] sm:text-3xl">{big}</div><div className="mt-1 text-[8px] font-bold uppercase tracking-[.14em] text-white/34">{small}</div></div>)}
          </div>
        </div>
        <div className="relative -mx-4 min-h-[50svh] overflow-hidden sm:-mx-7 lg:mx-0 lg:min-h-0">
          <motion.img style={{y:imageY,scale:1.025}} src="https://images.unsplash.com/photo-1776781205743-33b4c1106adc?auto=format&fit=crop&w=2400&q=94" alt="Black man in a tailored suit in a clean studio portrait" className="absolute inset-0 h-[106%] w-full object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-black/5"/>
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 bg-black/48 p-4 backdrop-blur-sm sm:left-7 sm:right-auto sm:max-w-[360px] sm:p-5">
            <div><Kicker light>Start with the look</Kicker><div className="mt-1 font-display text-2xl">We tailor the rest to you.</div></div>
            <Link to="/collections" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/25"><ArrowUpRight size={15}/></Link>
          </div>
        </div>
      </div>
    </section>
    <Marquee/>
    <RemoteFitAssurance/>
    <EntryPaths/>
    <HomeCollections/>
    <ProcessSection/>
    <HomeLookbook/>
    <FounderSection/>
    <ConversionBand/>
  </main>
}

function Marquee(){
  const labels=['MEN’S BESPOKE','WOMEN’S BESPOKE','LUXURY KAFTAN','CUSTOM MADE','VIRTUAL MEASUREMENTS','TRACK PRODUCTION','BOUTIQUE FITTING','CUSTOM FINISHING']
  return <section className="overflow-hidden border-b border-black/10 bg-bone py-5"><motion.div className="marquee-track flex w-max" animate={{x:['0%','-50%']}} transition={{duration:34,repeat:Infinity,ease:'linear'}}>{[...labels,...labels].map((x,i)=><span key={i} className="flex items-center gap-7 px-7 text-[9px] font-bold uppercase tracking-[.18em]"><Sparkles size={11} className="text-bronze"/>{x}</span>)}</motion.div></section>
}

function RemoteFitAssurance({dark=false}){
  const steps=[
    ['01','Send measurements','Use the guide or book an Ife fitting.'],
    ['02','We verify','Anything inconsistent is checked before cutting.'],
    ['03','Fit support','If fit is off, we compare it with the approved measurements and agree the correction.']
  ]
  return <section className={dark?'bg-ink text-white':'bg-bone text-ink'}><div className="mx-auto max-w-[1540px] px-4 py-12 sm:px-7 lg:py-16"><div className="grid gap-7 lg:grid-cols-[.34fr_.66fr]"><div><Kicker light={dark}>Ordering outside Ife?</Kicker><h2 className="mt-3 font-display text-4xl leading-none sm:text-5xl">Remote fitting, without guesswork.</h2><p className={`mt-4 max-w-md text-xs leading-6 ${dark?'text-white/45':'text-black/48'}`}>Alteration or remake terms are confirmed with your quote before payment.</p></div><div className={`grid gap-px ${dark?'bg-white/10':'bg-black/10'} sm:grid-cols-3`}>{steps.map(([n,title,text])=><div key={n} className={`p-5 sm:p-6 ${dark?'bg-ink':'bg-white'}`}><div className="font-display text-3xl text-bronze">{n}</div><b className="mt-5 block text-sm">{title}</b><p className={`mt-2 text-xs leading-5 ${dark?'text-white/42':'text-black/46'}`}>{text}</p></div>)}</div></div></div></section>
}

function EntryPaths(){
  const paths=[
    {n:'01',title:'Wedding or event?',text:'Start with the date and the look you want.',to:'/bespoke'},
    {n:'02',title:'Need a direction?',text:'Browse suits, women’s tailoring and kaftans.',to:'/collections'},
    {n:'03',title:'Already ordered?',text:'Check where your garment is in production.',to:'/track'}
  ]
  return <section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="grid gap-8 lg:grid-cols-[.64fr_1.36fr]"><div><Kicker>Choose your route</Kicker><h2 className="display-tight mt-4 font-display text-6xl leading-[.88] sm:text-8xl">Less browsing.<br/><span className="italic text-bronze">More certainty.</span></h2></div><div className="grid gap-3">{paths.map(p=><motion.div key={p.n} initial="hidden" whileInView="show" viewport={{once:true,amount:.3}} variants={reveal}><Link to={p.to} className="card-lift group grid min-h-36 grid-cols-[58px_1fr_auto] items-center gap-5 border border-black/10 bg-white p-5 sm:grid-cols-[80px_1fr_auto] sm:p-7"><div className="font-display text-4xl text-bronze">{p.n}</div><div><h3 className="font-display text-3xl leading-none sm:text-4xl">{p.title}</h3><p className="mt-3 max-w-xl text-xs leading-6 text-black/50 sm:text-sm">{p.text}</p></div><div className="hidden h-12 w-12 place-items-center rounded-full border border-black/12 transition group-hover:bg-ink group-hover:text-white sm:grid"><ArrowUpRight size={16}/></div></Link></motion.div>)}</div></div></section>
}

function HomeCollections(){
  return <section className="bg-oat py-24 lg:py-32"><div className="mx-auto max-w-[1540px] px-4 sm:px-7">
    <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><Kicker>Collections</Kicker><h2 className="display-tight mt-4 max-w-4xl font-display text-6xl leading-[.86] sm:text-8xl lg:text-9xl">Choose the direction.<br/>We tailor the rest.</h2></div><div className="max-w-md"><p className="text-sm leading-7 text-black/55">Compare silhouettes and finishing. Save what feels right. Bring it into your bespoke brief.</p><TextLink to="/collections">See all collections</TextLink></div></div>
    <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:grid-rows-[420px_420px]">{collections.map((c,i)=><Link key={c.id} to={`/collections/${c.id}`} className={`image-zoom group relative overflow-hidden bg-ink ${i===0?'lg:col-span-7 lg:row-span-2':'lg:col-span-5'}`}><img src={c.image} alt={c.imageAlt} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/4 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8"><Kicker light>{c.index}</Kicker><h3 className="mt-2 max-w-xl font-display text-4xl leading-none sm:text-5xl">{c.title}</h3><p className="mt-3 max-w-md text-xs leading-5 text-white/58">{c.short}</p><div className="mt-5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.14em]">View directions <ArrowUpRight size={13}/></div></div></Link>)}</div>
  </div></section>
}

function ProcessSection(){
  const process=[
    ['01','Brief','Tell us the garment, occasion and date.'],
    ['02','Fit','Visit Ife or send measurements for review.'],
    ['03','Approve','Confirm fabric, finishing, price and timing.'],
    ['04','Make','Track cutting, construction and finishing.'],
    ['05','Receive','Collect or receive your finished piece.']
  ]
  return <section className="bg-ink py-24 text-white lg:py-32"><div className="mx-auto grid max-w-[1540px] gap-12 px-4 sm:px-7 lg:grid-cols-[.82fr_1.18fr]">
    <div className="lg:sticky lg:top-32 lg:self-start"><Kicker light>How it works</Kicker><h2 className="display-tight mt-4 font-display text-6xl leading-[.86] sm:text-8xl">Brief. Fit.<br/><span className="italic text-[#cba474]">Cut. Finish.</span></h2><p className="mt-7 max-w-lg text-sm leading-7 text-white/52">You always know what happens next.</p><PrimaryLink to="/bespoke" light className="mt-8">Start bespoke</PrimaryLink></div>
    <div className="divide-y divide-white/10 border-y border-white/10">{process.map(([n,title,text])=><motion.div key={n} initial={{opacity:.28}} whileInView={{opacity:1}} viewport={{amount:.55}} className="grid min-h-32 grid-cols-[64px_1fr] gap-6 py-7 sm:grid-cols-[90px_1fr]"><div className="font-display text-4xl text-[#cba474]">{n}</div><div><h3 className="font-display text-4xl">{title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-white/45">{text}</p></div></motion.div>)}</div>
  </div></section>
}

function HomeLookbook(){
  return <section className="bg-bone py-24 lg:py-32"><div className="mx-auto max-w-[1540px] px-4 sm:px-7"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><Kicker>Lookbook</Kicker><h2 className="display-tight mt-4 font-display text-6xl leading-none sm:text-8xl">Sharp cuts.<br/>Clean finishes.</h2></div><TextLink to="/lookbook">View the lookbook</TextLink></div><div className="scrollbar-hide -mx-4 mt-12 flex snap-x gap-3 overflow-x-auto px-4 sm:-mx-7 sm:px-7">{lookbook.slice(0,6).map((item,i)=><motion.article key={item.id} initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.04}} className="image-zoom relative aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden bg-oat sm:w-[46vw] lg:w-[29vw]"><img src={item.image} alt={item.label} className="h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/64 via-transparent to-transparent"/><div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white"><div><div className="text-[8px] font-bold uppercase tracking-[.16em] text-white/50">{item.category}</div><div className="mt-1 font-display text-3xl">{item.label}</div></div><Link to="/bespoke" className="grid h-10 w-10 place-items-center rounded-full border border-white/25 backdrop-blur"><ArrowUpRight size={15}/></Link></div></motion.article>)}</div></div></section>
}

function FounderSection(){
  return <section className="luxury-grid bg-oat py-24 lg:py-32"><div className="mx-auto grid max-w-[1540px] gap-12 px-4 sm:px-7 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
    <div className="relative min-h-[620px] overflow-hidden bg-ink"><img src="https://images.unsplash.com/photo-1555069519-127aadedf1ee?auto=format&fit=crop&w=1800&q=92" alt="Tailoring detail" className="absolute inset-0 h-full w-full object-cover opacity-88"/><div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-black/5"/><div className="absolute inset-x-0 bottom-0 p-7 text-white"><Kicker light>OVOSKG standard</Kicker><div className="mt-2 max-w-lg font-display text-4xl leading-none">Fit, finishing and communication should all feel considered.</div></div></div>
    <motion.div initial="hidden" whileInView="show" viewport={{once:true,amount:.3}} variants={reveal} className="lg:pl-8"><Kicker>The journey</Kicker><h2 className="display-tight mt-4 font-display text-6xl leading-[.88] sm:text-8xl">Built through the work.</h2><p className="mt-7 max-w-xl text-sm leading-7 text-black/56">OVOSKG grew from hands-on clothing work into a structured bespoke company. The promise is simple: make the piece properly and make the process easier to trust.</p><div className="mt-9 grid grid-cols-2 gap-px bg-black/10"><div className="bg-bone p-5"><div className="font-display text-5xl text-bronze">2023</div><p className="mt-2 text-xs text-black/45">OVOSKG formally established</p></div><div className="bg-bone p-5"><div className="font-display text-5xl text-bronze">800+</div><p className="mt-2 text-xs text-black/45">custom pieces reported by the founder</p></div></div><div className="mt-8 flex flex-wrap gap-5"><TextLink to="/about">Read the story</TextLink><a href={instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-black/55">Instagram <ArrowUpRight size={14}/></a></div></motion.div>
  </div></section>
}

function ConversionBand(){
  return <section className="relative overflow-hidden bg-bronze py-24 text-white lg:py-28"><div className="noise absolute inset-0 opacity-15"/><div className="relative mx-auto max-w-[1540px] px-4 sm:px-7"><Kicker light>Ready to start?</Kicker><h2 className="display-tight mt-5 max-w-6xl font-display text-6xl leading-[.86] sm:text-8xl lg:text-9xl">Tell us what you need.<br/>We will take it from there.</h2><div className="mt-10 flex flex-wrap gap-3"><PrimaryLink to="/bespoke" light>Start bespoke</PrimaryLink><Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/35 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.13em]">Ask a question <MessageCircle size={14}/></Link></div></div></section>
}

function PageHero({eyebrow,title,intro,aside}){
  return <section className="hero-grid relative overflow-hidden bg-ink py-20 text-white sm:py-28"><div className="noise absolute inset-0 opacity-15"/><div className="relative mx-auto grid max-w-[1540px] gap-8 px-4 sm:px-7 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><div><Kicker light>{eyebrow}</Kicker><h1 className="display-tight mt-5 max-w-6xl font-display text-6xl leading-[.84] sm:text-8xl lg:text-[8.4rem]">{title}</h1></div><div><p className="max-w-xl text-sm leading-7 text-white/55 sm:text-base">{intro}</p>{aside}</div></div></section>
}

function CollectionsPage(){
  return <main><PageHero eyebrow="Collections" title="Start with the silhouette before you start the order." intro="Each collection now opens into a focused mini lookbook. Compare multiple cut and finishing directions first, save what feels right, then move into the bespoke consultation with a clearer brief."/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28">{collections.map((c,i)=><motion.article key={c.id} initial="hidden" whileInView="show" viewport={{once:true,amount:.18}} variants={reveal} className="grid gap-7 border-t border-black/10 py-12 lg:grid-cols-[.34fr_.66fr] lg:py-16"><div className="flex flex-col justify-between"><div><div className="font-display text-5xl text-bronze">{c.index}</div><h2 className="mt-5 max-w-md font-display text-5xl leading-[.92] sm:text-6xl">{c.title}</h2><p className="mt-5 max-w-md text-sm leading-7 text-black/55">{c.body}</p><div className="mt-6 flex flex-wrap gap-2">{c.tags.map(tag=><span key={tag} className="rounded-full border border-black/12 px-3 py-2 text-[9px] font-bold uppercase tracking-[.12em]">{tag}</span>)}</div></div><PrimaryLink to={`/collections/${c.id}`} className="mt-8 self-start">Open mini lookbook</PrimaryLink></div><div><Link to={`/collections/${c.id}`} className="image-zoom relative block min-h-[430px] overflow-hidden bg-oat sm:min-h-[560px]"><img src={c.image} alt={c.imageAlt} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/46 via-transparent to-transparent"/><div className="absolute bottom-5 left-5 rounded-full bg-white/92 px-4 py-2 text-[9px] font-bold uppercase tracking-[.13em] text-ink">{c.styles.length} curated directions</div></Link><div className="scrollbar-hide mt-3 flex gap-3 overflow-x-auto">{c.styles.slice(0,4).map(style=><Link key={style.name} to={`/collections/${c.id}`} className="relative aspect-[4/5] w-36 shrink-0 overflow-hidden bg-oat sm:w-44"><img src={style.image} alt={style.name} className="h-full w-full object-cover"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 p-3 pt-10 text-[9px] font-bold uppercase tracking-[.11em] text-white">{style.name}</div></Link>)}</div></div></motion.article>)}</section><ConversionBand/></main>
}

function CollectionDetailPage(){
  const {collectionId}=useParams()
  const collection=collections.find(item=>item.id===collectionId)
  const [saved,setSaved]=useState([])
  useEffect(()=>setSaved(JSON.parse(localStorage.getItem('ovoskg_shortlist')||'[]')),[collectionId])
  if(!collection) return <main><PageHero eyebrow="Collection" title="Collection not found." intro="Return to the collections page to choose a current OVOSKG direction."/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7"><PrimaryLink to="/collections">Back to collections</PrimaryLink></section></main>
  const useReference=style=>{
    const item={id:`${collection.id}-${style.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`,category:collection.title,name:style.name,image:style.image}
    const list=JSON.parse(localStorage.getItem('ovoskg_shortlist')||'[]')
    const next=list.some(x=>x.id===item.id)?list:[...list,item]
    localStorage.setItem('ovoskg_shortlist',JSON.stringify(next))
    setSaved(next)
    window.dispatchEvent(new Event('ovoskg-shortlist'))
  }
  return <main>
    <section className="cloth-deep relative overflow-hidden text-white"><div className="mx-auto grid min-h-[680px] max-w-[1540px] lg:grid-cols-[.82fr_1.18fr]"><div className="flex flex-col justify-end px-4 py-16 sm:px-7 lg:p-14"><Kicker light>{collection.index} / Mini lookbook</Kicker><h1 className="display-tight mt-5 font-display text-6xl leading-[.84] sm:text-8xl">{collection.title}</h1><p className="mt-6 max-w-xl text-sm leading-7 text-white/55">{collection.body}</p><div className="mt-7 flex flex-wrap gap-2">{collection.tags.map(tag=><span key={tag} className="rounded-full border border-white/16 px-3 py-2 text-[8px] font-bold uppercase tracking-[.13em] text-white/62">{tag}</span>)}</div></div><div className="relative min-h-[430px] overflow-hidden lg:min-h-0"><img src={collection.image} alt={collection.imageAlt} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-transparent"/><div className="absolute bottom-5 left-5 bg-bone px-4 py-3 text-ink"><div className="text-[8px] font-bold uppercase tracking-[.15em] text-bronze">{collection.styles.length} curated references</div><div className="mt-1 font-display text-2xl">Compare before you commission.</div></div></div></div></section>
    <section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="grid gap-8 lg:grid-cols-[.33fr_.67fr]"><div className="lg:sticky lg:top-28 lg:self-start"><Kicker>Style study</Kicker><h2 className="display-tight mt-4 font-display text-5xl leading-[.9] sm:text-6xl">Pick references, not a finished answer.</h2><p className="mt-5 text-sm leading-7 text-black/52">These references help communicate proportion, structure and finish. OVOSKG still adapts the final garment to your body, occasion and fabric choice.</p><PrimaryLink to="/bespoke" className="mt-7">Continue to bespoke</PrimaryLink></div><div className="grid gap-x-4 gap-y-10 sm:grid-cols-2">{collection.styles.map((style,i)=>{const id=`${collection.id}-${style.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`;const isSaved=saved.some(x=>x.id===id);return <motion.article key={style.name} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:Math.min(i*.05,.22)}} className="group"><div className="image-zoom relative aspect-[4/5] overflow-hidden bg-oat"><img src={style.image} alt={style.name} className="h-full w-full object-cover"/><div className="absolute left-4 top-4 rounded-full bg-black/58 px-3 py-2 text-[8px] font-bold uppercase tracking-[.13em] text-white backdrop-blur">{style.detail}</div></div><div className="pt-5"><div className="text-[8px] font-bold uppercase tracking-[.16em] text-bronze">{String(i+1).padStart(2,'0')} / Reference</div><h3 className="mt-2 font-display text-3xl leading-none sm:text-4xl">{style.name}</h3><p className="mt-3 text-sm leading-6 text-black/50">{style.note}</p><button onClick={()=>useReference(style)} className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[9px] font-bold uppercase tracking-[.13em] ${isSaved?'bg-bronze text-white':'border border-black/16 text-ink'}`}>{isSaved?<><Check size={13}/> Saved as reference</>:<>Use as reference <Plus size={13}/></>}</button></div></motion.article>})}</div></div></section>
    <ConversionBand/>
  </main>
}

function ShopPage(){
  const [filter,setFilter]=useState('All')
  const [query,setQuery]=useState('')
  const filters=['All','Suits','Women','Kaftan','Occasion']
  const visible=useMemo(()=>pieces.filter(p=>(filter==='All'||p.category===filter)&&p.name.toLowerCase().includes(query.toLowerCase())),[filter,query])
  return <main><PageHero eyebrow="Style direction" title="Find the look before we make it yours." intro="Browse suits, women’s tailoring and kaftans. Save what fits your taste, then bring it into your bespoke brief."/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="sticky top-[76px] z-20 -mx-4 mb-10 border-y border-black/10 bg-bone/94 px-4 py-4 backdrop-blur sm:-mx-7 sm:px-7"><div className="mx-auto flex max-w-[1540px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="scrollbar-hide flex gap-2 overflow-x-auto">{filters.map(f=><button key={f} onClick={()=>setFilter(f)} className={`whitespace-nowrap rounded-full px-4 py-2 text-[9px] font-bold uppercase tracking-[.13em] ${filter===f?'bg-ink text-white':'border border-black/12'}`}>{f}</button>)}</div><label className="flex items-center gap-2 border-b border-black/20 pb-2"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} className="w-full bg-transparent text-sm outline-none lg:w-64" placeholder="Search style direction"/></label></div></div><div className="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{visible.map((p,i)=><ProductCard key={p.id} piece={p} index={i}/>)}</div></section></main>
}

function ProductCard({piece,index}){
  const [saved,setSaved]=useState(()=>JSON.parse(localStorage.getItem('ovoskg_shortlist')||'[]').some(x=>x.id===piece.id))
  const toggle=()=>{
    let list=JSON.parse(localStorage.getItem('ovoskg_shortlist')||'[]')
    list=saved?list.filter(x=>x.id!==piece.id):[...list,piece]
    localStorage.setItem('ovoskg_shortlist',JSON.stringify(list))
    setSaved(!saved)
    window.dispatchEvent(new Event('ovoskg-shortlist'))
  }
  return <motion.article initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:Math.min(index*.04,.28)}} className="group"><div className="image-zoom relative aspect-[4/5] overflow-hidden bg-oat"><img src={piece.image} alt={piece.name} className="h-full w-full object-cover"/><button onClick={toggle} aria-label={saved?'Remove from shortlist':'Add to shortlist'} className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full backdrop-blur ${saved?'bg-ink text-white':'bg-white/85 text-ink'}`}><Heart size={16} fill={saved?'currentColor':'none'}/></button><div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-2 text-[8px] font-bold uppercase tracking-[.14em]">Made to order</div></div><div className="flex items-start justify-between gap-3 pt-4"><div><div className="text-[8px] font-bold uppercase tracking-[.16em] text-bronze">{piece.category} · {piece.gender}</div><h3 className="mt-1 font-display text-3xl leading-none">{piece.name}</h3><p className="mt-2 text-xs text-black/42">{piece.descriptor}</p></div><Link to="/bespoke" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/12 transition group-hover:bg-ink group-hover:text-white"><ArrowUpRight size={15}/></Link></div></motion.article>
}

function LookbookPage(){
  const [filter,setFilter]=useState('All')
  const filters=['All','Suits','Women','Kaftan']
  const visible=filter==='All'?lookbook:lookbook.filter(x=>x.category===filter)
  return <main><PageHero eyebrow="Lookbook" title="Find the look. We tailor it to you." intro="Save the silhouettes, proportions and details you like. Your final garment is built around your body, occasion and fabric choice."/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="scrollbar-hide mb-10 flex gap-2 overflow-x-auto">{filters.map(f=><button key={f} onClick={()=>setFilter(f)} className={`rounded-full px-4 py-2 text-[9px] font-bold uppercase tracking-[.13em] ${filter===f?'bg-ink text-white':'border border-black/12'}`}>{f}</button>)}</div><div className="columns-1 gap-3 sm:columns-2 lg:columns-3">{visible.map((item,i)=><motion.figure key={item.id} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:Math.min(i*.04,.25)}} className="image-zoom group relative mb-3 break-inside-avoid overflow-hidden bg-oat"><img src={item.image} alt={item.label} className={`w-full object-cover ${i%3===0?'aspect-[4/5]':'aspect-[3/4]'}`}/><div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent"/><figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white"><div><div className="text-[8px] font-bold uppercase tracking-[.16em] text-white/50">{item.category}</div><div className="mt-1 font-display text-3xl">{item.label}</div></div><Link to="/bespoke" className="grid h-10 w-10 place-items-center rounded-full border border-white/25 backdrop-blur" aria-label="Use this direction"><ArrowUpRight size={15}/></Link></figcaption></motion.figure>)}</div></section><ConversionBand/></main>
}

function BespokePage(){
  const saved=JSON.parse(localStorage.getItem('ovoskg_shortlist')||'[]')
  const [step,setStep]=useState(0)
  const [form,setForm]=useState({piece:"Men's bespoke suit",occasion:'',colour:'',fabric:'',measure:'Virtual measurements',deadline:'',notes:'',contact:''})
  const update=(key,value)=>setForm({...form,[key]:value})
  const steps=['Piece','Direction','Fit','Contact','Review']
  return <main><PageHero eyebrow="Bespoke studio" title="A better brief creates a better first conversation." intro="Build the garment direction, choose how fit will be confirmed and see the remote fitting safeguards before you commit. Payment comes only after OVOSKG confirms scope, measurements, finishing and timing."/><RemoteFitAssurance dark/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="grid gap-10 lg:grid-cols-[.34fr_.66fr]"><aside><div className="lg:sticky lg:top-28">{steps.map((s,i)=><button key={s} onClick={()=>setStep(i)} className={`flex w-full items-center justify-between border-b py-4 text-left ${i===step?'border-ink':'border-black/10'}`}><span className="font-display text-2xl">{String(i+1).padStart(2,'0')} · {s}</span>{i<step&&<Check size={15} className="text-bronze"/>}</button>)}{saved.length>0&&<div className="mt-7 bg-oat p-5"><Kicker>Shortlist attached</Kicker><div className="mt-3 flex -space-x-2">{saved.slice(0,4).map(x=><img key={x.id} src={x.image} alt="" className="h-12 w-12 rounded-full border-2 border-oat object-cover"/>)}{saved.length>4&&<div className="grid h-12 w-12 place-items-center rounded-full border-2 border-oat bg-ink text-[9px] font-bold text-white">+{saved.length-4}</div>}</div><p className="mt-3 text-xs leading-5 text-black/48">Your saved style directions can help the consultation move faster.</p></div>}</div></aside><div className="editorial-shadow min-h-[620px] bg-white p-6 sm:p-10 lg:p-12">{step===0&&<WizardStep title="What are we making?"><Choice options={["Men's bespoke suit","Women's bespoke suit","Luxury men's kaftan","Other custom commission"]} value={form.piece} onChange={v=>update('piece',v)}/></WizardStep>}{step===1&&<WizardStep title="Set the direction"><div className="grid gap-5 sm:grid-cols-2"><Field label="Occasion"><input value={form.occasion} onChange={e=>update('occasion',e.target.value)} placeholder="Wedding, work, ceremony..."/></Field><Field label="Colour direction"><input value={form.colour} onChange={e=>update('colour',e.target.value)} placeholder="Navy, black, cream..."/></Field><Field label="Fabric direction"><input value={form.fabric} onChange={e=>update('fabric',e.target.value)} placeholder="Wool, textured, lightweight..."/></Field><Field label="Target date"><input type="date" value={form.deadline} onChange={e=>update('deadline',e.target.value)}/></Field></div></WizardStep>}{step===2&&<WizardStep title="How should we confirm fit?"><Choice options={['Virtual measurements','Use saved measurement profile','Book a physical fitting']} value={form.measure} onChange={v=>update('measure',v)}/><div className="mt-6"><Field label="Fit or finishing notes"><textarea rows="5" value={form.notes} onChange={e=>update('notes',e.target.value)} placeholder="Fit preference, lapel, initials, embroidery, reference details..."/></Field></div></WizardStep>}{step===3&&<WizardStep title="How should OVOSKG reach you?"><Field label="Phone or WhatsApp number"><input value={form.contact} onChange={e=>update('contact',e.target.value)} placeholder="e.g. 0800 000 0000"/></Field><div className="mt-6 bg-oat p-5 text-xs leading-6 text-black/50"><b className="text-ink">What happens next:</b> OVOSKG reviews the brief, clarifies anything missing, confirms the measurement path and prepares the quote before payment.</div></WizardStep>}{step===4&&<WizardStep title="Review the commission"><div className="divide-y divide-black/10 border-y border-black/10">{Object.entries(form).map(([key,value])=><div key={key} className="grid grid-cols-[110px_1fr] gap-4 py-4 text-sm sm:grid-cols-[150px_1fr]"><span className="capitalize text-black/42">{key}</span><b>{value||'Not specified'}</b></div>)}</div><a href={wa(`Hello OVOSKG, I want to start a bespoke order. Piece: ${form.piece}. Occasion: ${form.occasion||'not specified'}. Colour: ${form.colour||'not specified'}. Fabric: ${form.fabric||'not specified'}. Fit method: ${form.measure}. Deadline: ${form.deadline||'not specified'}. Contact: ${form.contact||'not specified'}. Notes: ${form.notes||'none'}. Shortlisted references: ${saved.map(x=>x.name).join(', ')||'none'}.`)} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-white">Send brief to OVOSKG <MessageCircle size={14}/></a><p className="mt-4 text-xs leading-5 text-black/42">After the brief is reviewed, OVOSKG confirms the quote, fitting route and payment instruction before production begins.</p></WizardStep>}<div className="mt-10 flex items-center justify-between border-t border-black/10 pt-6"><button disabled={step===0} onClick={()=>setStep(x=>Math.max(0,x-1))} className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.13em] disabled:opacity-20"><ArrowLeft size={13}/> Back</button>{step<4&&<button onClick={()=>setStep(x=>Math.min(4,x+1))} className="flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[9px] font-bold uppercase tracking-[.13em] text-white">Continue <ArrowRight size={13}/></button>}</div></div></div></section></main>
}

function WizardStep({title,children}){return <motion.div key={title} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}><Kicker>Commission builder</Kicker><h2 className="display-tight mt-4 max-w-3xl font-display text-5xl leading-[.9] sm:text-6xl">{title}</h2><div className="mt-8">{children}</div></motion.div>}
function Choice({options,value,onChange}){return <div className="grid gap-3 sm:grid-cols-2">{options.map(option=><button key={option} onClick={()=>onChange(option)} className={`flex min-h-32 items-end justify-between border p-5 text-left transition ${value===option?'border-ink bg-ink text-white':'border-black/12 hover:border-black/35'}`}><span className="max-w-[220px] font-display text-2xl leading-none">{option}</span>{value===option&&<Check size={17}/>}</button>)}</div>}
function Field({label,children}){return <label className="grid gap-2 text-[9px] font-bold uppercase tracking-[.14em] text-black/45">{label}<div className="text-sm font-normal normal-case tracking-normal [&_input]:w-full [&_input]:border-b [&_input]:border-black/20 [&_input]:bg-transparent [&_input]:py-3 [&_input]:outline-none [&_textarea]:w-full [&_textarea]:border [&_textarea]:border-black/12 [&_textarea]:bg-transparent [&_textarea]:p-4 [&_textarea]:outline-none">{children}</div></label>}

function MeasurementsPage(){
  const fields=['Neck','Chest / bust','Shoulder','Sleeve','Waist','Hip / seat','Thigh','Trouser length','Inseam','Height']
  const [values,setValues]=useState(()=>JSON.parse(localStorage.getItem('ovoskg_measurements')||'{}'))
  const [saved,setSaved]=useState(false)
  const save=()=>{localStorage.setItem('ovoskg_measurements',JSON.stringify(values));setSaved(true);setTimeout(()=>setSaved(false),2200)}
  return <main><PageHero eyebrow="Virtual measurements" title="Measure once. We verify before cutting." intro="For remote orders, your measurements are reviewed before production. If anything looks off, OVOSKG can ask you to measure again, send photos or do a short video check."/><RemoteFitAssurance/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="grid gap-5 lg:grid-cols-[.92fr_1.08fr]"><div className="relative min-h-[620px] overflow-hidden bg-ink text-white lg:sticky lg:top-28 lg:self-start"><img src="https://images.unsplash.com/photo-1637670758590-d5ac57c982e3?auto=format&fit=crop&w=1800&q=92" alt="Tailored menswear fitting direction" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/74 via-black/4 to-black/6"/><div className="absolute inset-x-0 bottom-0 p-7 sm:p-9"><Kicker light>Remote fit</Kicker><h2 className="mt-3 font-display text-5xl leading-none">We do not cut from unchecked numbers.</h2><p className="mt-4 max-w-md text-xs leading-6 text-white/54">If you are unsure, book an Ife fitting instead.</p></div></div><div className="editorial-shadow bg-white p-6 sm:p-9"><div className="flex items-start gap-3 border-b border-black/10 pb-6"><Ruler className="text-bronze"/><div><b>Measurement draft</b><p className="mt-1 text-xs leading-5 text-black/44">Use inches. Measure twice. Save this as a draft for review.</p></div></div><div className="mt-6 grid gap-x-5 gap-y-6 sm:grid-cols-2">{fields.map(field=><Field key={field} label={field}><input inputMode="decimal" value={values[field]||''} onChange={e=>setValues({...values,[field]:e.target.value})} placeholder="0.0"/></Field>)}</div><button onClick={save} className="mt-8 w-full rounded-full bg-ink px-6 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-white">{saved?'Draft saved':'Save measurement draft'}</button><div className="mt-5 flex gap-3 bg-oat p-4 text-xs leading-5 text-black/50"><ShieldCheck className="mt-0.5 shrink-0 text-bronze" size={18}/><span>Saving does not approve the measurements for production. OVOSKG still verifies them before cutting.</span></div><Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.13em]">Book an Ife fitting <ArrowUpRight size={13}/></Link></div></div></section></main>
}

function TrackPage(){
  const [id,setId]=useState('')
  const [result,setResult]=useState(null)
  const run=()=>setResult(id.trim().toUpperCase()==='OVS-DEMO-001'?4:-1)
  return <main><PageHero eyebrow="Order tracking" title="Track the work before you track the package." intro="A custom order has meaningful production stages. The customer portal is designed to show those stages before the final delivery handoff."/><section className="mx-auto max-w-5xl px-4 py-20 sm:px-7 lg:py-28"><div className="editorial-shadow bg-white p-6 sm:p-10"><div className="flex flex-col gap-3 sm:flex-row"><input value={id} onChange={e=>setId(e.target.value)} onKeyDown={e=>e.key==='Enter'&&run()} placeholder="Enter order ID, e.g. OVS-DEMO-001" className="min-h-14 flex-1 border border-black/12 px-5 outline-none focus:border-ink"/><button onClick={run} className="rounded-full bg-ink px-8 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-white">Track order</button></div><p className="mt-3 text-xs text-black/38">Enter the order ID from your OVOSKG confirmation message.</p><AnimatePresence mode="wait">{result!==null&&<motion.div key={result} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="mt-10">{result===-1?<div className="border border-black/10 bg-oat p-6"><b>We could not find that order.</b><p className="mt-2 text-sm text-black/50">Check the order ID or contact OVOSKG so the team can verify it.</p></div>:<><div className="flex flex-col justify-between gap-4 border-b border-black/10 pb-7 sm:flex-row"><div><Kicker>OVS-DEMO-001</Kicker><h2 className="mt-2 font-display text-5xl">Finishing and quality control</h2><p className="mt-3 text-sm text-black/48">The garment is being checked before it is marked ready.</p></div><div className="flex items-center gap-2 self-start rounded-full bg-oat px-4 py-2 text-[9px] font-bold uppercase tracking-[.13em] text-bronze"><Clock3 size={13}/> Updated today</div></div><div className="mt-8 space-y-1">{statusSteps.map((stage,i)=><div key={stage} className="grid grid-cols-[38px_1fr_auto] items-center gap-4"><div className={`grid h-9 w-9 place-items-center rounded-full border text-xs ${i<=result?'border-bronze bg-bronze text-white':'border-black/12 text-black/30'}`}>{i<result?<Check size={14}/>:i+1}</div><div className={`border-b py-5 text-sm ${i<=result?'border-black/15 font-semibold':'border-black/10 text-black/36'}`}>{stage}</div><span className="text-[8px] font-bold uppercase tracking-[.14em] text-black/32">{i<result?'Complete':i===result?'Current':''}</span></div>)}</div></>}</motion.div>}</AnimatePresence></div></section></main>
}

function AboutPage(){
  return <main><PageHero eyebrow="Our story" title="Built through the work." intro="OVOSKG grew from hands-on clothing work into a structured bespoke company focused on fit, finishing and delivery."/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]"><div className="lg:sticky lg:top-28 lg:self-start"><div className="bg-ink p-8 text-white sm:p-10"><Logo light/><div className="mt-20"><Kicker light>Founder and Creative Director</Kicker><div className="mt-2 font-display text-4xl">Okunola Victor Ogunmola</div><p className="mt-5 max-w-md text-sm leading-7 text-white/50">The company’s public story centres on careful work, stronger systems and consistent delivery.</p><a href="https://ng.linkedin.com/in/okunola-ogunmola" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.14em]">View public profile <ArrowUpRight size={13}/></a></div></div></div><div>{journey.map(item=><motion.div key={item.year} initial="hidden" whileInView="show" viewport={{once:true,amount:.25}} variants={reveal} className="grid grid-cols-[92px_1fr] gap-5 border-t border-black/10 py-9 sm:grid-cols-[150px_1fr]"><div className="font-display text-2xl text-bronze">{item.year}</div><div><h2 className="font-display text-4xl leading-none sm:text-5xl">{item.title}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-black/52">{item.text}</p></div></motion.div>)}</div></div></section><ConversionBand/></main>
}

function CompanyPage(){
  const departments=[
    ['Creative Direction','The look, proportion and finishing standard for every commission.'],
    ['Production','Pattern, cutting, construction, finishing and quality control.'],
    ['Client Experience','Consultation, fittings, updates, handover and aftercare.']
  ]
  return <main><PageHero eyebrow="Company" title="Good clothing needs a good system behind it." intro="OVOSKG combines creative direction, production discipline and client service so the experience stays clear from first brief to final handover."/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="grid gap-4 lg:grid-cols-3">{departments.map(([title,text],i)=><motion.article key={title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="card-lift min-h-72 border border-black/10 bg-white p-7"><div className="font-display text-5xl text-bronze">{String(i+1).padStart(2,'0')}</div><h2 className="mt-12 font-display text-4xl">{title}</h2><p className="mt-4 text-sm leading-7 text-black/52">{text}</p></motion.article>)}</div><div className="mt-20 grid gap-3 bg-ink p-6 text-white sm:grid-cols-2 sm:p-10 lg:grid-cols-4">{[[PackageCheck,'Clear delivery','Know the stage and next step.'],[Scissors,'Craft control','Fit and finishing are checked.'],[Layers3,'Physical + remote','Visit Ife or order remotely.'],[Heart,'Repeat orders','Approved measurements make the next order easier.']].map(([Icon,title,text])=><div key={title} className="border border-white/10 p-5"><Icon size={20} className="text-[#cba474]"/><b className="mt-8 block text-sm">{title}</b><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div>)}</div></section></main>
}

function ContactPage(){
  const [form,setForm]=useState({name:'',phone:'',need:'Bespoke suit',date:'',message:''})
  const [openFaq,setOpenFaq]=useState(0)
  const update=(key,value)=>setForm({...form,[key]:value})
  const contactMessage=`Hello OVOSKG, my name is ${form.name||'not supplied'}. Phone: ${form.phone||'not supplied'}. I need: ${form.need}. Preferred date: ${form.date||'not supplied'}. Message: ${form.message||'none'}.`
  return <main><PageHero eyebrow="Contact and fittings" title="Tell us what you need." intro="Message, call or request a fitting. OVOSKG is based in Ife, Osun State and accepts remote bespoke orders."/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="grid gap-4 md:grid-cols-3">{[
    [MessageCircle,'WhatsApp','Fastest for enquiries, references and follow up.',wa(),'Open WhatsApp'],
    [Phone,'Call OVOSKG','Speak directly with the team about timing or a fitting.','tel:+2347070489393','07070489393'],
    [Instagram,'Instagram','See social updates and message @ovoskg_clothings.',instagram,'Open Instagram']
  ].map(([Icon,title,text,href,cta])=><a key={title} href={href} target={href.startsWith('http')?'_blank':undefined} rel="noreferrer" className="card-lift min-h-64 border border-black/10 bg-white p-7"><Icon className="text-bronze" size={22}/><h2 className="mt-14 font-display text-4xl">{title}</h2><p className="mt-3 text-sm leading-6 text-black/50">{text}</p><div className="mt-6 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.14em]">{cta}<ArrowUpRight size={13}/></div></a>)}</div><div className="mt-16 grid gap-8 lg:grid-cols-[.62fr_.38fr]"><div className="editorial-shadow bg-white p-6 sm:p-9"><Kicker>Request a fitting or consultation</Kicker><h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">One clear brief gets you a better answer.</h2><div className="mt-8 grid gap-5 sm:grid-cols-2"><Field label="Your name"><input value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Full name"/></Field><Field label="Phone or WhatsApp"><input value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="0800 000 0000"/></Field><label className="grid gap-2 text-[9px] font-bold uppercase tracking-[.14em] text-black/45">What do you need?<select value={form.need} onChange={e=>update('need',e.target.value)} className="border-b border-black/20 bg-transparent py-3 text-sm font-normal normal-case tracking-normal outline-none"><option>Bespoke suit</option><option>Women’s suit</option><option>Luxury kaftan</option><option>Physical fitting</option><option>Other custom piece</option></select></label><Field label="Preferred date"><input type="date" value={form.date} onChange={e=>update('date',e.target.value)}/></Field><div className="sm:col-span-2"><Field label="Message"><textarea rows="5" value={form.message} onChange={e=>update('message',e.target.value)} placeholder="Occasion, deadline, location or anything useful..."/></Field></div></div><a href={wa(contactMessage)} target="_blank" rel="noreferrer" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-white">Send request on WhatsApp <MessageCircle size={14}/></a></div><div className="bg-oat p-6 sm:p-8"><Kicker>Visit and business details</Kicker><div className="mt-8 space-y-6"><Info icon={MapPin} title="Base">Ife, Osun State, Nigeria. Confirm exact boutique directions with the team before visiting.</Info><Info icon={Clock3} title="Appointments">Physical fittings should be arranged before arrival so the right person and time are available.</Info><Info icon={ShieldCheck} title="Registration">Business registration: BN 3795532.</Info><Info icon={Phone} title="Phone">07070489393</Info></div></div></div><div className="mt-20 grid gap-10 lg:grid-cols-[.42fr_.58fr]"><div><Kicker>Questions before ordering</Kicker><h2 className="display-tight mt-4 font-display text-6xl leading-[.9]">Clear answers reduce bad orders.</h2></div><div className="border-t border-black/10">{faqs.map(([q,a],i)=><div key={q} className="border-b border-black/10"><button onClick={()=>setOpenFaq(openFaq===i?-1:i)} className="flex w-full items-center justify-between gap-5 py-5 text-left"><span className="font-display text-2xl">{q}</span>{openFaq===i?<Minus size={16}/>:<Plus size={16}/>}</button><AnimatePresence>{openFaq===i&&<motion.p initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden pb-5 text-sm leading-7 text-black/50">{a}</motion.p>}</AnimatePresence></div>)}</div></div></section></main>
}

function Info({icon:Icon,title,children}){return <div className="flex gap-3"><Icon size={17} className="mt-0.5 shrink-0 text-bronze"/><div><div className="text-[9px] font-bold uppercase tracking-[.14em]">{title}</div><p className="mt-1 text-xs leading-5 text-black/50">{children}</p></div></div>}

function Footer(){
  return <footer className="bg-[#050505] text-white"><div className="mx-auto max-w-[1540px] px-4 py-16 sm:px-7"><div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)]"><div><Logo light/><p className="mt-6 max-w-sm text-sm leading-7 text-white/42">Bespoke suits for men and women, luxury men’s kaftans and custom made clothing built around fit, finishing and a more reliable customer experience.</p><div className="mt-6 text-xs leading-6 text-white/42">Ife, Osun State, Nigeria<br/>07070489393<br/>BN 3795532</div></div>{[
    ['Explore',[['Home','/'],['Collections','/collections'],['Shop','/shop'],['Lookbook','/lookbook']]],
    ['Customer',[['Bespoke','/bespoke'],['Measurements','/measurements'],['Track Order','/track'],['Contact','/contact']]],
    ['Company',[['Our Story','/about'],['Company','/company'],['Instagram',instagram],['TikTok',tiktok]]]
  ].map(([heading,links])=><div key={heading}><div className="text-[9px] font-bold uppercase tracking-[.17em] text-white/30">{heading}</div><div className="mt-5 grid gap-3">{links.map(([label,url])=>url.startsWith('http')?<a key={label} href={url} target="_blank" rel="noreferrer" className="text-sm text-white/65 transition hover:text-white">{label}</a>:<Link key={label} to={url} className="text-sm text-white/65 transition hover:text-white">{label}</Link>)}</div></div>)}</div><div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[9px] uppercase tracking-[.13em] text-white/25 sm:flex-row"><span>© 2026 OVOSKG Clothings</span><span>Privacy · Terms · Delivery · Returns</span></div></div></footer>
}

function FloatingDesktop(){
  return <div className="fixed bottom-5 right-5 z-40 hidden flex-col gap-2 md:flex"><a href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp OVOSKG" className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-xl"><MessageCircle size={18}/></a><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top" className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-xl"><ArrowRight size={16} className="-rotate-90"/></button></div>
}

export default function App(){
  return <div className="mobile-safe min-h-screen bg-bone text-ink"><AppMeta/><ScrollProgress/><Header/><RouteFrame><Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/collections" element={<CollectionsPage/>}/>
    <Route path="/collections/:collectionId" element={<CollectionDetailPage/>}/>
    <Route path="/shop" element={<ShopPage/>}/>
    <Route path="/lookbook" element={<LookbookPage/>}/>
    <Route path="/bespoke" element={<BespokePage/>}/>
    <Route path="/measurements" element={<MeasurementsPage/>}/>
    <Route path="/track" element={<TrackPage/>}/>
    <Route path="/about" element={<AboutPage/>}/>
    <Route path="/company" element={<CompanyPage/>}/>
    <Route path="/contact" element={<ContactPage/>}/>
    <Route path="*" element={<HomePage/>}/>
  </Routes></RouteFrame><Footer/><FloatingDesktop/><MobileConversionBar/></div>
}
