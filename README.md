A partire dal codice della repo (che è la versione corretta dell’esercitazione 1:

- Implementare l’autenticazione
    - `POST /signup` con i dati dell’utente e cifratura della password
    - `POST /login` per ottenere il codice JWT
    - Autenticazione delle api tramite token JWT
- Sviluppare una api `GET /api/users` che torni la lista degli utenti registrati, omettendo dai risultati le informazioni sensibili come la password
- Modificare l’api `POST /api/todos` in modo che accetti nei dati anche la proprietà `assignedTo: idUtente` (opzionale). La proprietà indica che il todo è stato assegnato a un utente specifico tra quelli registrati.
    - La proprietà nello schema deve essere impostata come `ref` alla collezione degli Users, in modo da poter fare in seguito il popolate e tornare nome utente e _id quando vengono letti i todo
    - Ad ogni todo deve essere assegnata anche, in automatico dal server, la proprietà `createdBy: userId`, valorizzata con l’id dell’utente che ha creato il todo. Anche questa proprietà deve essere un riferimento alla collezione degli Users
- Sviluppare una api `POST /api/todos/:id/assign` che permette di assegnare un todo a un utente registrato.
- Implementare una logica di validazione del campo `assignedTo` (in entrambe le api che lo impostano) che controlli che l’id passato sia presente nella collezione degli Users. In caso contrario torna una risposta con stato `400` e un messaggio che rappresenta l’errore.
- Modificare le api `check` e `uncheck` precedentemente sviluppate in modo che solo l’utente che ha creato il todo o quello a cui è assegnato possano impostare lo stato. In caso contrario torna stato `403` e un messaggio rappresentativo.
- Modificare l’api `GET /api/todos` in modo che torni esclusivamente i todo creati dall’utente loggato e assegnati a lui.
    - I dati tornati devono includere anche i dettagli dell’utente salvato nel `createdBy` e di quello in `assignedTo` (se presente). Vedere metodo `populate` di mongoose per tornare le informazioni. Le info dell’utente non devono contenere dati sensibili come la password.
