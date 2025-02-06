class LanguagePracticeGame {
  constructor() {
    this.currentScreen = 'language-select';
    this.selectedLanguage = '';
    this.playerName = '';
    this.playerGender = '';
    this.selectedTopic = '';
    this.messageCount = 0;
    this.corrections = [];
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.vocabulary = new Set();
    
    this.translations = {
      hebrew: {
        welcomeTitle: 'בואו נדבר עברית! 🗣️',
        nameLabel: 'איך קוראים לך?',
        genderLabel: 'מה המגדר שלך?',
        boy: 'בן',
        girl: 'בת',
        topicsGreeting: 'בחר/י נושא לשיחה',
        family: 'משפחה ויחסים',
        hobbies: 'תחביבים ובילויים',
        school: 'לימודים ועתיד',
        society: 'חברה ותרבות',
        technology: 'טכנולוגיה ומדע',
        environment: 'סביבה וקיימות',
        pets: 'חיות מחמד',
        food: 'אוכל',
        friends: 'חברים',
        startRecording: 'התחל להקליט',
        stopRecording: 'עצור',
        sendText: 'שלח',
        inputPlaceholder: 'או הקלד/י את התשובה שלך כאן...',
        correctionsTitle: 'הערות לשיפור 📝',
        backHome: 'חזור לדף הבית',
        vocabButton: 'אוצר מילים',
        vocabTitle: 'אוצר מילים חדש',
        noVocab: 'עדיין אין מילים חדשות'
      },
      arabic: {
        welcomeTitle: 'هيا نتحدث! 🗣️',
        nameLabel: 'ما اسمك؟',
        genderLabel: 'ما هو جنسك؟',
        boy: 'ولد',
        girl: 'بنت',
        topicsGreeting: 'اختر موضوعاً للمحادثة',
        family: 'العائلة والعلاقات',
        hobbies: 'الهوايات والترفيه',
        school: 'التعليم والمستقبل',
        society: 'المجتمع والثقافة',
        technology: 'التكنولوجيا والعلوم',
        environment: 'البيئة والاستدامة',
        pets: 'الحيوانات الأليفة',
        food: 'الطعام',
        friends: 'الأصدقاء',
        startRecording: 'ابدأ التسجيل',
        stopRecording: 'توقف',
        sendText: 'إرسال',
        inputPlaceholder: 'أو اكتب إجابتك هنا...',
        correctionsTitle: 'ملاحظات للتحسين 📝',
        backHome: 'العودة إلى الصفحة الرئيسية',
        vocabButton: 'أוצר الميليم',
        vocabTitle: 'أוצר الميليم الجديد',
        noVocab: 'لا يوجد ميليمات جديدة'
      },
      english: {
        welcomeTitle: "Let's Talk! 🗣️",
        nameLabel: 'What is your name?',
        genderLabel: 'What is your gender?',
        boy: 'Boy',
        girl: 'Girl',
        topicsGreeting: 'Choose a conversation topic',
        family: 'Family & Relationships',
        hobbies: 'Hobbies & Entertainment',
        school: 'Education & Future',
        pets: 'Pets',
        food: 'Food',
        friends: 'Friends',
        startRecording: 'Start Recording',
        stopRecording: 'Stop',
        sendText: 'Send',
        inputPlaceholder: 'Or type your answer here...',
        correctionsTitle: 'Learning Notes 📝',
        backHome: 'Back to Home',
        vocabButton: 'Vocabulary',
        vocabTitle: 'New Vocabulary',
        noVocab: 'No new vocabulary',
        society: 'Society & Culture',
        technology: 'Technology & Science',
        environment: 'Environment & Sustainability'
      },
      italian: {
        welcomeTitle: "Parliamo! 🗣️",
        nameLabel: 'Come ti chiami?',
        genderLabel: 'Qual è il tuo genere?',
        boy: 'Ragazzo',
        girl: 'Ragazza',
        topicsGreeting: 'Scegli un argomento di conversazione',
        family: 'Famiglia e Relazioni',
        hobbies: 'Hobby e Intrattenimento',
        school: 'Istruzione e Futuro',
        pets: 'Animali domestici',
        food: 'Cibo',
        friends: 'Amici',
        startRecording: 'Inizia registrazione',
        stopRecording: 'Ferma',
        sendText: 'Invia',
        inputPlaceholder: 'O scrivi la tua risposta qui...',
        correctionsTitle: 'Note di apprendimento 📝',
        backHome: 'Torna alla Home',
        vocabButton: 'Vocabolario',
        vocabTitle: 'Nuovo vocabolario',
        noVocab: 'Nessun nuovo vocabolario',
        society: 'Società e Cultura',
        technology: 'Tecnologia e Scienza',
        environment: 'Ambiente e Sostenibilità'
      }
    };
    
    this.initializeElements();
    this.setupEventListeners();
  }

  initializeElements() {
    // Language selection elements
    this.languageButtons = document.querySelectorAll('.language-btn');
    
    // Welcome screen elements
    this.welcomeTitle = document.getElementById('welcome-title');
    this.nameInput = document.getElementById('name');
    this.nameLabel = document.getElementById('name-label');
    this.genderLabel = document.getElementById('gender-label');
    this.genderButtons = document.querySelectorAll('.gender-btn');
    
    // Topics screen elements
    this.playerNameSpan = document.getElementById('player-name');
    this.topicsGreeting = document.getElementById('topics-greeting');
    this.topicButtons = document.querySelectorAll('.topic-btn');
    
    // Conversation screen elements
    this.chatHistory = document.getElementById('chat-history');
    this.startSpeakingBtn = document.getElementById('start-speaking');
    this.stopSpeakingBtn = document.getElementById('stop-speaking');
    this.textInput = document.getElementById('text-input');
    this.sendTextBtn = document.getElementById('send-text');
    this.correctionsList = document.getElementById('corrections-list');
    
    // Vocabulary elements
    this.vocabBtn = document.getElementById('vocab-btn');
    this.vocabWindow = document.getElementById('vocab-window');
    this.vocabOverlay = document.getElementById('vocab-overlay');
    this.vocabClose = document.getElementById('vocab-close');
    this.vocabList = document.getElementById('vocab-list');
    
    this.backHomeBtn = document.getElementById('back-home-btn');
    
    // Add new button references
    this.exportCorrectionsBtn = document.getElementById('export-corrections-btn');
    this.exportVocabBtn = document.getElementById('export-vocab-btn');
  }

  setupEventListeners() {
    this.languageButtons.forEach(btn => {
      btn.addEventListener('click', () => this.handleLanguageSelection(btn.dataset.language));
    });

    this.genderButtons.forEach(btn => {
      btn.addEventListener('click', () => this.handleGenderSelection(btn.dataset.gender));
    });

    this.topicButtons.forEach(btn => {
      btn.addEventListener('click', () => this.handleTopicSelection(btn.dataset.topic));
    });

    this.startSpeakingBtn.addEventListener('click', () => this.startListening());
    this.stopSpeakingBtn.addEventListener('click', () => this.stopListening());
    this.sendTextBtn.addEventListener('click', () => this.handleTextInput());
    
    this.textInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleTextInput();
    });
    
    this.backHomeBtn.addEventListener('click', () => this.resetGame());
    
    // Vocabulary window events
    this.vocabBtn.addEventListener('click', () => this.toggleVocabWindow());
    this.vocabClose.addEventListener('click', () => this.toggleVocabWindow());
    this.vocabOverlay.addEventListener('click', () => this.toggleVocabWindow());
    
    // Add export button event listeners
    this.exportCorrectionsBtn.addEventListener('click', () => this.exportPDF('corrections'));
    this.exportVocabBtn.addEventListener('click', () => this.exportPDF('vocabulary'));
  }

  handleLanguageSelection(language) {
    this.selectedLanguage = language;
    document.documentElement.lang = this.getLanguageCode(language);
    document.documentElement.dir = this.getLanguageDirection(language);
    this.updateUILanguage();
    this.setupSpeechRecognition();
    this.switchScreen('welcome');
  }

  getLanguageCode(language) {
    const codes = {
      hebrew: 'he',
      arabic: 'ar',
      english: 'en',
      italian: 'it'
    };
    return codes[language] || 'he';
  }

  getLanguageDirection(language) {
    return ['english', 'italian'].includes(language) ? 'ltr' : 'rtl';
  }

  updateUILanguage() {
    const texts = this.translations[this.selectedLanguage];
    this.welcomeTitle.textContent = texts.welcomeTitle;
    this.nameLabel.textContent = texts.nameLabel;
    this.genderLabel.textContent = texts.genderLabel;
    this.topicsGreeting.textContent = texts.topicsGreeting;
    
    document.querySelectorAll('.gender-btn').forEach(btn => {
      const gender = btn.dataset.gender;
      btn.textContent = `${gender === 'boy' ? '👦' : '👧'} ${texts[gender]}`;
    });

    document.querySelectorAll('.topic-btn .topic-text').forEach(span => {
      const topic = span.parentElement.dataset.topic;
      span.textContent = texts[topic];
    });

    this.textInput.placeholder = texts.inputPlaceholder;
    document.getElementById('start-recording-text').textContent = texts.startRecording;
    document.getElementById('stop-recording-text').textContent = texts.stopRecording;
    document.getElementById('send-text-text').textContent = texts.sendText;
    document.getElementById('corrections-title').textContent = texts.correctionsTitle;
    
    if (this.selectedLanguage) {
      const texts = this.translations[this.selectedLanguage];
      this.backHomeBtn.querySelector('span').textContent = texts.backHome;
    }
  }

  setupSpeechRecognition() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = this.getSpeechRecognitionLanguage();

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.handleUserInput(transcript);
      };

      this.recognition.onend = () => {
        this.stopSpeakingBtn.disabled = true;
        this.startSpeakingBtn.disabled = false;
      };
    }
  }

  getSpeechRecognitionLanguage() {
    const langs = {
      hebrew: 'he-IL',
      arabic: 'ar-SA',
      english: 'en-US',
      italian: 'it-IT'
    };
    return langs[this.selectedLanguage] || 'he-IL';
  }

  switchScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    document.getElementById(`${screenName}-screen`).classList.add('active');
    this.currentScreen = screenName;
  }

  handleGenderSelection(gender) {
    if (!this.nameInput.value.trim()) {
      const texts = this.translations[this.selectedLanguage];
      alert(texts.nameLabel);
      return;
    }
    
    this.playerName = this.nameInput.value.trim();
    this.playerGender = gender;
    this.playerNameSpan.textContent = this.playerName;
    this.switchScreen('topics');
  }

  handleTopicSelection(topic) {
    this.selectedTopic = topic;
    this.switchScreen('conversation');
    this.startConversation();
  }

  async startConversation() {
    const texts = this.translations[this.selectedLanguage];
    const greeting = await this.getAIResponse('START_CONVERSATION', {
      topic: this.selectedTopic,
      playerName: this.playerName,
      playerGender: this.playerGender
    });
    this.addMessage(greeting.response, 'ai');
    this.speak(greeting.response);
  }

  startListening() {
    if (this.recognition) {
      this.recognition.start();
      this.startSpeakingBtn.disabled = true;
      this.stopSpeakingBtn.disabled = false;
    }
  }

  stopListening() {
    if (this.recognition) {
      this.recognition.stop();
      this.stopSpeakingBtn.disabled = true;
      this.startSpeakingBtn.disabled = false;
    }
  }

  async handleTextInput() {
    const text = this.textInput.value.trim();
    if (text) {
      this.handleUserInput(text);
      this.textInput.value = '';
    }
  }

  async handleUserInput(text) {
    this.addMessage(text, 'user');
    this.messageCount++;

    const aiResponse = await this.getAIResponse('CONTINUE_CONVERSATION', {
      userInput: text,
      topic: this.selectedTopic,
      messageCount: this.messageCount,
      playerGender: this.playerGender
    });

    // Just add the AI's conversational response to the chat
    this.addMessage(aiResponse.response, 'ai');
    this.speak(aiResponse.response);

    // If there are corrections, add them separately to the corrections panel
    if (aiResponse.correction) {
      this.addCorrection(aiResponse.correction);
    }

    // Add any new vocabulary - updated structure
    if (Array.isArray(aiResponse.newVocabulary)) {
      aiResponse.newVocabulary.forEach(word => {
        if (word && word.foreign && word.hebrew) {
          this.vocabulary.add(JSON.stringify(word)); // Convert to string for Set storage
        }
      });
    }

    if (this.messageCount >= 20) {
      this.endConversation();
    }
  }

  async getAIResponse(type, data) {
    try {
      const response = await fetch('/api/ai_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `You are a friendly ${this.selectedLanguage} teacher having a conversation with ${data.playerName}, a 10th grade high school student (age 15-16) learning ${this.selectedLanguage}.
          
          Important:
          - Keep responses brief and concise (2-3 sentences maximum)
          - Use age-appropriate vocabulary and moderately complex structures
          - Focus on engaging dialogue rather than lengthy explanations
          - Match the language level to intermediate high school students
          
          ${type === 'START_CONVERSATION' 
            ? `Start a brief conversation about ${data.topic} by greeting ${data.playerName} and asking one thoughtful question.
               Use ${data.playerName}'s name in the greeting.` 
            : `Continue the conversation about ${data.topic} naturally.
               Note any errors separately in the correction field.
               Keep responses short but meaningful.
               Occasionally use ${data.playerName}'s name to maintain connection.`}
             
          Use appropriate gender forms (${data.playerGender}).
          Keep a friendly, supportive tone.

          User's message: "${data.userInput || ''}"
          
          interface Response {
            response: string;
            correction?: string;
            newVocabulary?: Array<{
              foreign: string;
              hebrew: string;
            }>;
          }`,
          data: {
            ...data,
            previousMessages: this.chatHistory.innerHTML
          }
        })
      });
      
      const aiResponse = await response.json();
      return aiResponse;
    } catch (error) {
      console.error('Error getting AI response:', error);
      return {
        response: "I apologize, there seems to be a technical issue. Could we try that again?",
        correction: null,
        newVocabulary: []
      };
    }
  }

  addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    this.chatHistory.appendChild(messageDiv);
    this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
  }

  addCorrection(correction) {
    const correctionDiv = document.createElement('div');
    correctionDiv.className = 'correction-item';
    correctionDiv.textContent = correction;
    this.correctionsList.appendChild(correctionDiv);
  }

  speak(text) {
    if (this.synthesis) {
      // Cancel any ongoing speech
      this.synthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = this.getSpeechSynthesisLanguage();
      utterance.rate = 0.8;      // Slightly slower rate for clarity
      utterance.pitch = 1;
      
      // Get available voices and find language voice
      const voices = this.synthesis.getVoices();
      const languageVoice = voices.find(voice => voice.lang.includes(this.getSpeechSynthesisLanguage()));
      
      if (languageVoice) {
        utterance.voice = languageVoice;
      }
      
      // Fallback for Chrome which might load voices asynchronously
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          const updatedVoices = this.synthesis.getVoices();
          const updatedLanguageVoice = updatedVoices.find(voice => voice.lang.includes(this.getSpeechSynthesisLanguage()));
          if (updatedLanguageVoice) {
            utterance.voice = updatedLanguageVoice;
          }
          this.synthesis.speak(utterance);
        };
      } else {
        this.synthesis.speak(utterance);
      }
    }
  }

  getSpeechSynthesisLanguage() {
    const langs = {
      hebrew: 'he-IL',
      arabic: 'ar-SA',
      english: 'en-US',
      italian: 'it-IT'
    };
    return langs[this.selectedLanguage] || 'he-IL';
  }

  endConversation() {
    const texts = this.translations[this.selectedLanguage];
    const message = this.playerGender === 'boy' ? 
      texts.family :
      texts.family;
    
    this.addMessage(message, 'ai');
    this.startSpeakingBtn.disabled = true;
    this.textInput.disabled = true;
    this.sendTextBtn.disabled = true;
  }

  toggleVocabWindow() {
    this.vocabWindow.classList.toggle('active');
    this.vocabOverlay.classList.toggle('active');
    if (this.vocabWindow.classList.contains('active')) {
      this.updateVocabList();
    }
  }

  updateVocabList() {
    this.vocabList.innerHTML = '';
    
    if (this.vocabulary.size === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'vocab-item';
      emptyMessage.textContent = this.translations[this.selectedLanguage].noVocab;
      this.vocabList.appendChild(emptyMessage);
      return;
    }

    // Convert Set items back to objects and render
    Array.from(this.vocabulary).forEach(wordString => {
      try {
        const word = JSON.parse(wordString);
        const vocabItem = document.createElement('div');
        vocabItem.className = 'vocab-item';
        
        const foreignWord = document.createElement('span');
        foreignWord.className = 'vocab-foreign';
        foreignWord.textContent = word.foreign;
        
        const hebrewWord = document.createElement('span');
        hebrewWord.className = 'vocab-hebrew';
        hebrewWord.textContent = word.hebrew;
        
        vocabItem.appendChild(foreignWord);
        vocabItem.appendChild(hebrewWord);
        this.vocabList.appendChild(vocabItem);
      } catch (e) {
        console.error('Error parsing vocabulary item:', e);
      }
    });
  }

  resetGame() {
    // Reset all game state
    this.currentScreen = 'language-select';
    this.selectedLanguage = '';
    this.playerName = '';
    this.playerGender = '';
    this.selectedTopic = '';
    this.messageCount = 0;
    this.corrections = [];
    
    // Clear UI elements
    this.nameInput.value = '';
    this.chatHistory.innerHTML = '';
    this.correctionsList.innerHTML = '';
    this.textInput.value = '';
    
    // Reset buttons
    this.startSpeakingBtn.disabled = false;
    this.textInput.disabled = false;
    this.sendTextBtn.disabled = false;
    
    // Clear any ongoing speech
    if (this.synthesis) {
      this.synthesis.cancel();
    }
    
    // Stop any ongoing recognition
    if (this.recognition) {
      this.recognition.abort();
    }
    
    // Reset language and direction
    document.documentElement.lang = 'he';
    document.documentElement.dir = 'rtl';
    
    // Switch to language selection screen
    this.switchScreen('language-select');
    
    // Clear vocabulary
    this.vocabulary.clear();
    this.vocabWindow.classList.remove('active');
    this.vocabOverlay.classList.remove('active');
  }

  async exportPDF(type) {
    try {
      const texts = this.translations[this.selectedLanguage];
      
      let content = [];
      let title = '';
      let items = [];

      if (type === 'corrections') {
        title = texts.correctionsTitle;
        const corrections = document.querySelectorAll('.correction-item');
        corrections.forEach(correction => {
          items.push(correction.textContent);
        });
      } else if (type === 'vocabulary') {
        title = texts.vocabTitle;
        this.vocabulary.forEach(wordString => {
          try {
            const word = JSON.parse(wordString);
            items.push(`${word.foreign} - ${word.hebrew}`);
          } catch (e) {
            console.error('Error parsing vocabulary item:', e);
          }
        });
      }

      // Font configuration for RTL support
      pdfMake.fonts = {
        Roboto: {
          normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf',
          bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf',
          italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Italic.ttf',
          bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-MediumItalic.ttf'
        },
        // Add Noto Sans Hebrew font for RTL text
        NotoSansHebrew: {
          normal: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-hebrew@4.5.0/files/noto-sans-hebrew-hebrew-400-normal.woff',
          bold: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-hebrew@4.5.0/files/noto-sans-hebrew-hebrew-700-normal.woff',
        }
      };

      const docDefinition = {
        content: [
          { 
            text: title, 
            style: 'header',
            font: 'NotoSansHebrew'
          },
          { text: '\n' },
          ...items.map(item => ({ 
            text: item, 
            margin: [0, 5],
            font: 'NotoSansHebrew'
          }))
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: this.getLanguageDirection(this.selectedLanguage) === 'rtl' ? 'right' : 'left',
            margin: [0, 0, 0, 20]
          }
        },
        defaultStyle: {
          font: 'NotoSansHebrew',
          fontSize: 12
        },
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: [40, 40, 40, 40]
      };

      // Create the PDF
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      
      // Download with a meaningful filename
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `${type}-${this.selectedLanguage}-${timestamp}.pdf`;
      
      pdfDocGenerator.download(filename);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new LanguagePracticeGame();
});