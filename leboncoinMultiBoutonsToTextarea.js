// ==UserScript==
// @name         Leboncoin Multi-boutons to textarea
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Ajoute plusieurs boutons pour insérer des messages prédéfinis dans le textarea #body sur Leboncoin/reply
// @author       JamesAdams
// @icon         https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-2k-G-c-t2NEGVYz5fBjf81CSi2g-dqa2Qw&s
// @updateURL    https://raw.githubusercontent.com/JamesDAdams/ViolentmonkeyScript/refs/heads/main/leboncoinMultiBoutonsToTextarea.js
// @downloadURL  https://raw.githubusercontent.com/JamesDAdams/ViolentmonkeyScript/refs/heads/main/leboncoinMultiBoutonsToTextarea.js
// @match        https://www.leboncoin.fr/reply/*
// ==/UserScript==

(function() {
    'use strict';

    // Liste des boutons à ajouter
    const boutons = [
        {
            label: "Toujours Dispo ?",
            message: `Bonjour,

votre annonce est toujours disponible ?

Cordialement.`
        },
        {
            label: "Quel est le prix ?",
            message: `Bonjour,

quelle est votre prix ?

Cordialement.`
        },
        {
            label: "Livraison possible",
            message: `Bonjour,

Je ne suis pas véhiculé, une livraison sur VotreVilleTest3 est-elle possible ?

Cordialement.`
        }
    ];

    // Création d'un conteneur pour les boutons
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.bottom = "20px";
    container.style.right = "20px";
    container.style.zIndex = 9999;
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "10px";
    container.style.background = "rgba(255,255,255,0.8)";
    container.style.padding = "8px";
    container.style.borderRadius = "8px";

    boutons.forEach(({label, message}) => {
        const bouton = document.createElement("button");
        bouton.textContent = label;
        bouton.style.padding = "10px";
        bouton.style.background = "#4caf50";
        bouton.style.color = "#fff";
        bouton.style.border = "none";
        bouton.style.borderRadius = "5px";
        bouton.style.cursor = "pointer";
        bouton.style.fontWeight = "bold";
        bouton.addEventListener("click", function() {
            const textarea = document.getElementById("body");
            if (textarea) {
                textarea.value = message;
                bouton.textContent = "Inséré !";
                setTimeout(() => bouton.textContent = label, 1500);
            } else {
                bouton.textContent = "Textarea introuvable";
                setTimeout(() => bouton.textContent = label, 2000);
                console.warn("Textarea #body non trouvé sur la page.");
            }
        });
        container.appendChild(bouton);
    });

    document.body.appendChild(container);
})();
