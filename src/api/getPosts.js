const uriPosts = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = async () => {
  try {
    const response = await fetch(uriPosts);
    return await response.json();
  } catch (error) {
    console.error("Error receiving data", error.message);
  }
};
