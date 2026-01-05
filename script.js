// Fetch the JSON file
fetch('characters.json')
  .then(response => response.json())
  .then(characters => {
    const container = document.getElementById('characters');

    characters.forEach(char => {
      const card = document.createElement('div');
      card.classList.add('card');

      // Convert abilities, feats, and sources into HTML lists
      const abilitiesList = char.abilities.map(ab => `<li><strong>${ab.name}:</strong> ${ab.description}</li>`).join('');
      const featsList = char.feats.map(feat => `<li><strong>${feat.title}:</strong> ${feat.detail}</li>`).join('');
      const sourcesList = char.sources.map(src => `<li><a href="${src.url}" target="_blank">${src.label}</a></li>`).join('');

      // Optional: calculate tier based on total stats
      const totalStats = char.stats.strength + char.stats.speed + char.stats.durability + char.stats.hax + char.stats.iq + char.stats.stamina;
      let tier = '';
      if (totalStats >= 540) tier = 'S+';
      else if (totalStats >= 480) tier = 'S';
      else if (totalStats >= 420) tier = 'A';
      else tier = 'B';

      // Assign a tier color
      const tierColor = tier === 'S+' ? '#ff0000' :
                        tier === 'S' ? '#ff9900' :
                        tier === 'A' ? '#ffff00' : '#00ccff';

      // Populate the card HTML
      card.innerHTML = `
        <h2>${char.name}</h2>
        <p><em>${char.anime}</em></p>
        <p><strong style="color:${tierColor}">Tier: ${tier}</strong></p>
        <div class="stats">
          <h3>Stats</h3>
          <ul>
            <li>Strength: ${char.stats.strength}</li>
            <li>Speed: ${char.stats.speed}</li>
            <li>Durability: ${char.stats.durability}</li>
            <li>Hax: ${char.stats.hax}</li>
            <li>IQ: ${char.stats.iq}</li>
            <li>Stamina: ${char.stats.stamina}</li>
          </ul>
        </div>
        <p class="about">${char.about}</p>
        <div class="abilities">
          <h3>Abilities</h3>
          <ul>${abilitiesList}</ul>
        </div>
        <div class="feats">
          <h3>Feats</h3>
          <ul>${featsList}</ul>
        </div>
        <div class="sources">
          <h3>Sources</h3>
          <ul>${sourcesList}</ul>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading characters.json:', err));
