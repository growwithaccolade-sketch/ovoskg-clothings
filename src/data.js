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
    image:'/images/ovoskg/navy-suit-client.jpg',
    imageAlt:'OVOSKG client in a navy bespoke suit',
    tags:['Two piece','Three piece','Wedding','Formal'],
    styles:[
      {name:'Navy Three Piece',note:'A clean formal suit direction shown on an OVOSKG client.',detail:'Suit · client work',image:'/images/ovoskg/navy-suit-client.jpg',source:'https://www.instagram.com/reel/DUdXwRGDM2l/'},
      {name:'Wedding Party Tailoring',note:'A coordinated groom and groomsmen direction from an OVOSKG wedding feature.',detail:'Wedding · group styling',image:'/images/ovoskg/groom-party.jpg',source:'https://www.instagram.com/reel/DcGToFdB3xO/'},
      {name:'Ceremony Detail',note:'Rich traditional detailing captured during a groom preparation moment.',detail:'Ceremony · detail',image:'/images/ovoskg/groom-detail.jpg',source:'https://www.instagram.com/reel/DcG1_QrBAqK/'},
      {name:'Traditional Groom Look',note:'A complete traditional wedding direction delivered by OVOSKG.',detail:'Wedding · traditional',image:'/images/ovoskg/traditional-wedding.jpg',source:'https://www.instagram.com/reel/DUdgpx4jDdw/'},
      {name:'Clean White Custom Set',note:'A lighter custom look that keeps the silhouette simple and intentional.',detail:'Custom · light tone',image:'/images/ovoskg/white-outfit.jpg',source:'https://www.instagram.com/reel/DUszfuXjU5B/'},
      {name:'White Statement Bespoke',note:'A refined white bespoke direction with distinctive finishing.',detail:'Bespoke · detail',image:'/images/ovoskg/white-bespoke.jpg',source:'https://www.instagram.com/reel/DT2Y_MmjLrV/'}
    ]
  },
  {
    id:'womens-bespoke',
    index:'02',
    title:"Women's bespoke suits",
    short:'Structure without stiffness. A tailored silhouette built around the woman wearing it.',
    body:'Women’s commissions are developed through the same OVOSKG fit process: silhouette direction, measurement review, fabric choice, construction and final fit validation.',
    image:'/images/ovoskg/client-year-collage.jpg',
    imageAlt:'OVOSKG client archive collage',
    tags:['Power suit','Occasion','Custom fit','Made to measure'],
    styles:[
      {name:'Silhouette Consultation',note:'Start with the shape you want, then adjust proportion around your own frame.',detail:'Direction · consultation',image:'/images/ovoskg/client-year-collage.jpg',source:'https://www.instagram.com/reel/DS75XmaDJQg/'},
      {name:'Fit Review',note:'Measurements and visual fit cues are reviewed before the garment moves into production.',detail:'Fit · validation',image:'/images/ovoskg/fitting-boutique.jpg',source:'https://www.instagram.com/reel/Ddqn8dKsHML/'},
      {name:'Fabric and Finish Review',note:'Colour, handle, detail level and occasion are aligned before approval.',detail:'Fabric · finishing',image:'/images/ovoskg/client-experience.jpg',source:'https://www.instagram.com/reel/DdmN5YyA2Sm/'},
      {name:'Construction Check',note:'The process remains structured from measurements through finishing.',detail:'Workshop · process',image:'/images/ovoskg/workshop-moment.jpg',source:'https://www.instagram.com/reel/Dcu8GbHo2xi/'},
      {name:'Occasion Direction',note:'Use OVOSKG’s archive to communicate how formal, restrained or expressive the final piece should feel.',detail:'Occasion · styling',image:'/images/ovoskg/client-year-collage.jpg',source:'https://www.instagram.com/reel/DS75XmaDJQg/'},
      {name:'Final Fit Conversation',note:'Before handover, fit concerns are reviewed against the approved measurements and design brief.',detail:'Fit · handover',image:'/images/ovoskg/fitting-boutique.jpg',source:'https://www.instagram.com/reel/Ddqn8dKsHML/'}
    ]
  },
  {
    id:'luxury-kaftan',
    index:'03',
    title:"Luxury men's kaftans",
    short:'Clean lines, restrained detail and comfort that still looks intentional.',
    body:'Kaftans for ceremonies, weekends and formal moments with fabric, detailing and finishing selected around the client.',
    image:'/images/ovoskg/groom-detail.jpg',
    imageAlt:'OVOSKG groom wearing a detailed traditional outfit',
    tags:['Kaftan','Native wear','Ceremony','Custom'],
    styles:[
      {name:'White Bespoke Direction',note:'A crisp light tone with a strong front detail treatment.',detail:'White · bespoke detail',image:'/images/ovoskg/white-bespoke.jpg',source:'https://www.instagram.com/reel/DT2Y_MmjLrV/'},
      {name:'Relaxed White Set',note:'A cleaner, easier custom direction for less formal occasions.',detail:'White · relaxed',image:'/images/ovoskg/white-outfit.jpg',source:'https://www.instagram.com/reel/DUszfuXjU5B/'},
      {name:'Groom Detail Direction',note:'Traditional detailing designed for a wedding moment.',detail:'Groom · embroidery',image:'/images/ovoskg/groom-detail.jpg',source:'https://www.instagram.com/reel/DcG1_QrBAqK/'},
      {name:'Traditional Wedding Look',note:'Full groom styling with a stronger ceremonial presence.',detail:'Wedding · traditional',image:'/images/ovoskg/traditional-wedding.jpg',source:'https://www.instagram.com/reel/DUdgpx4jDdw/'},
      {name:'Boutique Fitting',note:'Fit and proportion are checked before the order is signed off.',detail:'Fitting · client',image:'/images/ovoskg/fitting-boutique.jpg',source:'https://www.instagram.com/reel/Ddqn8dKsHML/'},
      {name:'Client Experience',note:'The service around the garment is part of the OVOSKG standard.',detail:'Service · boutique',image:'/images/ovoskg/client-experience.jpg',source:'https://www.instagram.com/reel/DdmN5YyA2Sm/'}
    ]
  }
]

export const pieces = [
  {id:'navy-three-piece',category:'Suits',gender:'Men',name:'Navy Three Piece Client Look',descriptor:'OVOSKG client work',image:'/images/ovoskg/navy-suit-client.jpg'},
  {id:'wedding-party',category:'Suits',gender:'Men',name:'Wedding Party Tailoring',descriptor:'OVOSKG wedding work',image:'/images/ovoskg/groom-party.jpg'},
  {id:'groom-detail',category:'Occasion',gender:'Men',name:'Ceremony Detail',descriptor:'OVOSKG groom work',image:'/images/ovoskg/groom-detail.jpg'},
  {id:'traditional-groom',category:'Occasion',gender:'Men',name:'Traditional Groom Look',descriptor:'OVOSKG wedding work',image:'/images/ovoskg/traditional-wedding.jpg'},
  {id:'white-custom',category:'Kaftan',gender:'Men',name:'White Custom Set',descriptor:'OVOSKG custom work',image:'/images/ovoskg/white-outfit.jpg'},
  {id:'white-bespoke',category:'Kaftan',gender:'Men',name:'White Statement Bespoke',descriptor:'OVOSKG custom work',image:'/images/ovoskg/white-bespoke.jpg'},
  {id:'fitting-room',category:'Details',gender:'Client',name:'Boutique Fitting',descriptor:'OVOSKG fitting process',image:'/images/ovoskg/fitting-boutique.jpg'},
  {id:'client-service',category:'Details',gender:'Client',name:'Client Experience',descriptor:'OVOSKG boutique service',image:'/images/ovoskg/client-experience.jpg'}
]

export const lookbook = [
  {id:1,category:'Fittings',label:'Fit checked in the boutique',image:'/images/ovoskg/fitting-boutique.jpg',source:'https://www.instagram.com/reel/Ddqn8dKsHML/'},
  {id:2,category:'Service',label:'The OVOSKG client experience',image:'/images/ovoskg/client-experience.jpg',source:'https://www.instagram.com/reel/DdmN5YyA2Sm/'},
  {id:3,category:'Weddings',label:'Groom detail',image:'/images/ovoskg/groom-detail.jpg',source:'https://www.instagram.com/reel/DcG1_QrBAqK/'},
  {id:4,category:'Weddings',label:'Groom and his men',image:'/images/ovoskg/groom-party.jpg',source:'https://www.instagram.com/reel/DcGToFdB3xO/'},
  {id:5,category:'Kaftan',label:'White custom set',image:'/images/ovoskg/white-outfit.jpg',source:'https://www.instagram.com/reel/DUszfuXjU5B/'},
  {id:6,category:'Weddings',label:'Traditional groom look',image:'/images/ovoskg/traditional-wedding.jpg',source:'https://www.instagram.com/reel/DUdgpx4jDdw/'},
  {id:7,category:'Suits',label:'Navy bespoke suit',image:'/images/ovoskg/navy-suit-client.jpg',source:'https://www.instagram.com/reel/DUdXwRGDM2l/'},
  {id:8,category:'Kaftan',label:'White statement bespoke',image:'/images/ovoskg/white-bespoke.jpg',source:'https://www.instagram.com/reel/DT2Y_MmjLrV/'},
  {id:9,category:'Archive',label:'Client archive',image:'/images/ovoskg/client-year-collage.jpg',source:'https://www.instagram.com/reel/DS75XmaDJQg/'}
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
  ['Can I order without visiting the boutique?','Yes. Remote measurements are reviewed before cutting. If the numbers do not line up, OVOSKG can request a remeasure, photos or a short video check before production starts.'],
  ['How do bespoke prices work?','Pricing depends on the garment, fabric, construction, finishing and deadline. The site does not invent a flat price before those choices are known.'],
  ['Can I reuse my measurements?','The production version is designed to save approved measurements to your customer account so repeat orders are faster.'],
  ['Can I track a custom order online?','Yes. The order tracker is designed for production stages, not just courier delivery.'],
  ['What if the fit is off after delivery?','OVOSKG reviews the finished garment against the approved measurement set and then confirms the appropriate next step, which may be alteration guidance, return correction or a remake assessment. Exact terms are confirmed before payment.'],
  ['Do you make women’s suits?','Yes. OVOSKG offers bespoke suits for men and women, alongside luxury men’s kaftans and other custom commissions.'],
  ['Where is OVOSKG based?','OVOSKG operates from Ife, Osun State, Nigeria. The exact boutique directions should be confirmed with the team before a visit.']
]
