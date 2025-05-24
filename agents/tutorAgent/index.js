const nlp = require('compromise');

function detectSubject(question) {
    const q = question.toLowerCase();
    const doc = nlp(q);

    // Math detection with phrase patterns
    if (
        doc.match('what is the result of #Value+').found ||
        doc.match('solve for #Noun').found ||
        doc.match('calculate the #Noun').found ||
        doc.has('algebra') ||
        doc.has('geometry') ||
        doc.has('calculus') ||
        doc.has('equation') ||
        doc.has('integrate') ||
        doc.has('derivative') ||
        q.match(/\d+\s*[\+\-\*\/\^]\s*\d+/)
    ) {
        return 'math';
    }

    // Physics detection with phrase patterns
    if (
        doc.match('explain newton\'s #Value law of motion').found ||
        doc.has('velocity') ||
        doc.has('acceleration') ||
        doc.has('force') ||
        doc.has('energy') ||
        doc.has('gravity') ||
        doc.has('momentum') ||
        doc.has('thermodynamics') ||
        doc.has('quantum') ||
        doc.has('relativity')
    ) {
        return 'physics';
    }

    return 'general';
}

// ...existing code...

// Test the function directly
if (require.main === module) {
    const questions = [
        "What is the result of 2 + 2?",
        "If a car accelerates from rest at 3 m/s² for 5 seconds, what is its final velocity?",
        "Who was the first president of the USA?"
    ];
    questions.forEach(q => {
        console.log(`Q: ${q}`);
        console.log(`Subject: ${detectSubject(q)}`);
        console.log('---');
    });
}