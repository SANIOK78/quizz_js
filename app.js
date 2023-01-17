// Tab avec les reponces en bonnes ordre 
const responses = ["c", "a", "b", "a", "c"];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];

const form = document.querySelector(".quiz-form");
// Au soumission, execution dela fonction "handleSubmit()"
form.addEventListener("submit", handleSubmit);

// Soumission du formulaire
function handleSubmit(e) {
  e.preventDefault();

  // Tab avec les résultats cochées
  const results = [];

  // Sélection des tous les boutons cochées
  const radioButtons = document.querySelectorAll("input[type='radio']:checked");

  // Pour chaque input du "radioButtons", on compare le resultat coché 
  // avec la valeur du tab des resultat
  radioButtons.forEach((radioCoche, index) => {
    // si reponseCoche est stictement egale a la valeur du tab
    if (radioCoche.value === responses[index]) {    
      results.push(true);

    } else {
      results.push(false);
    }
  });

  // Affichage en fonction de resultat
  showResults(results);
  // Couleur de fond en fonction de resultat
  addColors(results);
  
}

// Sélection des élémets qu'on va utiliser
const titleResult = document.querySelector(".results h2");
const markResult = document.querySelector(".mark");
const helpResult = document.querySelector(".help");

// L'affichage
function showResults(results) {
  // On filtre les resultat erronées
  const errorsNumber = results.filter(el => el === false).length;

  switch (errorsNumber) {
    case 0:   
      titleResult.textContent = `✔️ Bravo, c'est un sans faute ! ✔️`;
      helpResult.textContent = "Quelle culture ...";
      helpResult.style = "display: block; color: green;";
      markResult.innerHTML = "Score : <span>5 / 5</span>";
      markResult.style.display = "block";
    break;
    case 1:
      titleResult.textContent = `✨ Vous y êtes presque ! ✨`;
      helpResult.textContent = "Retentez une autre réponse dans la case rouge, puis re-validez !";        
      helpResult.style = "display: block; color: green;";
      markResult.innerHTML = "Score : <span>4 / 5</span>";
      markResult.style.display = "block";
    break;
    case 2:
      titleResult.textContent = `✨ Encore un effort ... 👀`;
      helpResult.textContent = "Retentez une autre réponse dans les cases rouges, puis re-validez !";      
      helpResult.style = "display: block; color: green;";
      markResult.innerHTML = "Score : <span>3 / 5</span>";
      markResult.style.display = "block";
      break;
    case 3:
      titleResult.textContent = `👀 Il reste quelques erreurs. 😭`;
      helpResult.textContent = "Retentez une autre réponse dans les cases rouges, puis re-validez !";       
      helpResult.style = "display: block; color: green;";
      markResult.innerHTML = "Score : <span>2 / 5</span>";
      markResult.style.display = "block";
    break;
    case 4:
      titleResult.textContent = `😭 Peut mieux faire ! 😭`;
      helpResult.textContent = "Retentez une autre réponse dans les cases rouges, puis re-validez !";     
      helpResult.style = "display: block; color: red;";
      markResult.innerHTML = "Score : <span>1 / 5</span>";
      markResult.style.display = "block";
      break;
    case 5:
      titleResult.textContent = `👎 Peut mieux faire ! 👎`;
      helpResult.style = "display: block; color: red;";
      helpResult.textContent = "Retentez une autre réponse dans les cases rouges, puis re-validez !";        
      markResult.style.display = "block";
      markResult.innerHTML = "Score : <span>0 / 5</span>";
    break;
    default: titleResult.textContent = "Wops, cas innatendu.";     
  }
}

// Sélection du élément sur lequel on va injecter un "background"
const questions = document.querySelectorAll(".question-block");

// Ajout d'un "background" en fonction de resultat
function addColors(results) {
  // Pour chaque élément d'un tab "NodeListe[]"
  results.forEach((response, index) => {
    // Si c'est la bonne reponse
    if(results[index]) {
      questions[index].style.backgroundImage = "linear-gradient(to right, #a8ff78, #78ffd6)";
      // questions[index].style.border = "2px solid green";

    } else {
      questions[index].style.backgroundImage = "linear-gradient(to right, #f5567b, #fd674c)"
      // questions[index].style.border = "2px solid red";
    }
  })
}

// Sélection élément pour pouvoir corriger la reponse
const radioInputs = document.querySelectorAll("input[type='radio']");

// Pour chaque "radioInputs" on va rajouter un evenement 'input'
radioInputs.forEach(radioInput => radioInput.addEventListener('input', resetColor));

function resetColor(e) {

  const index = e.target.getAttribute("name").slice(1) - 1;

  // L'index du block des question cliké
  const parentQuestionBlock = questions[index];
 
  console.log(parentQuestionBlock);

  // On reinitialise les couleurs du bloc clické
  parentQuestionBlock.style.backgroundColor = "#f1f1f1";
  parentQuestionBlock.style.backgroundImage = "none";
}

