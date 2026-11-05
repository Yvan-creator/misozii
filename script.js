const CONFIG={whatsapp:'250788000000',displayNumber:'+250 788 000 000',brand:'Misozii Art'};
const IMGS=['images/img0.jpg', 'images/img1.jpg', 'images/img2.jpg', 'images/img3.jpg', 'images/img4.jpg', 'images/img5.jpg', 'images/img6.jpg', 'images/img7.jpg', 'images/img8.jpg', 'images/img9.jpg', 'images/img10.jpg'];
let gallery=IMGS.map((s,i)=>({id:i,src:s,own:false}));
let hero=7;
const base=[
 {t:'Ndabaga Brand',d:'Tells a story of the legendary hero Ndabaga and bravery acts',img:4},
 {t:'Intore Brand',d:'Represents the chosen one to serve out of the many',img:7},
 {t:'Ibisumizi Brand',d:'The legendary elite army formed by King Ruganzu II Ndoli',img:1},
 {t:'Inyambo Brand',d:'The finest long horned cattle that signify the beauty concept of Rwanda',img:8},
 {t:'Amasunzu Brand',d:'The iconic, sculpted traditional Rwandan hairstyle that represents african fashion',img:10}];
let extra=[],isAdmin=false,bc=null;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $=id=>document.getElementById(id);
const find=id=>gallery.find(g=>g.id===id)||gallery[0];
function setHero(id){hero=id;const g=find(id);$('hero').src=g.src;$('heroName').textContent=g.id===7?'MPUNDU EXALTO':'MISOZII';}
function avatars(){$('avatars').innerHTML=[7,5,0,8].map(i=>`<img src="${find(i).src}" class="av w-11 h-11 rounded-full object-cover border-2 border-white" alt="">`).join('');}
function renderProjects(){$('pgrid').innerHTML=base.concat(extra).map(b=>{const s=b.img==null?'':(typeof b.img==='number'?find(b.img).src:b.img);const media=s?`<img src="${s}" class="w-full h-full object-cover" alt="">`:`<div class="w-full h-full grid place-items-center bg-gradient-to-br from-amber-400 via-orange-500 to-[#7a2a0a] disp text-4xl text-white">${esc(b.t.split(' ')[0].toUpperCase())}</div>`;return `<div class="lift tile relative rounded-2xl border overflow-hidden bg-white ${s?'cursor-pointer':''}" ${s?'onclick="previewSrc(this.querySelector(\'img\').src)"':''}><div class="aspect-[4/3] overflow-hidden">${media}</div><div class="p-4"><b class="disp text-xl tracking-wide">${esc(b.t).toUpperCase()}</b><p class="text-sm text-neutral-600">${esc(b.d)}</p></div>${isAdmin&&b.id?`<button onclick="event.stopPropagation();delBrand('${b.id}')" class="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold rounded-full px-3 py-1">Remove</button>`:''}</div>`;}).join('');}
function previewSrc(s){$('lbi').src=s;$('lb').classList.remove('hidden');}
async function delBrand(id){try{await bc.doc(id).delete();extra=extra.filter(x=>x.id!==id);renderProjects();}catch(e){}}
function renderGrid(){$('grid').innerHTML=gallery.map(g=>`<div class="tile relative aspect-square rounded-xl overflow-hidden bg-neutral-100 ${g.id===hero?'ring-4 ring-orange-500':''}"><img src="${g.src}" class="w-full h-full object-cover" alt="">${g.id===hero?'<span class="absolute top-2 left-2 text-[10px] font-bold bg-orange-500 text-white rounded-full px-2 py-1">HERO</span>':''}<div class="act absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2 text-xs font-semibold"><button class="bg-white rounded-full px-3 py-1.5 hover:bg-amber-300" onclick="feature(${g.id})">★ Feature as hero</button><button class="bg-white/90 rounded-full px-3 py-1.5 hover:bg-amber-300" onclick="preview(${g.id})">Preview</button><button class="bg-red-600 text-white rounded-full px-3 py-1.5 hover:bg-red-700" onclick="del(${g.id})">Remove</button></div></div>`).join('');}
function feature(id){setHero(id);renderGrid();}
function del(id){if(gallery.length<2)return;gallery=gallery.filter(g=>g.id!==id);if(hero===id)setHero(gallery[0].id);avatars();renderProjects();renderGrid();}
function preview(id){$('lbi').src=find(id).src;$('lb').classList.remove('hidden');}
function tab(n){['projects','gallery'].forEach(t=>{$(t).classList.toggle('hidden',t!==n);$('t-'+t).className='px-5 py-2 rounded-full '+(t===n?'bg-orange-500 text-white':'bg-neutral-100 hover:bg-orange-100');});}
const titles={work:'BRANDS',about:'ABOUT',services:'SERVICES',contact:'CONTACT'};
function openPanel(n,t){$('mm').classList.add('hidden');document.querySelectorAll('.panel').forEach(p=>p.classList.add('hidden'));$('p-'+n).classList.remove('hidden');$('pt').textContent=titles[n];if(n==='work')tab(t||'projects');
 $('ov').classList.remove('hidden');requestAnimationFrame(()=>$('dr').classList.add('open'));$('dr').scrollTop=0;}
function closePanel(){$('dr').classList.remove('open');setTimeout(()=>$('ov').classList.add('hidden'),350);}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('lb').classList.add('hidden');closePanel();}});
let uid=100;
function addFiles(fs){[...fs].filter(f=>f.type.startsWith('image/')).forEach(f=>{const r=new FileReader();r.onload=()=>{gallery.unshift({id:uid++,src:r.result,own:true});renderGrid();};r.readAsDataURL(f);});}
$('file').onchange=e=>{addFiles(e.target.files);e.target.value='';};
const dz=$('drop');['dragover','dragenter'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('bg-orange-50');}));
dz.addEventListener('dragleave',()=>dz.classList.remove('bg-orange-50'));
dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('bg-orange-50');addFiles(e.dataTransfer.files);});
const apply=()=>{$('numTxt').textContent=CONFIG.displayNumber;$('waMain').href=wa('Hello '+CONFIG.brand+', I would like more information.');$('waHero').href=wa('Hello '+CONFIG.brand+', I would like to place an order.');};
const wa=t=>'https://wa.me/'+CONFIG.whatsapp.replace(/\D/g,'')+'?text='+encodeURIComponent(t);
apply();
$('cf').onsubmit=e=>{e.preventDefault();window.open(wa('Hello '+CONFIG.brand+'! I am '+$('cn').value+'. '+$('cs').value+': '+$('cm').value),'_blank');};
(async()=>{try{if(!window.claude)return;const[db,user]=await Promise.all([claude.use('db'),claude.use('user')]);if(!db)return;const ref=db.doc('settings/contact');
const s=await ref.get();if(s.exists){const d=s.data();if(d.whatsapp){CONFIG.whatsapp=d.whatsapp;CONFIG.displayNumber=d.displayNumber||d.whatsapp;apply();}}
if(user&&await user.canEdit()){$('adm').classList.remove('hidden');$('an').value=CONFIG.whatsapp;$('ad').value=CONFIG.displayNumber;
$('as').onclick=async()=>{const n=$('an').value.replace(/\D/g,'');if(n.length<8){$('am').textContent='Enter a valid number';return;}try{await ref.set({whatsapp:n,displayNumber:$('ad').value||('+'+n)});CONFIG.whatsapp=n;CONFIG.displayNumber=$('ad').value||('+'+n);apply();$('am').textContent='Saved ✓';}catch(e){$('am').textContent='Not allowed';}};}}catch(e){}})();
(async()=>{try{if(!window.claude)return;const[db,user,assets]=await Promise.all([claude.use('db'),claude.use('user'),claude.use('assets')]);if(!db)return;bc=db.collection('brands');
const load=async()=>{const q=await bc.get();extra=q.docs.map(d=>Object.assign({id:d.id},d.data())).sort((a,b)=>(a.ts||0)-(b.ts||0));renderProjects();};await load();
if(user&&await user.canEdit()){isAdmin=true;$('addBrand').classList.remove('hidden');renderProjects();
$('bs').onclick=async()=>{const n=$('bn').value.trim(),d=$('bd').value.trim();if(!n||!d){$('bm').textContent='Add a name and description';return;}$('bm').textContent='Saving…';try{let img=null;const f=$('bf').files[0];if(f&&assets)img=(await assets.upload(f)).url;await bc.doc('b'+Date.now()).set({t:n,d:d,img:img,ts:Date.now()});$('bn').value='';$('bd').value='';$('bf').value='';await load();$('bm').textContent='Added ✓';}catch(e){$('bm').textContent='Could not save';}};}}catch(e){}})();
setHero(7);avatars();renderProjects();renderGrid();