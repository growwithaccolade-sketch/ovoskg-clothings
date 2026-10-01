import {useEffect,useMemo,useState} from 'react'
import {AnimatePresence,motion} from 'framer-motion'
import {track} from '@vercel/analytics'
import {Link,NavLink,Route,Routes,useLocation,useNavigate,useParams} from 'react-router-dom'
import {
  ArrowLeft,ArrowRight,ArrowUpRight,CalendarDays,Check,ChevronDown,Clock3,
  Compass,Heart,Instagram,Layers3,Mail,MapPin,Menu,MessageCircle,Minus,
  PackageCheck,Phone,Play,Plus,Ruler,Search,ShieldCheck,ShoppingBag,
  SlidersHorizontal,Scissors,UserRound,X
} from 'lucide-react'
import {collections,faqs,journey,lookbook,navItems,pieces,statusSteps} from './data'
import siteContent from './content/site.json'
import {policies} from './legal'

const SITE_URL='https://ovoskgclothings.com'
const PHONE=siteContent.contact.phoneE164.replace(/\D/g,'')
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

const pageKeyByPath={
  '/collections':'collections',
  '/shop':'shop',
  '/lookbook':'lookbook',
  '/bespoke':'bespoke',
  '/measurements':'measurements',
  '/track':'track',
  '/about':'about',
  '/company':'company',
  '/contact':'contact',
  '/privacy':'privacy',
  '/terms':'terms',
  '/delivery':'delivery',
  '/returns':'returns'
}
const managedPage=key=>siteContent.pages?.[key]||{}

const reveal={
  hidden:{opacity:0},
  show:{opacity:1,transition:{duration:.7,ease:[.22,1,.36,1]}}
}

const routeMeta={
  '/':{title:'OVOSKG Clothings | Bespoke Suits and Luxury Kaftans',description:'OVOSKG Clothings creates bespoke suits for men and women, luxury men’s kaftans and custom clothing in Nigeria.'},
  '/collections':{title:'Bespoke Collections | OVOSKG Clothings',description:'Explore OVOSKG bespoke suits, women’s tailoring and luxury kaftans, then save references for your custom order.'},
  '/shop':{title:'Style References | OVOSKG Clothings',description:'Browse tailoring references and save the pieces you want to discuss with OVOSKG.'},
  '/lookbook':{title:'Lookbook | OVOSKG Clothings',description:'Explore tailored suits, women’s tailoring and luxury kaftan references from OVOSKG.'},
  '/bespoke':{title:'Start a Bespoke Order | OVOSKG Clothings',description:'Build a clear bespoke brief for a suit, women’s tailoring or luxury kaftan and send it to OVOSKG.'},
  '/measurements':{title:'Virtual Measurements | OVOSKG Clothings',description:'Save a measurement draft for review before OVOSKG begins a remote bespoke order.'},
  '/track':{title:'Track Your Order | OVOSKG Clothings',description:'Check the current production stage of an OVOSKG custom order.'},
  '/about':{title:'Our Story | OVOSKG Clothings',description:'Read the story behind OVOSKG Clothings and its bespoke tailoring work in Nigeria.'},
  '/company':{title:'Company | OVOSKG Clothings',description:'Learn how OVOSKG structures design, production, quality checks and client service.'},
  '/contact':{title:'Contact OVOSKG Clothings',description:'Contact OVOSKG for bespoke orders, fittings, measurements and order enquiries.'},
  '/privacy':{title:'Privacy Policy | OVOSKG Clothings',description:'How OVOSKG Clothings handles information shared through its website and order process.'},
  '/terms':{title:'Terms of Service | OVOSKG Clothings',description:'Terms that apply to OVOSKG bespoke enquiries, quotations, measurements and orders.'},
  '/delivery':{title:'Delivery Policy | OVOSKG Clothings',description:'How OVOSKG confirms delivery timing, dispatch and collection for custom orders.'},
  '/returns':{title:'Alterations and Returns | OVOSKG Clothings',description:'How OVOSKG handles fit concerns, defects, alterations and bespoke return requests.'},
  '/admin':{title:'OVOSKG Admin',description:'OVOSKG content administration.'}
}

const setMeta=(selector,attrs)=>{
  let el=document.head.querySelector(selector)
  if(!el){
    el=document.createElement('meta')
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([key,value])=>el.setAttribute(key,value))
}

function AppMeta(){
  const {pathname}=useLocation()
  useEffect(()=>{
    const collectionMatch=pathname.startsWith('/collections/')?collections.find(item=>item.id===pathname.split('/')[2]):null
    const pageKey=pageKeyByPath[pathname]
    const page=pageKey?managedPage(pageKey):null
    const collectionPage=collectionMatch?managedPage(collectionMatch.id):null
    const meta=collectionMatch
      ? {title:`${collectionPage.title||collectionMatch.title} | OVOSKG Clothings`,description:collectionPage.intro||collectionMatch.body}
      : page?.title
        ? {title:`${page.title} | OVOSKG Clothings`,description:page.intro||routeMeta[pathname]?.description||''}
        : (routeMeta[pathname]||routeMeta['/'])
    const canonical=`${SITE_URL}${pathname==='/'?'':pathname}`
    document.title=meta.title
    let canonicalEl=document.head.querySelector('link[rel="canonical"]')
    if(!canonicalEl){
      canonicalEl=document.createElement('link')
      canonicalEl.rel='canonical'
      document.head.appendChild(canonicalEl)
    }
    canonicalEl.href=canonical
    setMeta('meta[name="description"]',{name:'description',content:meta.description})
    setMeta('meta[property="og:title"]',{property:'og:title',content:meta.title})
    setMeta('meta[property="og:description"]',{property:'og:description',content:meta.description})
    setMeta('meta[property="og:url"]',{property:'og:url',content:canonical})
    setMeta('meta[property="og:image"]',{property:'og:image',content:`${SITE_URL}/ovoskg-logo.svg`})
    setMeta('meta[name="twitter:title"]',{name:'twitter:title',content:meta.title})
    setMeta('meta[name="twitter:description"]',{name:'twitter:description',content:meta.description})
    setMeta('meta[name="twitter:image"]',{name:'twitter:image',content:`${SITE_URL}/ovoskg-logo.svg`})
    setMeta('meta[name="robots"]',{name:'robots',content:pathname==='/admin'?'noindex,nofollow':'index,follow,max-image-preview:large'})
    window.scrollTo({top:0,behavior:'instant'})
  },[pathname])
  return null
}

function ConversionAnalytics(){
  const {pathname}=useLocation()
  useEffect(()=>{
    const handleClick=e=>{
      const node=e.target.closest('a,button')
      if(!node) return
      const href=node.getAttribute('href')||''
      const label=(node.getAttribute('aria-label')||node.textContent||'').replace(/\s+/g,' ').trim().slice(0,80)
      if(href.includes('wa.me')) track('whatsapp_click',{path:pathname,label})
      else if(href==='/bespoke'||href.endsWith('/bespoke')) track('bespoke_intent',{path:pathname,label})
      else if(href.includes('instagram.com')||href.includes('tiktok.com')) track('social_click',{path:pathname,label})
    }
    document.addEventListener('click',handleClick)
    return()=>document.removeEventListener('click',handleClick)
  },[pathname])
  return null
}

function Logo(){
  return <Link to="/" aria-label="OVOSKG homepage" className="brand-logo inline-flex min-w-0 items-center">
    <img src="/ovoskg-logo.svg" alt="OVOSKG Clothings" className="h-[38px] w-auto max-w-[150px] object-contain sm:h-[46px] sm:max-w-[182px] lg:h-[50px] lg:max-w-[198px]" loading="eager" decoding="async"/>
  </Link>
}

function Announcement(){
  return <div className="bg-ink text-white"><div className="mx-auto flex max-w-[1480px] items-center justify-between gap-5 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[.18em] sm:px-7"><span>Bespoke suits · Luxury kaftans</span><span className="hidden sm:inline">Ife fittings · Remote orders · Track production</span></div></div>
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
    <header className="luxury-header sticky top-0 z-50 border-b border-white/8 text-white">
      <div className="mx-auto flex h-[74px] max-w-[1480px] items-center gap-3 px-4 sm:h-[84px] sm:gap-5 sm:px-7">
        <Logo light/>
        <nav className="ml-auto hidden items-center gap-6 xl:flex">
          {navItems.map(([label,path])=><NavLink key={path} to={path} className={({isActive})=>`line-link text-[10px] font-semibold uppercase tracking-[.12em] ${isActive?'active text-[#caa177]':'text-white/58 hover:text-white'}`}>{label}</NavLink>)}
        </nav>
        <div className="ml-auto flex items-center gap-2 xl:ml-4">
          <button onClick={()=>setShortlist(true)} aria-label="Open style shortlist" className="focus-ring relative grid h-9 w-9 place-items-center rounded-[2px] border border-white/16 sm:h-10 sm:w-10 text-white/80 transition hover:border-white/34 hover:text-white"><ShoppingBag size={17}/>{count>0&&<span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-bronze px-1 text-[9px] font-bold text-white">{count}</span>}</button>
          <Link to="/bespoke" className="hidden rounded-[2px] border border-white/14 bg-[#f7f3eb] px-5 py-3 text-[10px] font-semibold uppercase tracking-[.12em] text-ink transition hover:bg-white md:inline-flex">Start an order</Link>
          <button onClick={()=>setMenu(true)} aria-label="Open navigation" className="focus-ring grid h-9 w-9 place-items-center rounded-[2px] border border-white/16 sm:h-10 sm:w-10 text-white/80 xl:hidden"><Menu size={19}/></button>
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
    <motion.aside initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{duration:.38,ease:[.22,1,.36,1]}} className="fixed right-0 top-0 z-[90] flex h-dvh w-full max-w-xl flex-col bg-bone">
      <div className="flex items-center justify-between border-b border-black/10 p-5 sm:p-7"><Logo/><button onClick={close} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full border border-black/15"><X size={19}/></button></div>
      <nav className="flex-1 overflow-auto px-5 py-4 sm:px-7">
        {navItems.map(([label,path],i)=><Link key={path} to={path} onClick={close} className="group flex items-center justify-between border-b border-black/10 py-3.5 sm:py-5"><span className="font-display text-[2rem] leading-none sm:text-5xl">{label}</span><span className="flex items-center gap-3"><span className="hidden text-[9px] font-bold uppercase tracking-[.16em] text-black/35 sm:inline">{String(i+1).padStart(2,'0')}</span><ArrowUpRight size={17} className="transition group-hover:translate-x-1 group-hover:-translate-y-1"/></span></Link>)}
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
    <motion.aside initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{duration:.38,ease:[.22,1,.36,1]}} className="fixed right-0 top-0 z-[90] flex h-dvh w-full max-w-md flex-col bg-bone">
      <div className="flex items-center justify-between border-b border-black/10 p-6"><div><Kicker>Your selections</Kicker><h3 className="mt-1 font-display text-4xl">Style shortlist</h3></div><button onClick={close}><X/></button></div>
      <div className="flex-1 space-y-3 overflow-auto p-6">
        {!items.length&&<div className="grid h-full place-items-center text-center"><div><Heart className="mx-auto text-bronze"/><h4 className="mt-4 font-display text-4xl">Save what feels right.</h4><p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-black/50">Shortlist styles from Shop, then bring them into your bespoke brief.</p></div></div>}
        {items.map(item=><div key={item.id} className="flex gap-4 border border-black/10 bg-white p-3"><img loading="lazy" decoding="async" src={item.image} alt="" className="h-28 w-24 object-cover"/><div className="flex-1"><div className="text-[9px] font-bold uppercase tracking-[.16em] text-bronze">{item.category}</div><div className="mt-1 font-display text-2xl leading-none">{item.name}</div><button onClick={()=>remove(item.id)} className="mt-4 text-[10px] font-bold uppercase tracking-wider text-black/45 underline">Remove</button></div></div>)}
      </div>
      <div className="border-t border-black/10 p-6"><button disabled={!items.length} onClick={()=>{close();navigate('/bespoke')}} className="w-full rounded-full bg-ink px-6 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-white disabled:opacity-30">Use shortlist in bespoke brief</button></div>
    </motion.aside>
  </>}</AnimatePresence>
}

function MobileConversionBar(){
  const {pathname}=useLocation()
  if(pathname==='/admin') return null
  return <div
    data-testid="mobile-sticky-cta"
    className="mobile-sticky-cta fixed bottom-2 left-2 right-2 z-[70] grid grid-cols-[1.22fr_.78fr] overflow-hidden border border-black/25 bg-[#080706]/98 text-white shadow-[0_18px_44px_rgba(0,0,0,.38)] backdrop-blur-xl md:hidden"
  >
    <Link to="/bespoke" className="flex min-h-[62px] items-center justify-between gap-3 bg-[#98724e] px-4 text-white transition active:bg-[#866342]">
      <span className="min-w-0"><span className="block text-[7px] font-semibold uppercase tracking-[.18em] text-white/65">{siteContent.sticky.kicker}</span><span className="mt-0.5 block text-[13px] font-semibold tracking-[.015em] text-white">{siteContent.sticky.primary}</span></span>
      <ArrowRight size={16} className="shrink-0 text-white"/>
    </Link>
    <a href={wa()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="flex min-h-[62px] items-center justify-center gap-2 border-l border-white/10 bg-[#080706] px-3 text-[11px] font-semibold text-white transition active:bg-[#15110e]">
      <MessageCircle size={17} className="shrink-0 text-[#6ee7a0]"/><span>{siteContent.sticky.whatsapp}</span>
    </a>
  </div>
}

function Kicker({children,light=false}){return <div className={`text-[9px] font-bold uppercase tracking-[.21em] ${light?'text-white/50':'text-bronze'}`}>{children}</div>}
function PrimaryLink({to,children,light=false,className=''}){return <Link to={to} className={`group inline-flex items-center justify-center gap-3 rounded-[2px] border px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[.13em] transition duration-500 ${light?'border-white bg-white text-ink hover:bg-[#eee7db]':'border-ink bg-ink text-white hover:bg-[#171411]'} ${className}`}><span>{children}</span><ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1"/></Link>}
function TextLink({to,children,light=false}){return <Link to={to} className={`group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] ${light?'text-white':'text-ink'}`}>{children}<ArrowUpRight size={14}/></Link>}

function RouteFrame({children}){
  const {pathname}=useLocation()
  return <AnimatePresence mode="wait"><motion.div key={pathname} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.42,ease:[.22,1,.36,1]}}>{children}</motion.div></AnimatePresence>
}

function HomePage(){
  const heroImage='https://images.unsplash.com/photo-1668202849897-846a0c405763?auto=format&fit=crop&w=2400&q=94'
  return <main>
    <section id="home-hero" className="hero-stage relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute left-[43%] top-0 hidden h-full w-px bg-white/[.04] lg:block"/>
      <div className="hero-shell mx-auto grid max-w-[1480px] lg:min-h-[820px] lg:grid-cols-[.82fr_1.18fr]">
        <div className="hero-copy order-2 relative z-20 mx-4 -mt-[88px] border border-white/10 bg-[#0b0908]/98 px-5 pb-8 pt-7 shadow-[0_28px_65px_rgba(0,0,0,.32)] backdrop-blur sm:mx-6 sm:-mt-24 sm:px-7 sm:pb-11 sm:pt-9 lg:order-1 lg:m-0 lg:flex lg:items-end lg:border-0 lg:bg-transparent lg:px-12 lg:pb-20 lg:pt-24 lg:shadow-none lg:backdrop-blur-none xl:px-16 xl:pb-24">
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.78,ease:[.22,1,.36,1]}} className="w-full max-w-[650px]">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
              <div data-testid="hero-trust-desktop" className="hidden max-w-full items-center gap-2.5 border border-[#d7b38e]/35 bg-[#f5eadc] px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[.11em] text-[#17120e] shadow-[0_8px_24px_rgba(0,0,0,.12)] lg:inline-flex"><ShieldCheck size={13} className="shrink-0 text-[#8f6b48]"/>{siteContent.hero.trust}</div>
              <div className="hidden text-[8px] font-semibold uppercase tracking-[.18em] text-[#caa177]/70 sm:block lg:hidden">01 / Bespoke</div>
            </div>
            <h1 className="display-tight mt-6 max-w-[650px] font-display text-[clamp(3.25rem,12.5vw,5.25rem)] font-medium leading-[.82] sm:text-[clamp(4.6rem,9vw,6.2rem)] lg:text-[clamp(5.2rem,5.45vw,6.75rem)]">{siteContent.hero.headingPrimary}<br/><span className="italic text-[#caa177]">{siteContent.hero.headingAccent}</span></h1>
            <p className="mt-5 max-w-[510px] text-[13px] leading-6 text-white/62 sm:mt-6 sm:text-[15px] sm:leading-7">{siteContent.hero.body}</p>

            <div className="hero-signals mt-6 grid grid-cols-2 border-y border-white/10" data-testid="hero-planning-signals">
              <div className="py-4 pr-4">
                <div className="text-[7px] font-semibold uppercase tracking-[.17em] text-white/35">Suit starting rate</div>
                <div className="mt-1 font-display text-[1.35rem] leading-none text-white">{siteContent.planning.suitFrom||siteContent.planning.fallbackPrice}</div>
              </div>
              <div className="border-l border-white/10 py-4 pl-4">
                <div className="text-[7px] font-semibold uppercase tracking-[.17em] text-white/35">Typical turnaround</div>
                <div className="mt-1 font-display text-[1.35rem] leading-none text-white">{siteContent.planning.leadTime||siteContent.planning.fallbackLead}</div>
              </div>
            </div>

            <div className="mt-5 grid max-w-[450px] gap-2.5 sm:flex sm:items-center sm:gap-3">
              <PrimaryLink to="/bespoke" light className="w-full sm:w-auto">Start an order</PrimaryLink>
              <Link to="/collections" className="group inline-flex w-full items-center justify-center gap-2 border border-white/16 px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[.13em] text-white/74 transition hover:border-white/36 hover:text-white sm:w-auto">View collections <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></Link>
            </div>
            <div className="mt-8 hidden grid-cols-3 border-y border-white/10 text-[8px] font-semibold uppercase tracking-[.14em] text-white/38 sm:grid">
              <div className="py-4 pr-4">Precision fit</div><div className="border-x border-white/10 px-4 py-4">Clean finishing</div><div className="py-4 pl-4">Made to measure</div>
            </div>
          </motion.div>
        </div>

        <div className="hero-artboard order-1 relative min-h-[500px] overflow-hidden sm:min-h-[620px] lg:order-2 lg:min-h-[820px] lg:overflow-visible">
          <div className="hero-main-frame absolute inset-0 lg:bottom-8 lg:left-0 lg:right-[82px] lg:top-8">
            <img loading="eager" fetchPriority="high" decoding="async" src={heroImage} alt="Nigerian man in a tailored suit" className="hero-main-image absolute inset-0 h-full w-full object-cover"/>
            <div className="hero-image-blend pointer-events-none absolute inset-0"/>
            <div data-testid="hero-trust-mobile" className="hero-mobile-trust absolute left-4 right-4 top-4 z-10 flex items-center justify-between gap-3 border border-[#f1d2b2] bg-[#d9a36f] px-4 py-3.5 text-[#120d09] shadow-[0_16px_38px_rgba(0,0,0,.3)] sm:left-6 sm:right-auto sm:top-6 sm:max-w-[390px] lg:hidden">
              <div className="inline-flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[.09em] leading-4"><span className="grid h-8 w-8 shrink-0 place-items-center bg-[#100c09] text-[#f6d5b5]"><ShieldCheck size={15}/></span><span>{siteContent.hero.trust}</span></div>
              <span className="hidden shrink-0 font-display text-2xl text-[#392719] min-[390px]:block">01</span>
            </div>
          </div>

          <div className="hero-rail absolute bottom-8 right-0 top-8 hidden w-[82px] border-y border-r border-white/10 bg-[#0c0a09] lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-7">
            <div className="font-display text-3xl text-[#caa177]">01</div>
            <div className="vertical-rl text-[8px] font-semibold uppercase tracking-[.22em] text-white/42">Bespoke · fit · finish</div>
            <div className="h-12 w-px bg-gradient-to-b from-[#caa177]/10 via-[#caa177]/70 to-[#caa177]/10"/>
          </div>

          <div className="hero-detail-card absolute bottom-16 left-[-54px] z-10 hidden h-[225px] w-[168px] overflow-hidden border border-[#caa177]/35 bg-black shadow-[0_22px_60px_rgba(0,0,0,.38)] lg:block xl:left-[-72px] xl:h-[250px] xl:w-[186px]">
            <img loading="lazy" decoding="async" src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover"/>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/18 to-transparent p-4 pt-14">
              <div className="text-[7px] font-semibold uppercase tracking-[.18em] text-white/48">Tailoring detail</div>
              <div className="mt-1 font-display text-2xl text-white">Lapel & line</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div id="home-after-hero"><RemoteFitAssurance/></div>
    <EntryPaths/>
    <HomeCollections/>
    <FabricSection/>
    <WorkshopMotion/>
    <ProcessSection/>
    <HomeLookbook/>
    <FounderSection/>
    <ConversionBand/>
  </main>
}
function RemoteFitAssurance({dark=false}){
  const steps=[
    ['01','Send measurements','Use the guide or book a fitting in Ife.'],
    ['02','Review','OVOSKG checks the numbers before cutting.'],
    ['03','Fit correction','If the delivered fit is off, the garment is checked against the approved measurements.']
  ]
  return <section className={`cv-auto ${dark?'bg-ink text-white':'bg-bone text-ink'}`}><div className="mx-auto max-w-[1480px] px-4 py-14 sm:px-7 lg:py-20"><div className="grid gap-10 lg:grid-cols-[.36fr_.64fr]"><div><Kicker light={dark}>{siteContent.homeSections.remote.eyebrow}</Kicker><h2 className="mt-3 max-w-xl font-display text-4xl leading-[.98] sm:text-5xl">{siteContent.homeSections.remote.title}</h2><p className={`mt-4 max-w-md text-xs leading-6 ${dark?'text-white/45':'text-black/48'}`}>{siteContent.homeSections.remote.body}</p></div><div className={`grid gap-px ${dark?'bg-white/10':'bg-black/10'} sm:grid-cols-3`}>{steps.map(([n,title,text])=><motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:.68}} key={n} className={`p-5 sm:p-7 ${dark?'bg-ink':'bg-[#fbf8f2]'}`}><div className="font-display text-3xl text-bronze">{n}</div><b className="mt-5 block text-sm">{title}</b><p className={`mt-2 text-xs leading-5 ${dark?'text-white/42':'text-black/46'}`}>{text}</p></motion.div>)}</div></div></div></section>
}

function EntryPaths(){
  const paths=[
    {n:'01',title:'Making something new?',text:'Tell us the garment, date and occasion.',to:'/bespoke'},
    {n:'02',title:'Still choosing?',text:'Browse suits, women’s tailoring and kaftans.',to:'/collections'},
    {n:'03',title:'Order already placed?',text:'Check the current production stage.',to:'/track'}
  ]
  return <section className="cv-auto mx-auto max-w-[1480px] px-4 py-20 sm:px-7 lg:py-32"><div className="grid gap-10 lg:grid-cols-[.58fr_1.42fr]"><div><Kicker>{siteContent.homeSections.entry.eyebrow}</Kicker><h2 className="display-tight mt-4 font-display text-6xl leading-[.88] sm:text-7xl">{siteContent.homeSections.entry.title}</h2></div><div className="grid gap-0 border-t border-black/12">{paths.map(p=><motion.div key={p.n} initial="hidden" whileInView="show" viewport={{once:true,amount:.3}} variants={reveal}><Link to={p.to} className="card-lift group grid min-h-36 grid-cols-[54px_1fr_auto] items-center gap-5 border-b border-black/12 bg-transparent px-1 py-6 sm:grid-cols-[72px_1fr_auto] sm:px-2 sm:py-8"><div className="font-display text-4xl text-bronze">{p.n}</div><div><h3 className="font-display text-3xl leading-none sm:text-4xl">{p.title}</h3><p className="mt-3 max-w-xl text-xs leading-6 text-black/50 sm:text-sm">{p.text}</p></div><div className="hidden h-12 w-12 place-items-center rounded-[2px] border border-black/12 transition group-hover:bg-ink group-hover:text-white sm:grid"><ArrowUpRight size={16}/></div></Link></motion.div>)}</div></div></section>
}

function HomeCollections(){
  return <section className="cv-auto bg-[#e8dfd2] py-24 lg:py-32"><div className="mx-auto max-w-[1480px] px-4 sm:px-7">
    <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><div><Kicker>{siteContent.homeSections.collections.eyebrow}</Kicker><h2 className="display-tight mt-4 max-w-4xl font-display text-5xl leading-[.9] sm:text-7xl lg:text-[6.8rem]">{siteContent.homeSections.collections.titlePrimary}<br/>{siteContent.homeSections.collections.titleAccent}</h2></div><div className="max-w-md"><p className="text-sm leading-7 text-black/55">{siteContent.homeSections.collections.body}</p><TextLink to="/collections">Browse collections</TextLink></div></div>
    <div className="mt-14 grid gap-3 lg:grid-cols-12 lg:grid-rows-[430px_430px]">{collections.map((c,i)=><motion.div key={c.id} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true,amount:.18}} transition={{duration:.72,delay:i*.05}} className={`${i===0?'lg:col-span-7 lg:row-span-2':'lg:col-span-5'}`}><Link to={`/collections/${c.id}`} className="collection-card image-zoom group relative block h-full min-h-[420px] overflow-hidden bg-ink"><img loading="lazy" decoding="async" src={c.image} alt={c.imageAlt} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/4 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8"><Kicker light>{c.index}</Kicker><h3 className="mt-2 max-w-xl font-display text-4xl leading-none sm:text-5xl">{c.title}</h3><p className="mt-3 max-w-md text-xs leading-5 text-white/58">{c.short}</p><div className="mt-5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.14em]">See references <ArrowUpRight size={13}/></div></div></Link></motion.div>)}</div>
  </div></section>
}

function FabricSection(){
  const [active,setActive]=useState(0)
  const material=siteContent.materials[active]||siteContent.materials[0]
  const saveDirection=()=>{
    localStorage.setItem('ovoskg_fabric_interest',material.name)
    track('fabric_direction_selected',{material:material.id})
  }
  return <section id="materials" className="fabric-section cv-auto relative scroll-mt-24 overflow-hidden bg-[#d8ccbc] text-ink">
    <div className="pointer-events-none absolute -right-8 top-8 hidden font-display text-[14rem] leading-none text-black/[.035] xl:block">04</div>
    <div className="mx-auto max-w-[1480px] px-4 py-24 sm:px-7 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[.39fr_.61fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-3"><span className="h-px w-8 bg-[#8f6b48]"/><Kicker>{siteContent.homeSections.materials.eyebrow}</Kicker></div>
          <h2 className="display-tight mt-5 max-w-xl font-display text-6xl leading-[.88] sm:text-7xl lg:text-[5.7rem]">{siteContent.homeSections.materials.title}</h2>
          <p className="mt-7 max-w-lg text-sm leading-7 text-black/58">{siteContent.homeSections.materials.body}</p>
          <div className="mt-8 border-l border-black/15 pl-4 text-[10px] leading-5 text-black/42">{siteContent.homeSections.materials.note}</div>
        </div>

        <div>
          <div className="fabric-stage relative min-h-[430px] overflow-hidden border border-black/10 bg-[#12100e] text-white sm:min-h-[520px]">
            <div className={`fabric-swatch fabric-swatch--${material.id} absolute inset-0 transition-all duration-700`}/>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-black/22 to-black/5"/>
            <div className="absolute left-5 top-5 flex items-center gap-3 text-[8px] font-semibold uppercase tracking-[.18em] text-white/52 sm:left-7 sm:top-7"><span>{material.index}</span><span className="h-px w-10 bg-white/25"/><span>{material.label}</span></div>
            <AnimatePresence mode="wait"><motion.div key={material.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.36,ease:[.22,1,.36,1]}} className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <div className="max-w-2xl">
                <h3 className="font-display text-5xl leading-none sm:text-6xl">{material.name}</h3>
                <p className="mt-4 max-w-xl text-sm leading-6 text-white/62">{material.description}</p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/12 pt-5 text-[8px] font-semibold uppercase tracking-[.14em] text-white/46"><span>{material.use}</span><span>{material.feel}</span></div><div className="mt-4 text-[9px] leading-5 text-white/38">{material.source}</div>
              </div>
            </motion.div></AnimatePresence>
          </div>

          <div className="fabric-selector grid border-x border-b border-black/10 bg-[#eee5d9] sm:grid-cols-2">
            {siteContent.materials.map((item,i)=><button
              key={item.id}
              type="button"
              onMouseEnter={()=>setActive(i)}
              onFocus={()=>setActive(i)}
              onClick={()=>setActive(i)}
              aria-pressed={active===i}
              className={`group flex min-h-[92px] items-center gap-4 border-b border-black/10 px-4 py-4 text-left transition sm:px-5 ${i%2===0?'sm:border-r':''} ${i>1?'sm:border-b-0':''} ${active===i?'bg-[#f8f3eb]':'bg-transparent hover:bg-white/45'}`}
            >
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border text-[9px] font-semibold transition ${active===i?'border-[#8f6b48] bg-[#8f6b48] text-white':'border-black/15 text-black/42'}`}>{item.index}</span>
              <span><span className="block font-display text-2xl leading-none">{item.name}</span><span className="mt-1.5 block text-[8px] font-semibold uppercase tracking-[.14em] text-black/38">{item.label}</span></span>
            </button>)}
          </div>

          <div className="mt-6 flex flex-col justify-between gap-5 border-t border-black/12 pt-6 sm:flex-row sm:items-center">
            <div><div className="text-[8px] font-semibold uppercase tracking-[.17em] text-black/35">Current direction</div><div className="mt-1 font-display text-3xl">{material.name}</div></div>
            <Link to="/bespoke" onClick={saveDirection} className="group inline-flex items-center justify-center gap-3 border border-ink bg-ink px-6 py-4 text-[9px] font-semibold uppercase tracking-[.13em] text-white transition hover:bg-[#1a1714]">Use this in my brief <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1"/></Link>
          </div>
        </div>
      </div>
    </div>
  </section>
}

function WorkshopMotion(){
  return <section id="workshop-motion" className="workshop-motion cv-auto overflow-hidden bg-[#0b0908] text-white">
    <div className="mx-auto max-w-[1480px] px-4 py-24 sm:px-7 lg:py-32">
      <div className="grid gap-10 lg:grid-cols-[.38fr_.62fr] lg:items-end">
        <div>
          <div className="flex items-center gap-3"><span className="h-px w-8 bg-[#d0a476]"/><Kicker light>{siteContent.homeSections.motion.eyebrow}</Kicker></div>
          <h2 className="display-tight mt-5 max-w-xl font-display text-6xl leading-[.88] sm:text-7xl lg:text-[5.6rem]">{siteContent.homeSections.motion.title}</h2>
          <p className="mt-7 max-w-lg text-sm leading-7 text-white/55">{siteContent.homeSections.motion.body}</p>
          <p className="mt-6 max-w-md border-l border-[#d0a476]/45 pl-4 text-[9px] leading-5 text-white/35">{siteContent.homeSections.motion.note}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {siteContent.motionClips.map((clip,i)=><article key={clip.id} className={`workshop-clip group relative overflow-hidden border border-white/10 bg-[#15110e] ${i===0?'sm:translate-y-8':''}`}>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#17120f]">
              <video
                className="workshop-video h-full w-full object-cover"
                src={clip.url}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                aria-label={clip.label}
              />
              <div className="workshop-video-fallback absolute inset-0 hidden bg-[radial-gradient(circle_at_40%_30%,rgba(205,162,119,.18),transparent_34%),linear-gradient(135deg,#2a211b,#0d0b09)]"/>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/78 via-transparent to-black/8"/>
              <div className="absolute left-4 top-4 grid h-9 w-9 place-items-center border border-white/18 bg-black/22 text-[8px] font-semibold text-white/65">{String(i+1).padStart(2,'0')}</div>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="text-[7px] font-semibold uppercase tracking-[.18em] text-[#d4ab83]">{clip.meta}</div>
                <div className="mt-1 font-display text-3xl">{clip.label}</div>
                <a href={clip.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[.12em] text-white/42 transition hover:text-white/72">{clip.sourceLabel}<ArrowUpRight size={10}/></a>
              </div>
            </div>
          </article>)}
        </div>
      </div>
    </div>
  </section>
}

function ProcessSection(){
  const process=[
    ['01','Brief','Garment, occasion and date.'],
    ['02','Measurements','Visit Ife or send them for review.'],
    ['03','Approval','Confirm cloth, details, price and timing.'],
    ['04','Production','Follow the order through the workshop stages.'],
    ['05','Handover','Collect or receive the finished piece.']
  ]
  return <section className="bg-[#0a0908] py-24 text-white lg:py-32"><div className="mx-auto grid max-w-[1480px] gap-14 px-4 sm:px-7 lg:grid-cols-[.78fr_1.22fr]">
    <div className="lg:sticky lg:top-32 lg:self-start"><Kicker light>{siteContent.homeSections.process.eyebrow}</Kicker><h2 className="display-tight mt-4 font-display text-6xl leading-[.86] sm:text-7xl">{siteContent.homeSections.process.titlePrimary}<br/><span className="italic text-[#caa177]">{siteContent.homeSections.process.titleAccent}</span></h2><p className="mt-7 max-w-lg text-sm leading-7 text-white/52">{siteContent.homeSections.process.body}</p><PrimaryLink to="/bespoke" light className="mt-8">Build your brief</PrimaryLink></div>
    <div className="divide-y divide-white/10 border-y border-white/10">{process.map(([n,title,text])=><motion.div key={n} initial={{opacity:.3}} whileInView={{opacity:1}} viewport={{amount:.55}} transition={{duration:.65}} className="grid min-h-32 grid-cols-[64px_1fr] gap-6 py-7 sm:grid-cols-[90px_1fr]"><div className="font-display text-4xl text-[#caa177]">{n}</div><div><h3 className="font-display text-4xl">{title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-white/45">{text}</p></div></motion.div>)}</div>
  </div></section>
}

function HomeLookbook(){
  const layout=['lg:col-span-5 lg:row-span-2','lg:col-span-3 lg:row-span-2','lg:col-span-4 lg:row-span-1','lg:col-span-4 lg:row-span-1']
  return <section className="bg-bone py-24 lg:py-32"><div className="mx-auto max-w-[1480px] px-4 sm:px-7">
    <div className="flex flex-col justify-between gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end"><div><Kicker>{siteContent.homeSections.selected.eyebrow}</Kicker><h2 className="display-tight mt-4 max-w-4xl font-display text-6xl leading-[.9] sm:text-7xl">{siteContent.homeSections.selected.title}</h2></div><TextLink to="/collections">Browse collections</TextLink></div>
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[230px]">{lookbook.slice(0,4).map((item,i)=><motion.article key={item.id} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true,amount:.16}} transition={{duration:.68,delay:i*.05}} className={`image-zoom group relative min-h-[360px] overflow-hidden bg-oat sm:min-h-[440px] lg:min-h-0 ${layout[i]}`}><img loading="lazy" decoding="async" src={item.image} alt={item.label} className="h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/4 to-transparent"/><div className="absolute left-4 top-4 grid h-8 w-8 place-items-center border border-white/20 text-[8px] font-semibold text-white/70">{String(i+1).padStart(2,'0')}</div><div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6"><div className="text-[8px] font-bold uppercase tracking-[.16em] text-white/50">{item.category}</div><div className="mt-1 font-display text-3xl sm:text-4xl">{item.label}</div></div></motion.article>)}</div>
  </div></section>
}
function FounderSection(){
  return <section className="luxury-grid bg-oat py-24 lg:py-32"><div className="mx-auto grid max-w-[1480px] gap-14 px-4 sm:px-7 lg:grid-cols-[.94fr_1.06fr] lg:items-center">
    <motion.div initial={{opacity:0,scale:.99}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:.7}} className="founder-frame relative min-h-[540px] overflow-hidden bg-ink sm:min-h-[620px] lg:min-h-[680px]"><img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1622031093531-f4e641788763?auto=format&fit=crop&w=2000&q=94" alt="African man wearing a tailored suit" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/5"/><div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8"><div className="flex items-end justify-between gap-5"><div><Kicker light>OVOSKG</Kicker><div className="mt-2 max-w-lg font-display text-4xl leading-none">{siteContent.homeSections.founder.imageCaption}</div></div><div className="hidden border-l border-white/18 pl-4 text-[8px] font-semibold uppercase tracking-[.18em] text-white/42 sm:block">Established<br/>2023</div></div></div></motion.div>
    <motion.div initial="hidden" whileInView="show" viewport={{once:true,amount:.3}} variants={reveal} className="lg:pl-8"><Kicker>{siteContent.homeSections.founder.eyebrow}</Kicker><h2 className="display-tight mt-4 font-display text-6xl leading-[.88] sm:text-7xl">{siteContent.homeSections.founder.title}</h2><p className="mt-7 max-w-xl text-sm leading-7 text-black/56">{siteContent.homeSections.founder.body}</p><div className="mt-9 grid grid-cols-2 border-y border-black/12"><div className="py-5 pr-5"><div className="font-display text-5xl text-bronze">2023</div><p className="mt-2 text-xs text-black/45">formally established</p></div><div className="border-l border-black/12 py-5 pl-5"><div className="font-display text-5xl text-bronze">800+</div><p className="mt-2 text-xs text-black/45">custom pieces delivered across Nigeria</p></div></div><div className="mt-8 flex flex-wrap gap-5"><TextLink to="/about">Read the story</TextLink><a href={instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-black/55">Instagram <ArrowUpRight size={14}/></a></div></motion.div>
  </div></section>
}

function ConversionBand(){
  return <section className="relative overflow-hidden bg-[#17110d] py-24 text-white lg:py-28"><div className="relative mx-auto max-w-[1480px] px-4 sm:px-7"><div className="border-l border-[#caa177]/55 pl-5 sm:pl-8"><Kicker light>{siteContent.homeSections.conversion.eyebrow}</Kicker><h2 className="display-tight mt-5 max-w-5xl font-display text-5xl leading-[.9] sm:text-7xl lg:text-[6.8rem]">{siteContent.homeSections.conversion.title}</h2><div className="mt-9 flex flex-wrap gap-3"><PrimaryLink to="/bespoke" light>Build a brief</PrimaryLink><Link to="/contact" className="inline-flex items-center gap-2 rounded-[2px] border border-white/22 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[.13em] text-white/80 transition hover:border-white/40 hover:text-white">Contact OVOSKG <MessageCircle size={14}/></Link></div></div></div></section>
}

function PageHero({eyebrow,title,intro,aside}){
  return <section className="page-hero relative overflow-hidden bg-ink py-20 text-white sm:py-24 lg:py-28">
    <div className="pointer-events-none absolute right-[8%] top-0 hidden h-full w-px bg-white/[.045] lg:block"/>
    <div className="relative mx-auto grid max-w-[1480px] gap-10 px-4 sm:px-7 lg:grid-cols-[1.12fr_.88fr] lg:items-end">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.52,ease:[.22,1,.36,1]}}>
        <div className="flex items-center gap-3"><span className="h-px w-8 bg-[#caa177]/70"/><Kicker light>{eyebrow}</Kicker></div>
        <h1 className="display-tight mt-5 max-w-5xl font-display text-6xl leading-[.86] sm:text-7xl lg:text-[6.4rem]">{title}</h1>
      </motion.div>
      <div className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"><p className="max-w-xl text-sm leading-7 text-white/56 sm:text-base">{intro}</p>{aside}</div>
    </div>
  </section>
}

function ManagedPageHero({pageKey,aside}){
  const page=managedPage(pageKey)
  return <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} aside={aside}/>
}

function CollectionsPage(){
  return <main><ManagedPageHero pageKey="collections"/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28">{collections.map((c,i)=><motion.article key={c.id} initial="hidden" whileInView="show" viewport={{once:true,amount:.18}} variants={reveal} className="grid gap-7 border-t border-black/10 py-12 lg:grid-cols-[.34fr_.66fr] lg:py-16"><div className="flex flex-col justify-between"><div><div className="font-display text-5xl text-bronze">{c.index}</div><h2 className="mt-5 max-w-md font-display text-5xl leading-[.92] sm:text-6xl">{c.title}</h2><p className="mt-5 max-w-md text-sm leading-7 text-black/55">{c.body}</p><div className="mt-6 flex flex-wrap gap-2">{c.tags.map(tag=><span key={tag} className="rounded-full border border-black/12 px-3 py-2 text-[9px] font-bold uppercase tracking-[.12em]">{tag}</span>)}</div></div><PrimaryLink to={`/collections/${c.id}`} className="mt-8 self-start">View references</PrimaryLink></div><div><Link to={`/collections/${c.id}`} className="image-zoom relative block min-h-[430px] overflow-hidden bg-oat sm:min-h-[560px]"><img loading="lazy" decoding="async" src={c.image} alt={c.imageAlt} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/46 via-transparent to-transparent"/><div className="absolute bottom-5 left-5 rounded-full bg-white/92 px-4 py-2 text-[9px] font-bold uppercase tracking-[.13em] text-ink">{c.styles.length} references</div></Link><div className="scrollbar-hide mt-3 flex gap-3 overflow-x-auto">{c.styles.slice(0,4).map(style=><Link key={style.name} to={`/collections/${c.id}`} className="relative aspect-[4/5] w-36 shrink-0 overflow-hidden bg-oat sm:w-44"><img loading="lazy" decoding="async" src={style.image} alt={style.name} className="h-full w-full object-cover"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 p-3 pt-10 text-[9px] font-bold uppercase tracking-[.11em] text-white">{style.name}</div></Link>)}</div></div></motion.article>)}</section><ConversionBand/></main>
}

function CollectionDetailPage(){
  const {collectionId}=useParams()
  const collection=collections.find(item=>item.id===collectionId)
  const collectionCopy=collection?managedPage(collection.id):{}
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
    track('reference_saved',{collection:collection.id,style:style.name})
  }
  return <main>
    <section className="cloth-deep relative overflow-hidden text-white"><div className="mx-auto grid min-h-[680px] max-w-[1540px] lg:grid-cols-[.82fr_1.18fr]"><div className="flex flex-col justify-end px-4 py-16 sm:px-7 lg:p-14"><Kicker light>{collection.index} / {collectionCopy.eyebrow||'Mini lookbook'}</Kicker><h1 className="display-tight mt-5 font-display text-6xl leading-[.84] sm:text-7xl">{collectionCopy.title||collection.title}</h1><p className="mt-6 max-w-xl text-sm leading-7 text-white/55">{collectionCopy.intro||collection.body}</p><div className="mt-7 flex flex-wrap gap-2">{collection.tags.map(tag=><span key={tag} className="rounded-[2px] border border-white/16 px-3 py-2 text-[8px] font-bold uppercase tracking-[.13em] text-white/62">{tag}</span>)}</div></div><div className="relative min-h-[430px] overflow-hidden lg:min-h-0"><img loading="lazy" decoding="async" src={collection.image} alt={collection.imageAlt} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-transparent"/><div className="absolute bottom-5 left-5 bg-bone px-4 py-3 text-ink"><div className="text-[8px] font-bold uppercase tracking-[.15em] text-bronze">{collection.styles.length} references</div><div className="mt-1 font-display text-2xl">Review the options before you order.</div></div></div></div></section>
    <section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="grid gap-8 lg:grid-cols-[.33fr_.67fr]"><div className="lg:sticky lg:top-28 lg:self-start"><Kicker>References</Kicker><h2 className="display-tight mt-4 font-display text-5xl leading-[.9] sm:text-6xl">Save the ones you want to discuss.</h2><p className="mt-5 text-sm leading-7 text-black/52">Use these images to explain the shape and details you prefer.</p><PrimaryLink to="/bespoke" className="mt-7">Start bespoke</PrimaryLink></div><div className="grid gap-x-4 gap-y-10 sm:grid-cols-2">{collection.styles.map((style,i)=>{const id=`${collection.id}-${style.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`;const isSaved=saved.some(x=>x.id===id);return <motion.article key={style.name} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:Math.min(i*.05,.22)}} className="group"><div className="image-zoom relative aspect-[4/5] overflow-hidden bg-oat"><img loading="lazy" decoding="async" src={style.image} alt={style.name} className="h-full w-full object-cover"/><div className="absolute left-4 top-4 rounded-full bg-black/58 px-3 py-2 text-[8px] font-bold uppercase tracking-[.13em] text-white backdrop-blur">{style.detail}</div></div><div className="pt-5"><div className="text-[8px] font-bold uppercase tracking-[.16em] text-bronze">{String(i+1).padStart(2,'0')} / Reference</div><h3 className="mt-2 font-display text-3xl leading-none sm:text-4xl">{style.name}</h3><p className="mt-3 text-sm leading-6 text-black/50">{style.note}</p><button onClick={()=>useReference(style)} className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[9px] font-bold uppercase tracking-[.13em] ${isSaved?'bg-bronze text-white':'border border-black/16 text-ink'}`}>{isSaved?<><Check size={13}/> Saved as reference</>:<>Use as reference <Plus size={13}/></>}</button></div></motion.article>})}</div></div></section>
    <ConversionBand/>
  </main>
}

function ShopPage(){
  const [filter,setFilter]=useState('All')
  const [query,setQuery]=useState('')
  const filters=['All','Suits','Women','Kaftan','Occasion']
  const visible=useMemo(()=>pieces.filter(p=>(filter==='All'||p.category===filter)&&p.name.toLowerCase().includes(query.toLowerCase())),[filter,query])
  return <main><ManagedPageHero pageKey="shop"/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="sticky top-[90px] z-20 -mx-4 mb-10 border-y border-black/10 bg-bone/94 px-4 py-4 backdrop-blur sm:-mx-7 sm:px-7"><div className="mx-auto flex max-w-[1540px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="scrollbar-hide flex gap-2 overflow-x-auto">{filters.map(f=><button key={f} onClick={()=>setFilter(f)} className={`whitespace-nowrap rounded-full px-4 py-2 text-[9px] font-bold uppercase tracking-[.13em] ${filter===f?'bg-ink text-white':'border border-black/12'}`}>{f}</button>)}</div><label className="flex items-center gap-2 border-b border-black/20 pb-2"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} className="w-full bg-transparent text-sm outline-none lg:w-64" placeholder="Search style direction"/></label></div></div><div className="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{visible.map((p,i)=><ProductCard key={p.id} piece={p} index={i}/>)}</div></section></main>
}

function ProductCard({piece,index}){
  const [saved,setSaved]=useState(()=>JSON.parse(localStorage.getItem('ovoskg_shortlist')||'[]').some(x=>x.id===piece.id))
  const toggle=()=>{
    let list=JSON.parse(localStorage.getItem('ovoskg_shortlist')||'[]')
    list=saved?list.filter(x=>x.id!==piece.id):[...list,piece]
    localStorage.setItem('ovoskg_shortlist',JSON.stringify(list))
    setSaved(!saved)
    window.dispatchEvent(new Event('ovoskg-shortlist'))
    track(saved?'shortlist_removed':'shortlist_added',{piece:piece.id})
  }
  return <motion.article initial={{opacity:0}} animate={{opacity:1}} transition={{delay:Math.min(index*.04,.28)}} className="group"><div className="image-zoom relative aspect-[4/5] overflow-hidden bg-oat"><img loading="lazy" decoding="async" src={piece.image} alt={piece.name} className="h-full w-full object-cover"/><button onClick={toggle} aria-label={saved?'Remove from shortlist':'Add to shortlist'} className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full backdrop-blur ${saved?'bg-ink text-white':'bg-white/85 text-ink'}`}><Heart size={16} fill={saved?'currentColor':'none'}/></button><div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-2 text-[8px] font-bold uppercase tracking-[.14em]">Made to order</div></div><div className="flex items-start justify-between gap-3 pt-4"><div><div className="text-[8px] font-bold uppercase tracking-[.16em] text-bronze">{piece.category} · {piece.gender}</div><h3 className="mt-1 font-display text-3xl leading-none">{piece.name}</h3><p className="mt-2 text-xs text-black/42">{piece.descriptor}</p></div><Link to="/bespoke" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/12 transition group-hover:bg-ink group-hover:text-white"><ArrowUpRight size={15}/></Link></div></motion.article>
}

function LookbookPage(){
  const [filter,setFilter]=useState('All')
  const filters=['All','Suits','Women','Kaftan']
  const visible=filter==='All'?lookbook:lookbook.filter(x=>x.category===filter)
  return <main><ManagedPageHero pageKey="lookbook"/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="scrollbar-hide mb-10 flex gap-2 overflow-x-auto">{filters.map(f=><button key={f} onClick={()=>setFilter(f)} className={`rounded-full px-4 py-2 text-[9px] font-bold uppercase tracking-[.13em] ${filter===f?'bg-ink text-white':'border border-black/12'}`}>{f}</button>)}</div><div className="columns-1 gap-3 sm:columns-2 lg:columns-3">{visible.map((item,i)=><motion.figure key={item.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:Math.min(i*.04,.25)}} className="image-zoom group relative mb-3 break-inside-avoid overflow-hidden bg-oat"><img loading="lazy" decoding="async" src={item.image} alt={item.label} className={`w-full object-cover ${i%3===0?'aspect-[4/5]':'aspect-[3/4]'}`}/><div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent"/><figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white"><div><div className="text-[8px] font-bold uppercase tracking-[.16em] text-white/50">{item.category}</div><div className="mt-1 font-display text-3xl">{item.label}</div></div><Link to="/bespoke" className="grid h-10 w-10 place-items-center rounded-full border border-white/25 backdrop-blur" aria-label="Use this direction"><ArrowUpRight size={15}/></Link></figcaption></motion.figure>)}</div></section><ConversionBand/></main>
}

function PlanningStrip(){
  const items=[
    ["Men's suit",siteContent.planning.suitFrom||siteContent.planning.fallbackPrice],
    ["Women's suit",siteContent.planning.womensFrom||siteContent.planning.fallbackPrice],
    ["Luxury kaftan",siteContent.planning.kaftanFrom||siteContent.planning.fallbackPrice],
    ["Typical turnaround",siteContent.planning.leadTime||siteContent.planning.fallbackLead]
  ]
  return <section data-testid="planning-strip" className="border-b border-black/10 bg-[#ece3d6]"><div className="mx-auto max-w-[1480px] px-4 sm:px-7"><div className="grid grid-cols-2 lg:grid-cols-4">{items.map(([label,value],i)=><div key={label} className={`min-h-[100px] py-5 ${i%2===1?'border-l border-black/10 pl-4':'pr-4'} ${i>1?'border-t border-black/10 lg:border-t-0':''} ${i>0?'lg:border-l lg:pl-5':''}`}><div className="text-[7px] font-semibold uppercase tracking-[.16em] text-black/34">{label}</div><div className="mt-2 font-display text-2xl leading-none text-ink sm:text-3xl">{value}</div></div>)}</div><p className="border-t border-black/10 py-3 text-[9px] leading-5 text-black/42">{siteContent.planning.note}</p></div></section>
}

function BespokePage(){
  const saved=JSON.parse(localStorage.getItem('ovoskg_shortlist')||'[]')
  const [step,setStep]=useState(0)
  const [form,setForm]=useState({piece:"Men's bespoke suit",occasion:'',colour:'',fabric:localStorage.getItem('ovoskg_fabric_interest')||'',measure:'Virtual measurements',deadline:'',notes:'',contact:''})
  const update=(key,value)=>setForm({...form,[key]:value})
  const steps=['Piece','Direction','Fit','Contact','Review']
  return <main><ManagedPageHero pageKey="bespoke"/><PlanningStrip/><RemoteFitAssurance dark/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="grid gap-10 lg:grid-cols-[.34fr_.66fr]"><aside><div className="lg:sticky lg:top-28">{steps.map((s,i)=><button key={s} onClick={()=>setStep(i)} className={`flex w-full items-center justify-between border-b py-4 text-left ${i===step?'border-ink':'border-black/10'}`}><span className="font-display text-2xl">{String(i+1).padStart(2,'0')} · {s}</span>{i<step&&<Check size={15} className="text-bronze"/>}</button>)}{saved.length>0&&<div className="mt-7 bg-oat p-5"><Kicker>Saved references</Kicker><div className="mt-3 flex -space-x-2">{saved.slice(0,4).map(x=><img loading="lazy" decoding="async" key={x.id} src={x.image} alt="" className="h-12 w-12 rounded-full border-2 border-oat object-cover"/>)}{saved.length>4&&<div className="grid h-12 w-12 place-items-center rounded-full border-2 border-oat bg-ink text-[9px] font-bold text-white">+{saved.length-4}</div>}</div><p className="mt-3 text-xs leading-5 text-black/48">These saved images will be included with your order brief.</p></div>}</div></aside><div className="editorial-shadow min-h-[620px] bg-white p-6 sm:p-10 lg:p-12">{step===0&&<WizardStep title="What are we making?"><Choice options={["Men's bespoke suit","Women's bespoke suit","Luxury men's kaftan","Other custom commission"]} value={form.piece} onChange={v=>update('piece',v)}/></WizardStep>}{step===1&&<WizardStep title="Add the details"><div className="grid gap-5 sm:grid-cols-2"><Field label="Occasion"><input value={form.occasion} onChange={e=>update('occasion',e.target.value)} placeholder="Wedding, work, ceremony..."/></Field><Field label="Preferred colour"><input value={form.colour} onChange={e=>update('colour',e.target.value)} placeholder="Navy, black, cream..."/></Field><Field label="Preferred cloth"><input value={form.fabric} onChange={e=>update('fabric',e.target.value)} placeholder="Wool, textured, lightweight..."/><div className="mt-3 flex flex-wrap gap-2">{siteContent.materials.map(item=><button type="button" key={item.id} onClick={()=>update('fabric',item.name)} className={`border px-3 py-2 text-[8px] font-semibold uppercase tracking-[.11em] transition ${form.fabric===item.name?'border-[#98724e] bg-[#98724e] text-white':'border-black/12 text-black/45 hover:border-black/30'}`}>{item.name}</button>)}</div></Field><Field label="Target date"><input type="date" value={form.deadline} onChange={e=>update('deadline',e.target.value)}/></Field></div></WizardStep>}{step===2&&<WizardStep title="How should we confirm fit?"><Choice options={['Virtual measurements','Use saved measurement profile','Book a physical fitting']} value={form.measure} onChange={v=>update('measure',v)}/><div className="mt-6"><Field label="Fit and detail notes"><textarea rows="5" value={form.notes} onChange={e=>update('notes',e.target.value)} placeholder="Fit preference, lapel, initials, embroidery, reference details..."/></Field></div></WizardStep>}{step===3&&<WizardStep title="How should OVOSKG reach you?"><Field label="Phone or WhatsApp number"><input value={form.contact} onChange={e=>update('contact',e.target.value)} placeholder="e.g. 0800 000 0000"/></Field><div className="mt-6 bg-oat p-5 text-xs leading-6 text-black/50"><b className="text-ink">What happens next:</b> OVOSKG reviews the brief, clarifies anything missing, confirms the measurement path and prepares the quote before payment.</div></WizardStep>}{step===4&&<WizardStep title="Review the commission"><div className="divide-y divide-black/10 border-y border-black/10">{Object.entries(form).map(([key,value])=><div key={key} className="grid grid-cols-[110px_1fr] gap-4 py-4 text-sm sm:grid-cols-[150px_1fr]"><span className="capitalize text-black/42">{key}</span><b>{value||'Not specified'}</b></div>)}</div><a href={wa(`Hello OVOSKG, I want to start a bespoke order. Piece: ${form.piece}. Occasion: ${form.occasion||'not specified'}. Colour: ${form.colour||'not specified'}. Fabric: ${form.fabric||'not specified'}. Fit method: ${form.measure}. Deadline: ${form.deadline||'not specified'}. Contact: ${form.contact||'not specified'}. Notes: ${form.notes||'none'}. Shortlisted references: ${saved.map(x=>x.name).join(', ')||'none'}.`)} target="_blank" rel="noreferrer" onClick={()=>track('bespoke_brief_sent',{piece:form.piece,fit:form.measure})} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-white">Send brief to OVOSKG <MessageCircle size={14}/></a><p className="mt-4 text-xs leading-5 text-black/42">After the brief is reviewed, OVOSKG confirms the quote, fitting route and payment instruction before production begins.</p></WizardStep>}<div className="mt-10 flex items-center justify-between border-t border-black/10 pt-6"><button disabled={step===0} onClick={()=>setStep(x=>Math.max(0,x-1))} className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.13em] disabled:opacity-20"><ArrowLeft size={13}/> Back</button>{step<4&&<button onClick={()=>setStep(x=>Math.min(4,x+1))} className="flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[9px] font-bold uppercase tracking-[.13em] text-white">Continue <ArrowRight size={13}/></button>}</div></div></div></section></main>
}

function WizardStep({title,children}){return <motion.div key={title} initial={{opacity:0}} animate={{opacity:1}}><Kicker>Commission builder</Kicker><h2 className="display-tight mt-4 max-w-3xl font-display text-5xl leading-[.9] sm:text-6xl">{title}</h2><div className="mt-8">{children}</div></motion.div>}
function Choice({options,value,onChange}){return <div className="grid gap-3 sm:grid-cols-2">{options.map(option=><button key={option} onClick={()=>onChange(option)} className={`flex min-h-32 items-end justify-between border p-5 text-left transition ${value===option?'border-ink bg-ink text-white':'border-black/12 hover:border-black/35'}`}><span className="max-w-[220px] font-display text-2xl leading-none">{option}</span>{value===option&&<Check size={17}/>}</button>)}</div>}
function Field({label,children}){return <label className="grid gap-2 text-[9px] font-bold uppercase tracking-[.14em] text-black/45">{label}<div className="text-sm font-normal normal-case tracking-normal [&_input]:w-full [&_input]:border-b [&_input]:border-black/20 [&_input]:bg-transparent [&_input]:py-3 [&_input]:outline-none [&_textarea]:w-full [&_textarea]:border [&_textarea]:border-black/12 [&_textarea]:bg-transparent [&_textarea]:p-4 [&_textarea]:outline-none">{children}</div></label>}

function MeasurementsPage(){
  const fields=['Neck','Chest / bust','Shoulder','Sleeve','Waist','Hip / seat','Thigh','Trouser length','Inseam','Height']
  const [values,setValues]=useState(()=>JSON.parse(localStorage.getItem('ovoskg_measurements')||'{}'))
  const [saved,setSaved]=useState(false)
  const save=()=>{localStorage.setItem('ovoskg_measurements',JSON.stringify(values));setSaved(true);track('measurement_draft_saved',{completed:String(Object.values(values).filter(Boolean).length)});setTimeout(()=>setSaved(false),2200)}
  return <main><ManagedPageHero pageKey="measurements"/><RemoteFitAssurance/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="grid gap-5 lg:grid-cols-[.92fr_1.08fr]"><div className="relative min-h-[620px] overflow-hidden bg-ink text-white lg:sticky lg:top-28 lg:self-start"><img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1637670758590-d5ac57c982e3?auto=format&fit=crop&w=1800&q=92" alt="Tailored menswear fitting direction" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/74 via-black/4 to-black/6"/><div className="absolute inset-x-0 bottom-0 p-7 sm:p-9"><Kicker light>Measurement review</Kicker><h2 className="mt-3 font-display text-5xl leading-none">Your measurements are reviewed before the garment is cut.</h2><p className="mt-4 max-w-md text-xs leading-6 text-white/54">You can also book an in-person fitting in Ife.</p></div></div><div className="editorial-shadow bg-white p-6 sm:p-9"><div className="flex items-start gap-3 border-b border-black/10 pb-6"><Ruler className="text-bronze"/><div><b>Measurement draft</b><p className="mt-1 text-xs leading-5 text-black/44">Use inches and measure twice before saving.</p></div></div><div className="mt-6 grid gap-x-5 gap-y-6 sm:grid-cols-2">{fields.map(field=><Field key={field} label={field}><input inputMode="decimal" value={values[field]||''} onChange={e=>setValues({...values,[field]:e.target.value})} placeholder="0.0"/></Field>)}</div><button onClick={save} className="mt-8 w-full rounded-full bg-ink px-6 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-white">{saved?'Draft saved':'Save measurement draft'}</button><div className="mt-5 flex gap-3 bg-oat p-4 text-xs leading-5 text-black/50"><ShieldCheck className="mt-0.5 shrink-0 text-bronze" size={18}/><span>Saving does not approve the measurements for production. OVOSKG still verifies them before cutting.</span></div><Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.13em]">Book an Ife fitting <ArrowUpRight size={13}/></Link></div></div></section></main>
}

function TrackPage(){
  const [id,setId]=useState('')
  const [result,setResult]=useState(null)
  const run=()=>{const found=id.trim().toUpperCase()==='OVS-DEMO-001';setResult(found?4:-1);track('order_track_search',{found:String(found)})}
  return <main><ManagedPageHero pageKey="track"/><section className="mx-auto max-w-5xl px-4 py-20 sm:px-7 lg:py-28"><div className="editorial-shadow bg-white p-6 sm:p-10"><div className="flex flex-col gap-3 sm:flex-row"><input value={id} onChange={e=>setId(e.target.value)} onKeyDown={e=>e.key==='Enter'&&run()} placeholder="Enter order ID, e.g. OVS-DEMO-001" className="min-h-14 flex-1 border border-black/12 px-5 outline-none focus:border-ink"/><button onClick={run} className="rounded-full bg-ink px-8 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-white">Track order</button></div><p className="mt-3 text-xs text-black/38">Enter the order ID from your OVOSKG confirmation message.</p><AnimatePresence mode="wait">{result!==null&&<motion.div key={result} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="mt-10">{result===-1?<div className="border border-black/10 bg-oat p-6"><b>We could not find that order.</b><p className="mt-2 text-sm text-black/50">Check the order ID or contact OVOSKG so the team can verify it.</p></div>:<><div className="flex flex-col justify-between gap-4 border-b border-black/10 pb-7 sm:flex-row"><div><Kicker>OVS-DEMO-001</Kicker><h2 className="mt-2 font-display text-5xl">Finishing and quality control</h2><p className="mt-3 text-sm text-black/48">The garment is being checked before it is marked ready.</p></div><div className="flex items-center gap-2 self-start rounded-full bg-oat px-4 py-2 text-[9px] font-bold uppercase tracking-[.13em] text-bronze"><Clock3 size={13}/> Updated today</div></div><div className="mt-8 space-y-1">{statusSteps.map((stage,i)=><div key={stage} className="grid grid-cols-[38px_1fr_auto] items-center gap-4"><div className={`grid h-9 w-9 place-items-center rounded-full border text-xs ${i<=result?'border-bronze bg-bronze text-white':'border-black/12 text-black/30'}`}>{i<result?<Check size={14}/>:i+1}</div><div className={`border-b py-5 text-sm ${i<=result?'border-black/15 font-semibold':'border-black/10 text-black/36'}`}>{stage}</div><span className="text-[8px] font-bold uppercase tracking-[.14em] text-black/32">{i<result?'Complete':i===result?'Current':''}</span></div>)}</div></>}</motion.div>}</AnimatePresence></div></section></main>
}

function AboutPage(){
  return <main><ManagedPageHero pageKey="about"/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]"><div className="lg:sticky lg:top-28 lg:self-start"><div className="bg-ink p-8 text-white sm:p-10"><Logo light/><div className="mt-20"><Kicker light>Founder and Creative Director</Kicker><div className="mt-2 font-display text-4xl">Okunola Victor Ogunmola</div><p className="mt-5 max-w-md text-sm leading-7 text-white/50">Victor’s public account traces the company from early clothing work to the formal launch of OVOSKG.</p><a href="https://ng.linkedin.com/in/okunola-ogunmola" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.14em]">View public profile <ArrowUpRight size={13}/></a></div></div></div><div>{journey.map(item=><motion.div key={item.year} initial="hidden" whileInView="show" viewport={{once:true,amount:.25}} variants={reveal} className="grid grid-cols-[92px_1fr] gap-5 border-t border-black/10 py-9 sm:grid-cols-[150px_1fr]"><div className="font-display text-2xl text-bronze">{item.year}</div><div><h2 className="font-display text-4xl leading-none sm:text-5xl">{item.title}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-black/52">{item.text}</p></div></motion.div>)}</div></div></section><ConversionBand/></main>
}

function CompanyPage(){
  const departments=[
    ['Design','Garment shape, proportion and final details.'],
    ['Production','Pattern, cutting, construction, finishing and quality control.'],
    ['Client Experience','Consultation, fittings, updates, handover and aftercare.']
  ]
  return <main><ManagedPageHero pageKey="company"/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="grid gap-4 lg:grid-cols-3">{departments.map(([title,text],i)=><motion.article key={title} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="card-lift min-h-72 border border-black/10 bg-white p-7"><div className="font-display text-5xl text-bronze">{String(i+1).padStart(2,'0')}</div><h2 className="mt-12 font-display text-4xl">{title}</h2><p className="mt-4 text-sm leading-7 text-black/52">{text}</p></motion.article>)}</div><div className="mt-20 grid gap-3 bg-ink p-6 text-white sm:grid-cols-2 sm:p-10 lg:grid-cols-4">{[[PackageCheck,'Clear delivery','Know the stage and next step.'],[Scissors,'Quality checks','Measurements and finishing are reviewed.'],[Layers3,'Physical + remote','Visit Ife or order remotely.'],[Heart,'Repeat orders','Approved measurements make the next order easier.']].map(([Icon,title,text])=><div key={title} className="border border-white/10 p-5"><Icon size={20} className="text-[#cba474]"/><b className="mt-8 block text-sm">{title}</b><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div>)}</div></section></main>
}

function ContactPage(){
  const [form,setForm]=useState({name:'',phone:'',need:'Bespoke suit',date:'',message:''})
  const [openFaq,setOpenFaq]=useState(0)
  const update=(key,value)=>setForm({...form,[key]:value})
  const contactMessage=`Hello OVOSKG, my name is ${form.name||'not supplied'}. Phone: ${form.phone||'not supplied'}. I need: ${form.need}. Preferred date: ${form.date||'not supplied'}. Message: ${form.message||'none'}.`
  return <main><ManagedPageHero pageKey="contact"/><section className="mx-auto max-w-[1540px] px-4 py-20 sm:px-7 lg:py-28"><div className="grid gap-4 md:grid-cols-3">{[
    [MessageCircle,'WhatsApp','Fastest for enquiries, references and follow up.',wa(),'Open WhatsApp'],
    [Phone,'Call OVOSKG','Speak directly with the team about timing or a fitting.',`tel:${siteContent.contact.phoneE164}`,siteContent.contact.phoneDisplay],
    [Instagram,'Instagram','See social updates and message @ovoskg_clothings.',instagram,'Open Instagram']
  ].map(([Icon,title,text,href,cta])=><a key={title} href={href} target={href.startsWith('http')?'_blank':undefined} rel="noreferrer" className="card-lift min-h-64 border border-black/10 bg-white p-7"><Icon className="text-bronze" size={22}/><h2 className="mt-14 font-display text-4xl">{title}</h2><p className="mt-3 text-sm leading-6 text-black/50">{text}</p><div className="mt-6 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.14em]">{cta}<ArrowUpRight size={13}/></div></a>)}</div><div className="mt-16 grid gap-8 lg:grid-cols-[.62fr_.38fr]"><div className="editorial-shadow bg-white p-6 sm:p-9"><Kicker>Request a fitting or consultation</Kicker><h2 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">Add the details the team needs to respond.</h2><div className="mt-8 grid gap-5 sm:grid-cols-2"><Field label="Your name"><input value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Full name"/></Field><Field label="Phone or WhatsApp"><input value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="0800 000 0000"/></Field><label className="grid gap-2 text-[9px] font-bold uppercase tracking-[.14em] text-black/45">What do you need?<select value={form.need} onChange={e=>update('need',e.target.value)} className="border-b border-black/20 bg-transparent py-3 text-sm font-normal normal-case tracking-normal outline-none"><option>Bespoke suit</option><option>Women’s suit</option><option>Luxury kaftan</option><option>Physical fitting</option><option>Other custom piece</option></select></label><Field label="Preferred date"><input type="date" value={form.date} onChange={e=>update('date',e.target.value)}/></Field><div className="sm:col-span-2"><Field label="Message"><textarea rows="5" value={form.message} onChange={e=>update('message',e.target.value)} placeholder="Occasion, deadline, location or anything useful..."/></Field></div></div><a href={wa(contactMessage)} target="_blank" rel="noreferrer" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-white">Send request on WhatsApp <MessageCircle size={14}/></a></div><div className="bg-oat p-6 sm:p-8"><Kicker>Visit and business details</Kicker><div className="mt-8 space-y-6"><Info icon={MapPin} title="Base">{siteContent.contact.location}. Confirm exact boutique directions with the team before visiting.</Info><Info icon={Clock3} title="Appointments">Physical fittings should be arranged before arrival so the right person and time are available.</Info><Info icon={ShieldCheck} title="Registration">Business registration: {siteContent.business.registration}.</Info><Info icon={Phone} title="Phone">{siteContent.contact.phoneDisplay}</Info></div></div></div><div className="mt-20 grid gap-10 lg:grid-cols-[.42fr_.58fr]"><div><Kicker>Questions before ordering</Kicker><h2 className="display-tight mt-4 font-display text-6xl leading-[.9]">Before you order.</h2></div><div className="border-t border-black/10">{faqs.map(([q,a],i)=><div key={q} className="border-b border-black/10"><button onClick={()=>setOpenFaq(openFaq===i?-1:i)} className="flex w-full items-center justify-between gap-5 py-5 text-left"><span className="font-display text-2xl">{q}</span>{openFaq===i?<Minus size={16}/>:<Plus size={16}/>}</button><AnimatePresence>{openFaq===i&&<motion.p initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden pb-5 text-sm leading-7 text-black/50">{a}</motion.p>}</AnimatePresence></div>)}</div></div></section></main>
}


function LegalPage({type}){
  const policy=policies[type]
  return <main>
    <ManagedPageHero pageKey={type}/>
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-7 lg:py-24">
      <div className="mb-10 border-b border-black/10 pb-5 text-[9px] font-semibold uppercase tracking-[.16em] text-black/40">Last updated {policy.updated}</div>
      <div className="space-y-10">{policy.sections.map(section=><article key={section.heading}><h2 className="font-display text-4xl leading-none">{section.heading}</h2><div className="mt-4 space-y-4 text-sm leading-7 text-black/58">{section.body.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div></article>)}</div>
      <div className="mt-14 border-t border-black/10 pt-7 text-sm leading-7 text-black/55">Questions about this policy can be sent through the <Link to="/contact" className="font-semibold text-ink underline underline-offset-4">contact page</Link>.</div>
    </section>
  </main>
}

function AdminPage(){
  const ADMIN_USERNAME='admin'
  const pageOptions=[
    ['collections','Collections','/collections'],
    ['mens-bespoke',"Men’s bespoke collection",'/collections/mens-bespoke'],
    ['womens-bespoke',"Women’s bespoke collection",'/collections/womens-bespoke'],
    ['luxury-kaftan','Luxury kaftan collection','/collections/luxury-kaftan'],
    ['shop','Shop','/shop'],
    ['lookbook','Lookbook','/lookbook'],
    ['bespoke','Bespoke','/bespoke'],
    ['measurements','Measurements','/measurements'],
    ['track','Track order','/track'],
    ['about','About','/about'],
    ['company','Company','/company'],
    ['contact','Contact','/contact'],
    ['privacy','Privacy','/privacy'],
    ['terms','Terms','/terms'],
    ['delivery','Delivery','/delivery'],
    ['returns','Returns','/returns']
  ]
  const [password,setPassword]=useState(()=>sessionStorage.getItem('ovoskg_admin_password')||'')
  const [content,setContent]=useState(siteContent)
  const [baseline,setBaseline]=useState(siteContent)
  const [status,setStatus]=useState(password?'loading':'locked')
  const [message,setMessage]=useState('')
  const [tab,setTab]=useState('pages')
  const [selectedPage,setSelectedPage]=useState('collections')
  const dirty=useMemo(()=>JSON.stringify(content)!==JSON.stringify(baseline),[content,baseline])

  const authHeaders=pass=>({'x-admin-username':ADMIN_USERNAME,'x-admin-password':pass})
  const setGroup=(group,key,value)=>setContent(prev=>({...prev,[group]:{...prev[group],[key]:value}}))
  const setNested=(group,section,key,value)=>setContent(prev=>({...prev,[group]:{...prev[group],[section]:{...prev[group]?.[section],[key]:value}}}))

  const load=async(pass=password)=>{
    if(!pass){setStatus('locked');return}
    setStatus('loading');setMessage('')
    try{
      const res=await fetch('/api/admin-content',{headers:authHeaders(pass)})
      const body=await res.json()
      if(!res.ok){
        setStatus(res.status===503?'setup':'locked')
        setMessage(body.error||'Access denied.')
        return
      }
      sessionStorage.setItem('ovoskg_admin_password',pass)
      setContent(body.content)
      setBaseline(body.content)
      setStatus('ready')
    }catch{
      setStatus('locked')
      setMessage('Could not reach the admin API.')
    }
  }

  useEffect(()=>{if(password) load(password)},[])

  const save=async()=>{
    setStatus('saving');setMessage('')
    try{
      const res=await fetch('/api/admin-content',{method:'PUT',headers:{'content-type':'application/json',...authHeaders(password)},body:JSON.stringify({content})})
      const body=await res.json()
      if(!res.ok){setStatus(res.status===503?'setup':'ready');setMessage(body.error||'Save failed.');return}
      setStatus('ready')
      setBaseline(content)
      setMessage('Published to GitHub. Vercel is redeploying the updated site.')
      track('admin_content_saved',{commit:body.commit||'created'})
    }catch{
      setStatus('ready')
      setMessage('Save failed. Check the server configuration and try again.')
    }
  }

  if(status==='locked') return <main className="relative min-h-screen overflow-hidden bg-[#0b0908]">
    <div className="absolute inset-0 opacity-25 luxury-grid"/>
    <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 sm:px-8"><Logo/><Link to="/" className="text-[9px] font-semibold uppercase tracking-[.16em] text-white/55">Back to website</Link></div>
    <div className="grid min-h-screen place-items-center px-4 py-24"><motion.section role="dialog" aria-modal="true" aria-labelledby="admin-login-title" initial={{opacity:0,scale:.985,y:8}} animate={{opacity:1,scale:1,y:0}} transition={{duration:.32,ease:[.22,1,.36,1]}} className="relative z-10 w-full max-w-[460px] border border-white/12 bg-[#f7f3eb] p-6 shadow-[0_28px_100px_rgba(0,0,0,.45)] sm:p-8">
      <div className="mb-7 flex items-start justify-between gap-5 border-b border-black/10 pb-6"><div><Kicker>Secure access</Kicker><h1 id="admin-login-title" className="mt-2 font-display text-5xl leading-none">Admin login</h1></div><ShieldCheck size={22} className="mt-1 text-bronze"/></div>
      <div className="grid gap-5"><Field label="Username"><input value={ADMIN_USERNAME} readOnly aria-readonly="true" className="cursor-default text-black/60"/></Field><Field label="Password"><input autoFocus type="password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&load(password)} placeholder="Enter admin password" autoComplete="current-password"/></Field></div>
      <button onClick={()=>load(password)} disabled={!password} className="mt-7 w-full bg-ink px-5 py-4 text-[10px] font-semibold uppercase tracking-[.14em] text-white transition hover:bg-[#171411] disabled:cursor-not-allowed disabled:opacity-35">Login to admin</button>
      {message&&<p className="mt-4 border-l-2 border-red-700/50 pl-3 text-xs leading-5 text-red-800">{message}</p>}
      <p className="mt-6 text-[10px] leading-5 text-black/42">Username is fixed to <strong className="font-semibold text-black/65">admin</strong>. The password is checked on the server.</p>
    </motion.section></div>
  </main>

  if(status==='setup') return <main className="min-h-[70vh] bg-bone"><section className="mx-auto max-w-2xl px-4 py-20 sm:px-7"><Kicker>Admin setup</Kicker><h1 className="mt-4 font-display text-6xl leading-none">Secure publishing is ready to connect.</h1><p className="mt-5 text-sm leading-7 text-black/55">The admin editor is built, but publishing stays locked until the Vercel project has <code>ADMIN_PASSWORD</code> and <code>GITHUB_TOKEN</code> environment variables.</p></section></main>
  if(status==='loading') return <main className="grid min-h-[70vh] place-items-center bg-bone"><div className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/45">Checking admin access…</div></main>

  const page=content.pages[selectedPage]||{}
  const homeFields=[
    ['remote','Remote fitting',['eyebrow','title','body']],
    ['entry','Entry paths',['eyebrow','title']],
    ['collections','Collections section',['eyebrow','titlePrimary','titleAccent','body']],
    ['process','Order process',['eyebrow','titlePrimary','titleAccent','body']],
    ['materials','Fabric & materials',['eyebrow','title','body','note']],
    ['motion','Workshop motion',['eyebrow','title','body','note']],
    ['selected','Selected work',['eyebrow','title']],
    ['founder','Company story',['eyebrow','title','body','imageCaption']],
    ['conversion','Final CTA',['eyebrow','title']]
  ]

  return <main className="min-h-screen bg-[#eee7dc]">
    <section className="mx-auto max-w-[1560px] px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="admin-shell overflow-hidden border border-black/10 bg-[#f8f4ec] shadow-[0_24px_80px_rgba(22,14,8,.09)]">
        <header className="flex flex-col gap-5 border-b border-black/10 bg-[#0a0908] px-5 py-6 text-white sm:px-7 lg:flex-row lg:items-end lg:justify-between">
          <div><div className="text-[8px] font-semibold uppercase tracking-[.2em] text-[#caa177]">OVOSKG CMS</div><h1 className="mt-2 font-display text-5xl leading-none sm:text-6xl">Content studio</h1><p className="mt-3 text-xs text-white/45">Edit website copy, page headers, business details and mobile conversion content.</p></div>
          <div className="flex flex-wrap items-center gap-2"><span className={`px-3 py-2 text-[8px] font-semibold uppercase tracking-[.14em] ${dirty?'bg-[#caa177] text-white':'border border-white/12 text-white/45'}`}>{dirty?'Unsaved changes':'All changes saved'}</span><a href="/" target="_blank" rel="noreferrer" className="border border-white/14 px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[.13em] text-white/70">Preview site</a><button onClick={()=>{sessionStorage.removeItem('ovoskg_admin_password');setPassword('');setStatus('locked');setMessage('')}} className="border border-white/14 px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[.13em] text-white/70">Lock</button></div>
        </header>

        <div className="grid lg:grid-cols-[240px_1fr]">
          <aside className="border-b border-black/10 bg-[#efe6d8] p-3 lg:min-h-[720px] lg:border-b-0 lg:border-r">
            <nav className="grid grid-cols-3 gap-1 lg:grid-cols-1">
              {[['pages','Pages'],['home','Homepage'],['business','Business & CTA']].map(([id,label])=><button key={id} onClick={()=>setTab(id)} className={`px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[.13em] transition ${tab===id?'bg-ink text-white':'text-black/48 hover:bg-white/60'}`}>{label}</button>)}
            </nav>
            {tab==='pages'&&<div className="mt-4 hidden border-t border-black/10 pt-3 lg:grid">{pageOptions.map(([id,label])=><button key={id} onClick={()=>setSelectedPage(id)} className={`border-b border-black/8 px-3 py-3 text-left text-xs transition ${selectedPage===id?'bg-white font-semibold text-ink':'text-black/48 hover:text-ink'}`}>{label}</button>)}</div>}
          </aside>

          <div className="min-w-0 p-4 sm:p-7 lg:p-10">
            {tab==='pages'&&<div>
              <div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-end"><div><Kicker>Page editor</Kicker><h2 className="mt-2 font-display text-5xl leading-none">{pageOptions.find(x=>x[0]===selectedPage)?.[1]}</h2></div><div className="flex items-center gap-2"><select aria-label="Choose page to edit" value={selectedPage} onChange={e=>setSelectedPage(e.target.value)} className="border border-black/12 bg-white px-4 py-3 text-sm lg:hidden">{pageOptions.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select><a href={pageOptions.find(x=>x[0]===selectedPage)?.[2]} target="_blank" rel="noreferrer" className="border border-black/12 bg-white px-4 py-3 text-[9px] font-semibold uppercase tracking-[.12em]">View page</a></div></div>
              <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_.8fr]">
                <div className="bg-white p-5 sm:p-7"><div className="grid gap-6"><Field label="Eyebrow"><input value={page.eyebrow||''} onChange={e=>setNested('pages',selectedPage,'eyebrow',e.target.value)}/></Field><Field label="Page title"><textarea rows="3" value={page.title||''} onChange={e=>setNested('pages',selectedPage,'title',e.target.value)}/></Field><Field label="Intro copy"><textarea rows="6" value={page.intro||''} onChange={e=>setNested('pages',selectedPage,'intro',e.target.value)}/></Field></div></div>
                <div className="bg-[#15110e] p-6 text-white sm:p-8"><div className="text-[8px] font-semibold uppercase tracking-[.18em] text-[#caa177]">Live copy preview</div><div className="mt-8 border-l border-[#caa177]/55 pl-5"><div className="text-[8px] font-semibold uppercase tracking-[.18em] text-white/45">{page.eyebrow}</div><div className="mt-3 font-display text-5xl leading-[.9]">{page.title}</div><p className="mt-5 text-sm leading-7 text-white/48">{page.intro}</p></div></div>
              </div>
            </div>}

            {tab==='home'&&<div><Kicker>Homepage</Kicker><h2 className="mt-2 font-display text-5xl leading-none">Homepage content</h2><div className="mt-8 grid gap-6">
              <div className="bg-white p-5 sm:p-7"><h3 className="font-display text-3xl">Hero</h3><div className="mt-6 grid gap-6 sm:grid-cols-2"><Field label="Trust line"><input value={content.hero.trust} onChange={e=>setGroup('hero','trust',e.target.value)}/></Field><Field label="First headline"><input value={content.hero.headingPrimary} onChange={e=>setGroup('hero','headingPrimary',e.target.value)}/></Field><Field label="Accent headline"><input value={content.hero.headingAccent} onChange={e=>setGroup('hero','headingAccent',e.target.value)}/></Field><div className="sm:col-span-2"><Field label="Hero body"><textarea rows="4" value={content.hero.body} onChange={e=>setGroup('hero','body',e.target.value)}/></Field></div></div></div>
              {homeFields.map(([id,label,fields])=><div key={id} className="bg-white p-5 sm:p-7"><div className="flex items-center justify-between gap-4"><h3 className="font-display text-3xl">{label}</h3><span className="text-[8px] font-semibold uppercase tracking-[.14em] text-black/30">{fields.length} fields</span></div><div className="mt-6 grid gap-6 sm:grid-cols-2">{fields.map(key=><div key={key} className={key==='body'||key==='imageCaption'||key==='note'?'sm:col-span-2':''}><Field label={key.replace(/([A-Z])/g,' $1')} >{key==='body'||key==='imageCaption'||key==='note'?<textarea rows="4" value={content.homeSections[id]?.[key]||''} onChange={e=>setNested('homeSections',id,key,e.target.value)}/>:<input value={content.homeSections[id]?.[key]||''} onChange={e=>setNested('homeSections',id,key,e.target.value)}/>}</Field></div>)}</div></div>)}
              <div className="bg-[#15110e] p-5 text-white sm:p-7"><div className="flex items-end justify-between gap-5"><div><div className="text-[8px] font-semibold uppercase tracking-[.18em] text-[#caa177]">Material directions</div><h3 className="mt-2 font-display text-4xl">Fabric cards</h3></div><span className="text-[8px] uppercase tracking-[.14em] text-white/30">4 editable cards</span></div><div className="mt-6 grid gap-4 lg:grid-cols-2">{content.materials.map((item,i)=><div key={item.id} className="border border-white/10 bg-white/[.035] p-4"><div className="mb-4 flex items-center justify-between"><span className="font-display text-2xl">{item.index}</span><span className="text-[8px] uppercase tracking-[.14em] text-white/35">{item.id}</span></div><div className="grid gap-4"><Field label="Name"><input className="!text-white" value={item.name} onChange={e=>setContent(prev=>({...prev,materials:prev.materials.map((m,n)=>n===i?{...m,name:e.target.value}:m)}))}/></Field><Field label="Label"><input className="!text-white" value={item.label} onChange={e=>setContent(prev=>({...prev,materials:prev.materials.map((m,n)=>n===i?{...m,label:e.target.value}:m)}))}/></Field><Field label="Best considered for"><input className="!text-white" value={item.use} onChange={e=>setContent(prev=>({...prev,materials:prev.materials.map((m,n)=>n===i?{...m,use:e.target.value}:m)}))}/></Field><Field label="Feel"><input className="!text-white" value={item.feel} onChange={e=>setContent(prev=>({...prev,materials:prev.materials.map((m,n)=>n===i?{...m,feel:e.target.value}:m)}))}/></Field><Field label="Description"><textarea className="!text-white" rows="3" value={item.description} onChange={e=>setContent(prev=>({...prev,materials:prev.materials.map((m,n)=>n===i?{...m,description:e.target.value}:m)}))}/></Field><Field label="Mill / source note"><textarea className="!text-white" rows="2" value={item.source||''} onChange={e=>setContent(prev=>({...prev,materials:prev.materials.map((m,n)=>n===i?{...m,source:e.target.value}:m)}))}/></Field></div></div>)}</div></div>
              <div className="bg-white p-5 sm:p-7"><div className="flex items-end justify-between gap-5"><div><Kicker>Workshop motion</Kicker><h3 className="mt-2 font-display text-4xl">Video clips</h3></div><span className="text-[8px] uppercase tracking-[.14em] text-black/30">Replace stock with OVOSKG footage anytime</span></div><div className="mt-6 grid gap-5 lg:grid-cols-2">{content.motionClips.map((clip,i)=><div key={clip.id} className="border border-black/10 p-4"><div className="grid gap-4"><Field label="Clip label"><input value={clip.label} onChange={e=>setContent(prev=>({...prev,motionClips:prev.motionClips.map((m,n)=>n===i?{...m,label:e.target.value}:m)}))}/></Field><Field label="Meta line"><input value={clip.meta} onChange={e=>setContent(prev=>({...prev,motionClips:prev.motionClips.map((m,n)=>n===i?{...m,meta:e.target.value}:m)}))}/></Field><Field label="Video URL"><textarea rows="2" value={clip.url} onChange={e=>setContent(prev=>({...prev,motionClips:prev.motionClips.map((m,n)=>n===i?{...m,url:e.target.value}:m)}))}/></Field><Field label="Source label"><input value={clip.sourceLabel} onChange={e=>setContent(prev=>({...prev,motionClips:prev.motionClips.map((m,n)=>n===i?{...m,sourceLabel:e.target.value}:m)}))}/></Field><Field label="Source page"><textarea rows="2" value={clip.sourceUrl} onChange={e=>setContent(prev=>({...prev,motionClips:prev.motionClips.map((m,n)=>n===i?{...m,sourceUrl:e.target.value}:m)}))}/></Field></div></div>)}</div></div>
            </div></div>}

            {tab==='business'&&<div><Kicker>Global settings</Kicker><h2 className="mt-2 font-display text-5xl leading-none">Business, pricing & CTA</h2><div className="mt-8 grid gap-6 xl:grid-cols-2">
              <div className="bg-white p-5 sm:p-7"><h3 className="font-display text-3xl">Business details</h3><div className="mt-6 grid gap-6"><Field label="Phone display"><input value={content.contact.phoneDisplay} onChange={e=>setGroup('contact','phoneDisplay',e.target.value)}/></Field><Field label="Phone international"><input value={content.contact.phoneE164} onChange={e=>setGroup('contact','phoneE164',e.target.value)}/></Field><Field label="Location"><input value={content.contact.location} onChange={e=>setGroup('contact','location',e.target.value)}/></Field><Field label="Registration"><input value={content.business.registration} onChange={e=>setGroup('business','registration',e.target.value)}/></Field></div></div>
              <div className="bg-white p-5 sm:p-7"><h3 className="font-display text-3xl">Mobile sticky CTA</h3><div className="mt-6 grid gap-6"><Field label="Small label"><input value={content.sticky.kicker} onChange={e=>setGroup('sticky','kicker',e.target.value)}/></Field><Field label="Primary action"><input value={content.sticky.primary} onChange={e=>setGroup('sticky','primary',e.target.value)}/></Field><Field label="WhatsApp label"><input value={content.sticky.whatsapp} onChange={e=>setGroup('sticky','whatsapp',e.target.value)}/></Field></div><div className="mt-8 overflow-hidden border border-black/10 shadow-[0_14px_40px_rgba(20,14,8,.12)]"><div className="grid grid-cols-[1.22fr_.78fr] text-white"><div className="bg-[#98724e] p-4"><div className="text-[7px] uppercase tracking-[.18em] text-white/65">{content.sticky.kicker}</div><div className="mt-1 text-sm font-semibold">{content.sticky.primary}</div></div><div className="grid place-items-center bg-[#080706] text-xs font-semibold">{content.sticky.whatsapp}</div></div></div></div>
              <div className="bg-white p-5 sm:p-7 xl:col-span-2"><div className="flex flex-col justify-between gap-3 border-b border-black/10 pb-5 sm:flex-row sm:items-end"><div><Kicker>Lead qualification</Kicker><h3 className="mt-2 font-display text-3xl">Pricing & lead time signals</h3></div><p className="max-w-md text-[10px] leading-5 text-black/42">Enter real starting rates and a normal turnaround only when OVOSKG is ready to publish them. Blank fields use the safe fallback wording below.</p></div><div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"><Field label="Men's suit from"><input value={content.planning.suitFrom||''} onChange={e=>setGroup('planning','suitFrom',e.target.value)} placeholder="e.g. ₦250,000"/></Field><Field label="Women's suit from"><input value={content.planning.womensFrom||''} onChange={e=>setGroup('planning','womensFrom',e.target.value)} placeholder="e.g. ₦250,000"/></Field><Field label="Luxury kaftan from"><input value={content.planning.kaftanFrom||''} onChange={e=>setGroup('planning','kaftanFrom',e.target.value)} placeholder="e.g. ₦120,000"/></Field><Field label="Typical turnaround"><input value={content.planning.leadTime||''} onChange={e=>setGroup('planning','leadTime',e.target.value)} placeholder="e.g. 2–3 weeks"/></Field></div><div className="mt-6 grid gap-6 sm:grid-cols-2"><Field label="Fallback price wording"><input value={content.planning.fallbackPrice} onChange={e=>setGroup('planning','fallbackPrice',e.target.value)}/></Field><Field label="Fallback lead-time wording"><input value={content.planning.fallbackLead} onChange={e=>setGroup('planning','fallbackLead',e.target.value)}/></Field><div className="sm:col-span-2"><Field label="Pricing note"><textarea rows="3" value={content.planning.note} onChange={e=>setGroup('planning','note',e.target.value)}/></Field></div></div></div>
            </div></div>}
          </div>
        </div>

        <div className="sticky bottom-0 z-20 flex flex-col gap-3 border-t border-black/10 bg-[#f8f4ec]/96 px-4 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div><p className="text-xs font-medium text-black/60">{message|| (dirty?'You have unpublished changes.':'Everything is up to date.')}</p><p className="mt-1 text-[9px] text-black/35">Publishing updates GitHub and triggers a new Vercel deployment.</p></div>
          <div className="flex gap-2"><button disabled={!dirty||status==='saving'} onClick={()=>{setContent(baseline);setMessage('Changes reset.')}} className="border border-black/12 px-5 py-3 text-[9px] font-semibold uppercase tracking-[.13em] text-black/55 disabled:opacity-30">Reset</button><button disabled={!dirty||status==='saving'} onClick={save} className="min-w-44 bg-ink px-6 py-3 text-[9px] font-semibold uppercase tracking-[.13em] text-white disabled:opacity-30">{status==='saving'?'Publishing…':'Publish changes'}</button></div>
        </div>
      </div>
    </section>
  </main>
}

function Info({icon:Icon,title,children}){return <div className="flex gap-3"><Icon size={17} className="mt-0.5 shrink-0 text-bronze"/><div><div className="text-[9px] font-bold uppercase tracking-[.14em]">{title}</div><p className="mt-1 text-xs leading-5 text-black/50">{children}</p></div></div>}

function Footer(){
  const {pathname}=useLocation()
  if(pathname==='/admin') return null
  return <footer className="bg-[#050505] text-white"><div className="mx-auto max-w-[1540px] px-4 py-16 sm:px-7"><div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)]"><div><Logo light/><p className="mt-6 max-w-sm text-sm leading-7 text-white/42">Bespoke suits for men and women, luxury men’s kaftans and custom clothing from Ife, Osun State.</p><div className="mt-6 text-xs leading-6 text-white/42">{siteContent.contact.location}<br/>{siteContent.contact.phoneDisplay}<br/>{siteContent.business.registration}</div></div>{[
    ['Explore',[['Home','/'],['Collections','/collections'],['Shop','/shop']]],
    ['Customer',[['Bespoke','/bespoke'],['Measurements','/measurements'],['Track Order','/track'],['Contact','/contact']]],
    ['Company',[['Our Story','/about'],['Company','/company'],['Instagram',instagram],['TikTok',tiktok]]]
  ].map(([heading,links])=><div key={heading}><div className="text-[9px] font-bold uppercase tracking-[.17em] text-white/30">{heading}</div><div className="mt-5 grid gap-3">{links.map(([label,url])=>url.startsWith('http')?<a key={label} href={url} target="_blank" rel="noreferrer" className="text-sm text-white/65 transition hover:text-white">{label}</a>:<Link key={label} to={url} className="text-sm text-white/65 transition hover:text-white">{label}</Link>)}</div></div>)}</div><div className="mt-16 grid gap-4 border-t border-white/10 pt-6 text-[9px] uppercase tracking-[.13em] text-white/25 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><span>© 2026 OVOSKG Clothings</span><a href="https://mikeaccolade.xyz" target="_blank" rel="noreferrer" className="footer-credit group inline-flex w-fit items-center gap-2.5 border border-[#caa177]/32 bg-[#15100c] px-4 py-3 text-[10px] tracking-[.11em] text-white/60 shadow-[0_10px_28px_rgba(0,0,0,.18)] transition hover:border-[#d8b48f]/60 hover:bg-[#1b140f] sm:justify-self-center"><span>Custom built by</span><span className="font-bold text-[#e0b78f] transition group-hover:text-[#f0d0ae]">Mike Accolade</span><ArrowUpRight size={12} className="text-[#d0aa82]"/></a><span className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-self-end"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/delivery">Delivery</Link><Link to="/returns">Returns</Link></span></div></div></footer>
}

function FloatingDesktop(){
  const {pathname}=useLocation()
  if(pathname==='/admin') return null
  return <div className="fixed bottom-5 right-5 z-40 hidden flex-col gap-2 md:flex"><a href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp OVOSKG" className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-xl"><MessageCircle size={18}/></a><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top" className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-xl"><ArrowRight size={16} className="-rotate-90"/></button></div>
}

export default function App(){
  return <div className="mobile-safe min-h-screen bg-bone text-ink"><AppMeta/><ConversionAnalytics/><Header/><RouteFrame><Routes>
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
    <Route path="/privacy" element={<LegalPage type="privacy"/>}/>
    <Route path="/terms" element={<LegalPage type="terms"/>}/>
    <Route path="/delivery" element={<LegalPage type="delivery"/>}/>
    <Route path="/returns" element={<LegalPage type="returns"/>}/>
    <Route path="/admin" element={<AdminPage/>}/>
    <Route path="*" element={<HomePage/>}/>
  </Routes></RouteFrame><Footer/><FloatingDesktop/><MobileConversionBar/></div>
}
