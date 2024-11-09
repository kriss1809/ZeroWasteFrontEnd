# ZeroWasteFrontEnd

La preluarea proiectului, se vor rula următoarele comenzi în terminal:
npm install
npm install -g @ionic/cli

Pentru pornirea aplicației, se va executa comanda "ionic serve". 
Posibilă eroare:
ionic : The file ...\npm\ionic.ps1 cannot be loaded because script execution is disabled on this system.
Soluție: Se deschide Powershell în modul administrator și se rulează "Set-ExecutionPolicy RemoteSigned", apoi se poate rula din nou "ionic serve" pentru a porni aplicația.


Echipa noastră își propune să dezvolte o aplicație mobilă care să combată risipa alimentară, ajutând utilizatorii să își gestioneze alimentele și învățându-i să prevină expirarea acestora și să folosească resursele într-un mod inteligent.

ZeroWaste oferă utilizatorilor posibilitatea de a adăuga și edita alimentele din gospodărie, incluzând informații esențiale precum data de expirare și, opțional, data deschiderii și numărul recomandat de zile pentru consum după deschidere. Utilizatorii vor beneficia de notificări personalizate care îi vor avertiza atunci când un produs se apropie de expirare, cu un număr de zile în avans și la o anumită oră, opțiuni care pot fi modificate în secțiunea de profil. O altă funcționalitate esențială este posibilitatea de a invita alte persoane să colaboreze la aceeași listă de alimente, facilitând astfel gestionarea comună a produselor.

În plus, fiecare utilizator își poate introduce alergiile și preferințele alimentare în profilul său, iar aplicația va genera rețete personalizate care țin cont de aceste informații și de necesitatea utilizării alimentelor care expiră cel mai curând. Astfel, aplicația ajută utilizatorii să gestioneze eficient stocul de alimente și să gătească în mod responsabil, fără a irosi resurse.
