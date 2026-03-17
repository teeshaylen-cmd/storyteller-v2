const transcript = document.getElementById("transcript")
const generate = document.getElementById("generate")
const clear = document.getElementById("clear")
const demo = document.getElementById("demo")

const summaryBox = document.getElementById("summary")
const topicsBox = document.getElementById("topics")
const promptBox = document.getElementById("prompt")
const codeBox = document.getElementById("code")
const diagramBox = document.getElementById("diagram")

function extractTopics(text){

const words=text
.toLowerCase()
.replace(/[^a-z\s]/g,"")
.split(/\s+/)

const freq={}

words.forEach(w=>{
if(w.length>4){
freq[w]=(freq[w]||0)+1
}
})

return Object.keys(freq)
.sort((a,b)=>freq[b]-freq[a])
.slice(0,5)

}

function buildFlow(topics){

const t1=topics[0]||"topic"
const t2=topics[1]||"discussion"
const t3=topics[2]||"analysis"

return `flowchart TD
A[Meeting Start]
B[${t1}]
C[${t2}]
D[${t3}]
E[Decision]
F[Actions]

A-->B
B-->C
C-->D
D-->E
E-->F
`
}

async function render(code){

diagramBox.innerHTML=""

const id="m"+Date.now()

const {svg}=await mermaid.render(id,code)

diagramBox.innerHTML=svg

}

generate.onclick=async()=>{

const text=transcript.value

if(!text){
summaryBox.innerText="Paste transcript first"
return
}

const topics=extractTopics(text)

topicsBox.innerText=topics.join(", ")

summaryBox.innerText=text.substring(0,200)+"..."

const prompt="Illustration of "+topics.join(", ")

promptBox.innerText=prompt

const flow=buildFlow(topics)

codeBox.innerText=flow

await render(flow)

}

clear.onclick=()=>{

transcript.value=""

summaryBox.innerText=""
topicsBox.innerText=""
promptBox.innerText=""
codeBox.innerText=""
diagramBox.innerHTML=""

}

demo.onclick=()=>{

transcript.value=
"Today we discussed the project timeline, data reporting problems, dashboard improvements and the next steps for the client delivery process."

}