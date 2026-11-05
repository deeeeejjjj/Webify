# Tiny static preview server for Windows - nothing to install.
# Run:  powershell -ExecutionPolicy Bypass -File tools/serve.ps1
# Then open http://localhost:5173 and keep this window open.
param([int]$Port = 5173)
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$types = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='text/javascript; charset=utf-8'; '.png'='image/png'; '.svg'='image/svg+xml'; '.ico'='image/x-icon'; '.json'='application/json' }
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()
Write-Host "Webify preview running at http://localhost:$Port"
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  try {
    $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
    if (-not $rel) { $rel = 'index.html' }
    $file = [IO.Path]::GetFullPath((Join-Path $root $rel))
    if ($file.StartsWith($root) -and (Test-Path $file -PathType Leaf)) {
      $bytes = [IO.File]::ReadAllBytes($file)
      $ctx.Response.ContentType = $types[[IO.Path]::GetExtension($file).ToLower()]
      $ctx.Response.Headers.Add('Cache-Control', 'no-store')
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else { $ctx.Response.StatusCode = 404 }
  } catch { $ctx.Response.StatusCode = 500 } finally { $ctx.Response.Close() }
}
