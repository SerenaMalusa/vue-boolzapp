## Esercizio di oggi: Boolzapp

Nome repo: `vue-boolzapp`  

Trovate di seguito la brief di Boolzapp analizzata insieme.  
Sarà d'obbligo seguire le milestone senza saltarne alcuna.  
Ad esempio non iniziare l'aggiunta di un messaggio (M3) se non è funzionante e terminata la visualizzazione dinamica dei contatti (M2).  
Consiglio vivamente di pianificare le tempistiche prima di iniziare a lavorare per scandire i tempi e per poter poi valutare se vi siate trovati o meno nella vostra pianificazione.  

### Milestone 1
- Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
dall’interlocutore (bianco) assegnando due classi CSS diverse
- Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare
nome e immagine di ogni contatto

### Milestone 2
- Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i
messaggi relativi al contatto attivo all’interno del pannello della conversazione
- Click sul contatto mostra la conversazione del contatto cliccato

### Milestone 3
- Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde  
- Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
un “ok” come risposta, che apparirà dopo 1 secondo.

### Milestone 4
- Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i
contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo
“mar” rimangono solo Marco e Martina)

### Milestone 5 - opzionale
- Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
permette di cancellare il messaggio selezionato
- Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti

### Bonus
- evitare che l’utente possa inviare un messaggio vuoto o composto solamente da spazi
- inserire l’orario corretto nei messaggi
- predisporre una lista di frasi e/o citazioni da utilizzare al posto della risposta “ok:” quando il pc risponde, anziché scrivere “ok”, scegliere una frase random dalla lista e utilizzarla come testo del messaggio di risposta del pc
- dare la possibilità all’utente di aggiungere una nuova conversazione, inserendo in un popup il nome e il link all’icona del nuovo contatto

### Consigli utili
- Si possono trascurare le scrollbar verticali, sia nel pannello dei messaggi, che nella
lista dei contatti
- I pulsanti e le icone possono non funzionare (a parte l’invio del messaggio)
