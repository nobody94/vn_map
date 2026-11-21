/**
 * Tạo public/geo/provinces.geojson từ dữ liệu ranh giới 34 tỉnh của
 * https://github.com/ThangLeQuoc/vietnamese-provinces-database (MIT)
 * file: dataset-generation-scripts/resources/gis/geojson_<ngày>.zip
 *
 * Cách dùng:
 *   node scripts/build-provinces-geojson.cjs <thư-mục-đã-giải-nén> public/geo/provinces.geojson [tolerance=0.002]
 *
 * - Mã tỉnh lấy theo tiền tố tên thư mục (vd. "21_đa_nang" → 21), KHÔNG dùng properties.matinh
 *   (matinh trong dữ liệu gốc không khớp thứ tự/tên tỉnh).
 * - Đơn giản hóa đường biên bằng Douglas–Peucker (tolerance tính theo độ), làm tròn 4 chữ số thập phân.
 */
const fs = require("fs"), path = require("path");
const [dir, out, tolArg] = process.argv.slice(2);
const TOL = Number(tolArg || 0.001), R = 1e4;
function dp(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop(); let max = 0, idx = -1;
    const [x1, y1] = pts[a], [x2, y2] = pts[b], dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
    for (let i = a + 1; i < b; i++) {
      const [x, y] = pts[i];
      const d = len === 0 ? Math.hypot(x - x1, y - y1) : Math.abs(dy * x - dx * y + x2 * y1 - y2 * x1) / len;
      if (d > max) { max = d; idx = i; }
    }
    if (max > tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const rnd = p => [Math.round(p[0] * R) / R, Math.round(p[1] * R) / R];
function ring(r) {
  // split closed ring in half so DP keeps shape
  const open = r.slice(0, -1), mid = Math.floor(open.length / 2);
  const s = [...dp(open.slice(0, mid + 1), TOL), ...dp([...open.slice(mid), open[0]], TOL).slice(1)];
  return s.length >= 4 ? s.map(rnd) : null;
}
const features = [];
let before = 0, after = 0;
for (const d of fs.readdirSync(dir)) {
  const p = path.join(dir, d, "province.geojson");
  if (!fs.existsSync(p)) continue;
  for (const f of JSON.parse(fs.readFileSync(p, "utf8")).features) {
    const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
    const outPolys = [];
    for (const poly of polys) {
      before += poly.reduce((n, r) => n + r.length, 0);
      const rings = poly.map(ring);
      if (!rings[0]) continue; // outer ring too small -> drop islet
      const np = rings.filter(Boolean); after += np.reduce((n, r) => n + r.length, 0); outPolys.push(np);
    }
    features.push({ type: "Feature", properties: { code: Number(d.split("_")[0]) },
      geometry: { type: "MultiPolygon", coordinates: outPolys } });
  }
}
features.sort((a, b) => a.properties.code - b.properties.code);
fs.writeFileSync(out, JSON.stringify({ type: "FeatureCollection", features }));
console.log(features.length, "features; points", before, "->", after);
