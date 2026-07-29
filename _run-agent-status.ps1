$ErrorActionPreference = "Continue"
$out = Join-Path (Get-Location) "_agent-status.txt"
"=== STEP 1: cd to project ===" | Set-Content $out -Encoding utf8
"PWD: $(Get-Location)" | Add-Content $out
"" | Add-Content $out
"=== STEP 2: git status; git log ===" | Add-Content $out
& git status 2>&1 | ForEach-Object { "$_" } | Add-Content $out
& git log -1 --oneline 2>&1 | ForEach-Object { "$_" } | Add-Content $out
"" | Add-Content $out
& git rev-parse HEAD 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
  "=== STEP 3: initial commit ===" | Add-Content $out
  & git add -A 2>&1 | ForEach-Object { "$_" } | Add-Content $out
  & git reset HEAD -- .env .env.* 2>&1 | ForEach-Object { "$_" } | Add-Content $out
  & git commit --trailer "Co-authored-by: Cursor <cursoragent@cursor.com>" -m "Initial commit" 2>&1 | ForEach-Object { "$_" } | Add-Content $out
  "" | Add-Content $out
} else {
  "=== STEP 3: skipped (commits exist) ===" | Add-Content $out
  "" | Add-Content $out
}
"=== STEP 4: verify git log ===" | Add-Content $out
& git log -1 --oneline 2>&1 | ForEach-Object { "$_" } | Add-Content $out
"" | Add-Content $out
"=== STEP 5: npm run dev ===" | Add-Content $out
$listen = netstat -ano | Select-String ":3000.*LISTENING"
if ($listen) {
  "Port 3000 already listening; skipped npm run dev" | Add-Content $out
  "$listen" | Add-Content $out
} else {
  Start-Process -FilePath "npm.cmd" -ArgumentList "run","dev" -WorkingDirectory (Get-Location).Path -WindowStyle Hidden
  Start-Sleep -Seconds 8
  "Started npm run dev in background" | Add-Content $out
}
"" | Add-Content $out
"=== STEP 6: HTTP check ===" | Add-Content $out
$httpOk = $false
try {
  $r = Invoke-WebRequest -Uri "http://127.0.0.1:3000/index.html" -UseBasicParsing -TimeoutSec 25
  "StatusCode: $($r.StatusCode)" | Add-Content $out
  if ($r.StatusCode -eq 200) { $httpOk = $true }
} catch {
  "HTTP error: $($_.Exception.Message)" | Add-Content $out
}
"" | Add-Content $out
& git rev-parse HEAD 2>$null | Out-Null
$gitOk = ($LASTEXITCODE -eq 0)
"=== STEP 7: SUMMARY ===" | Add-Content $out
if ($gitOk -and $httpOk) {
  "RESULT: PASS (git has commit, HTTP 200)" | Add-Content $out
} else {
  "RESULT: FAIL (gitOk=$gitOk httpOk=$httpOk)" | Add-Content $out
}
