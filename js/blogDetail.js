import { TOKEN, URL, formatDate } from "./contants.js";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Tạo 2 promises để gọi API
const fetchPostDetail = fetch(URL + "/api/posts/" + id, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

const fetchRelatedPosts = fetch(
  URL + "/api/posts?filters[category][id][$eq]=2",
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  }
);

const fetchNews = fetch(URL + "/api/posts?filters[category][id][$eq]=3", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

Promise.all([fetchPostDetail, fetchRelatedPosts, fetchNews])
  .then(
    async ([postDetailResponse, relatedPostsResponse, newsPostResponse]) => {
      if (
        !postDetailResponse.ok ||
        !relatedPostsResponse.ok ||
        !newsPostResponse.ok
      ) {
        throw new Error("Failed to fetch data from API");
      }

      const postDetail = await postDetailResponse.json();
      const relatedPosts = await relatedPostsResponse.json();
      const newsPost = await newsPostResponse.json();

      const sections = document.querySelectorAll("section");

      if (postDetail && postDetail.data) {
        const { attributes } = postDetail?.data;
        const titleElement = sections[0]?.querySelector("div.row > h2");

        if (attributes) {
          sections[0].querySelector("div:first-child").innerHTML = `
          <span style='background-color:${
            attributes.type === 1 ? "var(--primary-color)" : "#9F0A1C"
          }'>${attributes.type === 1 ? "DMA" : "DME"}</span>
          <span class="row align-center">
            <svg width="16" height="18" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 19C17 17.6044 17 16.9067 16.8278 16.3389C16.44 15.0605 15.4395 14.06 14.1611 13.6722C13.5933 13.5 12.8956 13.5 11.5 13.5H6.5C5.10444 13.5 4.40665 13.5 3.83886 13.6722C2.56045 14.06 1.56004 15.0605 1.17224 16.3389C1 16.9067 1 17.6044 1 19M13.5 5.5C13.5 7.98528 11.4853 10 9 10C6.51472 10 4.5 7.98528 4.5 5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5Z"
                stroke="#1C1A7B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span style="width: 10px;height: 1px;"></span>
            ${attributes.author || "Unknown Author"}
          </span>
          <span class="row align-center">
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9H1M14 1V5M6 1V5M8.5 13L10 12V17M8.75 17H11.25M5.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7202 19 17.8802 19 16.2V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H5.8C4.11984 3 3.27976 3 2.63803 3.32698C2.07354 3.6146 1.6146 4.07354 1.32698 4.63803C1 5.27976 1 6.11984 1 7.8V16.2C1 17.8802 1 18.7202 1.32698 19.362C1.6146 19.9265 2.07354 20.3854 2.63803 20.673C3.27976 21 4.11984 21 5.8 21Z"
                stroke="#1C1A7B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span style="width: 10px;height: 1px;"></span>
            ${formatDate(attributes.createdAt)}
          </span>
        `;
        }
        if (titleElement) {
          titleElement.textContent = attributes?.title || "";
        }
        sections[0].querySelector("div.row .body").innerHTML =
          attributes.content;
      }

      if (relatedPosts && relatedPosts.data) {
        const { data } = relatedPosts;
        if (data.length > 0) {
          sections[0].querySelector(".right .list-news").innerHTML = data
            .map((related) => {
              console.log(related);
              return `
                  <div class="row .no-gutter">
                    <img src="${
                      related?.attributes?.imageUrl
                    }" alt="anh sau rang" onerror="this.onerror=null; this.src='../images/no-image.png';">
                    <div>
                      <span style='background-color:${
                        related?.attributes?.type === 1
                          ? "var(--primary-color)"
                          : "#9F0A1C"
                      }'>${
                related?.attributes?.type === 1 ? "DMA" : "DME"
              }</span>
                           <h4><a href="blog-detail.html?id=${id}">${
                related?.attributes?.title || "Untitled Post"
              }</a></h4>
                        </div>
                    </div>
                `;
            })
            .join("");
        }
      }

      if (newsPost && newsPost.data) {
        const { data } = newsPost;
        const titleElement = sections[0]?.querySelector("h2");
        if (titleElement) {
          titleElement.textContent = "Tin tức DMA";
        }
        if (data.length > 0) {
          sections[1].querySelector("div.row").innerHTML = data
            .map(
              (news) => `
          <div class="col article xs-12">
                 <img src="${
                   news?.attributes?.imageUrl
                 }" alt="anh sau rang" onerror="this.onerror=null; this.src='../images/no-image.png';">
                <div>
                    <span style='background-color:${
                      news?.attributes?.type === 1
                        ? "var(--primary-color)"
                        : "#9F0A1C"
                    }'>${news?.attributes?.type === 1 ? "DMA" : "DME"}</span>
                    <span class="row align-center">
                        <svg width="16" height="18" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17 19C17 17.6044 17 16.9067 16.8278 16.3389C16.44 15.0605 15.4395 14.06 14.1611 13.6722C13.5933 13.5 12.8956 13.5 11.5 13.5H6.5C5.10444 13.5 4.40665 13.5 3.83886 13.6722C2.56045 14.06 1.56004 15.0605 1.17224 16.3389C1 16.9067 1 17.6044 1 19M13.5 5.5C13.5 7.98528 11.4853 10 9 10C6.51472 10 4.5 7.98528 4.5 5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5Z"
                                stroke="#1C1A7B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span style="width: 10px;height: 1px;"></span>
                        Lorems</span>
                    <span class="row align-center">
                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 9H1M14 1V5M6 1V5M8.5 13L10 12V17M8.75 17H11.25M5.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7202 19 17.8802 19 16.2V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H5.8C4.11984 3 3.27976 3 2.63803 3.32698C2.07354 3.6146 1.6146 4.07354 1.32698 4.63803C1 5.27976 1 6.11984 1 7.8V16.2C1 17.8802 1 18.7202 1.32698 19.362C1.6146 19.9265 2.07354 20.3854 2.63803 20.673C3.27976 21 4.11984 21 5.8 21Z"
                                stroke="#1C1A7B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span style="width: 10px;height: 1px;"></span>
                        ${formatDate(news?.attributes?.createdAt)}</span>
                </div>
                <h6>${news?.attributes?.title}</h6>
                <p>${news?.attributes?.description}</p>
            </div>
          `
            )
            .join("");
        }
      }
    }
  )
  .catch((error) => console.error("Error:", error))
  .finally(() => {
    setTimeout(() => {
      document.querySelector("#content").style.visibility = "visible";
      document.querySelector(".loading").style.visibility = "hidden";
    }, 1000);
  });
