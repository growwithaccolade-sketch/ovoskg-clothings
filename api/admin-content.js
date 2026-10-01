const OWNER=process.env.GITHUB_OWNER||'growwithaccolade-sketch'
const REPO=process.env.GITHUB_REPO||'ovoskg-clothings'
const BRANCH=process.env.GITHUB_BRANCH||'main'
const CONTENT_PATH='src/content/site.json'

const send=(res,status,body)=>res.status(status).json(body)

async function github(path,options={}){
  const token=process.env.GITHUB_TOKEN
  const response=await fetch(`https://api.github.com/repos/${OWNER}/${REPO}${path}`,{
    ...options,
    headers:{
      'accept':'application/vnd.github+json',
      'authorization':`Bearer ${token}`,
      'x-github-api-version':'2022-11-28',
      ...(options.headers||{})
    }
  })
  const body=await response.json().catch(()=>({}))
  if(!response.ok) throw new Error(body.message||`GitHub request failed with ${response.status}`)
  return body
}

function validContent(value){
  return value&&typeof value==='object'
    &&typeof value.hero?.trust==='string'
    &&typeof value.hero?.headingPrimary==='string'
    &&typeof value.hero?.headingAccent==='string'
    &&typeof value.hero?.body==='string'
    &&typeof value.contact?.phoneDisplay==='string'
    &&typeof value.contact?.phoneE164==='string'
    &&typeof value.contact?.location==='string'
    &&typeof value.business?.registration==='string'
    &&JSON.stringify(value).length<30000
}

export default async function handler(req,res){
  if(!process.env.ADMIN_PASSWORD||!process.env.GITHUB_TOKEN){
    return send(res,503,{error:'Admin is not configured. Add ADMIN_PASSWORD and GITHUB_TOKEN to the Vercel project environment.'})
  }
  if(req.headers['x-admin-password']!==process.env.ADMIN_PASSWORD) return send(res,401,{error:'Invalid admin password.'})
  if(!['GET','PUT'].includes(req.method)) return send(res,405,{error:'Method not allowed.'})

  try{
    const current=await github(`/contents/${CONTENT_PATH}?ref=${encodeURIComponent(BRANCH)}`)
    if(req.method==='GET'){
      const content=JSON.parse(Buffer.from(current.content,'base64').toString('utf8'))
      return send(res,200,{content,sha:current.sha})
    }

    const next=req.body?.content
    if(!validContent(next)) return send(res,400,{error:'The content payload is invalid.'})
    const result=await github(`/contents/${CONTENT_PATH}`,{
      method:'PUT',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({
        message:'Update OVOSKG website content from admin',
        content:Buffer.from(JSON.stringify(next,null,2)+'\n').toString('base64'),
        sha:current.sha,
        branch:BRANCH
      })
    })
    return send(res,200,{ok:true,commit:result.commit?.sha,url:result.commit?.html_url})
  }catch(error){
    return send(res,500,{error:error.message||'Admin publishing failed.'})
  }
}
