export const URL = "http://14.225.254.143:1337";
export const TOKEN =
  "0798842a12207061f314490e79864be9ed7657cf56789b48f0f3ea183844eb2942c8b72b85b65b1df79949fd115a439d9363ba54b404cbc8c69781ba95840f03fca95f93cb58a9d8430beec972cc0312e5cfe96770f2b1ccd630360fe3c580fc55fda098450f63a17f8d9f48d6b6dc8a139923c47c06c4cf65b73978de580da7";
export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};
