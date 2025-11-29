export const GRIMOIRE_CHAPTERS = [
    {
        id: 'variables',
        title: 'JS Variables',
        content: `
            <h3 class="text-xl font-bold text-fuchsia-400 mb-2">JavaScript Variables</h3>
            <p class="mb-4 text-slate-300">Variables are containers for storing data values. In modern JavaScript, we primarily use <code class="text-cyan-300">const</code> and <code class="text-cyan-300">let</code>.</p>
            
            <div class="bg-slate-950 p-4 rounded-lg border-l-4 border-fuchsia-500 mb-4">
                <h4 class="font-bold text-fuchsia-300 mb-1">const</h4>
                <p class="text-xs text-slate-400 mb-2">Use this when the value should NOT change (Constant).</p>
                <code class="block font-mono text-green-400 text-sm">const hero = "Elara";</code>
            </div>

            <div class="bg-slate-950 p-4 rounded-lg border-l-4 border-cyan-500 mb-4">
                <h4 class="font-bold text-cyan-300 mb-1">let</h4>
                <p class="text-xs text-slate-400 mb-2">Use this when the value might change later.</p>
                <code class="block font-mono text-green-400 text-sm">let health = 100;<br>health = 90; // Value changed</code>
            </div>
        `
    },
    {
        id: 'operators',
        title: 'JS Operators',
        content: `
            <h3 class="text-xl font-bold text-fuchsia-400 mb-2">JavaScript Operators</h3>
            <p class="mb-4 text-slate-300">Operators are used to perform operations on variables and values.</p>

            <h4 class="font-bold text-slate-200 mt-4 border-b border-slate-700 pb-1">Arithmetic</h4>
            <ul class="list-disc list-inside text-sm text-slate-400 mt-2 space-y-1">
                <li><code class="text-cyan-300">+</code> : Addition (10 + 5)</li>
                <li><code class="text-cyan-300">*</code> : Multiplication (10 * 2)</li>
            </ul>

            <h4 class="font-bold text-slate-200 mt-4 border-b border-slate-700 pb-1">Comparison</h4>
            <ul class="list-disc list-inside text-sm text-slate-400 mt-2 space-y-1">
                <li><code class="text-cyan-300">></code> : Greater than (power > 10)</li>
                <li><code class="text-cyan-300">===</code> : Equal value and type</li>
            </ul>

            <h4 class="font-bold text-slate-200 mt-4 border-b border-slate-700 pb-1">Logical</h4>
            <ul class="list-disc list-inside text-sm text-slate-400 mt-2 space-y-1">
                <li><code class="text-cyan-300">&&</code> : AND (run && dodge)</li>
                <li><code class="text-cyan-300">||</code> : OR (head || legs)</li>
            </ul>
        `
    },
    {
        id: 'conditionals',
        title: 'JS If...Else',
        content: `
            <h3 class="text-xl font-bold text-fuchsia-400 mb-2">Conditional Statements</h3>
            <p class="mb-4 text-slate-300">Conditional statements are used to perform different actions based on different conditions.</p>

            <h4 class="font-bold text-slate-200 mt-4">The if Statement</h4>
            <pre class="bg-slate-950 p-3 rounded mt-2 text-sm font-mono text-green-400">
if (path === "clear") {
  move(); 
}</pre>

            <h4 class="font-bold text-slate-200 mt-6">Ternary Operator</h4>
            <p class="text-xs text-slate-400 mb-2">A shortcut for if...else statements.</p>
            <pre class="bg-slate-950 p-3 rounded mt-2 text-sm font-mono text-green-400">
// syntax: condition ? value_if_true : value_if_false
const action = energy > 0 ? "strike" : "hide";</pre>
        `
    },
    {
        id: 'arrays',
        title: 'JS Arrays',
        content: `
            <h3 class="text-xl font-bold text-fuchsia-400 mb-2">JavaScript Arrays</h3>
            <p class="mb-4 text-slate-300">An array is a special variable, which can hold more than one value.</p>

            <div class="space-y-4">
                <div>
                    <h4 class="text-cyan-300 font-bold text-sm">Creating an Array</h4>
                    <pre class="bg-slate-950 p-2 rounded text-green-400 text-xs font-mono">const bats = ["Bat1", "Bat2"];</pre>
                </div>
                <div>
                    <h4 class="text-cyan-300 font-bold text-sm">Accessing Items</h4>
                    <p class="text-xs text-slate-500">Array indexes start with 0.</p>
                    <pre class="bg-slate-950 p-2 rounded text-green-400 text-xs font-mono">let target = bats[0]; // "Bat1"</pre>
                </div>
                <div>
                    <h4 class="text-cyan-300 font-bold text-sm">Array Methods & Properties</h4>
                    <ul class="text-xs text-slate-400 mt-1 font-mono space-y-1">
                        <li><span class="text-orange-300">bats.length</span> : Returns number of elements</li>
                        <li><span class="text-orange-300">bats.push("Bat3")</span> : Adds new element to end</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        id: 'loops',
        title: 'JS Loops',
        content: `
            <h3 class="text-xl font-bold text-fuchsia-400 mb-2">JavaScript For Loop</h3>
            <p class="mb-4 text-slate-300">Loops can execute a block of code a number of times.</p>

            <div class="bg-slate-900 p-4 border border-slate-700 rounded">
                <h4 class="font-bold text-slate-200 mb-2">Syntax</h4>
                <pre class="font-mono text-green-400 text-sm">
for (expression 1; expression 2; expression 3) {
  // code block to be executed
}</pre>
                <div class="mt-4 text-xs text-slate-400 space-y-2">
                    <p><strong class="text-cyan-300">Expression 1:</strong> Executed one time before the block (e.g., <code>let i = 0</code>).</p>
                    <p><strong class="text-cyan-300">Expression 2:</strong> Defines the condition for executing (e.g., <code>i < 5</code>).</p>
                    <p><strong class="text-cyan-300">Expression 3:</strong> Executed after the block (e.g., <code>i++</code>).</p>
                </div>
            </div>
        `
    },
    {
        id: 'objects',
        title: 'JS Objects',
        content: `
            <h3 class="text-xl font-bold text-fuchsia-400 mb-2">JavaScript Objects</h3>
            <p class="mb-4 text-slate-300">Objects are containers for named values called properties.</p>

            <h4 class="font-bold text-slate-200 mt-4">Object Definition</h4>
            <pre class="bg-slate-950 p-3 rounded mt-2 text-sm font-mono text-green-400">
const dragon = {
  name: "Drakkonis",
  type: "Fire",
  hp: 5000
};</pre>

            <h4 class="font-bold text-slate-200 mt-6">Accessing Properties</h4>
            <p class="text-xs text-slate-400 mb-2">You can access object properties in two ways:</p>
            <pre class="bg-slate-950 p-3 rounded mt-2 text-sm font-mono text-green-400">
dragon.name;      // Dot notation
dragon["name"];   // Bracket notation</pre>
        `
    },
    {
        id: 'functions',
        title: 'JS Functions',
        content: `
            <h3 class="text-xl font-bold text-fuchsia-400 mb-2">JavaScript Functions</h3>
            <p class="mb-4 text-slate-300">A function is a block of code designed to perform a particular task.</p>

            <h4 class="font-bold text-slate-200 mt-4">Function Syntax</h4>
            <pre class="bg-slate-950 p-3 rounded mt-2 text-sm font-mono text-green-400">
function cast(spellName) {
  return "Casting " + spellName;
}</pre>

            <h4 class="font-bold text-slate-200 mt-6">Arrow Functions</h4>
            <p class="text-xs text-slate-400 mb-2">A shorter syntax for writing function expressions.</p>
            <pre class="bg-slate-950 p-3 rounded mt-2 text-sm font-mono text-green-400">
const iceSpear = (target) => {
  return "Freezing " + target;
}</pre>
        `
    }
];