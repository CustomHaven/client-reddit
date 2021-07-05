const API_REDDIT = 'https://www.reddit.com';

const reddit = {
    async getSubreddits() {
        try {
            const response = await fetch(`${API_REDDIT}/subreddits.json`);
            if (response.ok) {
                const jsonResponse = await response.json();
                const children = jsonResponse.data.children.map(child => child.data);
                return children
            }
            throw new Error('Request Failed');
        } catch(error) {
            console.log(error)
        }
    },
    async getHome() {
        try {
            const response = await fetch(`${API_REDDIT}/r/Home.json`);
            if (response.ok) {
                const jsonResponse = await response.json();
                const children = jsonResponse.data.children.map(child => child.data)
                return children;
            }
            throw new Error('Request Failed');
        } catch(error) {
            console.log(error)
        }
    },
    async getPopular() {
        try {
            const response = await fetch(`${API_REDDIT}/r/popular.json`);
            if (response.ok) {
                const jsonResponse = await response.json();
                const children = jsonResponse.data.children.map(child => child.data);
                return children
            }
            throw new Error('Request Failed');
        } catch(error) {
            console.log(error)
        }
    },
    async getAnyReddit(data) {
        try {
            const response = await fetch(`${API_REDDIT}/r/${data}.json`);
            if (response.ok) {
                const jsonResponse = await response.json();
                const children = jsonResponse.data.children.map(child => child.data)
                return children;
            }
            throw new Error('Request Failed');
        } catch(error) {
            console.log(error)
        }
    },
    async getPost(permalink) {
        try {
            const response = await fetch(`${API_REDDIT}${permalink}.json`);
            if (response.ok) {
                const jsonResponse = await response.json();
                const children = jsonResponse[1].data.children.map(child => child.data)
                return children;
            }
            throw new Error('Request Failed');
        } catch(error) {
            console.log(error)
        }
    },
    async getSearch(query) {
        try {
            const response = await fetch(`${API_REDDIT}/search.json?q=${query}`)
            if (response.ok) {
                const jsonResponse = await response.json();
                const children = jsonResponse.data.children.map(child => child.data)
                return children;
            }
            throw new Error('Reuqest Failed');
        } catch(error) {
            console.log(error)
        }
    }
}

export default reddit;