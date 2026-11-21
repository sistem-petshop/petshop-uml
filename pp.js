/* PawPals – helper bersama. Data disimpan di localStorage browser (demo, tanpa server). */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rp=n=>"Rp "+Math.round(n).toLocaleString("id-ID");
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pad=n=>String(n).padStart(2,"0");
const MN=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const DN=["Min","Sen","Sel","Rab","Kam","Jum","Sab"];
const fmtD=(t,tm)=>{const d=new Date(t);return d.getDate()+" "+MN[d.getMonth()].slice(0,3)+" "+d.getFullYear()+(tm?", "+pad(d.getHours())+":"+pad(d.getMinutes())+" WIB":"")};
const ago=t=>{const m=Math.max(1,Math.round((Date.now()-t)/6e4));return m<60?m+" mnt lalu":m<1440?Math.round(m/60)+" jam lalu":Math.round(m/1440)+" hari lalu"};
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){toast("Penyimpanan browser penuh")}}};
function toast(m){let t=$("#toast");if(!t){t=document.createElement("div");t.id="toast";t.className="toast";t.setAttribute("role","status");document.body.appendChild(t)}t.textContent=m;t.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("show"),2400)}
function dl(name,text,type){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type:type||"text/plain"}));a.download=name;document.body.appendChild(a);a.click();a.remove()}
const waLink=(ph,msg)=>{let n=String(ph||"").replace(/\D/g,"");if(n.startsWith("0"))n="62"+n.slice(1);return "https://wa.me/"+n+"?text="+encodeURIComponent(msg)};

const ST={unpaid:["Belum Dibayar","chip"],verif:["Menunggu Verifikasi","chip or"],dikemas:["Sedang Dikemas","chip gr"],kirim:["Dalam Pengiriman","chip"],selesai:["Selesai","chip gr"],ditolak:["Bukti Ditolak","chip rd"]};
const stChip=s=>`<span class="${ST[s][1]}">${ST[s][0]}</span>`;

/* ---- keranjang ---- */
const CART0=[{n:"Royal Canin Mini Adult 2kg",p:245000,q:1,s:24,l:"ANJING DEWASA",e:"🥣"},{n:"Whiskas Tuna Pouch 85g Box isi 12",p:95000,q:2,s:50,l:"KUCING BASAH",e:"🐟"},{n:"Vitamin Bulu & Imun NutriPlus Gel",p:115000,q:1,s:19,l:"SUPLEMEN & IMUN",e:"💊"}];
const getCart=()=>{const c=LS.get("pp_cart",null);return c==null?CART0.map(x=>({...x})):c};
const setCart=c=>LS.set("pp_cart",c);

/* ---- pesanan ---- */
const ymOf=t=>{const d=new Date(t);return d.getFullYear()+pad(d.getMonth()+1)};
function seedOrders(){
 const n=Date.now(),m=6e4,H=60*m,D=24*H,ME="Sarah Amalia";
 const o=(id,t,x)=>({id:"PWP-"+ymOf(t)+"-"+id,ts:t,fee:0,disc:0,resi:"",proof:null,type:"produk",owner:"x",...x});
 return[
 o("8819",n-20*m,{owner:"me",name:ME,phone:"0812-3456-7890",addr:"Jl. Melati Indah No. 18, Kebayoran Baru, Jakarta Selatan",note:"Rumah pagar cokelat, ada bel anjing di sisi kanan pagar.",items:[{n:"Royal Canin Maxi Adult 2kg",q:1,p:465000},{n:"PawPals Pet Cleanse Ear Drop 100ml",q:1,p:62000}],ship:{k:"Same Day Pet-Safe Delivery",p:30000},total:557000,method:"Transfer Mandiri VA",bank:"Mandiri",status:"verif",proof:{name:"Struk_Transfer_Mandiri_PWP8819.jpg",size:1468006,thumb:"",ts:n-15*m}}),
 o("8820",n-3*H,{name:"Budi Santoso",phone:"0813-5555-0101",addr:"Jl. Kemang Raya No. 7, Jakarta Selatan",note:"",items:[{n:"Wet Food Box Premium",q:1,p:230000}],ship:{k:"Reguler",p:15000},total:245000,method:"QRIS Instant",bank:"QRIS",status:"dikemas"}),
 o("8818",n-62*m,{name:"Nadya Pramita",phone:"0857-1900-4322",addr:"Jl. Cipete Utara No. 3, Jakarta Selatan",note:"",items:[{n:"Shampoo Flea & Tick 250ml",q:1,p:105000}],ship:{k:"Reguler",p:15000},total:120000,method:"Transfer BCA Manual",bank:"BCA",status:"verif",proof:{name:"bukti_bca.jpg",size:900000,thumb:"",ts:n-60*m}}),
 o("8816",n-26*H,{name:"Hendra Wijaya",phone:"0818-4455-6677",addr:"Jl. Fatmawati No. 21, Jakarta Selatan",note:"",items:[{n:"Cat Tree Tower & Scratch",q:1,p:860000}],ship:{k:"Same Day Pet-Safe Delivery",p:30000},total:890000,method:"Transfer Mandiri VA",bank:"Mandiri",status:"kirim",resi:"PWS-99120"}),
 o("7120",n-12*D,{owner:"me",type:"grooming",name:ME,phone:"0812-3456-7890",addr:"PawPals Branch Senopati",note:"Terapis: Nisa • Pasien: Milo",items:[{n:"Grooming Medis Terapi Kutu & Jamur (Kucing Dewasa)",q:1,p:120000}],ship:null,total:120000,method:"Bayar di kasir",bank:"Kasir",status:"selesai"}),
 o("6014",n-20*D,{owner:"me",name:ME,phone:"0812-3456-7890",addr:"Jl. Melati Indah No. 18, Kebayoran Baru, Jakarta Selatan",note:"",items:[{n:"Royal Canin Adult Indoor Cat 2kg + Bonus Snack",q:1,p:245000}],ship:{k:"Kurir Instan",p:0},total:245000,method:"Transfer Mandiri VA",bank:"Mandiri",status:"selesai",resi:"JKT-EXP-889021"})
 ];
}
function getOrders(){let o=LS.get("pp_orders",null);if(!o){o=seedOrders();LS.set("pp_orders",o);LS.set("pp_active",o[0].id)}return o}
const saveOrders=o=>LS.set("pp_orders",o);
const newOrderId=()=>"PWP-"+ymOf(Date.now())+"-"+(1000+Math.floor(Math.random()*9000));

/* ---- produk (admin) ---- */
const PRODS0=[
{id:"SKU-RC-201",n:"Royal Canin Mini Adult 2kg",cat:"Makanan Anjing",p:245000,h:195000,s:24,m:5,u:"Unit",e:"🥣",on:1},
{id:"SKU-WK-102",n:"Whiskas Tuna Pouch 85g Box",cat:"Makanan Kucing",p:95000,h:77500,s:50,m:8,u:"Box",e:"🐟",on:1},
{id:"SKU-VT-504",n:"Vitamin Bulu & Imun NutriPlus Gel",cat:"Vitamin & Imun",p:115000,h:88000,s:12,m:4,u:"Unit",e:"💊",on:1},
{id:"SKU-MD-881",n:"Kutu & Jamur Spray Medicated 100ml",cat:"Medicated Care",p:68000,h:45000,s:15,m:5,u:"Unit",e:"🧴",on:1},
{id:"SKU-HN-330",n:"Harness & Tali Tuntun Reflektif Doggy",cat:"Aksesoris",p:89000,h:58000,s:8,m:3,u:"Unit",e:"🦮",on:1},
{id:"SKU-LT-912",n:"Pasir Gumpal Wangi Lavender 10L",cat:"Perawatan Hygiene",p:75000,h:52000,s:32,m:6,u:"Bag",e:"🪣",on:1},
{id:"SKU-MD-905",n:"Shampoo Medicated 500ml",cat:"Medicated Care",p:135000,h:98000,s:2,m:8,u:"Botol",e:"🧼",on:1},
{id:"SKU-HG-118",n:"PawPals Pet Cleanse Ear Drop 100ml",cat:"Perawatan Hygiene",p:62000,h:40000,s:5,m:10,u:"Unit",e:"💧",on:1}];
const getProds=()=>LS.get("pp_products",null)||PRODS0.map(x=>({...x}));
const saveProds=p=>LS.set("pp_products",p);
const stockInfo=p=>p.s<=0?["Habis","rd"]:p.s<=p.m?["Menipis","or"]:p.s<=p.m*3?["Cukup","gr"]:p.s<=p.m*6?["Aman","gr"]:["Melimpah","gr"];

/* ---- shell ---- */
(function(){
 const b=document.body,nav=b.dataset.nav||"";
 if(b.dataset.shell==="store"){
  const n=getCart().length,L=(h,t,k)=>`<a ${nav===k?'class="on"':""} href="${h}">${t}</a>`;
  $("#hd").innerHTML=`<header class="hd"><div class="wrap"><div class="top"><a href="index.html" class="logo">PawPals<small>Pet Care &amp; Store</small></a><form class="search" id="sf"><span>🔍</span><input id="q" type="search" placeholder="Cari makanan kucing, vitamin, grooming..." aria-label="Cari produk"></form><div class="tools"><span class="loc">📍 Lokasi &amp; Klinik</span><a class="cart" href="keranjang.html" aria-label="Keranjang">🛒<b>${n}</b></a><div class="user"><i>🐾</i><div>Sarah Amalia<em>PawPals Gold</em></div></div></div><nav>${L("index.html","Beranda","b")}${L("index.html#produk","Belanja Produk","p")}${L("booking.html","Booking Grooming","g")}${L("pembayaran.html","Riwayat Pesanan","riwayat")}${L("index.html#kontak","Hubungi Kami &amp; Lokasi","k")}</nav></div></header>`;
  $("#sf").onsubmit=e=>{e.preventDefault();location.href="index.html?q="+encodeURIComponent($("#q").value)+"#produk"};
  $("#ft").innerHTML=`<footer class="ft"><div class="wrap"><div class="fg"><div><div class="fl">PawPals</div><p>Pusat perawatan hewan terpercaya dengan dedikasi penuh kasih. Menyediakan layanan grooming higienis, konsultasi dokter hewan, dan produk nutrisi premium.</p><p style="margin-top:12px;color:var(--green);font-weight:700">🐾 Sehat, Bersih &amp; Terawat</p></div><div><h4>Jam Operasional</h4><div class="hrs"><span>Klinik &amp; Dokter:</span><b>08:00 - 20:00</b></div><div class="hrs"><span>Salon Grooming:</span><b>08:30 - 19:00</b></div><div class="hrs"><span>Hari Operasi:</span><b>Senin - Minggu</b></div></div><div><h4>Kontak &amp; Cabang</h4><p>📍 Jl. Senopati Raya No. 42, Kebayoran Baru, Jakarta Selatan</p><p>📞 (021) 7280–9912 / WhatsApp Care</p><p>✉ care@pawpals.co.id</p></div><div><h4>Metode Pembayaran Aman</h4><div class="pay"><span>Transfer Bank</span><span>QRIS</span><span>E-Wallet</span><span>Kartu Kredit</span></div></div></div><div class="copy"><span>© 2024 PawPals Pet Care &amp; Store. Seluruh Hak Cipta Dilindungi.</span><span><a href="admin-dashboard.html">Portal Admin</a><a href="#">Syarat &amp; Ketentuan</a></span></div></div></footer>`;
 }
 if(b.dataset.shell==="admin"){
  const pend=getOrders().filter(o=>o.status==="verif").length,N=(h,i,t,k,x)=>`<a class="nv ${nav===k?"on":""}" href="${h}"><span>${i}</span>${t}${x||""}</a>`;
  $("#sb").innerHTML=`<div class="sbl"><i>🐾</i><div><b>PawPals</b><small>BACKOFFICE PORTAL</small></div></div><div class="mm">MENU UTAMA</div>${N("admin-dashboard.html","▦","Dashboard Ringkasan","dash")}${N("admin-produk.html","📦","Kelola Produk &amp; Stok","produk")}${N("admin-verifikasi.html","🧾","Verifikasi &amp; Pesanan","verif",pend?`<span class="chip og" id="pendN">${pend} Baru</span>`:"")}${N("admin-jadwal.html","📅","Jadwal Grooming","jadwal")}${N("admin-jadwal.html#laporan","📈","Laporan Penjualan","lap")}<div class="sbf"><i>🏥</i><div><b>PawPals Clinic &amp; Salon</b><small>Cabang Senopati, JKT</small></div></div><a class="nv" href="index.html"><span>←</span>Kembali ke Toko</a>`;
  $("#tb").innerHTML=`<div class="tb"><div class="crumb">Admin Backoffice › <b>Console</b></div><form class="search" id="sf"><span>🔍</span><input id="q" type="search" placeholder="Cari pesanan, stok SKU, klien..." aria-label="Cari"></form><button class="bell" id="bell" aria-label="Notifikasi">🔔</button><div class="adu"><i>👤</i><div><b>Admin PawPals</b><small>Super Admin</small></div></div></div>`;
  $("#sf").onsubmit=e=>{e.preventDefault();location.href="admin-verifikasi.html?q="+encodeURIComponent($("#q").value)};
  $("#bell").onclick=()=>toast(pend?pend+" pesanan menunggu verifikasi":"Tidak ada notifikasi baru");
 }
})();
