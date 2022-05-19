import {truncate} from "../repositories/testRepository.js"


export async function resetDatabase(){
    await truncate();
}


