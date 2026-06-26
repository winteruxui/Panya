/* ──────────────────────────────────────────────────────────────
   Panya — shared Evaluation Log data model
   Single source of truth for evaluated-post metadata (predicted
   AI scores), merged at read-time with real published results
   stored per brand in localStorage under panya_eval_results_<brand>.

   Used by: insights.html (master view), and available to
   brand-library.html. Predicted scores + captions live here;
   real-world results live in localStorage (written by the
   Brand Library "Add details" drawer).
   ────────────────────────────────────────────────────────────── */

window.PANYA_BRANDS = {
  bonchon: { name: 'Bonchon',         color: '#F97316' },
  haier:   { name: 'Haier Thailand',  color: '#60A5FA' },
  central: { name: 'Central Retail',  color: '#A78BFA' },
  mk:      { name: 'MK Restaurant',   color: '#F59E0B' }
};

/* Seed entries — must mirror the eval-entry cards in brand-library.html
   (same ids so localStorage results line up). predicted.overall + 5 subs. */
window.PANYA_EVAL_SEED = [
  { id:'bc1', brand:'bonchon', platform:'Facebook',  category:'Promotion',     date:'15 Jan 2025', dateSort:20250115,
    caption:'ดื่มฉลองส่งท้ายปีกับ Tiger 100 Rally Pro แบบจัดเต็ม — กรอบทุกคำ อร่อยทุกกัด 🍗🔥 #Bonchon #CrispyWings',
    predicted:{ overall:67, hook:67, brand:70, cta:72, platform:63, clarity:60 } },
  { id:'bc2', brand:'bonchon', platform:'Instagram', category:'Entertainment', date:'8 Jan 2025',  dateSort:20250108,
    caption:'กรอบทุกคำ อร่อยทุกกัด 🍗🔥 Bonchon Wings วันนี้ที่สาขาใกล้บ้านคุณ #Bonchon #CrispyWings',
    predicted:{ overall:84, hook:88, brand:85, cta:82, platform:83, clarity:80 } },
  { id:'ha1', brand:'haier',   platform:'Facebook',  category:'Product',       date:'12 Jan 2025', dateSort:20250112,
    caption:'แอร์ Haier ประหยัดไฟเบอร์ 5 เย็นเร็วทันใจ รับหน้าร้อนนี้ ❄️ #Haier #ประหยัดไฟ',
    predicted:{ overall:59, hook:55, brand:62, cta:61, platform:58, clarity:60 } },
  { id:'ha2', brand:'haier',   platform:'Instagram', category:'Promotion',     date:'5 Jan 2025',  dateSort:20250105,
    caption:'ตู้เย็น Haier 2 ประตู จุใจ ประหยัดไฟ ลดสูงสุด 30% เฉพาะเดือนนี้ 🧊 #Haier #ลดราคา',
    predicted:{ overall:73, hook:75, brand:74, cta:70, platform:72, clarity:71 } },
  { id:'ce1', brand:'central', platform:'Facebook',  category:'Promotion',     date:'20 Jun 2025', dateSort:20250620,
    caption:'เซ็นทรัล มิดเยียร์ เซล ลดทั้งห้าง สูงสุด 70% 🛍️ #CentralMidyearSale #ช้อปคุ้ม',
    predicted:{ overall:66, hook:64, brand:68, cta:65, platform:67, clarity:66 } },
  { id:'ce2', brand:'central', platform:'Instagram', category:'Entertainment', date:'10 Jun 2025', dateSort:20250610,
    caption:'แต่งตัวรับซัมเมอร์กับคอลเลกชันใหม่ที่เซ็นทรัล ☀️👗 #CentralTH #SummerStyle',
    predicted:{ overall:81, hook:84, brand:82, cta:79, platform:80, clarity:80 } },
  { id:'mk1', brand:'mk',      platform:'Facebook',  category:'Product',       date:'15 May 2025', dateSort:20250515,
    caption:'MK สุกี้ เซตfamยกโขยง อิ่มคุ้มทั้งครอบครัว 🍲 #MKสุกี้ #อิ่มคุ้ม',
    predicted:{ overall:62, hook:60, brand:65, cta:63, platform:61, clarity:62 } },
  { id:'mk2', brand:'mk',      platform:'TikTok',    category:'Entertainment', date:'1 May 2025',  dateSort:20250501,
    caption:'เต้นท่าMK ลุ้นรับส่วนลด! มาสนุกกับเมนูใหม่ 🕺🍜 #MKrestaurant #MKchallenge',
    predicted:{ overall:77, hook:80, brand:78, cta:74, platform:76, clarity:75 } }
];

function panyaEvalKey(brand) { return 'panya_eval_results_' + brand; }

/* Real result for one entry (or null) from localStorage. */
function panyaGetActual(brand, id) {
  try { return (JSON.parse(localStorage.getItem(panyaEvalKey(brand)) || '{}'))[id] || null; }
  catch (e) { return null; }
}

/* All entries with their real result merged in (entry.actual = {...}|null). */
function panyaAllEvalEntries() {
  return window.PANYA_EVAL_SEED.map(function (e) {
    var copy = {};
    for (var k in e) copy[k] = e[k];
    copy.actual = panyaGetActual(e.brand, e.id);
    return copy;
  });
}

/* Engagement-rate bucket label used across views. */
function panyaErBucket(er) {
  var n = parseFloat(er || '0');
  return n >= 8 ? 'High' : n >= 4 ? 'Mid' : 'Low';
}
