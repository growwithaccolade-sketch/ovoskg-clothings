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
    short:'Boardrooms, weddings, ceremonies and the days you need to arrive properly.',
    body:'Single breasted, double breasted and occasion tailoring developed around your posture, proportions, fit preference and event.',
    image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=90',
    imageAlt:'Man wearing a tailored suit',
    tags:['Two piece','Three piece','Double breasted','Wedding'],
    styles:[
      {name:'Peak Lapel Double Breasted',note:'A stronger chest line with a commanding formal profile.',detail:'Peak lapel · 6 button front',image:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=90'},
      {name:'Notch Lapel Two Piece',note:'The cleanest everyday bespoke starting point.',detail:'Notch lapel · clean trouser',image:'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1200&q=90'},
      {name:'Three Piece Ceremony',note:'Waistcoat depth for weddings and formal occasions.',detail:'Waistcoat · coordinated finish',image:'https://images.unsplash.com/photo-1548454782-15b189d129ab?auto=format&fit=crop&w=1200&q=90'},
      {name:'Shawl Collar Evening',note:'A softer tuxedo line for black tie and evening dressing.',detail:'Shawl collar · evening finish',image:'https://images.unsplash.com/photo-1555069519-127aadedf1ee?auto=format&fit=crop&w=1200&q=90'},
      {name:'Soft Shoulder Business',note:'Less armour, more movement, still intentionally tailored.',detail:'Natural shoulder · lighter structure',image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=90'},
      {name:'Cream Wedding Direction',note:'Light occasion tailoring with contrast built into the styling.',detail:'Light tone · ceremony styling',image:'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=1200&q=90'}
    ]
  },
  {
    id:'womens-bespoke',
    index:'02',
    title:"Women's bespoke suits",
    short:'Structure without stiffness. A tailored silhouette built around the woman wearing it.',
    body:'Custom women’s tailoring for work, events and statement dressing, with fit decisions made around shape, movement and styling preference.',
    image:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1800&q=90',
    imageAlt:'Woman wearing tailored fashion',
    tags:['Power suit','Occasion','Two piece','Custom'],
    styles:[
      {name:'Single Breasted Power Suit',note:'A sharp, clean jacket line with controlled waist shaping.',detail:'Single breast · shaped waist',image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90'},
      {name:'Double Breasted Statement',note:'More structure and presence for events or executive dressing.',detail:'Double breast · stronger shoulder',image:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90'},
      {name:'Waistcoat Set',note:'A layered three piece direction with more styling range.',detail:'Waistcoat · trouser set',image:'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=90'},
      {name:'Wide Leg Tailoring',note:'Structured jacket balanced with a longer fluid trouser line.',detail:'Long line · wide leg',image:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=90'},
      {name:'Evening Tuxedo Direction',note:'Dark, refined tailoring for evening and statement events.',detail:'Satin detail · evening cut',image:'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=90'},
      {name:'Monochrome Occasion Set',note:'One tone, controlled proportions, stronger overall silhouette.',detail:'Monochrome · custom proportion',image:'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=90'}
    ]
  },
  {
    id:'luxury-kaftan',
    index:'03',
    title:"Luxury men's kaftans",
    short:'Clean lines, restrained detail and comfort that still looks intentional.',
    body:'Kaftans for ceremonies, weekends and formal moments with fabric, embroidery and finishing selected around the client.',
    image:'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1800&q=90',
    imageAlt:'Luxury menswear',
    tags:['Kaftan','Native wear','Ceremony','Custom'],
    styles:[
      {name:'Minimal Tonal Kaftan',note:'Quiet finishing that lets fabric and fit do the work.',detail:'Tonal finish · clean neckline',image:'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1200&q=90'},
      {name:'Embroidered Front Detail',note:'More visual emphasis through controlled chest embroidery.',detail:'Chest embroidery · tonal thread',image:'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=1200&q=90'},
      {name:'Contrast Piping Direction',note:'Subtle edge definition for a cleaner graphic finish.',detail:'Contrast piping · minimal embroidery',image:'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=90'},
      {name:'Ceremony White Direction',note:'Formal light tone styling for special events and celebrations.',detail:'Light tone · premium finishing',image:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=90'},
      {name:'Deep Tone Occasion Kaftan',note:'A richer dark palette with restrained decorative detail.',detail:'Deep tone · ceremony finish',image:'https://images.unsplash.com/photo-1548454782-15b189d129ab?auto=format&fit=crop&w=1200&q=90'},
      {name:'Relaxed Weekend Luxury',note:'A cleaner, softer direction for less formal wear.',detail:'Relaxed cut · lighter structure',image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=90'}
    ]
  }
]

export const pieces = [
  {id:'signature-two-piece',category:'Suits',gender:'Men',name:'Signature Two Piece',descriptor:'Bespoke commission',image:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=90'},
  {id:'double-breasted-formal',category:'Suits',gender:'Men',name:'Double Breasted Formal',descriptor:'Bespoke commission',image:'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1200&q=90'},
  {id:'black-tie',category:'Occasion',gender:'Men',name:'Black Tie Direction',descriptor:'Occasion commission',image:'https://images.unsplash.com/photo-1548454782-15b189d129ab?auto=format&fit=crop&w=1200&q=90'},
  {id:'women-structured',category:'Women',gender:'Women',name:'Structured Women Tailoring',descriptor:'Bespoke commission',image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90'},
  {id:'women-evening',category:'Women',gender:'Women',name:'Evening Power Suit',descriptor:'Occasion commission',image:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90'},
  {id:'kaftan-minimal',category:'Kaftan',gender:'Men',name:'Minimal Kaftan',descriptor:'Custom commission',image:'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1200&q=90'},
  {id:'kaftan-occasion',category:'Kaftan',gender:'Men',name:'Occasion Kaftan',descriptor:'Custom commission',image:'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=1200&q=90'},
  {id:'ceremony-custom',category:'Occasion',gender:'Unisex',name:'Ceremony Custom',descriptor:'Custom quote',image:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=90'}
]

export const lookbook = [
  {id:1,category:'Suits',label:'Sharp structure',image:'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1400&q=90'},
  {id:2,category:'Women',label:'Power tailoring',image:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=90'},
  {id:3,category:'Details',label:'Finishing first',image:'https://images.unsplash.com/photo-1555069519-127aadedf1ee?auto=format&fit=crop&w=1400&q=90'},
  {id:4,category:'Kaftan',label:'Quiet luxury',image:'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1400&q=90'},
  {id:5,category:'Suits',label:'Formal presence',image:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1400&q=90'},
  {id:6,category:'Women',label:'Event tailoring',image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=90'},
  {id:7,category:'Occasion',label:'Ceremony direction',image:'https://images.unsplash.com/photo-1548454782-15b189d129ab?auto=format&fit=crop&w=1400&q=90'},
  {id:8,category:'Details',label:'Texture and form',image:'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1400&q=90'}
]

export const journey = [
  {year:'2017',title:'The work starts before the brand',text:'Victor says his fashion journey began around a friend’s workspace, helping people adjust and repair clothing. The habit that stood out early was not volume. It was finishing, packaging and delivery discipline.'},
  {year:'2018–2022',title:'Small jobs become a system',text:'Adjustments expanded into tote bags, trousers and complete outfits. The process became more structured as the range of work grew.'},
  {year:'29 Jan 2023',title:'OVOSKG Clothing is formally established',text:'The company takes shape around custom clothing, suits, kaftans and a more deliberate customer experience.'},
  {year:'2023–2026',title:'800+ custom pieces reported',text:'In a 2026 public post, the founder said more than 800 custom pieces had been designed and delivered over the previous three years.'}
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
  ['Can I order without visiting the boutique?','Yes. Start with the bespoke brief, then choose virtual measurements. OVOSKG can confirm whether your order still needs a physical fitting before production starts.'],
  ['How do bespoke prices work?','Pricing depends on the garment, fabric, construction, finishing and deadline. The site does not invent a flat price before those choices are known.'],
  ['Can I reuse my measurements?','The production version is designed to save approved measurements to your customer account so repeat orders are faster.'],
  ['Can I track a custom order online?','Yes. The order tracker is designed for production stages, not just courier delivery.'],
  ['Do you make women’s suits?','Yes. OVOSKG offers bespoke suits for men and women, alongside luxury men’s kaftans and other custom commissions.'],
  ['Where is OVOSKG based?','OVOSKG operates from Ife, Osun State, Nigeria. The exact boutique directions should be confirmed with the team before a visit.']
]
