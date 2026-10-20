import fs from 'node:fs';
import path from 'node:path';
const dir = process.argv[2] || 'sarif';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.sarif'));
if (!files.length) throw new Error('No SARIF: analysis did not produce evidence');
let count = 0;
for (const file of files) {
  const report = JSON.parse(fs.readFileSync(path.join(dir,file),'utf8'));
  if (!Array.isArray(report.runs) || report.runs.length === 0) throw new Error('Invalid or empty SARIF runs');
  for (const run of report.runs) {
    const rules = run.tool?.driver?.rules;
    if (!Array.isArray(rules)) throw new Error('Missing SARIF rule metadata');
    for (const result of run.results || []) {
      const rule = rules.find(r => r.id === result.ruleId) || rules[result.ruleIndex];
      if (!rule) throw new Error('Finding without rule metadata');
      const raw = rule?.properties?.['security-severity'];
      if (raw !== undefined && !Number.isFinite(Number(raw))) throw new Error('Invalid security severity');
      if (raw !== undefined && Number(raw) >= 7) count++;
    }
  }
}
if (count) throw new Error(count + ' high/critical security findings');
console.log('No high/critical security findings');
