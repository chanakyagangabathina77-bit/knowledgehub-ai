import * as genai from '@google/genai';

console.log('Top-level exports:', Object.keys(genai));
console.log('GoogleGenAI exported?', Boolean((genai as any).GoogleGenAI));

const anyGenai = genai as any;

if (anyGenai.GoogleGenAI) {
  const client = new anyGenai.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  console.log('Client keys:', Object.keys(client));
  console.log('Client chat?', client.chats ? Object.keys(client.chats) : 'no chats');
  console.log('Client responses?', client.responses ? Object.keys(client.responses) : 'no responses');
  console.log('Client models?', client.models ? Object.keys(client.models) : 'no models');
}

if (anyGenai.default) {
  console.log('default export keys:', Object.keys(anyGenai.default));
}
