(async () => {
  try {
    const email = `autouser_e2e_${Date.now()}@example.com`;

    const regRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'E2E User', email, password: 'password123' }),
    });

    const regJson = await regRes.json();
    if (!regRes.ok) {
      console.error('Register failed', regRes.status, await regRes.text());
      process.exit(1);
    }

    const token = regJson.data.token;
    const userId = regJson.data.user.id;
    console.log('Registered user', userId);

    const { connectDatabase } = await import('./src/config/database.ts');
    await connectDatabase();

    const { documentRepository } = await import('./src/repositories/document.repository.ts');

    const content =
      'This document describes a Project AI-Powered Knowledge Base Assistant. It is a full stack app with frontend React and backend Node.';

    const doc = await documentRepository.create({
      title: 'E2E Test Doc',
      content,
      userId,
      fileName: 'e2e.txt',
      fileType: 'text',
      mimeType: 'text/plain',
      size: content.length,
      metadata: {},
    });

    console.log('Created document', doc._id);

    const askRes = await fetch('http://localhost:5000/api/ai/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ documentId: String(doc._id), question: 'What is this project about?' }),
    });

    console.log('ASK STATUS', askRes.status);
    console.log('ASK BODY', await askRes.text());
  } catch (err) {
    console.error('E2E ERROR', err);
    process.exit(1);
  }
})();
