// ==UserScript==
// @name         Leboncoin Multi-boutons to textarea (SPA compatible)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Ajoute plusieurs boutons pour insérer des messages prédéfinis dans le textarea #body sur Leboncoin/reply, même après navigation interne (SPA).
// @author       JamesAdams
// @icon         https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-2k-G-c-t2NEGVYz5fBjf81CSi2g-dqa2Qw&s
// @updateURL    https://raw.githubusercontent.com/JamesDAdams/ViolentmonkeyScript/refs/heads/main/leboncoinMultiBoutonsToTextarea.js
// @downloadURL  https://raw.githubusercontent.com/JamesDAdams/ViolentmonkeyScript/refs/heads/main/leboncoinMultiBoutonsToTextarea.js
// @match        https://www.leboncoin.fr/*
// ==/UserScript==

(function () {
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

Je ne suis pas véhiculé, une livraison sur VotreVilleTest est-elle possible ?

Cordialement.`
        },
        {
            label: "La reference",
            message: `Bonjour,

Votre annonce est toujours disponible ? Est-il possible d'avoir la référence s'il vous plaît ?

Cordialement.`
        }
    ];

    const CONTAINER_ID = "lbc-multi-boutons-container";

    function injectBoutons() {
        // Vérifier si on est bien sur une page /reply/*
        if (!window.location.pathname.startsWith("/reply/")) {
            // Nettoyer si besoin (en cas de navigation vers une autre page)
            const old = document.getElementById(CONTAINER_ID);
            if (old) old.remove();
            return;
        }

        // Ne pas ajouter deux fois le conteneur
        if (document.getElementById(CONTAINER_ID)) return;

        // Création d'un conteneur pour les boutons
        const container = document.createElement("div");
        container.id = CONTAINER_ID;
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
        container.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)";

        boutons.forEach(({ label, message }) => {
            const bouton = document.createElement("button");
            bouton.textContent = label;
            bouton.style.padding = "10px";
            bouton.style.background = "#4caf50";
            bouton.style.color = "#fff";
            bouton.style.border = "none";
            bouton.style.borderRadius = "5px";
            bouton.style.cursor = "pointer";
            bouton.style.fontWeight = "bold";
            bouton.addEventListener("click", function () {
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
    }

    // Injection initiale
    injectBoutons();

    // Observer pour la navigation SPA
    let lastPath = location.pathname;

    const observer = new MutationObserver(() => {
        if (location.pathname !== lastPath) {
            lastPath = location.pathname;
            injectBoutons();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Sécurité : injecte aussi lors du retour arrière/avant du navigateur
    window.addEventListener('popstate', injectBoutons);
})();
