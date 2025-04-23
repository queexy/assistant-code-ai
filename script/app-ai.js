function aiHelper() {
  return {
    mode: 'code',
    userInput: '',
    response: '',
    async askAI() {
this.response = 'Czekaj...';
const promptMap = {
code: 'Napisz kod na podstawie opisu:',
error: 'Wytłumacz ten błąd i jak go naprawić:',
fix: 'Znajdź błędy i popraw kod:',
optimize: 'Zoptymalizuj ten kod:'
};

const fullPrompt = `${promptMap[this.mode]}\n${this.userInput}`;

try {
const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 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', // Twój klucz API
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'Jesteś pomocnikiem programisty.' },
      { role: 'user', content: fullPrompt }
    ]
  })
});

const data = await res.json();
console.log('API response:', data); 

if (data.choices && data.choices.length > 0) {
  this.response = data.choices[0].message.content;
} else if (data.error) {
  this.response = `Błąd API: ${data.error.message || JSON.stringify(data.error)}`;
} else {
  this.response = 'Brak odpowiedzi od modelu. Spróbuj ponownie.';
}
} catch (error) {
this.response = 'Wystąpił błąd podczas komunikacji z API.';
console.error(error);
}
}

  }
}