export const navItems = [
  ['Home','/'],
  ['Collections','/collections'],
  ['Bespoke','/bespoke'],
  ['Track Order','/track'],
  ['Contact','/contact']
]

const image = (id,w=2000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=94`

export const collections = [
  {
    id:'mens-bespoke',
    index:'01',
    title:"Men's bespoke suits",
    short:'Suits for work, weddings and formal occasions.',
    body:'Choose the cut you prefer. OVOSKG adjusts the shape, cloth and details to your measurements.',
    image:image('photo-1668202849897-846a0c405763',2400),
    imageAlt:'Nigerian man in a tailored suit',
    tags:['Two piece','Three piece','Double breasted','Wedding'],
    styles:[
      {name:'Nigerian Studio Suit',note:'A direct formal reference with a close fit and clean line.',detail:'Nigeria · suit',image:image('photo-1668202849897-846a0c405763')},
      {name:'Accra Black Suit',note:'A dark suit reference with a simple formal presentation.',detail:'Ghana · suit',image:image('photo-1622031093531-f4e641788763')},
      {name:'Lagos Grey Suit',note:'A lighter formal option from a Lagos portrait.',detail:'Nigeria · suit',image:image('photo-1572597885273-41010798881e')},
      {name:'Blue Suit Portrait',note:'A full suit reference with a strong jacket shape.',detail:'African model · suit',image:image('photo-1688120243155-1ffc1f965343')},
      {name:'Blue Suit, Relaxed Pose',note:'A softer presentation for clients who want less formality.',detail:'African model · suit',image:image('photo-1688120320082-f23f0c1425be')},
      {name:'Blue Suit, Studio',note:'A clear studio reference for jacket length and trouser balance.',detail:'African model · suit',image:image('photo-1688120320226-a73ed520c8b7')}
    ]
  },
  {
    id:'womens-bespoke',
    index:'02',
    title:"Women's bespoke suits",
    short:'Tailoring built around your proportions and the way you want it to sit.',
    body:'Use these references to show the jacket length, trouser shape and level of structure you prefer.',
    image:image('photo-1760320484116-f08b51d2aafc',2400),
    imageAlt:'Nigerian woman in a tailored suit',
    tags:['Two piece','Occasion','Work','Custom fit'],
    styles:[
      {name:'Lagos Black Suit',note:'A clean studio reference with a defined jacket line.',detail:'Lagos · suit',image:image('photo-1760320484116-f08b51d2aafc')},
      {name:'Lagos Suit and Tie',note:'A sharper formal reference with a more traditional menswear influence.',detail:'Lagos · suit',image:image('photo-1760320483926-5e3e4fe1c3fb')},
      {name:'Nairobi Suit Portrait',note:'An editorial reference with an afro and a tailored jacket.',detail:'Nairobi · suit',image:image('photo-1713747452001-2ecfa62a0b21')},
      {name:'Nigerian Seated Suit',note:'A seated reference that shows how the outfit works in a relaxed pose.',detail:'Nigeria · suit',image:image('photo-1650563002098-c72a4a057b9a')},
      {name:'Pinstripe Suit',note:'A darker option for clients considering stripes or a longer jacket.',detail:'Women · suit',image:image('photo-1771072426713-dbf71396a859')},
      {name:'Black Suit Portrait',note:'A simple black tailoring reference with a clean background.',detail:'Women · suit',image:image('photo-1771072428050-1492abb58f4a')}
    ]
  },
  {
    id:'luxury-kaftan',
    index:'03',
    title:"Luxury men's kaftans",
    short:'Native wear for ceremonies and everyday dressing.',
    body:'Choose how simple or detailed the garment should be. OVOSKG confirms the cloth, embroidery and fit before production.',
    image:image('photo-1620932934088-fbdb2920e484',2400),
    imageAlt:'Nigerian man in a white kaftan',
    tags:['Kaftan','Native wear','Ceremony','Custom'],
    styles:[
      {name:'White Kaftan',note:'A clean Lagos reference with minimal detail.',detail:'Lagos · kaftan',image:image('photo-1620932934088-fbdb2920e484')},
      {name:'White Kaftan Portrait',note:'A second Nigerian reference for a closer view of the neckline and fit.',detail:'Nigeria · kaftan',image:image('photo-1620932934121-64b011924f08')},
      {name:'White Agbada',note:'A formal agbada reference for celebrations and ceremonies.',detail:'Nigeria · agbada',image:image('photo-1782566208081-6b5135fddf23')},
      {name:'Traditional Attire',note:'A Nigerian native reference on a neutral background.',detail:'Nigeria · native wear',image:image('photo-1763823132521-72f373850de2')},
      {name:'Minimal Native',note:'A restrained option for clients who prefer fewer details.',detail:'Native wear',image:image('photo-1610652492500-ded49ceeb378')},
      {name:'Ceremony Kaftan',note:'A fuller occasion reference for formal events.',detail:'Ceremony',image:image('photo-1617137968427-85924c800a22')}
    ]
  }
]

export const pieces = [
  {id:'ng-mens-suit',category:'Suits',gender:'Men',name:'Nigerian Studio Suit',descriptor:'Bespoke reference',image:image('photo-1668202849897-846a0c405763')},
  {id:'ghana-black-suit',category:'Suits',gender:'Men',name:'Accra Black Suit',descriptor:'Bespoke reference',image:image('photo-1622031093531-f4e641788763')},
  {id:'lagos-grey-suit',category:'Suits',gender:'Men',name:'Lagos Grey Suit',descriptor:'Bespoke reference',image:image('photo-1572597885273-41010798881e')},
  {id:'blue-suit-portrait',category:'Suits',gender:'Men',name:'Blue Suit Portrait',descriptor:'Bespoke reference',image:image('photo-1688120243155-1ffc1f965343')},
  {id:'lagos-women-black',category:'Women',gender:'Women',name:'Lagos Black Suit',descriptor:'Bespoke reference',image:image('photo-1760320484116-f08b51d2aafc')},
  {id:'lagos-women-tie',category:'Women',gender:'Women',name:'Lagos Suit and Tie',descriptor:'Bespoke reference',image:image('photo-1760320483926-5e3e4fe1c3fb')},
  {id:'nairobi-women-suit',category:'Women',gender:'Women',name:'Nairobi Suit Portrait',descriptor:'Bespoke reference',image:image('photo-1713747452001-2ecfa62a0b21')},
  {id:'nigeria-women-seated',category:'Women',gender:'Women',name:'Nigerian Seated Suit',descriptor:'Bespoke reference',image:image('photo-1650563002098-c72a4a057b9a')},
  {id:'white-kaftan',category:'Kaftan',gender:'Men',name:'White Kaftan',descriptor:'Custom reference',image:image('photo-1620932934088-fbdb2920e484')},
  {id:'white-agbada',category:'Kaftan',gender:'Men',name:'White Agbada',descriptor:'Custom reference',image:image('photo-1782566208081-6b5135fddf23')},
  {id:'native-nigeria',category:'Occasion',gender:'Men',name:'Traditional Attire',descriptor:'Custom reference',image:image('photo-1763823132521-72f373850de2')}
]

export const lookbook = [
  {id:1,category:'Suits',label:'Nigerian suit portrait',image:image('photo-1668202849897-846a0c405763',2400)},
  {id:2,category:'Suits',label:'Accra black suit',image:image('photo-1622031093531-f4e641788763',2400)},
  {id:3,category:'Suits',label:'Lagos grey suit',image:image('photo-1572597885273-41010798881e',2400)},
  {id:4,category:'Suits',label:'Blue studio suit',image:image('photo-1688120243155-1ffc1f965343',2400)},
  {id:5,category:'Women',label:'Lagos black suit',image:image('photo-1760320484116-f08b51d2aafc',2400)},
  {id:6,category:'Women',label:'Lagos suit and tie',image:image('photo-1760320483926-5e3e4fe1c3fb',2400)},
  {id:7,category:'Women',label:'Nairobi suit portrait',image:image('photo-1713747452001-2ecfa62a0b21',2400)},
  {id:8,category:'Women',label:'Nigerian seated suit',image:image('photo-1650563002098-c72a4a057b9a',2400)},
  {id:9,category:'Kaftan',label:'Lagos white kaftan',image:image('photo-1620932934088-fbdb2920e484',2400)},
  {id:10,category:'Kaftan',label:'White agbada',image:image('photo-1782566208081-6b5135fddf23',2400)},
  {id:11,category:'Kaftan',label:'Nigerian native attire',image:image('photo-1763823132521-72f373850de2',2400)}
]

export const journey = [
  {year:'2017',title:'Early tailoring work',text:'Victor’s public account places the beginning around adjustments, repairs and small clothing jobs.'},
  {year:'2018–2022',title:'More complete garments',text:'The work expanded into trousers, full outfits and a more organised order process.'},
  {year:'29 Jan 2023',title:'OVOSKG is established',text:'The company formally launched around suits, kaftans and custom clothing.'},
  {year:'2023–2026',title:'800+ custom pieces reported',text:'The founder says more than 800 custom pieces were delivered during the following three years.'}
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
  ['Can I order without visiting the boutique?','Yes. Remote measurements are checked before cutting. If a number looks wrong, OVOSKG can ask you to measure again, send photos or join a short video check.'],
  ['How is bespoke pricing confirmed?','The quote depends on the garment, cloth, construction, details and deadline. OVOSKG confirms the price before payment.'],
  ['Can I reuse my measurements?','Yes, after a measurement set has been reviewed and approved for an order.'],
  ['Can I track a custom order online?','Yes. The tracker shows the current production stage.'],
  ['What if the fit is off after delivery?','OVOSKG compares the garment with the approved measurements and agrees the correction. Any alteration or remake terms are stated before payment.'],
  ['Do you make women’s suits?','Yes. OVOSKG makes bespoke suits for men and women, plus men’s kaftans and other custom pieces.'],
  ['Where is OVOSKG based?','OVOSKG is based in Ife, Osun State, Nigeria. Confirm the boutique directions before visiting.']
]
