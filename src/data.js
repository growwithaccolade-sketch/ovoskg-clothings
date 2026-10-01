export const navItems = [
  ['Home','/'],
  ['Collections','/collections'],
  ['Shop','/shop'],
  ['Lookbook','/lookbook'],
  ['Bespoke','/bespoke'],
  ['Track Order','/track'],
  ['About','/about'],
  ['Contact','/contact']
]

export const collections = [
  {
    id:'mens-bespoke',
    index:'01',
    title:"Men's bespoke suits",
    short:'Sharp tailoring for weddings, work and important rooms.',
    body:'Choose the silhouette. OVOSKG refines the fit, fabric and finishing around you.',
    image:'https://images.unsplash.com/photo-1776781205743-33b4c1106adc?auto=format&fit=crop&w=2200&q=92',
    imageAlt:'Black man in a tailored suit in a clean studio portrait',
    tags:['Two piece','Three piece','Double breasted','Wedding'],
    styles:[
      {name:'Clean Formal',note:'A precise, quiet suit with the fit doing the work.',detail:'Formal · clean line',image:'https://images.unsplash.com/photo-1776781205743-33b4c1106adc?auto=format&fit=crop&w=1800&q=92'},
      {name:'Dark Editorial',note:'A stronger evening direction with a restrained palette.',detail:'Evening · dark tone',image:'https://images.unsplash.com/photo-1637670972040-3782ccec882c?auto=format&fit=crop&w=1800&q=92'},
      {name:'Mirror Tailoring',note:'A modern formal direction with a softer editorial feel.',detail:'Modern · refined',image:'https://images.unsplash.com/photo-1637670758590-d5ac57c982e3?auto=format&fit=crop&w=1800&q=92'},
      {name:'Classic Two Piece',note:'The dependable starting point for business or ceremony.',detail:'Two piece · classic',image:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1800&q=92'},
      {name:'Double Breasted',note:'More structure and presence through the chest and lapel.',detail:'Double breast · structured',image:'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1800&q=92'},
      {name:'Black Tie',note:'A cleaner evening silhouette for formal celebrations.',detail:'Black tie · occasion',image:'https://images.unsplash.com/photo-1548454782-15b189d129ab?auto=format&fit=crop&w=1800&q=92'}
    ]
  },
  {
    id:'womens-bespoke',
    index:'02',
    title:"Women's bespoke suits",
    short:'Confident tailoring shaped around your proportions, not a generic size chart.',
    body:'From workwear to occasion suits, the final silhouette is built around movement, proportion and how you want it to feel.',
    image:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=2200&q=92',
    imageAlt:'Woman in tailored fashion with a clean editorial composition',
    tags:['Power suit','Occasion','Two piece','Custom fit'],
    styles:[
      {name:'Structured Tailoring',note:'A clean jacket line with controlled shaping.',detail:'Structured · precise',image:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1800&q=92'},
      {name:'Statement Suiting',note:'A stronger fashion direction for events and entrances.',detail:'Occasion · statement',image:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=92'},
      {name:'Modern Two Piece',note:'A relaxed but deliberate route into custom tailoring.',detail:'Two piece · modern',image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=92'},
      {name:'Studio Direction',note:'Clean proportions and styling without visual clutter.',detail:'Studio · minimal',image:'https://images.unsplash.com/photo-1742320681701-01bf49505a78?auto=format&fit=crop&w=1800&q=92'},
      {name:'Strong Portrait',note:'Use this mood when the brief needs confidence without excess.',detail:'Portrait · confident',image:'https://images.unsplash.com/photo-1707162740897-cf2f057d2a41?auto=format&fit=crop&w=1800&q=92'},
      {name:'Evening Tailoring',note:'Longer lines and a more refined occasion feel.',detail:'Evening · refined',image:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=92'}
    ]
  },
  {
    id:'luxury-kaftan',
    index:'03',
    title:"Luxury men's kaftans",
    short:'Clean native wear with fit, fabric and detail kept intentional.',
    body:'For weddings, ceremonies and elevated everyday wear. Choose how quiet or detailed the final piece should feel.',
    image:'https://images.unsplash.com/photo-1620932934088-fbdb2920e484?auto=format&fit=crop&w=2200&q=92',
    imageAlt:'Nigerian man wearing a white kaftan',
    tags:['Kaftan','Native wear','Ceremony','Custom'],
    styles:[
      {name:'White Kaftan',note:'A clean light direction with minimal distraction.',detail:'White · clean',image:'https://images.unsplash.com/photo-1620932934088-fbdb2920e484?auto=format&fit=crop&w=1800&q=92'},
      {name:'Yoruba Formal',note:'Traditional dressing with clear embroidery and presence.',detail:'Traditional · formal',image:'https://images.unsplash.com/photo-1688143029511-b37423aa60a2?auto=format&fit=crop&w=1800&q=92'},
      {name:'Deep Detail',note:'A stronger portrait direction that brings detail closer.',detail:'Detail · close crop',image:'https://images.unsplash.com/photo-1688143029272-f675696d4cc5?auto=format&fit=crop&w=1800&q=92'},
      {name:'Patterned Native',note:'A Nigerian traditional direction with texture kept central.',detail:'Pattern · heritage',image:'https://images.unsplash.com/photo-1763823132521-72f373850de2?auto=format&fit=crop&w=1800&q=92'},
      {name:'Minimal Native',note:'A quieter route for clients who want less decoration.',detail:'Minimal · native',image:'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1800&q=92'},
      {name:'Ceremony Direction',note:'A fuller formal mood for weddings and important events.',detail:'Ceremony · formal',image:'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1800&q=92'}
    ]
  }
]

export const pieces = [
  {id:'formal-suit',category:'Suits',gender:'Men',name:'Clean Formal Suit',descriptor:'Bespoke direction',image:'https://images.unsplash.com/photo-1776781205743-33b4c1106adc?auto=format&fit=crop&w=1800&q=92'},
  {id:'dark-suit',category:'Suits',gender:'Men',name:'Dark Editorial Suit',descriptor:'Bespoke direction',image:'https://images.unsplash.com/photo-1637670972040-3782ccec882c?auto=format&fit=crop&w=1800&q=92'},
  {id:'double-breasted',category:'Suits',gender:'Men',name:'Double Breasted Direction',descriptor:'Bespoke direction',image:'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1800&q=92'},
  {id:'women-structured',category:'Women',gender:'Women',name:'Structured Women Tailoring',descriptor:'Bespoke direction',image:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1800&q=92'},
  {id:'women-statement',category:'Women',gender:'Women',name:'Statement Women Tailoring',descriptor:'Occasion direction',image:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=92'},
  {id:'white-kaftan',category:'Kaftan',gender:'Men',name:'White Kaftan Direction',descriptor:'Custom direction',image:'https://images.unsplash.com/photo-1620932934088-fbdb2920e484?auto=format&fit=crop&w=1800&q=92'},
  {id:'yoruba-formal',category:'Kaftan',gender:'Men',name:'Yoruba Formal Direction',descriptor:'Custom direction',image:'https://images.unsplash.com/photo-1688143029511-b37423aa60a2?auto=format&fit=crop&w=1800&q=92'},
  {id:'native-pattern',category:'Occasion',gender:'Men',name:'Patterned Native Direction',descriptor:'Occasion direction',image:'https://images.unsplash.com/photo-1763823132521-72f373850de2?auto=format&fit=crop&w=1800&q=92'}
]

export const lookbook = [
  {id:1,category:'Suits',label:'Clean formal tailoring',image:'https://images.unsplash.com/photo-1776781205743-33b4c1106adc?auto=format&fit=crop&w=2200&q=92'},
  {id:2,category:'Suits',label:'Dark editorial suiting',image:'https://images.unsplash.com/photo-1637670972040-3782ccec882c?auto=format&fit=crop&w=2200&q=92'},
  {id:3,category:'Suits',label:'Mirror tailoring',image:'https://images.unsplash.com/photo-1637670758590-d5ac57c982e3?auto=format&fit=crop&w=2200&q=92'},
  {id:4,category:'Women',label:'Structured women tailoring',image:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=2200&q=92'},
  {id:5,category:'Women',label:'Statement suiting',image:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=2200&q=92'},
  {id:6,category:'Women',label:'Clean studio direction',image:'https://images.unsplash.com/photo-1742320681701-01bf49505a78?auto=format&fit=crop&w=2200&q=92'},
  {id:7,category:'Kaftan',label:'White kaftan direction',image:'https://images.unsplash.com/photo-1620932934088-fbdb2920e484?auto=format&fit=crop&w=2200&q=92'},
  {id:8,category:'Kaftan',label:'Yoruba formal direction',image:'https://images.unsplash.com/photo-1688143029511-b37423aa60a2?auto=format&fit=crop&w=2200&q=92'},
  {id:9,category:'Kaftan',label:'Patterned native direction',image:'https://images.unsplash.com/photo-1763823132521-72f373850de2?auto=format&fit=crop&w=2200&q=92'}
]

export const journey = [
  {year:'2017',title:'The work starts',text:'Victor’s fashion journey begins around adjustments, repairs and small clothing jobs.'},
  {year:'2018–2022',title:'The process gets sharper',text:'The work grows into trousers, complete outfits and a more structured client experience.'},
  {year:'29 Jan 2023',title:'OVOSKG is established',text:'The company formally takes shape around bespoke clothing, suits and kaftans.'},
  {year:'2023–2026',title:'800+ custom pieces reported',text:'The founder says more than 800 custom pieces were delivered across the following three years.'}
]

export const statusSteps = [
  'Order confirmed',
  'Measurements confirmed',
  'Cutting',
  'Construction',
  'Finishing & QC',
  'Ready / dispatched'
]

export const faqs = [
  ['Can I order without visiting the boutique?','Yes. Remote measurements are checked before cutting. If anything looks inconsistent, OVOSKG can request a remeasure, photos or a short video check.'],
  ['How do bespoke prices work?','Price depends on the garment, fabric, construction, finishing and deadline. You receive a confirmed quote before payment.'],
  ['Can I reuse my measurements?','Yes, once a measurement set has been reviewed and approved for your order.'],
  ['Can I track a custom order online?','Yes. Track production from confirmation through cutting, construction, finishing and dispatch.'],
  ['What if the fit is off after delivery?','OVOSKG compares the garment with the approved measurements and agrees the correction path. Alteration or remake terms are confirmed with your quote before payment.'],
  ['Do you make women’s suits?','Yes. OVOSKG makes bespoke suits for men and women, plus luxury men’s kaftans and other custom pieces.'],
  ['Where is OVOSKG based?','OVOSKG is based in Ife, Osun State, Nigeria. Confirm boutique directions before visiting.']
]
