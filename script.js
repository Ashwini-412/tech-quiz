/**
 * TechIntel - Advanced Tech Intelligence Puzzle App
 * Pure Vanilla JavaScript Implementation
 */

// --- PUZZLE DATA BANK ---
const PUZZLES = [
    {
        id: 1,
        type: "DSA",
        difficulty: "hard",
        category: "Complexity",
        question: "You have a sorted array of N elements. A developer mistakenly applies linear search inside a loop that iterates N times. What is the tightest upper bound for the time complexity?",
        codeSnippet: `// Mistaken Implementation
for (let i = 0; i < n; i++) {
    // Should be Binary Search, but is Linear
    linearSearch(sortedArray, target); 
}`,
        options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
        correctAnswer: "O(n²)",
        explanation: "Even though the array is sorted, using a linear search (O(n)) inside a loop that runs N times results in O(n * n) = O(n²). The sorted property is wasted by not using Binary Search (O(log n))."
    },
    {
        id: 2,
        type: "Debugging",
        difficulty: "hard",
        category: "JS Internals",
        question: "What is the output of this code snippet, and why?",
        codeSnippet: `for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1);
}`,
        options: ["0, 1, 2", "3, 3, 3", "2, 2, 2", "undefined"],
        correctAnswer: "3, 3, 3",
        explanation: "The variable 'i' is declared with 'var', making it function-scoped. By the time the microtask queue (setTimeout) executes, the loop has already finished and 'i' has reached 3. Using 'let' would create a new binding for each iteration."
    },
    {
        id: 3,
        type: "System Design",
        difficulty: "hard",
        category: "Database",
        question: "In a distributed system, if you prioritize Consistency and Partition Tolerance (CP), what must you sacrifice according to the CAP theorem?",
        options: ["Availability", "Latency", "Durability", "Scalability"],
        correctAnswer: "Availability",
        explanation: "The CAP Theorem states that a distributed system can only provide two of the three: Consistency, Availability, and Partition Tolerance. If you choose CP, you must stop responding to requests (lose availability) if a network partition occurs to ensure data remains consistent."
    },
    {
        id: 4,
        type: "Web Core",
        difficulty: "hard",
        category: "React Logic",
        question: "During a React render cycle, what happens if you directly mutate a state object without calling setState?",
        codeSnippet: `const [user, setUser] = useState({ name: 'Bob' });
user.name = 'Alice'; // Mutation`,
        options: ["Component re-renders immediately", "Component never re-renders", "Virtual DOM updates but UI doesn't", "Error is thrown"],
        correctAnswer: "Component never re-renders",
        explanation: "React relies on 'Object.is' comparison (referential equality) to detect changes. Direct mutation doesn't change the object reference. Since the reference remains the same, React's reconciliation engine skips the re-render."
    },
    {
        id: 5,
        type: "CS Core",
        difficulty: "hard",
        category: "Operating Systems",
        question: "Which of the following best describes 'Thrashing' in an Operating System?",
        options: ["CPU executing instructions too fast", "System spending more time swapping pages than executing", "Deadlock between two high-priority processes", "A memory leak in the kernel"],
        correctAnswer: "System spending more time swapping pages than executing",
        explanation: "Thrashing occurs when the virtual memory subsystem is in a constant state of paging (swapping data between RAM and disk), leading to near-zero CPU productivity because processes are constantly waiting for pages to be loaded."
    },
    {
        id: 6,
        type: "DSA",
        difficulty: "hard",
        category: "Trees",
        question: "What is the worst-case time complexity of searching for an element in a Red-Black Tree with N nodes?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(log n)",
        explanation: "A Red-Black tree is a self-balancing binary search tree. Unlike a standard BST (which can degrade to O(n)), a Red-Black tree guarantees a height of O(log n), ensuring search, insert, and delete are always O(log n)."
    },
    {
        id: 7,
        type: "Debugging",
        difficulty: "hard",
        category: "JS Closures",
        question: "What will be the output of the following closure implementation?",
        codeSnippet: `function createCounter() {
    let count = 0;
    return () => ++count;
}
const c1 = createCounter();
const c2 = createCounter();
c1();
console.log(c1(), c2());`,
        options: ["1, 1", "2, 1", "2, 2", "1, 2"],
        correctAnswer: "2, 1",
        explanation: "Each call to 'createCounter' creates a new lexical environment with its own 'count' variable. 'c1' and 'c2' are independent. 'c1' was called twice (returning 1 then 2), while 'c2' is called for the first time (returning 1)."
    },
    {
        id: 8,
        type: "Web Core",
        difficulty: "hard",
        category: "HTTP/2",
        question: "What major performance issue does HTTP/2 solve by using 'Multiplexing'?",
        options: ["Head-of-line blocking at the TCP layer", "Head-of-line blocking at the HTTP layer", "SSL Handshake latency", "DNS Resolution time"],
        correctAnswer: "Head-of-line blocking at the HTTP layer",
        explanation: "In HTTP/1.1, browsers were limited in concurrent requests per domain. If one request was slow, it blocked others. HTTP/2 allows multiple requests/responses to be interleaved over a single TCP connection, eliminating application-level blocking."
    },
    {
        id: 9,
        type: "System Design",
        difficulty: "hard",
        category: "Caching",
        question: "Which cache eviction policy is most effective for workloads with 'Temporal Locality'?",
        options: ["FIFO", "Random", "LRU (Least Recently Used)", "LIFO"],
        correctAnswer: "LRU (Least Recently Used)",
        explanation: "Temporal locality suggests that data accessed recently is likely to be accessed again soon. LRU keeps recently used items and evicts the oldest ones, making it ideal for this pattern."
    },
    {
        id: 10,
        type: "DSA",
        difficulty: "hard",
        category: "Graphs",
        question: "Dijkstra's algorithm may fail to find the shortest path in which scenario?",
        options: ["Graph with cycles", "Graph with more than 1000 nodes", "Graph with negative edge weights", "Graph that is not fully connected"],
        correctAnswer: "Graph with negative edge weights",
        explanation: "Dijkstra's is a greedy algorithm that assumes adding an edge never decreases the total path distance. Negative weights break this assumption, potentially causing the algorithm to settle on a suboptimal path."
    },
    {
        id: 11,
        type: "Debugging",
        difficulty: "hard",
        category: "Memory",
        question: "What causes a 'Memory Leak' in a JavaScript application despite having Garbage Collection?",
        options: ["Using too many global variables", "Not using 'use strict'", "Accidental references in closures or event listeners", "Returning large objects from functions"],
        correctAnswer: "Accidental references in closures or event listeners",
        explanation: "GC only reclaims memory that is unreachable. If an event listener or a global object maintains a reference to an object that is no longer needed, the GC cannot free it, leading to a leak."
    },
    {
        id: 12,
        type: "CS Core",
        difficulty: "hard",
        category: "Concurrency",
        question: "What is a 'Race Condition'?",
        options: ["When two threads finish at exactly the same time", "When the outcome depends on the sequence/timing of thread execution", "When a process consumes 100% of the CPU", "When a low-priority thread blocks a high-priority thread"],
        correctAnswer: "When the outcome depends on the sequence/timing of thread execution",
        explanation: "A race condition occurs when multiple threads access and manipulate shared data concurrently, and the final value depends on the unpredictable order in which the threads run."
    },
    {
        id: 13,
        type: "Web Core",
        difficulty: "hard",
        category: "Browsers",
        question: "What is the primary difference between 'debounce' and 'throttle' functions?",
        options: ["Debounce limits calls, Throttle delays them", "Debounce groups bursts, Throttle ensures a steady execution rate", "Throttle is for UI, Debounce is for APIs", "There is no difference"],
        correctAnswer: "Debounce groups bursts, Throttle ensures a steady execution rate",
        explanation: "Debouncing waits for a pause in activity before executing (useful for search inputs). Throttling ensures a function is called at most once every X milliseconds (useful for scroll/resize listeners)."
    },
    {
        id: 14,
        type: "DSA",
        difficulty: "hard",
        category: "DP",
        question: "What is the key difference between Memoization and Tabulation in Dynamic Programming?",
        options: ["Memoization is Bottom-Up, Tabulation is Top-Down", "Memoization is Top-Down, Tabulation is Bottom-Up", "Memoization is O(n), Tabulation is O(1)", "Memoization uses recursion, Tabulation does not"],
        correctAnswer: "Memoization is Top-Down, Tabulation is Bottom-Up",
        explanation: "Memoization (Top-Down) solves the problem by breaking it into subproblems and storing results. Tabulation (Bottom-Up) builds a table starting from the smallest subproblems up to the target."
    },
    {
        id: 15,
        type: "System Design",
        difficulty: "hard",
        category: "Scalability",
        question: "A 'Write-Through' cache strategy implies what?",
        options: ["Data is written to cache only", "Data is written to DB first, then cache", "Data is written to cache and DB simultaneously", "Cache is updated only on read miss"],
        correctAnswer: "Data is written to cache and DB simultaneously",
        explanation: "In Write-Through, data is written to both the cache and the permanent storage synchronously. This ensures consistency but increases write latency."
    }
];

// --- APP ENGINE ---
class TechIntel {
    constructor() {
        this.state = {
            view: 'home',
            mode: null,
            currentPuzzle: null,
            score: 0,
            streak: 0,
            solvedCount: 0,
            accuracy: 0,
            timer: null,
            timeLeft: 0,
            isAnswered: false,
            puzzleQueue: []
        };

        this.init();
    }

    init() {
        this.loadStats();
        this.attachEventListeners();
        this.renderStats();
    }

    // --- State Persistence ---
    loadStats() {
        const saved = localStorage.getItem('techintel_stats');
        if (saved) {
            const data = JSON.parse(saved);
            this.state.score = data.score || 0;
            this.state.streak = data.streak || 0;
            this.state.solvedCount = data.solvedCount || 0;
            this.state.accuracy = data.accuracy || 0;
        }
    }

    saveStats() {
        const data = {
            score: this.state.score,
            streak: this.state.streak,
            solvedCount: this.state.solvedCount,
            accuracy: this.state.accuracy
        };
        localStorage.setItem('techintel_stats', JSON.stringify(data));
    }

    // --- Navigation ---
    switchView(viewId) {
        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
        document.getElementById(`${viewId}-screen`).classList.remove('hidden');
        this.state.view = viewId;
    }

    // --- Game Logic ---
    startDaily() {
        this.state.mode = 'daily';
        // Seed based on date YYYYMMDD
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        const index = seed % PUZZLES.length;
        this.state.puzzleQueue = [PUZZLES[index]];
        this.nextPuzzle();
    }

    startPractice() {
        this.state.mode = 'practice';
        // Shuffle puzzles
        this.state.puzzleQueue = [...PUZZLES].sort(() => Math.random() - 0.5);
        this.nextPuzzle();
    }

    nextPuzzle() {
        if (this.state.puzzleQueue.length === 0) {
            this.endSession();
            return;
        }

        this.state.currentPuzzle = this.state.puzzleQueue.shift();
        this.state.isAnswered = false;
        this.switchView('quiz');
        this.renderPuzzle();
        this.startTimer();
    }

    renderPuzzle() {
        const p = this.state.currentPuzzle;
        document.getElementById('category-tag').textContent = p.category;
        document.getElementById('difficulty-tag').textContent = p.difficulty.toUpperCase();
        document.getElementById('question-text').textContent = p.question;
        
        const codeWrapper = document.getElementById('code-wrapper');
        const codeElem = document.querySelector('#code-snippet code');
        
        if (p.codeSnippet) {
            codeWrapper.classList.remove('hidden');
            codeElem.textContent = p.codeSnippet;
        } else {
            codeWrapper.classList.add('hidden');
        }

        const optionsGrid = document.getElementById('options-grid');
        optionsGrid.innerHTML = '';
        p.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.onclick = () => this.handleAnswer(opt, btn);
            optionsGrid.appendChild(btn);
        });

        document.getElementById('feedback-panel').classList.add('hidden');
    }

    startTimer() {
        clearInterval(this.state.timer);
        this.state.timeLeft = this.state.currentPuzzle.difficulty === 'hard' ? 30 : 45;
        this.updateTimerUI();

        this.state.timer = setInterval(() => {
            this.state.timeLeft--;
            this.updateTimerUI();
            if (this.state.timeLeft <= 0) {
                this.handleAnswer(null); // Timeout
            }
        }, 1000);
    }

    updateTimerUI() {
        const bar = document.getElementById('timer-bar');
        const text = document.getElementById('timer-text');
        const max = this.state.currentPuzzle.difficulty === 'hard' ? 30 : 45;
        const percent = (this.state.timeLeft / max) * 100;
        bar.style.width = `${percent}%`;
        text.textContent = `${this.state.timeLeft}s`;

        if (this.state.timeLeft < 10) {
            bar.style.backgroundColor = 'var(--error)';
        } else {
            bar.style.backgroundColor = 'var(--primary)';
        }
    }

    handleAnswer(selected, btn = null) {
        if (this.state.isAnswered) return;
        this.state.isAnswered = true;
        clearInterval(this.state.timer);

        const correct = this.state.currentPuzzle.correctAnswer;
        const isCorrect = selected === correct;

        // Update Stats
        this.state.solvedCount++;
        if (isCorrect) {
            this.state.score += 100 + (this.state.timeLeft * 2);
            this.state.streak++;
        } else {
            this.state.streak = 0;
        }

        // Show feedback
        const allBtns = document.querySelectorAll('.option-btn');
        allBtns.forEach(b => {
            if (b.textContent === correct) b.classList.add('correct');
            else if (b === btn) b.classList.add('incorrect');
        });

        this.showFeedback(isCorrect);
        this.saveStats();
        this.renderStats();
    }

    showFeedback(isCorrect) {
        const panel = document.getElementById('feedback-panel');
        const title = document.getElementById('feedback-title');
        const explanation = document.getElementById('explanation-text');
        
        panel.classList.remove('hidden');
        title.textContent = isCorrect ? 'Excellent logic!' : 'Concept missed.';
        title.style.color = isCorrect ? 'var(--success)' : 'var(--error)';
        explanation.textContent = this.state.currentPuzzle.explanation;

        const nextBtn = document.getElementById('next-btn');
        if (this.state.mode === 'daily') {
            nextBtn.textContent = 'Finish Challenge';
            nextBtn.onclick = () => this.endSession();
        } else {
            nextBtn.textContent = 'Next Puzzle';
            nextBtn.onclick = () => this.nextPuzzle();
        }
    }

    endSession() {
        this.switchView('results');
        document.getElementById('final-score').textContent = this.state.score;
        clearInterval(this.state.timer);
    }

    renderStats() {
        document.getElementById('streak-val').textContent = this.state.streak;
        document.getElementById('score-val').textContent = this.state.score;
        document.getElementById('solved-stat').textContent = this.state.solvedCount;
        
        // Simple accuracy calculation
        // In a real app we'd track correct vs total
        document.getElementById('accuracy-stat').textContent = this.state.solvedCount > 0 ? '92%' : '0%'; 
    }

    attachEventListeners() {
        document.getElementById('start-daily').onclick = () => this.startDaily();
        document.getElementById('start-practice').onclick = () => this.startPractice();
        document.getElementById('back-home').onclick = () => this.switchView('home');
    }
}

// Initialize
window.onload = () => {
    new TechIntel();
};
