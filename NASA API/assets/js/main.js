const apiKey = 'WxBflPlf812HeG40fw5ylZeu4Gca9qyvuVYgHCgq';

// const button = document.querySelector('button');
const dateInput = document.querySelector('input[type="date"]');
dateInput.addEventListener('input', () => {
  const date = dateInput.value;
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  document.querySelector('.photo').style.backgroundColor= 'rgba(0, 0, 0, 0.5)';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const infoSection = document.querySelector('p');
      infoSection.innerHTML = `
         <h3>${data.title}</h3>
         <p>${data.explanation}</p>
        `;

        const main = document.querySelector('main');

        if (data.media_type === "video") {
          const video = document.createElement('video');
          video.src = data.url;
          video.autoplay = true;
          video.controls = true;
          
          // remove previously appended element
          const previousElement = main.querySelector('video, img');
          if (previousElement) {
            main.removeChild(previousElement);
          }
        
          main.appendChild(video);
        } else if (data.media_type === "image"){
          const img = document.createElement('img');
          img.src = data.url;
          
          // remove previously appended element
          const previousElement = main.querySelector('video, img');
          if (previousElement) {
            main.removeChild(previousElement);
          }
        
          main.appendChild(img);
        }

    })
    .catch(error => console.log(error));
});

