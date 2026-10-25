const V="ixg-v2";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(["./","./index.html","./icon.svg"]).catch(()=>{})))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!="GET"||new URL(r.url).origin!=location.origin)return;
if(r.mode=="navigate"){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put("./index.html",c));return x}).catch(()=>caches.match("./index.html")));return}
e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(h=>h.put(r,c))}return x})))});
