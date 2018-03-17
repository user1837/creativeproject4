var app = new Vue({
	el: '#app',
	data: {
		baseWord: '',
		smWord: '',
		nmWord: '',
		amWord: '',
		flashcards: [],
		currentCard: {},
		showCards: false,
		showFront: true,
		currentIndex: 0
	},
	created: function() {
    	this.getFlashcards();
  	},
  	computed: {
  		frontText: function() {
  			if (this.showFront) {
  				return this.currentCard.cardHeader + this.currentCard.frontText;
  			} else {
  				return this.currentCard.backText;
  			}
  		}
  	},
	methods: {
		softlyMutate: function() {
			this.baseWord = this.baseWord.toLowerCase();
			var firstChar = this.baseWord.charAt(0);
			var secondChar = this.baseWord.charAt(1);
			if (firstChar === 'p' && secondChar !== 'h') {
				this.smWord = this.baseWord.replace('p', 'b');
			} else if (firstChar === 't' && secondChar !== 'h') {
				this.smWord = this.baseWord.replace('t', 'd');
			} else if (firstChar === 'c' && secondChar !== 'h') {
				this.smWord = this.baseWord.replace('c', 'g');
			} else if (firstChar === 'b') {
				this.smWord = this.baseWord.replace('b', 'f');
			} else if (firstChar === 'm' && secondChar !== 'h') {
				this.smWord = this.baseWord.replace('m', 'f');
			} else if (firstChar === 'd' && secondChar !== 'd') {
				this.smWord = this.baseWord.replace('d', 'dd');
			} else if (firstChar === 'l' && secondChar === 'l') {
				this.smWord = this.baseWord.substr(1);
			} else if (firstChar === 'r' && secondChar === 'h') {
				this.smWord = this.baseWord.substr(0, 1) + this.baseWord.substr(2);
			} else if (firstChar === 'g') {
				this.smWord = this.baseWord.substr(1);
			} else {
				this.smWord = "The word " + this.baseWord + " does not mutate softly.";
			}
		},
		nasallyMutate: function() {
			this.baseWord = this.baseWord.toLowerCase();
			var firstChar = this.baseWord.charAt(0);
			var secondChar = this.baseWord.charAt(1);
			if (firstChar === 'p' && secondChar !== 'h') {
				this.nmWord = this.baseWord.replace('p', 'mh');
			} else if (firstChar === 't' && secondChar !== 'h') {
				this.nmWord = this.baseWord.replace('t', 'nh');
			} else if (firstChar === 'c' && secondChar !== 'h') {
				this.nmWord = this.baseWord.replace('c', 'ngh');
			} else if (firstChar === 'b') {
				this.nmWord = this.baseWord.replace('b', 'm');
			} else if (firstChar === 'd' && secondChar !== 'd') {
				this.nmWord = this.baseWord.replace('d', 'n');
			} else if (firstChar === 'g') {
				this.nmWord = this.baseWord.replace('g', 'ng');
			} else {
				this.nmWord = "The word " + this.baseWord + " does not mutate nasally.";
			}
		},
		aspiratelyMutate: function() {
			this.baseWord = this.baseWord.toLowerCase();
			var firstChar = this.baseWord.charAt(0);
			var secondChar = this.baseWord.charAt(1);
			if (firstChar === 'p' && secondChar !== 'h') {
				this.amWord = this.baseWord.replace('p', 'ph');
			} else if (firstChar === 't' && secondChar !== 'h') {
				this.amWord = this.baseWord.replace('t', 'th');
			} else if (firstChar === 'c' && secondChar !== 'h') {
				this.amWord = this.baseWord.replace('c', 'ch');
			} else {
				this.amWord = "The word " + this.baseWord + " does not mutate aspirately."
			}
		},
		getFlashcards: function() {
      		axios.get("http://localhost:3001/api/flashcards").then(response => {
				this.flashcards = response.data; //sends GET request to the URL and assigns the array in the response to items
				return true;
      		}).catch(err => {
      		});
    	},
		startQuiz: function() {
			this.showCards = true;
			this.currentCard = this.flashcards[this.currentIndex];
		},
		addSMCard: function() {
			this.softlyMutate();
			axios.post("http://localhost:3001/api/flashcards", {
				frontText: this.baseWord,
				backText: this.smWord,
				memorized: false,
				cardHeader: "Soft Mutation of: "
			}).then(response => {
				this.getFlashcards();
				return true;
			}).catch(err => {
			});
		},
		addNMCard: function() {
			this.nasallyMutate();
			axios.post("http://localhost:3001/api/flashcards", {
				frontText: this.baseWord,
				backText: this.nmWord,
				memorized: false,
				cardHeader: "Nasal Mutation of "
			}).then(response => {
				this.getFlashcards();
				return true;
			}).catch(err => {
			});
		},
		addAMCard: function() {
			this.aspiratelyMutate();
			axios.post("http://localhost:3001/api/flashcards", {
				frontText: this.baseWord,
				backText: this.amWord,
				memorized: false,
				cardHeader: "Aspirate Mutation of "
			}).then(response => {
				this.getFlashcards();
				return true;
			}).catch(err => {
			});
		},
		addFlashcards: function() {
			this.addSMCard();
			this.addNMCard();
			this.addAMCard();
		},
		deleteMemorized: function() {
		},
		deleteCard: function(flashcard) {
		},
		flip: function() {
			this.showFront = !this.showFront;
		}
	}
});





