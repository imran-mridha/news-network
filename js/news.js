
const categoryContainer = document.getElementById('category-container');
const postContainer = document.getElementById('post-container')
// Load Categories

const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;

  const res = await fetch(url);
  const data = await res.json();

  displayCategories(data.data.news_category);
}
// Dispaly Categories
const displayCategories = categories => {
  // const categories = await loadCategories();
  // console.log(categories);
  

  categories?.forEach(category => {
    // console.log(category)
    const {category_id,category_name} = category;
    // console.log(category_id)
    const li = document.createElement('li');
    li.classList.add('nav-item');
    li.classList.add('pr-2');
    li.classList.add('category-title');
    li.innerHTML = `
    <button type="button" onclick= "loadCategoryNews('${category_id}')" class="nav-link text-gray-500 hover:text-gray-700 hover:bg-red-600 hover:text-white focus:text-white focus:bg-red-700 p-1 rounded">${category_name}</button>
    `;
    categoryContainer.appendChild(li);
    return category;
  });
  
}

const loadCategoryNews = async id => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  // console.log(url)
  toggleSpinner(true)
  const res = await fetch(url);
  const data = await res.json();
  displayCategoryNews(data.data)
  // return(data.data)
}

const displayCategoryNews =  categoryNews => {
  console.log(categoryNews)
  if(categoryNews.length === 0){
    toggleSpinner(false);
  }
  const countStatus = document.getElementById('status');
  const postCount = document.getElementById('count-post');
  postCount.innerHTML =`
  ${categoryNews.length} items found for category Entertainment
  `;
  // countStatus.classList.remove('invisible');
  const postContainer = document.getElementById('post-container')
  postContainer.innerHTML = '';
  categoryNews?.forEach(news => {
    // console.log(news)
    
    const {_id,thumbnail_url,title,details,author,total_view,rating} = news;
    // console.log(_id)
    const {img,name,published_date} = author;
    const {number} = rating;
    // console.log(thumbnail_url,title,details,author,total_view,rating)
    const article = document.createElement('article');
    article.innerHTML = `
    <div class="w-11/12 mx-auto py-5">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-2 rounded-xl bg-white shadow-2xl p-5">
              <div>
                <img class=" w-full  md:h-auto object-cover md:w-80  rounded-lg "
                  src="${thumbnail_url ? thumbnail_url: 'Not Available'}" alt="" />
              </div>
              <div class="col-span-3 p-6 flex flex-col justify-start">
                <h5 class="text-gray-900 text-xl font-medium mb-2">${title.length > 70 ? title.slice(0,70) + '...' : title}</h5>
                <p class="text-gray-700 text-base mb-4">${details.length > 350 ? details.slice(0,350) + '...' : details}</p>
                <div class="flex items-center justify-between">
                  <div class="author-container flex my-5">
                    <div class="author-img">
                      <img src="${img ? img: 'Image Not Found'}" class="rounded-full mr-5" style="height: 50px; width: 50px" alt=""
                        loading="lazy" />
                    </div>
                    <div class="author-details">
                      <div class="author name">
                        <p>${name? name: 'Name Not Found'}</p>
                        <p>${published_date ? published_date: 'Published Date not found'}</p>
                      </div>
                    </div>
                  </div>
                  <div class="view-container flex">
                    <p><i class="fa-regular fa-eye mr-2"></i></p>
                    <p>${total_view ? total_view + 'M': 'Data Not found'}</p>
                  </div>
                  <div class="review-container text-red-400">
                    <p>Ratings: (${number ? number: 'Rattings Not found'})</p>
                    
                  </div>
                  <div class="details-container">
                    <button onclick="loadPostDetails('${_id}')" type="button" class="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal"data-bs-target="#exampleModal">
                    <i class="fa-solid fa-arrow-right"></i>
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
    `;

    postContainer.appendChild(article);
    toggleSpinner(false)
  })
}
// Load Post Details

const loadPostDetails = async id => {
  // console.log(id)
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  // console.log(url)

  const res = await fetch(url);
  const data = await res.json();
  displayPostDetails(data.data[0])
}

const displayPostDetails = detailsPost => {
  console.log(detailsPost);

  const {title,image_url,details,author} = detailsPost;
  const {name,published_date} = author;
  // console.log(title,image_url,details)
  const postTitle = document.getElementById('post-title');
  postTitle.innerHTML = title;
  const postDetails = document.getElementById('detils-post');
  postDetails.innerHTML = `
  <p class="text-gray-700 text-base mb-4">${details.length > 350 ? details.slice(0,350) + '...' : details}</p>
  <img src="${image_url ? image_url: 'Image Not Found'}" alt="" />
  <p class="py-3">Author Name: ${name}</p>
  <p>Published Date: ${published_date}</p>
  `;
}
// Toggle Spinner
const toggleSpinner = isLoading => {
  const spinner = document.getElementById('spinner');

  if(isLoading){
    spinner.classList.remove('hidden')
  }else{
    spinner.classList.add('hidden')
  }
}

///// Default

// const defaultCategoryNews = async () => {
//   const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
//   // console.log(url)
//   toggleSpinner(true)
//   const res = await fetch(url);
//   const data = await res.json();
//   displayCategoryNews(data.data)
//   // return(data.data)
// }




loadCategories()

displayCategoryNews()