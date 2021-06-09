const API_REDDIT = 'https://www.reddit.com';

export const getSubreddits = async () => {
    const response = await fetch(`${API_REDDIT}/subreddits.json`);
    const jsonResponse = await response.json();
  
    const children = jsonResponse.data.children.map(child => child.data.url);
    // console.log(children)
    return children
};

export const getPopular = async () => {
    const response = await fetch(`${API_REDDIT}/r/popular.json`);
    const jsonResponse = await response.json();
  
    const children = jsonResponse.data.children.map(child => child.data.preview);
    // console.log(children)
    // console.log(jsonResponse)
    return children;
};

// home
// popular,
// all
// birdswitharms,
// unstirredpaint,
// chairsunderwater,
// boottoobig,
