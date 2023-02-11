
import { lookup } from "./webnative";

const token = import.meta.env.BLOCKEN_TOKEN;
let documents;

async function getAllPosts() {
    documents = await lookup(token);
    documents.sort((a, b) => b.updated - a.updated);
    return documents;
}


export {
    getAllPosts
};
