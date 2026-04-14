export type Problem = {
  id: string;
  name: string;
  category: string;
  symptoms: string;
  causes: string;
  solution: string;
  emoji: string;
};

export const problems: Problem[] = [
  {
    id: "1",
    name: "Foglie gialle",
    category: "Annaffiatura",
    emoji: "🟡",
    symptoms: "Le foglie diventano gialle, iniziando dalle più vecchie.",
    causes: "Eccesso o carenza d'acqua, carenza di azoto.",
    solution: "Controlla l'umidità del terreno. Se è fradicio, riduci le annaffiature. Se è secco, aumentale.",
  },
  {
    id: "2",
    name: "Foglie marroni ai bordi",
    category: "Umidità",
    emoji: "🟤",
    symptoms: "I bordi delle foglie diventano marroni e secchi.",
    causes: "Aria troppo secca, eccesso di fertilizzante, carenza d'acqua.",
    solution: "Aumenta l'umidità ambientale, nebulizza le foglie, riduci i fertilizzanti.",
  },
  {
    id: "3",
    name: "Foglie cadono improvvisamente",
    category: "Stress",
    emoji: "🍂",
    symptoms: "La pianta perde molte foglie in poco tempo.",
    causes: "Spostamento brusco, cambio di temperatura, correnti d'aria.",
    solution: "Non spostare la pianta. Mantienila lontana da finestre aperte e termosifoni.",
  },
  {
    id: "4",
    name: "Macchie bianche sui foglie",
    category: "Parassiti",
    emoji: "⬜",
    symptoms: "Polvere o macchie bianche sulla superficie delle foglie.",
    causes: "Oidio (fungo) o cocciniglia farinosa.",
    solution: "Rimuovi le parti colpite. Tratta con bicarbonato diluito o insetticida specifico.",
  },
  {
    id: "5",
    name: "Afidi",
    category: "Parassiti",
    emoji: "🐛",
    symptoms: "Piccoli insetti verdi o neri sulle foglie nuove e sui germogli.",
    causes: "Infestazione da afidi, favorita da caldo e piante deboli.",
    solution: "Lava le foglie con acqua e sapone di Marsiglia. Usa prodotti a base di piretro se necessario.",
  },
  {
    id: "6",
    name: "Radici marce",
    category: "Annaffiatura",
    emoji: "🫚",
    symptoms: "Pianta avvizzita nonostante il terreno sia bagnato, odore sgradevole.",
    causes: "Eccesso d'acqua, vaso senza drenaggio.",
    solution: "Estrai la pianta, taglia le radici nere, lascia asciugare e rinvasa con terreno fresco.",
  },
  {
    id: "7",
    name: "Foglie raggrinzite",
    category: "Annaffiatura",
    emoji: "🥀",
    symptoms: "Le foglie si arricciano o raggrinziscono.",
    causes: "Carenza d'acqua o caldo eccessivo.",
    solution: "Annaffia con regolarità e sposta la pianta lontano da fonti di calore diretto.",
  },
  {
    id: "8",
    name: "Crescita lenta o bloccata",
    category: "Nutrizione",
    emoji: "🐢",
    symptoms: "La pianta non cresce o cresce pochissimo.",
    causes: "Carenza di nutrienti, vaso troppo piccolo, poca luce.",
    solution: "Fertilizza nella stagione giusta, considera il rinvaso e verifica l'esposizione alla luce.",
  },
  {
    id: "9",
    name: "Ragnatele sottili",
    category: "Parassiti",
    emoji: "🕷️",
    symptoms: "Sottili fili simili a ragnatele tra le foglie, puntini chiari.",
    causes: "Acaro ragnetto rosso, favorito da caldo e aria secca.",
    solution: "Aumenta l'umidità, nebulizza le foglie, tratta con acaricida specifico.",
  },
  {
    id: "10",
    name: "Foglie pallide o decolorate",
    category: "Luce",
    emoji: "🌫️",
    symptoms: "Le foglie perdono colore e diventano verde pallido o giallastre.",
    causes: "Troppa poca luce.",
    solution: "Sposta la pianta in un posto più luminoso, evitando però il sole diretto se non tollerato.",
  },
  {
    id: "11",
    name: "Foglie bruciate",
    category: "Luce",
    emoji: "🔥",
    symptoms: "Macchie marroni o biancastre secche sulle foglie, soprattutto in estate.",
    causes: "Esposizione diretta al sole nelle ore più calde.",
    solution: "Sposta la pianta o usa una tenda ombreggiante nelle ore centrali della giornata.",
  },
  {
    id: "12",
    name: "Muffa sul terreno",
    category: "Funghi",
    emoji: "🍄",
    symptoms: "Strato bianco o grigio sulla superficie del terreno.",
    causes: "Eccesso di umidità, scarsa ventilazione.",
    solution: "Rimuovi lo strato superficiale, riduci le annaffiature e migliora la ventilazione.",
  },
  {
    id: "13",
    name: "Pianta che si inclina",
    category: "Luce",
    emoji: "↗️",
    symptoms: "La pianta cresce storta verso una direzione.",
    causes: "Luce proveniente da un solo lato.",
    solution: "Ruota il vaso di 180° ogni settimana per favorire una crescita uniforme.",
  },
  {
    id: "14",
    name: "Vaso troppo piccolo",
    category: "Rinvaso",
    emoji: "🪴",
    symptoms: "Radici che escono dai fori, terreno che si asciuga troppo in fretta.",
    causes: "La pianta ha superato le dimensioni del vaso.",
    solution: "Rinvasa in un vaso 2-3 cm più grande con terreno fresco.",
  },
  {
    id: "15",
    name: "Cocciniglie",
    category: "Parassiti",
    emoji: "🔴",
    symptoms: "Piccole macchie marroni o bianche attaccate a foglie e steli.",
    causes: "Infestazione da cocciniglie, favorita da ambienti caldi e secchi.",
    solution: "Rimuovi manualmente con un cotton fioc imbevuto di alcol, poi tratta con olio di neem.",
  },
];

export const categories = [...new Set(problems.map((p) => p.category))];