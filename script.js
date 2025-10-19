// static/script.js
document.getElementById("checkBtn").addEventListener("click", checkWord);
document.getElementById("addBtn").addEventListener("click", addWord);

function showResult(text, color="black") {
  let r = document.getElementById("result");
  r.style.color = color;
  r.innerText = text;
}
function showSuggestions(arr) {
  let s = document.getElementById("suggestions");
  if (arr && arr.length) {
    s.innerHTML = "Suggestions: " + arr.join(", ");
  } else {
    s.innerHTML = "";
  }
}

function checkWord() {
  let word = document.getElementById("wordInput").value.trim();
  if (!word) { alert("Enter a word"); return; }

  fetch("/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word: word })
  })
  .then(r => r.json())
  .then(data => {
    if (data.error) { showResult(data.error, "red"); showSuggestions([]); return; }
    if (data.correct) {
      showResult(`✅ "${data.word}" is correct.`, "green");
      showSuggestions([]);
    } else {
      showResult(`❌ "${data.word}" is misspelled.`, "red");
      showSuggestions(data.suggestions || []);
    }
  })
  .catch(err => {
    showResult("Server error", "red");
    console.error(err);
  });
}

function addWord() {
  let word = document.getElementById("wordInput").value.trim();
  if (!word) { alert("Enter a word"); return; }

  fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word: word })
  })
  .then(r => r.json())
  .then(data => {
    if (data.error) { alert(data.error); return; }
    if (data.added) alert(`"${data.word}" added to dictionary`);
    else alert(data.message || `"${data.word}" already exists`);
  })
  .catch(err => {
    alert("Server error");
    console.error(err);
  });
}
