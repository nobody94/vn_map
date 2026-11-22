# Thu nhỏ ảnh tự tìm trong public/images: cạnh dài tối đa 1200px, JPEG chất lượng 82.
#
#   npm run images:resize
#
# Chỉ xử lý file > 300 KB hoặc cạnh dài > 1200px. Ghi đè file gốc (hãy giữ bản gốc ở nơi khác nếu cần).
# Dùng System.Drawing có sẵn trên Windows, không cần cài thêm gì.
param(
  [string]$Dir = (Join-Path $PSScriptRoot '..\public\images'),
  [int]$MaxSide = 1200,
  [int]$Quality = 82,
  [int]$MaxKB = 300
)

Add-Type -AssemblyName System.Drawing
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$Quality)

Get-ChildItem -Path $Dir -Recurse -Include *.jpg, *.jpeg, *.png, *.webp | ForEach-Object {
  $file = $_
  $img = [System.Drawing.Image]::FromFile($file.FullName)
  $w = $img.Width; $h = $img.Height
  $kb = [math]::Round($file.Length / 1KB)
  if ($kb -le $MaxKB -and [math]::Max($w, $h) -le $MaxSide) {
    $img.Dispose()
    Write-Host "  bỏ qua  $($file.Name) (${w}x${h}, $kb KB)"
    return
  }
  # Xoay theo EXIF (ảnh điện thoại) trước khi thu nhỏ
  if ($img.PropertyIdList -contains 0x0112) {
    switch ($img.GetPropertyItem(0x0112).Value[0]) {
      3 { $img.RotateFlip('Rotate180FlipNone') }
      6 { $img.RotateFlip('Rotate90FlipNone') }
      8 { $img.RotateFlip('Rotate270FlipNone') }
    }
    $w = $img.Width; $h = $img.Height
  }
  $scale = [math]::Min([double]1, [double]$MaxSide / [math]::Max($w, $h))
  $nw = [int]($w * $scale); $nh = [int]($h * $scale)
  $bmp = New-Object System.Drawing.Bitmap $nw, $nh
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.SmoothingMode = 'HighQuality'
  $g.PixelOffsetMode = 'HighQuality'
  $g.DrawImage($img, 0, 0, $nw, $nh)
  $g.Dispose(); $img.Dispose()

  # Luôn lưu JPEG; file .png/.webp được đổi đuôi thành .jpg
  $out = [System.IO.Path]::ChangeExtension($file.FullName, '.jpg')
  $tmp = "$out.tmp"
  $bmp.Save($tmp, $codec, $params)
  $bmp.Dispose()
  if ($out -ne $file.FullName) { Remove-Item $file.FullName }
  Move-Item -Force $tmp $out
  $newKb = [math]::Round((Get-Item $out).Length / 1KB)
  Write-Host "  ✓ $($file.Name): ${w}x${h} $kb KB → ${nw}x${nh} $newKb KB"
}
