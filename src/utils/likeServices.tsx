const LIKES = 'likse'

export const addLike = (productId: number) => {
    let jsonLikes = localStorage.getItem(LIKES);
    let likes: number[];

    if (!jsonLikes) {
        likes = [productId]
    } else {
        likes = JSON.parse(jsonLikes)
        const index = likes.findIndex(item => item === productId)

        if (index === -1) {
            likes.push(productId)
        }
    }
    const jsonNewLikes = JSON.stringify(likes);
    localStorage.setItem(LIKES, jsonNewLikes);
}

export const deleteLike = (productId: number) => {
    let jsonLikes = localStorage.getItem(LIKES);
    let likes: number[];
    if (!jsonLikes) {
        return;
    } else {
        
        likes = JSON.parse(jsonLikes)
        const index = likes.findIndex(item => item === productId)
        if (index >= 0) {
            likes.splice(index, 1);
        }
    }
    const jsonNewLikes = JSON.stringify(likes);
    localStorage.setItem(LIKES, jsonNewLikes);
}

export const getLikes = (): number[] => {
    const jsonLikes = localStorage.getItem(LIKES)
    if (jsonLikes) {
        const likes: number[] = JSON.parse(jsonLikes)
        return likes;
    }
    return []
}

export const cardIsLiked = (productId: number): boolean => {
    let jsonLikes = localStorage.getItem(LIKES);
    let likes: number[];

    if (!jsonLikes) {
        return false;
    } else {
        likes = JSON.parse(jsonLikes)
        const index = likes.findIndex(item => item === productId)

        if (index === -1) {
            return false;
        }
        return true;
    }
}