import assert from 'node:assert';
import { queryAgentKnowledge as q, SECTION_STARTERS, AGENT_KNOWLEDGE_BASE } from '../node_modules/.cache/engine.mjs';
const cases = {
  'Does he know FHIR?': 'healthcare', 'hi': 'greetings', 'What are his top skills?': 'skills',
  'What projects has he built?': 'projects', 'Which of these is in production?': 'production',
  'How does the guardrail agent work?': 'pipeline', 'Tell me about his AI work': 'ai-agentic',
  'What roles is he looking for?': 'looking', 'Is he open to relocation?': 'location',
  'How can I hire him?': 'contact', 'What did he do at Squbix?': 'experience', 'Can I get his resume?': 'resume',
  'What is his education?': 'education', 'Tell me about the voice agent': 'voice', 'Show his GitHub': 'social-links',
  'What does he build?': 'projects', 'favourite pizza?': 'fallback', 'Try the pipeline demo': 'pipeline',
  'What is he working on now?': 'now', 'Is he currently building anything?': 'now',
};
for (const [text, id] of Object.entries(cases)) assert.equal(q(text).id, id, text);
// every starter and suggested chip lands on a real answer, every link on a real section
const ids = new Set(['stalls', 'data-entry-ai-agent', 'demo', 'skills', 'workshop', 'bill', 'contact']);
const chips = [...Object.values(SECTION_STARTERS).flat(), ...AGENT_KNOWLEDGE_BASE.flatMap((i) => i.suggestedPrompts)];
for (const c of chips) assert.notEqual(q(c).id, 'fallback', 'chip falls through: ' + c);
for (const i of AGENT_KNOWLEDGE_BASE) if (i.actionLink) assert.ok(ids.has(i.actionLink.sectionId), i.id);
console.log('engine ok:', Object.keys(cases).length, 'cases,', chips.length, 'chips');
