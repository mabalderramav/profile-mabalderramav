const LINKEDIN_API =
  "https://linkedin-api8.p.rapidapi.com/?username=miguel-aldo-balderrama-vaca-b69a04122";

const content = null || document.getElementById("content");
const titleH1 = null || document.querySelector("div[id='profileTitle']");

const linkedinOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "dae2529088mshf13a4d119490960p164159jsnfbcbb21728c5",
    "X-RapidAPI-Host": "linkedin-api8.p.rapidapi.com",
  },
};

async function fetchData(urlApi, options) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const linkedinData = await fetchData(LINKEDIN_API, linkedinOptions);

    // Profile title.
    let view = `
      <h1
          class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span id="firstName" class="block xl:inline">${
            linkedinData.firstName
          } ${linkedinData.lastName}</span>
          <span id="lastName" class="block text-indigo-600 xl:inline">@mabalderramav</span>
      </h1>
      <p
          class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          ${linkedinData.summary}
      </p>
      <p
          class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          <strong> Open to work: ${linkedinData.isOpenToWork
            .toString()
            .toUpperCase()} </strong>
      </p>
      <p
          class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          <strong> Is hiring? ${linkedinData.isHiring
            .toString()
            .toUpperCase()} </strong>
      </p>
    `;
    titleH1.innerHTML = view;

    // Last 8 certifications.
    view = `
    ${linkedinData.certifications
      .map(
        (certification) => `
      <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${certification.company.logo}" alt="${certification.company.name}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${certification.name}
          </h3>
        </div>
      </div>
    `
      )
      .slice(0, 8)
      .join("")}
	`;
    content.innerHTML = view;
  } catch (error) {
    console.error(error);
  }
})();
